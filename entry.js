import './src/css/app'

import render from './src/js/geometry'

let str = "Hello world!"

document.getElementById("app").innerHTML = str

render(document.getElementById("canvas"))
