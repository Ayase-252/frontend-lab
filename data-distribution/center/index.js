function fetchAnimeQuote() {
  return fetch('https://animechan.vercel.app/api/random')
    .then((resp) => resp.json())
}

setInterval(() => {
  fetchAnimeQuote().then((data) => {
    window.parent.postMessage({
      type: 'NEW_DATA',
      payload: data
    }, '*')
  })
}, 10000)
