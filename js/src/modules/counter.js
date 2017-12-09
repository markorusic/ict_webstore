function getTimeRemaining(endtime) {
  let t = Date.parse(endtime) - Date.parse(new Date())
  let seconds = Math.floor((t / 1000) % 60)
  let minutes = Math.floor((t / 1000 / 60) % 60)
  let hours = Math.floor((t / (1000 * 60 * 60)) % 24)
  let days = Math.floor(t / (1000 * 60 * 60 * 24))
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  }
}

function initializeClock(rootElement) {
  let clock = $(rootElement)
  let daysSpan = clock.find('.days')
  let hoursSpan = clock.find('.hours')
  let minutesSpan = clock.find('.minutes')
  let secondsSpan = clock.find('.seconds')

  let endtime = new Date(Date.parse(new Date()) + 15 * 24 * 60 * 60 * 1000)

  function updateClock() {
    let t = getTimeRemaining(endtime)

    daysSpan.text(t.days)
    hoursSpan.text(('0' + t.hours).slice(-2))
    minutesSpan.text(('0' + t.minutes).slice(-2))
    secondsSpan.text(('0' + t.seconds).slice(-2))

    if (t.total <= 0) {
      clearInterval(timeinterval)
    }
  }

  updateClock()
  let timeinterval = setInterval(updateClock, 1000)
}

export default initializeClock