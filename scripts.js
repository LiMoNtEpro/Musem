
//welcome
//welcome variables
const slideContainer = document.querySelector('.welcome-slider-container')
const slideTrack = document.querySelector('.welcome-slider-track')
const slideArrowLeft = document.querySelector('.slider-arrow-left')
const slideArrowRight = document.querySelector('.slider-arrow-right')

//welcome functions
function getSlides(){
    return [...document.querySelectorAll('.welcome-image')]
}
function initInfScroll(){
    const slides = getSlides()
    if (slides.length===0) return;

    const firstClone = slides[0].cloneNode(true)
    const lastClone = slides[slides.length-1].cloneNode(true)
    slideTrack.append(firstClone)
    slideTrack.prepend(lastClone)
    slideTrack.scroll({left: getSlides()[2].offsetLeft, behavior: 'instant'})
    requestAnimationFrame(()=>{
        slideContainer.classList.add('is-ready')
    })
}
initInfScroll()//создание двух дополнительных слайдов в начале и в конце
function getNextSlide(){
    const currentScroll = slideTrack.scrollLeft
    return getSlides().find((slide)=>{
        return slide.offsetLeft > currentScroll
    })
}
function getPrevSlide(){
    const currentScroll = slideTrack.scrollLeft
    return getSlides().reverse().find((slide)=>{
        return slide.offsetLeft < currentScroll
    })
}
function getNextSlideWidth(){
    const nextSlide = getNextSlide()
    if (nextSlide){
        return nextSlide.offsetLeft-slideTrack.scrollLeft
    }
    return -slideTrack.scrollLeft
}
function getPrevSlideWidth(){
    const prevSlide = getPrevSlide()
    if (prevSlide){
        return prevSlide.offsetLeft-slideTrack.scrollLeft
    }
    return slideTrack.scrollWidth
}
function scrollByAmount(amount){
    slideTrack.scrollBy({left: amount, behavior: "smooth"})
}
function scrollToNext(){
    scrollByAmount(getNextSlideWidth())
}
function scrollToPrev(){
    scrollByAmount(getPrevSlideWidth())
}
function InfLoop(){
    const lastCloneSlide = getSlides()[getSlides().length-1]
    const firstCloneSlide = getSlides()[0]
    const lastRealSlide = getSlides()[getSlides().length-2]
    const firstRealSlide = getSlides()[1]

    if (slideTrack.scrollLeft<=firstCloneSlide.offsetLeft){
        slideTrack.scrollTo({left: lastRealSlide.offsetLeft, behavior: 'instant'})
    }else if(slideTrack.scrollLeft>= lastCloneSlide.offsetLeft){
        slideTrack.scrollTo({left: firstRealSlide.offsetLeft,behavior:'instant'})
    }
}
function changeBlockAndNum (){
    //blocks
    const blocks = [...document.querySelectorAll('.carousel-block')]
    blocks.forEach(block => {
        if(block.classList.contains('active')){
            block.classList.remove('active')
        }
    });
    const oneSlideWidth = slideTrack.scrollWidth/7
    const currentSlide = Math.trunc(slideTrack.scrollLeft/oneSlideWidth) - 1
    if(currentSlide >= 0 && currentSlide < 5){
        if(blocks[currentSlide]){
            blocks[currentSlide].classList.add('active')
        }
    }
    //numbers
    const num = document.querySelector('.welcome-num-text')
    if (currentSlide+1!=0){
        num.textContent = (`0${currentSlide+1}`)
    }
}
// welcome events
slideArrowRight.addEventListener('click', ()=>{
    scrollToNext();
})
slideArrowLeft.addEventListener('click', ()=>{
    scrollToPrev()
})
slideTrack.addEventListener('scroll', (event)=>{
    setTimeout(InfLoop,1000);
    changeBlockAndNum()
})

