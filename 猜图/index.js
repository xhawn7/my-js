const score = document.querySelector('#score')
const imgWrapper = document.querySelector('#imgs')
const imgList = [
  '/static/images/cheeseburger.png',
  '/static/images/fries.png',
  '/static/images/pizza.png',
  '/static/images/hotdog.png',
  '/static/images/milkshake.png',
  '/static/images/ice-cream.png',

]
const defaultImg = '/static/images/blank.png'
const whiteImg = '/static/images/white.png'
const imgLists = [...imgList, ...imgList].sort(() => 0.5 - Math.random())
const chosenImgList = []
const chosenIdList = []
scoreNumber = 0
const showIsMatch = () => {
  const imgs = document.querySelectorAll('img')
  const firstClickId = chosenIdList[0]
  const secondClickId = chosenIdList[1]
  if (firstClickId == secondClickId) {
    imgs[firstClickId].setAttribute('src', defaultImg)
    alert('You have clicked the same image!')
  } else {
    if (chosenImgList[0] == chosenImgList[1]) {
      imgs[firstClickId].setAttribute('src', whiteImg)
      imgs[secondClickId].setAttribute('src', whiteImg)
      imgs[firstClickId].removeEventListener('click', flipImg)
      imgs[secondClickId].removeEventListener('click', flipImg)
      scoreNumber++
      alert('You found a match')
    } else {
      imgs[firstClickId].setAttribute('src', defaultImg)
      imgs[secondClickId].setAttribute('src', defaultImg)
      alert('Sorry, try again')
    }
  }
  chosenImgList.length = 0
  chosenIdList.length = 0
  score.textContent = scoreNumber
}
// TODO: 如果这里用箭头函数。如何改变this指向。
function flipImg() {
  const dataId = this.getAttribute('dataId')
  // console.log(dataId)
  this.setAttribute('src', imgLists[dataId])
  chosenImgList.push(imgLists[dataId])
  chosenIdList.push(dataId)
  if (chosenImgList.length == 2) {
    setTimeout(showIsMatch, 100)
  }

}

const createBoard = () => {
  for (let i = 0; i < imgLists.length; i++) {
    const img = document.createElement('img')
    img.setAttribute('src', defaultImg)
    img.setAttribute('dataId', i)
    img.addEventListener('click', flipImg)
    imgWrapper.appendChild(img)
  }
}

createBoard()