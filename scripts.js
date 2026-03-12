//welcome
const slideContainer = document.querySelector('.welcome-slider-container')
const slideTrack = document.querySelector('.welcome-slider-track')
const slideArrowLeft = document.querySelector('.slider-arrow-left')
const slideArrowRight = document.querySelector('.slider-arrow-right')
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
slideArrowRight.addEventListener('click', ()=>{
    scrollToNext()
})
slideArrowLeft.addEventListener('click', ()=>{
    scrollToPrev()
})
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
slideTrack.addEventListener('scroll', ()=>{
    setTimeout(InfLoop(),2000)
})


//tickets
const ticketsBasicNum = document.querySelector('.counter-number-basic')
const ticketsBasicAdjust = document.querySelector('.counter-plus-basic')
const ticketsBasicReduce = document.querySelector('.counter-minus-basic')
const ticketsSeniorNum = document.querySelector('.counter-number-senior')
const ticketsSeniorAdjust = document.querySelector('.counter-plus-senior')
const ticketsSeniorReduce = document.querySelector('.counter-minus-senior')
const totalAmount = document.querySelector('.amount-title-num')
let b=0, s=0, a=0;
const bp = 120, sp = 100
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



