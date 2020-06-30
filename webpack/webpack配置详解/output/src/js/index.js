// import add from './add.js'


import('./add')
  .then(({ default: add }) => {
    console.log(add(3, 4))
  })