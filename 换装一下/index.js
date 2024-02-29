const btn = document.querySelector('.btn')
const bg = document.querySelector('.bg')

let numArr = [...Array(10)].map((v, i) => i)
let chartArr = [...Array(6)].map((v, i) => String.fromCharCode(0x60 + i + 1))

btn.addEventListener('click', function () {
  let random_num = Math.floor(Math.random() * 10000000)
  let random_color = '#' + random_num.toString(16)
  bg.style.background = random_color
  const a = RegExp(/^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/)
})