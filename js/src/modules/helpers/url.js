export default (function() {

	let params = null


	//parse url get parameters to array of js key: value objects
	function _parseUrl() {
		params = location.search == ""? [] :
				location.search.slice(1).split('&').map(e => ({key: e.split('=')[0], value: e.split('=')[1]}))
	}

	//parse js array to query string and push state to it's value
	function _createQueryString() {
		return (params.length > 0? '?' : '') + params.map(e => e.key + '=' + e.value).join('&')
	}

	function _updateUrl() {
		window.history.pushState('', '', location.pathname + _createQueryString())
	}

	return {

		getParam(str) {
			_parseUrl()

			let param = params.find(item => item.key == str)
        	return param? param.value : null
		},

		setParam(param, value) {			
			_parseUrl()

			let isFound = false

			//look for param, if found update, if not create new
			params = params.map(e => {
				if(e.key == param){
					e.value = value
					isFound = true
				}
				return e
			})

			if(!isFound)
				params.push({ key: param, value: value })

			_updateUrl()			
		},

		removeParam(str) {
			_parseUrl()

			params = params.filter(item => item.key != str)

			_updateUrl()
		}
	}	

})()