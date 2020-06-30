import '../css/a.css'
import '../css/b.css'

// import '@babel/polyfill'

const add = (a, b) => {
  return a + b
}

// 下一行eslint所有规则都失效（下一行不进行eslint检察）
// eslint-disable-next-line
console.log(add(2, 3))

const promise = new Promise(resolve => {
  setTimeout(()=>{
    console.log("promise")
    resolve()
  },1000)
})

console.log(promise)