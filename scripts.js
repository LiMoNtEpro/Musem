//welcome
const slides = document.querySelectorAll('.welcome-image')
const slideArrowLeft = document.querySelector('.slider-arrow-left')
const slideArrowRight = document.querySelector('.slider-arrow-right')

// slideArrowLeft.addEventListener('click', )




//tickets
const ticketsBasicNum = document.querySelector('.counter-number-basic')
const ticketsBasicAdjust = document.querySelector('.counter-plus-basic')
console.log(ticketsBasicAdjust)
const ticketsBasicReduce = document.querySelector('.counter-minus-basic')
const ticketsSeniorNum = document.querySelector('.counter-number-senior')
const ticketsSeniorAdjust = document.querySelector('.counter-plus-senior')
const ticketsSeniorReduce = document.querySelector('.counter-minus-senior')
const totalAmount = document.querySelector('.amount-title-num')
let b=0, s=0, a=0;
const bp = 120, sp = 100
ticketsBasicAdjust.addEventListener('click', (event) =>{
    console.log(event)
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



