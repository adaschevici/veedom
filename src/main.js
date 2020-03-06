import createElement from './vdom/createElement'
import render from './vdom/render'
import mount from './vdom/mount'
import diff from './vdom/diff'

const createVApp = count =>
  createElement('div', {
    attrs: {
      id: 'app',
      dataCount: count, // we use the count here
    },
    children: [
      'The current count is: ',
      String(count), // and here
      ...Array.from({ length: count }, () =>
        createElement('img', {
          attrs: {
            src:
              'https://image.shutterstock.com/image-illustration/fridge-character-stack-coins-isolated-260nw-1105560566.jpg',
          },
        })
      ),
    ],
  })

let vApp = createVApp(0)
const $app = render(vApp)
let $rootEl = mount($app, document.getElementById('app'))

setInterval(() => {
  const n = Math.floor(Math.random() * 10)
  const vNewApp = createVApp(n)
  const patch = diff(vApp, vNewApp)

  // we might replace the whole $rootEl,
  // so we want the patch will return the new $rootEl
  $rootEl = patch($rootEl)

  vApp = vNewApp
}, 1000)
