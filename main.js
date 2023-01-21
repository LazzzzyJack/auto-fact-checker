import './style.css'
import javascriptLogo from './javascript.svg'
import { setupCounter } from './counter.js'

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://github.com/LazzzzyJack/auto-fact-checker/tree/setup-node" target="_blank">
      Our GitHub repo
    </a>
  </div>
`

setupCounter(document.querySelector('#counter'))
