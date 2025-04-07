import Sound from 'react-native-sound';

class AudioManager {
    player = null;

    loadTrack(url, onLoad, onEnd) {
        if (this.player) {
            this.player.release(); // bersihkan player lama
        }

        this.player = new Sound(url, null, (error) => {
            if (error) {
                return;
            }
            onLoad && onLoad(this.player);

            this.player.play((success) => {
                if (success) {
                    onEnd && onEnd();
                }
            });
        });
    }

    play() {
        this.player?.play();
    }

    pause() {
        this.player?.pause();
    }

    stop() {
        this.player?.stop();
    }

    getCurrentTime(callback) {
        this.player?.getCurrentTime(callback);
    }

    setCurrentTime(time) {
        this.player?.setCurrentTime(time);
    }

    release() {
        this.player?.release();
        this.player = null;
    }

    isPlaying() {
        return !!this.player;
    }
}

const audioManager = new AudioManager();
export default audioManager;
