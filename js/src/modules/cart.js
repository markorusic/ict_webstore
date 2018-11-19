import article from './article'

const sum = [(a, b) => a + b, 0]

export default (function() {
  //main state
  let items = []
  let isNotificationShowing = false
  let isPopoverCartShowing = false

  //cache DOM
  const $articles = $('.cart tbody')
  const $total = $('.total-price')
  const $navItemsCount = $('.cart-items-count')
  const $popoverCart = $('.popover-cart')
  const $nofitication = $('.cart-notification')
  const $cacheOutFrom = $('.cart').find('.cache-out')

  // sync local state with localstorage
  function _syncWithLocalStorage() {
    localStorage.setItem(
      'markorusic_webstore_cart_items',
      JSON.stringify(items)
    )
  }

  //remove all items from cart
  function _emtpyCart() {
    items = []
    _syncWithLocalStorage()
  }

  function _getTotalPrice() {
    return items.map(({ count, price }) => count * price).reduce(...sum)
  }

  function _getTotalCount() {
    return items.map(({ count }) => count).reduce(...sum)
  }

  //render item count on navigation
  function _renderCount() {
    $navItemsCount.text(`(${_getTotalCount()})`)
  }

  //render total price of cart items
  function _renderTotalPrice() {
    $total.text(_getTotalPrice())
  }

  //render full cart
  function _renderCart() {
    $articles.html('')
    items.forEach((item, i) =>
      article.init(item, 'table-view', $articles, i + 1)
    )
    _renderTotalPrice()
  }

  //render cart popover
  function _renderPopoverCart() {
    isPopoverCartShowing = true

    $popoverCart.find('tbody').html('')

    items.slice(0, 4).forEach((item, i) => {
      article.init(
        item,
        'popover-table-view',
        $popoverCart.find('tbody'),
        i + 1
      )
    })

    if (items.length > 4)
      $popoverCart
        .find('tbody')
        .append(
          `<tr><td class="mt" colspan="4"><a href="/korpa.php" style="color: #fcca39; font-size: 14px;">Pogledaj sve...</a></td><tr>`
        )

    _renderTotalPrice()

    $popoverCart.show('fast')
    _bindClosingEvent($popoverCart, 'popover-cart')
  }

  //render nofitication when user adds something to cart
  function _notify() {
    if (!isPopoverCartShowing) {
      $nofitication.show('fast')
      $nofitication
        .find('.show-popover-cart')
        .off()
        .on('click', event => {
          event.preventDefault()
          $nofitication.fadeOut(_renderPopoverCart)
        })
      _bindClosingEvent($nofitication, 'notification')
      isNotificationShowing = true
    } else {
      _renderPopoverCart()
    }
  }

  //bind closing event on passed element
  function _bindClosingEvent(el, type) {
    $(el)
      .find('.close-notification')
      .off()
      .on('click', function(e) {
        e.preventDefault()
        $(el).hide('fast')

        if (type === 'notification') isNotificationShowing = false
        if (type === 'popover-cart') isPopoverCartShowing = false
      })
  }

  function _submitOrder(e) {
    e.preventDefault()
    if (items.length > 0) {
      $(this)
        .find('button')
        .css({
          color: 'black',
          fontSize: '10px'
        })
        .text('Molimo Vas da sacekate...')

      setTimeout(() => {
        $('#main-row').html(`
					<div class="col-12 text-center">
						<h3 class="text-center font-25">Vasa narudzbina je poslata, uskoro cete dobiti obavestenje!</h3>
						<p>(Ovo je samo demo sajt, narudzbina nije poslata nigde.)</p>
					</div>
				`)
        _emtpyCart()
        _renderCount()
      }, 1500)
    }
  }

  // triggers on cart page if cart is empty
  function _renderEmptyCart() {
    $('#main-row').html(`
			<div class="col-12">
				<h3 class="text-center font-25">Vasa korpa je prazna, <a href="/">ovde</a> mozete pogledati nase proizvode.</h3>
			</div>
		`)
  }

  return {
    init() {
      let localStorageCart = JSON.parse(
        localStorage.getItem('markorusic_webstore_cart_items')
      )
      if (localStorageCart) items = localStorageCart
      _renderCount()
    },

    initCacheOutForm() {
      if (items.length == 0) _renderEmptyCart()
      else $cacheOutFrom.on('submit', _submitOrder)
    },

    add(item) {
      let cartItem = items.find(el => el.id == item.id)
      if (!cartItem) {
        items.push({ ...item, count: 1 })
      } else {
        cartItem.count++
        items.map(el => (el.id == item.id ? cartItem : el))
      }
      _renderCount()
      _notify()
      _syncWithLocalStorage()
    },

    remove(id) {
      items = items.filter(e => e.id != id)
      _renderCount()

      if (items.length == 0) _renderEmptyCart()
      else this.render()

      _syncWithLocalStorage()
    },

    render() {
      _renderCart()
    }
  }
})()
