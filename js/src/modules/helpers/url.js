export default (function() {
  let params = null

  //parse url get parameters to array of js key: value objects
  function _parseUrl() {
    params =
      location.search == ''
        ? []
        : location.search
            .slice(1)
            .split('&')
            .map(e => ({ key: e.split('=')[0], value: e.split('=')[1] }))
  }

  //parse js array to query string and push state to it's value
  function _createQueryString() {
    return (
      (params.length > 0 ? '?' : '') +
      params.map(({ key, value }) => key + '=' + value).join('&')
    )
  }

  function _updateUrl() {
    window.history.pushState('', '', location.pathname + _createQueryString())
  }

  return {
    getParam(str) {
      _parseUrl()
      const param = params.find(({ key }) => key === str)
      return param ? param.value : null
    },

    setParam(param, value) {
      _parseUrl()

      let isFound = false

      //look for param, if found update, if not create new
      params = params.map(currentParam => {
        if (currentParam.key === param) {
          currentParam.value = value
          isFound = true
        }
        return currentParam
      })

      if (!isFound) {
        params.push({ key: param, value })
      }

      _updateUrl()
    },

    removeParam(str) {
      _parseUrl()
      params = params.filter(({ key }) => key !== str)
      _updateUrl()
    }
  }
})()
