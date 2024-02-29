

const grid = document.querySelector('.grid')
const player = document.querySelector('.player')
const result = document.querySelector('.result')
const gridList = [...Array(49)]

const player1 = 'player1'
const player2 = 'player2'
let currentPlayer = player1
player.textContent = currentPlayer
const player1List = []
const player2List = []
const clickedList = []

function drawGrid(){
  gridList.forEach((_,index)=>{
    const div = document.createElement('div')
    div.setAttribute('dataIndex',index)
    div.addEventListener('click',clickEvent)
    grid.appendChild(div)
  })
}

drawGrid()

function clickCheck(currentIndex){
  /**
   * currentIndex >= 42，判断是否已经点击
   * currentIndex < 42, 判断是否在列表-7和点击,
   */
  const isClicked = clickedList.some(item=>currentIndex==item)
  const isOverTheClickedNum = clickedList.some(item=>currentIndex==item-7)
  if((currentIndex >= 42 && !isClicked)||(currentIndex < 42 && isOverTheClickedNum&&!isClicked)){
    clickedList.push(currentIndex)
    return true
  }else {
    alert('这里还不可以点击哦')
    return false
  }
}
function checkList(list,player){
  list.sort((a,b)=>a-b)
  newList = []
  list.forEach((item,index)=>{
    if(index<list.length-1){
      newList.push(Math.abs(item-list[index+1]))
    }
  })
  rowSameNumber = newList.reduce((pre,cur)=> cur == 1?pre+1:pre ,0)
  colSameNumber = newList.reduce((pre,cur)=> cur == 7?pre+1:pre ,0)
  if(rowSameNumber==3 || colSameNumber==3){
    result.textContent = `${player} wins`
  }
}

function clickEvent(){
  currentIndex = this.getAttribute('dataIndex')
  if(clickCheck(currentIndex)){
    // currentPlayer = currentPlayer == player1 ? player2 : player1
    grid.children[currentIndex].classList.add(currentPlayer)
    if(currentPlayer == player1 ){
      player1List.push(currentIndex)
    }else{
      player2List.push(currentIndex)
    }
    
    currentPlayer = currentPlayer == player1 ? player2 : player1
    player.textContent = currentPlayer
    
    checkList(player1List,player1)
    checkList(player2List,player2)
  }
}

