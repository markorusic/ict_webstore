export default (function() {

	// const $modals = $('.modal-mask')

	function _bindModalEvents() {

		const $modal = $('.modal-mask')

		const __closeModals = e => {
			e.preventDefault()
			$('body').css('overflow', 'auto')
			$modal.hide()
		}

		$modal.on('click', __closeModals)
		$modal.find('.fa-times').parent().on('click', __closeModals)
		$modal.find('.modal-wrapper').on('click', e => e.stopPropagation())
		
	}

	function _showModal(e, selector) {
		e.preventDefault()
		$(selector).show().css('display', 'flex')
		$('body').css('overflow', 'hidden')
		_bindModalEvents()
	}

	return {
		init(data) {
			data.forEach(el => $(el[0]).on('click', e => _showModal(e, el[1])))
		}
	}

})()