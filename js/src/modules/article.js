import cart from './cart'
import templates from './templates'
import url from './helpers/url'

export default (function() {
  //state
  let article = null

  //cahce DOM
  let $modal = null
  let $domElement = null
  let $root = null

  //private methods
  function _addToCart(article, $btn, event) {
    event.preventDefault()
    event.stopPropagation()

    cart.add(article)

    if ($btn) {
      $btn.tooltip('show')
    }
  }

  function _removeFromCart(articleId, event) {
    event.preventDefault()
    event.stopPropagation()
    cart.remove(articleId)
  }

  function _openLightBox(article, event) {
    if (event) {
      event.preventDefault()
    }

    $('body')
      .css('overflow', 'hidden')
      .append(templates.articleModal(article))

    $modal = $('#article-photo-modal')
    $modal.show()
    _bindModalEvents(article)

    url.setParam('articleId', article.id)
  }

  function _closeLightBox(event) {
    event.preventDefault()

    $modal.remove()
    $modal = null

    $('body').css('overflow-y', 'scroll')

    url.removeParam('articleId')
  }

  function _bindModalEvents(article) {
    //stop event propagation on all child elements(don't close modal on children click)
    $modal.children().on('click', event => event.stopPropagation())

    //closing events
    $modal.find('.fa-times').on('click', _closeLightBox)
    $modal.on('click', _closeLightBox)

    //add article to cart event
    $modal
      .find('.add-to-cart')
      .on('click', _addToCart.bind(this, article, $modal.find('.add-to-cart')))
  }

  //public methods
  return {
    init(article, type, $rootElement, num) {
      $root = $rootElement
      this.setArticle(article)
      this.render(type, num)
      $domElement = $root.children().last()
      this.bindEvents(article, type)
    },

    render(type, num) {
      let template = ''
      switch (type) {
        case 'box-view':
          template = templates.article(article)
          break

        case 'table-view':
          template = templates.articleTr(article, num)
          break

        case 'popover-table-view':
          template = templates.articleTrPopover(article, num)
          break

        default:
          throw new Error(`Invalid type: ${type}`)
          break
      }
      $root.append(template)
    },

    getArticle() {
      return article
    },

    setArticle(newArticle) {
      article = newArticle
    },

    showArticle(article) {
      _openLightBox(article)
    },

    bindEvents(article, type) {
      if (type == 'box-view') {
        $domElement.on('click', _openLightBox.bind(this, article))
        $domElement
          .find('.add-to-cart')
          .on(
            'click',
            _addToCart.bind(this, article, $domElement.find('.add-to-cart'))
          )
      } else if (type == 'table-view')
        $domElement
          .find('.remove-form-cart')
          .on('click', _removeFromCart.bind(this, article.id))
    }
  }
})()
