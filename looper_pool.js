class Looper {
    constructor() {
        this.worker = new Worker('loop_worker')
    }
    start(time) {
        this.time = time
        this.worker.postMessage({intention:'start',time})
    }
    addUpdateListener(cb) {
        this.worker.onmessage = (event) {
            console.log(event)
            const data = event.data
            if(data == "update" && cb) {
                cb()
            }
        }
    }
    restart() {
        this.worker.postMessage({intention:'start',time:this.time})
    }
    stop() {
        this.worker.postMessage({intention:'stop'})
    }
}
class LooperPool {
    startLoop(time,cb) {
        const looper = new Looper()
        looper.start(time)
        looper.addUpdateListener(cb)
        this.loopers.push(looper)
    }
    constructor() {
        this.loopers = []
    }
    restartLoop(looper) {
        looper.start()
    }
    stopLoop(looper) {
        looper.stop()
    }
}
const looperPool = new LooperPool()
