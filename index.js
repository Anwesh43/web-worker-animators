const w = window.innerWidth,h = window.innerHeight
const createBox = (i,time) => {
    const size = Math.min(w,h)/5
    const div = document.createElement('div')
    div.style.position = 'absolute'
    div.style.left = (i+1)*w/4 - size/2
    div.style.top = h - size
    div.style.width = size
    div.style.height = size
    div.style.background = '#69F0AE'
    div.style.zIndex = 1
    div.style.fontSize = 20
    div.style.color = 'white'
    div.style.textAlign = 'center'
    div.innerHTML = `${time} seconds`
    document.body.appendChild(div)
}
class ColoredCircle {
    constructor(color,x) {
        this.defineDom(color,x)
    }
    defineDom(color,x) {
        const size = Math.min(w,h)/10
        this.div = document.createElement('div')
        this.div.style.position = 'absolute'
        this.div.style.top = h-size
        this.div.style.left = x-size/2
        this.div.style.width = size
        this.div.style.height = size
        this.div.style.background = color
        this.div.style.borderRadius = '50%'
        document.body.appendChild(this.div)
    }
    update() {
        this.div.style.top = parseInt(this.div.style.top) - h/10
        if(parseInt(this.div.style.top) < -this.div.style.height) {
            if(this.looper) {
                looperPool.stopLoop(this.looper)
                document.body.removeChild(this.div)
            }
        }
    }
    startUpdating() {
        this.looper = looperPool.startLoop(0.1,()=>{
            this.update()
        })
    }
}
var counter = 0
const createCirclesAtInterval = (time,color) => {
    createBox(counter,time)
    const x = (counter+1)*w/4
    const looper = looperPool.startLoop(time,()=>{
        const circle = new ColoredCircle(color,x)
        circle.startUpdating()
    })
    counter++
}
createCirclesAtInterval(2,"#f44336")
createCirclesAtInterval(3,"#FFC107")
createCirclesAtInterval(5,"#6A1B9A")
