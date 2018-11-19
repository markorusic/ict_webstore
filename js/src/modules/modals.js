export default (function() {
  function _bindModalEvents() {
    const $modal = $('.modal-mask')

    const __closeModals = event => {
      event.preventDefault()
      $('body').css('overflow', 'auto')
      $modal.hide()
    }

    $modal.on('click', __closeModals)
    $modal
      .find('.fa-times')
      .parent()
      .on('click', __closeModals)
    $modal.find('.modal-wrapper').on('click', event => event.stopPropagation())
  }

  function _showModal(event, selector) {
    event.preventDefault()
    $(selector)
      .show()
      .css('display', 'flex')
    $('body').css('overflow', 'hidden')
    _bindModalEvents()
  }

  return {
    init(data) {
      data.forEach(el =>
        $(el[0]).on('click', event => _showModal(event, el[1]))
      )
    }
  }
})()
