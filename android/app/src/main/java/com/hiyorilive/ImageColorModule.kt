package com.hiyorilive

import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.graphics.Color
import android.util.Base64
import android.content.ContentResolver
import android.net.Uri
import com.facebook.react.bridge.*
import java.io.InputStream
import java.net.HttpURLConnection
import java.net.URL
import java.io.File

class ImageColorModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String {
        return "ImageColorModule"
    }

    @ReactMethod
    fun getDominantColor(source: String, promise: Promise) {
        try {
            val bitmap = getBitmapFromSource(source)
            if (bitmap == null) {
                promise.reject("ERROR", "Gagal decode gambar dari sumber: $source")
                return
            }

            val pixel = bitmap.getPixel(0, 0) // Ambil warna dari pojok kiri atas
            val red = Color.red(pixel)
            val green = Color.green(pixel)
            val blue = Color.blue(pixel)

            val dominantColor = String.format("#%02x%02x%02x", red, green, blue)
            promise.resolve(dominantColor)
        } catch (e: Exception) {
            promise.reject("ERROR", "Gagal mengambil warna: ${e.message}")
        }
    }

    private fun getBitmapFromSource(source: String): Bitmap? {
        return when {
            source.startsWith("http") -> loadBitmapFromUrl(source)
            source.startsWith("data:image") -> decodeBase64(source)
            source.startsWith("content://") || source.startsWith("file://") -> loadBitmapFromUri(source)
            else -> BitmapFactory.decodeFile(source) // Untuk local file (require/import)
        }
    }

    private fun loadBitmapFromUrl(urlString: String): Bitmap? {
        return try {
            val url = URL(urlString)
            val connection = url.openConnection() as HttpURLConnection
            connection.doInput = true
            connection.connect()
            val inputStream: InputStream = connection.inputStream
            BitmapFactory.decodeStream(inputStream)
        } catch (e: Exception) {
            null
        }
    }

    private fun decodeBase64(base64String: String): Bitmap? {
        return try {
            val base64Data = base64String.substringAfter("base64,") // Hapus prefix "data:image/png;base64,"
            val decodedBytes = Base64.decode(base64Data, Base64.DEFAULT)
            BitmapFactory.decodeByteArray(decodedBytes, 0, decodedBytes.size)
        } catch (e: Exception) {
            null
        }
    }

    private fun loadBitmapFromUri(uriString: String): Bitmap? {
        return try {
            val uri = Uri.parse(uriString)
            val contentResolver: ContentResolver = reactApplicationContext.contentResolver
            val inputStream: InputStream? = contentResolver.openInputStream(uri)
            BitmapFactory.decodeStream(inputStream)
        } catch (e: Exception) {
            null
        }
    }
}
