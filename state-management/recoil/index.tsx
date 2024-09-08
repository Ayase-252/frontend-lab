import React from 'react'
import ReactDOM from 'react-dom'
import { RecoilRoot, atom, useRecoilState, useRecoilValue, selector } from 'recoil'

const textState = atom({
  key: 'textState',
  default: ''
})

const charCountState = selector({
  key: 'charCountState',
  get: ({get}) => {
    const text = get(textState)
    return text.length
  }
})

const CharacterCount = () => {
  const count = useRecoilValue(charCountState)
  return <> Character Count: {count}</>
}

const TextInput = () => {
  const [text, setText] = useRecoilState(textState)
  const handleChange = (event) => {
    setText(event.target.value)
  }
  return <div>
    <input type="text" value={text} onChange={handleChange} />
    <br></br>
    Echo: {text}
  </div>
}

const App = () => {
  return <RecoilRoot><TextInput></TextInput><CharacterCount></CharacterCount></RecoilRoot>
}

ReactDOM.render(<App />, document.getElementById('app'))
