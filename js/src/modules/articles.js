import url from './helpers/url'
import article from './article'
import mockUpData from './helpers/mockUpData'

export default (function() {
  //cache DOM
  const $root = $('.store-articles-list')
  const $sort = $root.find('ul li a')
  const $articles = $root.find('.articles-row')
  const $search = $root
    .find('.search-articles-by-name')
    .find('input[type="text"]')

  const state = {
    items: [],
    itemsCopy: []
  }

  function _search(event) {
    const { value } = event.target
    state.items = state.itemsCopy.filter(({ name }) =>
      name.toLowerCase().includes(value)
    )
    _render()
  }

  function _getArticleData(type) {
    const { articles } = mockUpData
    if (type === 'sve') {
      return articles
    }
    return articles.filter(({ categories }) => categories.includes(type))
  }

  function _render() {
    $articles.html('')
    state.items.forEach(item => article.init(item, 'box-view', $articles))
  }

  function _bindEvents() {
    $sort.off()
    $sort.on('click', function(event) {
      event.preventDefault()
      const filter = $(event.target).data().sort
      url.setParam('filter', filter)
      _init()
    })
  }

  function _init() {
    let filterType = url.getParam('filter') || 'cipele'
    state.items = _getArticleData(filterType)
    state.itemsCopy = [...state.items]

    //set active tab
    $sort.removeClass('sb-active')
    $sort
      .parent()
      .find(`[data-sort='${filterType}']`)
      .addClass('sb-active')

    //empty search input
    $search.val('')

    _render()
    _bindEvents()
  }

  //tell article module to show specific article if articleId get param is passed
  function _showActiveArticle() {
    const activeArticleId = Number(url.getParam('articleId'))

    if (activeArticleId) {
      const activeArticle = state.items.find(({ id }) => id === activeArticleId)
      if (activeArticle) {
        return article.showArticle(activeArticle)
      }
      alert('Proizvod nije pronadjen!')
      return url.removeParam('articleId')
    }
    return url.removeParam('articleId')
  }

  return {
    init() {
      _init()
      _showActiveArticle()
      $search.on('keyup', _search)
    }
  }
})()
