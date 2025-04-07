package com.hiyorilive

import android.content.Context
import android.support.v4.media.session.MediaSessionCompat

class MediaSessionManager(context: Context) {
    private val mediaSession = MediaSessionCompat(context, "MusicServiceSession")

    fun updateMetadata(title: String, artist: String, imageUrl: String) {
        val metadataBuilder = androidx.media.utils.MediaMetadataCompat.Builder()
            .putString(android.support.v4.media.MediaMetadataCompat.METADATA_KEY_TITLE, title)
            .putString(android.support.v4.media.MediaMetadataCompat.METADATA_KEY_ARTIST, artist)
        mediaSession.setMetadata(metadataBuilder.build())
    }
}
