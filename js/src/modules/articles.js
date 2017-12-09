import url from './helpers/url'
import article from './article'
import mockUpData from './helpers/mockUpData'

export default (function() {
	//cache DOM
	const $root = $('.store-articles-list')
	const $sort = $root.find('ul li a')
	const $articles = $root.find('.articles-row')
	const $search = $root.find('.search-articles-by-name').find('input[type="text"]')

	let state = {
		items: [],
		itemsCopy: []
	}

	function _search(e) {
		state.items = state.itemsCopy.filter(item => item.name.toLowerCase().indexOf(e.target.value) != -1)
		_render()
	}

	function _getArticleData(type) {
		if(type == 'sve')
			return mockUpData.articles
		
		return mockUpData.articles.filter(e => e.categories.indexOf(type) != -1)
	}	

	function _render() {
		$articles.html('')
		state.items.forEach(item => article.init(item, 'box-view', $articles))
	}

	function _bindEvents() {
		$sort.off()
		$sort.on('click', function(e){
			e.preventDefault()
			let filter = $(this).data().sort
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
		$sort.parent().find(`[data-sort='${filterType}']`).addClass('sb-active')

		//empty search input
		$search.val('')

		_render()
		_bindEvents()
	}

	//tell article module to show specific article if articleId get param is passed
	function _showArticleIfShould() {		
		let activeArticleId = url.getParam('articleId')

		if(activeArticleId) {
			let activeArticle = state.items.find(item => item.id == activeArticleId)

			if(activeArticle)
				article.showArticle(activeArticle)

			else {
				alert('Proizvod nije pronadjen!')
				url.removeParam('articleId')
			}
		}

		else
			url.removeParam('articleId')
	}

	return {
		init() {
			_init()
			_showArticleIfShould()
			$search.on('keyup', _search)
		}
	}
})()