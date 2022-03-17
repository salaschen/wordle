// import { feedback } from './helper2'
const feedback = require('./helper2')

let target = 'MOVIE'
let guess = 'WATCH'
let result = null; 
result = feedback(target, guess)
console.log('result: ', result, ' expect: "....."')

guess = 'PRIZE'
result = feedback(target, guess)
console.log('result: ', result.join(''), ' expect: "..y.g"')

guess = 'BIBLE'
result = feedback(target, guess)
console.log('result: ', result.join(''), ' expect: ".y..g"')

guess = 'MOVIE'
result = feedback(target, guess)
console.log('result: ', result.join(''), ' expect: "ggggg"')



