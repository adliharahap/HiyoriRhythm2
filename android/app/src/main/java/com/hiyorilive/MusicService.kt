package com.hiyorilive

import android.app.*
import android.content.Context
import android.content.Intent
import android.os.Build
import android.os.IBinder
import android.media.MediaPlayer
import android.net.Uri
import androidx.core.app.NotificationCompat
import com.hiyorilive.R

class MusicService : Service() {
    private var player: MediaPlayer? = null

    companion object {
        private const val CHANNEL_ID = "MusicServiceChannel"

        fun startService(context: Context) {
            val startIntent = Intent(context, MusicService::class.java)
            context.startForegroundService(startIntent)
        }

        fun stopService(context: Context) {
            val stopIntent = Intent(context, MusicService::class.java)
            context.stopService(stopIntent)
        }

        fun playTrack(context: Context, url: String, title: String, artist: String, imageUrl: String) {
            val intent = Intent(context, MusicService::class.java).apply {
                action = "PLAY_TRACK"
                putExtra("url", url)
                putExtra("title", title)
                putExtra("artist", artist)
                putExtra("imageUrl", imageUrl)
            }
            context.startForegroundService(intent)
        }

        fun pauseTrack(context: Context) {
            val intent = Intent(context, MusicService::class.java).apply {
                action = "PAUSE_TRACK"
            }
            context.startForegroundService(intent)
        }
    }

    override fun onCreate() {
        super.onCreate()
        createNotificationChannel()
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        when (intent?.action) {
            "PLAY_TRACK" -> {
                val url = intent.getStringExtra("url")
                val title = intent.getStringExtra("title") ?: "Unknown Title"
                val artist = intent.getStringExtra("artist") ?: "Unknown Artist"
                startForeground(1, createNotification(title, artist))
                play(url)
            }
            "PAUSE_TRACK" -> {
                player?.pause()
            }
            else -> {
                startForeground(1, createNotification("Music Service", "Running..."))
            }
        }
        return START_STICKY
    }

    override fun onDestroy() {
        player?.release()
        player = null
        super.onDestroy()
    }

    override fun onBind(intent: Intent?): IBinder? = null

    private fun play(url: String?) {
        if (url.isNullOrEmpty()) return
        player?.release()
        player = MediaPlayer().apply {
            setDataSource(this@MusicService, Uri.parse(url))
            prepare()
            start()
        }
    }

    private fun createNotification(title: String, artist: String): Notification {
        val notificationIntent = Intent(this, MainActivity::class.java)
        val pendingIntent = PendingIntent.getActivity(
            this, 0, notificationIntent,
            PendingIntent.FLAG_IMMUTABLE
        )

        return NotificationCompat.Builder(this, CHANNEL_ID)
            .setContentTitle(title)
            .setContentText(artist)
            .setSmallIcon(R.mipmap.ic_launcher)
            .setContentIntent(pendingIntent)
            .build()
    }

    private fun createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val serviceChannel = NotificationChannel(
                CHANNEL_ID,
                "Music Service Channel",
                NotificationManager.IMPORTANCE_LOW
            )
            getSystemService(NotificationManager::class.java)
                ?.createNotificationChannel(serviceChannel)
        }
    }
}
