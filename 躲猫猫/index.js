/*
方法1
60秒的时间
3*3的正方形
1. 创造9个小的正方形，每个正方形里都有一个id
2. 做一个随机，选出一个id号
3，这个id号在哪，就在哪插入这个图片，同时把原来插入图片的
*/

// const clickCount = document.querySelector('#clickCount')
// const timeLeft = document.querySelector('#timeLeft')
// const squareWrapper = document.querySelector('#squareWrapper')
// let time = 3

// bTime = setInterval(() => {
//   if(time===0){
//     time = 0
//     clearInterval(aTime)
//     clearInterval(bTime)
//   }else{
//     time = time-1
//     aTime = setInterval(()=>{
//       selectedId = Math.ceil(9*Math.random())
//       selectedSquares[selectedId].appendChild(img)
//     },1000)
//   }
//   timeLeft.textContent = time
// }, 1000);

// // selectedId = Math.ceil(9*Math.random())

// let count = 0
// for(let i = 0;i<9;i++){
//   const square = document.createElement('div')
//   square.setAttribute("style", "border:1px solid black;width:305px;height:305px")
//   square.setAttribute('id','square')
//   squareWrapper.appendChild(square)
// }

// function clickSquare() {
//   // console.log(this.id)
// }


// const selectedSquares = document.querySelectorAll('#square')
// const img = document.createElement('img')
// const imgUrl = './static/images/mole.jpg'
// img.setAttribute('src',imgUrl)

// img.addEventListener('click',()=>{
//   count++
//   clickCount.textContent=count
// })


/*
方法2
1. 2个interval，1个是时间的倒计时，1个是图形背景是否显示
2. 点击到有图形背景的，点中+1
*/

const clickCount = document.querySelector('#clickCount')
const timeLeft = document.querySelector('#timeLeft')
const squareWrapper = document.querySelector('#squareWrapper')
let count = 0
let time = 60
let matchId

function clickMole() {
  if (matchId === Number(this.id)) {
    count++
    clickCount.textContent = count
  }

}

const createBoard = () => {
  for (let i = 1; i <= 9; i++) {
    const square = document.createElement('div')
    square.setAttribute('id', i)
    square.setAttribute('class', 'square')
    square.addEventListener('click', clickMole)
    squareWrapper.appendChild(square)
  }
}
createBoard()

const showMole = () => {
  const randomId = Math.ceil(Math.random() * 9)
  const randomDiv = document.querySelectorAll('.square')
  randomDiv.forEach(item => {
    item.classList.remove('hasMole')
  })
  randomDiv[randomId - 1].classList.add('hasMole')
  matchId = randomId
}

let showMoleInterval = setInterval(showMole, 1000)

countTime = () => {
  if (time === 0) {
    clearInterval(timeCount)
    clearInterval(showMoleInterval)
  } else {
    time -= 1
  }
  timeLeft.textContent = time
}
let timeCount = setInterval(countTime, 1000)
