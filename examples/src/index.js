import React from 'react'
import ReactDOM from 'react-dom'

import ScrollingColorBackground from '../../src/'

const darkPurpleRgb = 'rgb(101, 45, 172)'
const ceriseRgb = 'rgb(217, 38, 136)'
const pumpkinRgb = 'rgb(255, 102, 22)'
const cornRgb = 'rgb(254, 201, 64)'
const greenRgb = 'rgb(29, 191, 104)'
const tealRgb = 'rgb(32, 202, 172)'
const skyRgb = 'rgb(60, 191, 246)'
const blueRgb = 'rgb(10, 34, 236)'
const COLORS = [
  darkPurpleRgb,
  ceriseRgb,
  pumpkinRgb,
  cornRgb,
  greenRgb,
  tealRgb,
  skyRgb,
  blueRgb
]


ReactDOM.render(
  <main>
    <ScrollingColorBackground
      selector='.js-color-stop[data-background-color]'
      colorDataAttribute='data-background-color'
      initialRgb='rgb(0, 0, 0)'
    />
    {COLORS.map((rgbString, idx) => (
      <section
        key={idx}
        className='js-color-stop'
        data-background-color={rgbString}
        style={{height: '100vh'}}
      />
    ))}
  </main>,
  document.getElementById('react_div')
)
