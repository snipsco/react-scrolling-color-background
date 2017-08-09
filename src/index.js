import React, { Component } from 'react'
import PropTypes from 'prop-types'
import throttle from 'lodash.throttle'
import chroma from 'chroma-js'

class ScrollingColorBackground extends Component {
  constructor(props) {
    super()
    this.state = { rgbString: props.initialRgb }
    this._handleScroll = this._handleScroll.bind(this)
  }
  componentDidMount() {
    const { selector, colorDataAttribute } = this.props
    this._colorPositions = [...document.querySelectorAll(selector)].map(el => {
      return {
        rgbString: el.getAttribute(colorDataAttribute),
        startY: el.offsetTop
      }
    })
    this._throttledScroll = throttle(this._handleScroll, 60)
    window.addEventListener('scroll', this._throttledScroll)
    // in case user was scrolled already, do one update to get right background color
    this._handleScroll()
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this._throttledScroll)
  }
  _handleScroll() {
    const yOffset = window.pageYOffset

    // clamp nextIndex between 1 and the highest index in this._colorPositions
    const nrItems = this._colorPositions.length
    let nextIndex = this._colorPositions.findIndex(
      ({ startY }) => startY > yOffset
    )
    if (nextIndex === -1) {
      // NOTE: if we scrolled past the last one; keep the color of the last one
      nextIndex = this._nextIndex === nrItems - 1 ? nrItems - 1 : 1
    } else if (nextIndex === 0) {
      nextIndex = 1
    }
    // save for checking next time
    this._nextIndex = nextIndex

    const first = this._colorPositions[nextIndex - 1]
    const next = this._colorPositions[nextIndex]
    const distanceBetweenCovered = Math.max(
      0,
      Math.min(1, (yOffset - first.startY) / (next.startY - first.startY))
    )

    const [r, g, b] = chroma.mix(
      first.rgbString,
      next.rgbString,
      distanceBetweenCovered
    )._rgb
    const rgbString = `rgb(${Math.round(r)},${Math.round(g)},${Math.round(b)})`

    if (rgbString !== this.state.rgbString) {
      this.setState({ rgbString })
    }
  }
  render() {
    const { className, rgbString } = this.state
    const { style } = this.props
    return (
      <section
        style={{
          ...style,
          backgroundColor: rgbString
        }}
        className={className}
      />
    )
  }
}

ScrollingColorBackground.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object.isRequired,
  initialRgb: PropTypes.string.isRequired,
  selector: PropTypes.string.isRequired,
  colorDataAttribute: PropTypes.string.isRequired
}

ScrollingColorBackground.defaultProps = {
  className: 'scrolling-color-background',
  style: {
    position: 'fixed',
    top: '0px',
    left: '0px',
    bottom: '0px',
    right: '0px'
  },
  initialRgb: 'rgb(0,0,0)',
  selector: '[data-background-color]',
  colorDataAttribute: 'data-background-color'
}

export default ScrollingColorBackground