//mouse scroll
let isPressed = false
let isMovingRight = false
let startX;
let ScrollStart;
slideTrack.addEventListener('mousedown', (event)=>{
    isPressed=true
    startX=event.pageX - slideTrack.offsetLeft;
    ScrollStart = slideTrack.scrollLeft
    slideTrack.style.scrollBehavior = 'auto'
})
window.addEventListener('mouseup', ()=>{
    isPressed = false
    slideTrack.style.scrollBehavior = 'smooth'
    slideTrack.style.scrollSnapType = 'x mandatory';
    slideTrack.scrollBy({ left: (isMovingRight? -1:1), behavior: 'smooth' });
})
slideTrack.addEventListener('mousemove', (event)=>{
    if (!isPressed) return;
    event.preventDefault()
    slideTrack.style.scrollSnapType = 'none';
    const x = event.pageX - slideTrack.offsetLeft
    const walk = (x-startX)
    isMovingRight = x > startX;
    slideTrack.scrollLeft = ScrollStart-walk
    console.log(slideTrack.scrollLeft)
    InfLoop();
})


//tickets
//tickets variables
const ticketsBasicNum = document.querySelector('.counter-number-basic')
const ticketsBasicAdjust = document.querySelector('.counter-plus-basic')
const ticketsBasicReduce = document.querySelector('.counter-minus-basic')
const ticketsSeniorNum = document.querySelector('.counter-number-senior')
const ticketsSeniorAdjust = document.querySelector('.counter-plus-senior')
const ticketsSeniorReduce = document.querySelector('.counter-minus-senior')
const totalAmount = document.querySelector('.amount-title-num')
let b=0, s=0, a=0;
const bp = 120, sp = 100

// tickets events
ticketsBasicAdjust.addEventListener('click', (event) =>{
    // console.log(event)
    b++
    a+= bp
    ticketsBasicNum.innerHTML = b
    totalAmount.innerHTML = a
})
ticketsBasicReduce.addEventListener('click', (event) =>{
    if(b>0){
        b--
        a-= bp
    }
    ticketsBasicNum.innerHTML = b
    totalAmount.innerHTML = a
})
ticketsSeniorAdjust.addEventListener('click', (event) =>{
    s++
    a+= sp
    ticketsSeniorNum.innerHTML = s
    totalAmount.innerHTML = a
})
ticketsSeniorReduce.addEventListener('click', (event) =>{
    if(s>0){
        s--
        a-= sp
    }
    ticketsSeniorNum.innerHTML = s
    totalAmount.innerHTML = a
})

//Video control
// video variables
const video = document.querySelector('.video-player')
const progress = document.querySelector('.video-bar')
const progressFilled = document.querySelector('.video-bar-red')
const toggle = document.querySelector('.play-button-image')
const playButton = document.querySelector('.video-pause')
const fullscreen = document.querySelector('.fullscreen-button-image')
const volumeRange = document.querySelector('.video-volume-range')


// video functions
function togglePlay(){
    const method = video.paused ? 'play' : 'pause'
    video[method]();
}
function updateButton(){
    if(this.paused){
        toggle.src = 'assets/svg/video/control/play.svg'
        playButton.style.display = 'block'
    }else{
        toggle.src = 'assets/svg/video/control/pause.svg'
        playButton.style.display = 'none'
    }
}
function handleRangeUpdate(){
    video[this.name] = this.value
}
volumeRange.oninput = function(){
    this.style.background = `linear-gradient(to right, red ${this.value*100}%, #C4C4C4 ${this.value*100}%`
}
function handleProgress(){
    const percent = (video.currentTime / video.duration) * 100
    progressFilled.style.width = `${percent}%`
}
function scrub (e){
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration
    video.currentTime = scrubTime
}

// video events
video.addEventListener('click', togglePlay)
video.addEventListener('play', updateButton)
video.addEventListener('pause', updateButton)
video.addEventListener('timeupdate', handleProgress)
toggle.addEventListener('click', togglePlay)
playButton.addEventListener('click', togglePlay)
volumeRange.addEventListener('change', handleRangeUpdate)
volumeRange.addEventListener('mousemove', handleRangeUpdate)
let mousedown=false
progress.addEventListener('click', scrub)
progress.addEventListener('mousemove', (e)=>{mousedown && scrub(e)})
progress.addEventListener('mousedown', ()=>{mousedown=true})
progress.addEventListener('mouseup', ()=>{mousedown=false})
fullscreen.addEventListener('click', ()=>{
    if(video.requestFullscreen()){
        video.requestFullscreen()
    }
})


