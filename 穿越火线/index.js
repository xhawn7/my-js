// 黑灰灰，9个空格


/*
时间改变的时候会发生的事情：
砖块自动移动
倒计时启动
手动移动
*/

const btn = document.querySelector('.btn')
const grid = document.querySelector('.grid')
const timeLeft = document.querySelector('.timeLeft')
const result = document.querySelector('.result')
const restart = document.querySelector('.restart')
let timer
let startIndex = 76
let endIndex = 4
let count = timeLeft.textContent
let currentIndex = startIndex
let brickArray = Array(81).fill(undefined)

function drawBrick() {
  brickArray.forEach((_, index) => {
    const div = document.createElement('div')
    if ([18, 23, 28, 33].includes(index)) {
      div.classList.add('l1')
    } else if ([19, 24, 29, 34].includes(index)) {
      div.classList.add('l2')
    } else if ([20, 25, 30, 35].includes(index)) {
      div.classList.add('l3')
    } else if ([21, 26, 31].includes(index)) {
      div.classList.add('l4')
    } else if ([22, 27, 32].includes(index)) {
      div.classList.add('l5')
    } else if ([45, 48, 51, 54, 57, 60].includes(index)) {
      div.classList.add('b3')
    } else if ([46, 49, 52, 55, 58, 61].includes(index)) {
      div.classList.add('b1')
    } else if ([47, 50, 53, 56, 59, 62].includes(index)) {
      div.classList.add('b2')
    } else if (index == currentIndex) {
      div.classList.add('moveBrick')
    } else if (index == endIndex) {
      div.classList.add('endBrick')
    } else if (index == currentIndex) {
      div.classList.add('moveBrick')
    }
    grid.appendChild(div)
  })
}
drawBrick()

function logLeftMove(logItem) {
  switch (true) {
    case logItem.classList.contains('l1'):
      logItem.classList.remove('l1')
      logItem.classList.add('l2')
      break;
    case logItem.classList.contains('l2'):
      logItem.classList.remove('l2')
      logItem.classList.add('l3')
      break;
    case logItem.classList.contains('l3'):
      logItem.classList.remove('l3')
      logItem.classList.add('l4')
      break;
    case logItem.classList.contains('l4'):
      logItem.classList.remove('l4')
      logItem.classList.add('l5')
      break;
    case logItem.classList.contains('l5'):
      logItem.classList.remove('l5')
      logItem.classList.add('l1')
      break;
  }
}

function logRightMove(logItem) {
  switch (true) {
    case logItem.classList.contains('l1'):
      logItem.classList.remove('l1')
      logItem.classList.add('l5')
      break;
    case logItem.classList.contains('l2'):
      logItem.classList.remove('l2')
      logItem.classList.add('l1')
      break;
    case logItem.classList.contains('l3'):
      logItem.classList.remove('l3')
      logItem.classList.add('l2')
      break;
    case logItem.classList.contains('l4'):
      logItem.classList.remove('l4')
      logItem.classList.add('l3')
      break;
    case logItem.classList.contains('l5'):
      logItem.classList.remove('l5')
      logItem.classList.add('l4')
      break;
  }
}

function brickLeftMove(brickItem) {
  switch (true) {
    case brickItem.classList.contains('b3'):
      brickItem.classList.remove('b3')
      brickItem.classList.add('b1')
      break
    case brickItem.classList.contains('b1'):
      brickItem.classList.remove('b1')
      brickItem.classList.add('b2')
      break
    case brickItem.classList.contains('b2'):
      brickItem.classList.remove('b2')
      brickItem.classList.add('b3')
      break
  }
}

function brickRightMove(brickItem) {
  switch (true) {
    case brickItem.classList.contains('b3'):
      brickItem.classList.remove('b3')
      brickItem.classList.add('b2')
      break
    case brickItem.classList.contains('b1'):
      brickItem.classList.remove('b1')
      brickItem.classList.add('b3')
      break
    case brickItem.classList.contains('b2'):
      brickItem.classList.remove('b2')
      brickItem.classList.add('b1')
      break
  }
}

function autoMove() {
  // 倒计时启动
  count = count <= 0 ? 0 : count - 1
  timeLeft.textContent = count
  // 砖块自动移动
  brickArray.forEach((_, index) => {
    if (index >= 18 && index <= 26) {
      logLeftMove(grid.children[index])
    }
    else if (index >= 27 && index <= 35) {
      logRightMove(grid.children[index])
    }
    else if (index >= 45 && index <= 53) {
      brickLeftMove(grid.children[index])
    }
    else if (index >= 54 && index <= 62) {
      brickRightMove(grid.children[index])
    }
  })

}

function whenKeyDown(e) {
  grid.children[startIndex].classList.add('startBrick')
  grid.children[currentIndex].classList.remove('moveBrick')
  switch (e.key) {
    case 'ArrowLeft':
      currentIndex = currentIndex % 9 == 0 ? currentIndex : currentIndex - 1
      break;
    case 'ArrowRight':
      currentIndex = currentIndex % 9 == 8 ? currentIndex : currentIndex + 1
      break;
    case 'ArrowUp':
      currentIndex = Math.ceil(currentIndex / 9) == 1 ? currentIndex : currentIndex - 9
      break;
    case 'ArrowDown':
      currentIndex = Math.ceil(currentIndex / 9) == 9 ? currentIndex : currentIndex + 9
      break;
  }
  grid.children[currentIndex].classList.add('moveBrick')

}

function checkWin() {
  hitBrickClass = ['b3', 'l1', 'l2', 'l3']
  hitBrick = hitBrickClass.some(item => {
    return grid.children[currentIndex].classList.contains(item)
  })
  hitEndBrick = grid.children[currentIndex].classList.contains('endBrick')
  if (count == 0 || hitBrick) {
    result.textContent = '你输了!'
    clearInterval(checkWinTimer)
    checkWinTimer = null
    clearInterval(timer)
    document.removeEventListener('keydown', whenKeyDown)
  } else if (hitEndBrick) {
    result.textContent = '你赢了!'
    clearInterval(checkWinTimer)
    checkWinTimer = null
    clearInterval(timer)
    document.removeEventListener('keydown', whenKeyDown)
  }
}

function clickBtn() {
  if (timer) {
    clearInterval(timer)
    clearInterval(checkWinTimer)
    timer = null
    checkWinTimer = null
    document.removeEventListener('keydown', whenKeyDown)
  } else {
    timer = setInterval(autoMove, 1000)
    checkWinTimer = setInterval(checkWin, 100)
    document.addEventListener('keydown', whenKeyDown) // 砖块手动移动，注意这边的事件不能直接放在autoMove中
  }
}
btn.addEventListener('click', clickBtn)

function restartAction() {
  count = 20
  timeLeft.textContent = count
  grid.children[currentIndex].classList.remove('moveBrick')
  currentIndex = startIndex
  grid.children[currentIndex].classList.add('moveBrick')
  timer = setInterval(autoMove, 1000)
  document.addEventListener('keydown', whenKeyDown)
  checkWinTimer = setInterval(checkWin, 100)
  result.textContent = null
}
restart.addEventListener('click', restartAction)
