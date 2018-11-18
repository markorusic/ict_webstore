import modals from './modules/modals'
import initializeClock from './modules/counter'
import articles from './modules/articles'
import cart from './modules/cart'

const app = {
  init: () => {
    $(function() {
      var url = window.location.pathname
      var fileName = url.substring(url.lastIndexOf('/') + 1)

      $('a[href="' + fileName + '"]')
        .parent()
        .addClass('active')

      modals.init([
        ['#hero-share-store', '#share-store-modal'],
        ['.open-login-modal', '#login-modal'],
        ['.open-register-modal', '#register-modals']
      ])

      $('button')
        .not('.submit-cart')
        .on('click', e => e.preventDefault())

      if (url == '/' || url == '/index.php') {
        initializeClock('.shop-counter')
        articles.init()
      }

      cart.init()

      if (url == '/korpa.php') {
        cart.render()
        cart.initCacheOutForm()
      }
    })
  }
}

export default app
