package com.hiyorilive

import com.facebook.react.bridge.*

class MusicModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName() = "MusicBridge"

    @ReactMethod
    fun startService() {
        MusicService.startService(reactApplicationContext)
    }

    @ReactMethod
    fun stopService() {
        MusicService.stopService(reactApplicationContext)
    }

    @ReactMethod
    fun playTrack(url: String, title: String, artist: String, imageUrl: String) {
        MusicService.playTrack(reactApplicationContext, url, title, artist, imageUrl)
    }

    @ReactMethod
    fun pauseTrack() {
        MusicService.pauseTrack(reactApplicationContext)
    }
}
