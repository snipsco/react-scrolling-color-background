'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lodash = require('lodash.throttle');

var _lodash2 = _interopRequireDefault(_lodash);

var _chromaJs = require('chroma-js');

var _chromaJs2 = _interopRequireDefault(_chromaJs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ScrollingColorBackground = function (_Component) {
  _inherits(ScrollingColorBackground, _Component);

  function ScrollingColorBackground(props) {
    _classCallCheck(this, ScrollingColorBackground);

    var _this = _possibleConstructorReturn(this, (ScrollingColorBackground.__proto__ || Object.getPrototypeOf(ScrollingColorBackground)).call(this));

    _this.state = { rgbString: _this.props.initialRgb };
    _this._handleScroll = _this._handleScroll.bind(_this);
    return _this;
  }

  _createClass(ScrollingColorBackground, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          selector = _props.selector,
          colorDataAttribute = _props.colorDataAttribute;

      this._colorPositions = [].concat(_toConsumableArray(document.querySelectorAll(selector))).map(function (el) {
        return {
          rgbString: el.getAttribute(colorDataAttribute),
          startY: el.offsetTop
        };
      });
      this._throttledScroll = (0, _lodash2.default)(this._handleScroll, 60);
      window.addEventListener('scroll', this._throttledScroll);
      // in case user was scrolled already, do one update to get right background color
      this._handleScroll();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('scroll', this._throttledScroll);
    }
  }, {
    key: '_handleScroll',
    value: function _handleScroll() {
      var yOffset = window.pageYOffset;

      // clamp nextIndex between 1 and the highest index in this._colorPositions
      var nrItems = this._colorPositions.length;
      var nextIndex = this._colorPositions.findIndex(function (_ref) {
        var startY = _ref.startY;
        return startY > yOffset;
      });
      if (nextIndex === -1) {
        // NOTE: if we scrolled past the last one; keep the color of the last one
        nextIndex = this._nextIndex === nrItems - 1 ? nrItems - 1 : 1;
      } else if (nextIndex === 0) {
        nextIndex = 1;
      }
      // save for checking next time
      this._nextIndex = nextIndex;

      var first = this._colorPositions[nextIndex - 1];
      var next = this._colorPositions[nextIndex];
      var distanceBetweenCovered = Math.max(0, Math.min(1, (yOffset - first.startY) / (next.startY - first.startY)));

      var _chroma$mix$_rgb = _slicedToArray(_chromaJs2.default.mix(first.rgbString, next.rgbString, distanceBetweenCovered)._rgb, 3),
          r = _chroma$mix$_rgb[0],
          g = _chroma$mix$_rgb[1],
          b = _chroma$mix$_rgb[2];

      var rgbString = 'rgb(' + Math.round(r) + ',' + Math.round(g) + ',' + Math.round(b) + ')';

      if (rgbString !== this.state.rgbString) {
        this.setState({ rgbString: rgbString });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          className = _state.className,
          rgbString = _state.rgbString,
          style = _state.style;

      return _react2.default.createElement('section', {
        style: _extends({}, style, {
          backgroundColor: rgbString
        }),
        className: className
      });
    }
  }]);

  return ScrollingColorBackground;
}(_react.Component);

ScrollingColorBackground.propTypes = {
  className: _propTypes2.default.string,
  style: _propTypes2.default.object.isRequired,
  initialRgb: _propTypes2.default.string.isRequired,
  selector: _propTypes2.default.string.isRequired,
  colorDataAttribute: _propTypes2.default.string.isRequired
};

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
};

exports.default = ScrollingColorBackground;