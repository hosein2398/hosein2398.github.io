import { useState, useEffect } from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { shadesOfPurple } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import Textra from 'react-textra'
import logo from './logo.svg'
import './App.css'

function App () {
  const [effect, setEffect] = useState('rightLeft')
  console.log(effect)
  const code = `<Textra
  data={['one', 'two', 'three']}
  effect='flip'
  duration={4000}
  stopDuration={2000}
  />`
  return (
    <div className="App">
      {/* <header className="App-header"> */}
        <div className="flex">
          <div className="flex-item">
            <div>
              <h1 className="title">
                react-textra
              </h1>
              <p className="detail">
                  Slide your text in React application easily
              </p>
              <div className='code-wrapper'>
              <SyntaxHighlighter language="jsx" style={shadesOfPurple}>
                {code}
              </SyntaxHighlighter>
              </div>
            <div>
              <a href="https://github.com/hosein2398/react-textra" className="button">Go to docs</a>
            </div>
            </div>
          </div>
          <div className="flex-item">
            <div>
              <div className="textra-wrapper">
                <Textra effect={effect} data={['Swell', 'Becoming', 'Nifty', 'Pleasant', 'Kind', 'Charming', 'Winsome', 'Simpatico', 'Favorable']}/>
              </div>
              <div className="select-wrapper">
              <div>
                <span className="chooseText">
                  Choose an effect:
                </span>
                  <select className="select" onChange={e => { console.log(e.target.value); setEffect(e.target.value) }}>
                    <option value='rightLeft'>
                      rightLeft
                    </option>
                    <option value='leftRight'>
                      leftRight
                    </option>
                    <option value='topDown'>
                      topDown
                    </option>
                    <option value='downTop'>
                      downTop
                    </option>
                    <option value='flash'>
                      flash
                    </option>
                    <option value='flip'>
                      flip
                    </option>
                    <option value='scale'>
                      scale
                    </option>
                    <option value='press'>
                      press
                    </option>
                  </select>
              </div>
            </div>

            </div>
          </div>
        </div>
      {/* </header> */}
    </div>
  )
}

export default App
