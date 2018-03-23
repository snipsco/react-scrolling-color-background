# react-scrolling-color-background
[![NPM version](https://badge.fury.io/js/react-scrolling-color-background.svg)](https://www.npmjs.com/package/react-scrolling-color-background)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/snipsco/react-scrolling-color-background/blob/master/LICENSE)

Background with color transitioning as you scroll,
declarative and easy to setup.

## Example
https://snipsco.github.io/react-scrolling-color-background/

Production usage of `react-scrolling-color-background`:
https://snips.ai/content/intro-to-ai

## Usage

```jsx
<ScrollingColorBackground
  selector='.js-color-stop[data-background-color]'
  colorDataAttribute='data-background-color'
  initialRgb='rgb(0, 0, 0)'
/>
...
<section
  data-background-color='rgb(32, 202, 172)'
  className='js-color-stop'
>Some content</section
...
<section
  data-background-color='rgb(60, 191, 246)'
  className='js-color-stop'
/>Some other content</section
```

## Component properties

| Property | Type | Description
:---|:---|:---
| `selector` | string | Css Selector, matching elements expected to have background-color data attribute |
| `colorDataAttribute` | string | data attribute name, where value should be rgb string |
| `initialRgb` | string | rgb string, to use for first render, before any scrolling has occured |
| `className` | string | optional |
| `style` | string | optional, defaults to fixed fullscreen styles |

## Other libraries
At the time we wrote this library (before it was open sourced) there was no
other open source alternative doing what we needed, but by now there is one
alternative (that we have seen), although with a different api:
https://github.com/mkarabashev/react-scroll-background

## Contributing

Please see the [Contribution Guidelines](https://github.com/snipsco/react-scrolling-color-background/blob/master/CONTRIBUTING.md).

## Copyright
This component is provided by [Snips](https://snips.ai) as Open Source Software. See [LICENSE](https://github.com/snipsco/react-scrolling-color-background/blob/master/LICENSE) for more information.
