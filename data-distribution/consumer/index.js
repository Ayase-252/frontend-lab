window.parent.addEventListener('message', (event) => {
  // security
  if(event.origin !== 'http://localhost:1234') {
    return
  }

  if(event.data.type === 'NEW_DATA') {
    const {payload} = event.data
    document.querySelector('#quote').innerHTML = `${payload.quote} - ${payload.character}`
  }
})
