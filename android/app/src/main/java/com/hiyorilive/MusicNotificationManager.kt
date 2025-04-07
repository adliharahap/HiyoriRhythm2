package com.hiyorilive

import android.app.*
import android.content.Context
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import androidx.core.app.NotificationCompat

class MusicNotificationManager(private val context: Context) {

    fun createNotification(title: String, artist: String, imageUrl: String): Notification {
        createChannel()
        val icon = BitmapFactory.decodeResource(context.resources, R.mipmap.ic_launcher)

        return NotificationCompat.Builder(context, CHANNEL_ID)
            .setContentTitle(title)
            .setContentText(artist)
            .setLargeIcon(icon)
            .setSmallIcon(R.mipmap.ic_launcher)
            .setPriority(NotificationCompat.PRIORITY_HIGH)
            .setStyle(androidx.media.app.NotificationCompat.MediaStyle())
            .build()
    }

    fun updateToPaused() {
        // Update notification if needed (for pause state)
    }

    private fun createChannel() {
        val channel = NotificationChannel(
            CHANNEL_ID,
            "Music Playback",
            NotificationManager.IMPORTANCE_LOW
        )
        (context.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager)
            .createNotificationChannel(channel)
    }

    companion object {
        private const val CHANNEL_ID = "MUSIC_CHANNEL"
    }
}
