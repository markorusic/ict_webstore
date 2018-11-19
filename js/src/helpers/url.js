export default {
  params:
    window.location.search === ''
      ? {}
      : window.location.search
          .slice(1)
          .split('&')
          .reduce(
            (acc, curr) => ({
              ...acc,
              [curr.split('=')[0]]: curr.split('=')[1]
            }),
            {}
          ),
  getParamsString() {
    const str = Object.keys(this.params)
      .map(key => `${key}=${this.params[key]}`)
      .join('&')
    return str === '' ? str : `?${str}`
  },
  updateUrlParams(value) {
    window.history.pushState(
      '',
      '',
      window.location.pathname + this.getParamsString()
    )
  },
  getParam(param) {
    return this.params[param]
  },
  setParam(param, value) {
    this.params[param] = value
    this.updateUrlParams()
  },
  removeParam(param) {
    delete this.params[param]
    this.updateUrlParams()
  }
}
