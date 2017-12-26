const worker = self
class Loop {
    constructor() {
        this.animated = false
    }
    start(time) {
        if(!this.animated) {
            this.animated = true
            this.interval = setInterval(()=>{
                worker.postMessage("update")
            },(time||1)*1000)
        }
    }
    stop() {
        if(this.animated) {
            this.animated = true
            clearInterval(this.interval)
        }
    }
}
const loop = new Loop()
worker.onmessage = (event) => {
    const message = event.data
    console.log(message)
    if(message.intention == 'start') {
        loop.start(message.time)
    }
    else if(message.intention == 'stop') {
        loop.stop()
    }
}
