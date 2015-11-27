'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _myscript = require('./ext/myscript.min');

var _myscript2 = _interopRequireDefault(_myscript);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import Q from 'q';
// Expose things
// window.Q = Q;
// require('handjs');
// require('../ext-libs/core-min');
// require('../ext-libs/x64-core-min');
// require('../ext-libs/sha512-min');
// require('../ext-libs/hmac-min');
// require('../ext-libs/myscript.min');

// TODO : tweak css
// TODO : on resize

exports.default = _react2.default.createClass({
  displayName: 'HandwritingInput',

  propTypes: {
    type: _react2.default.PropTypes.string,
    language: _react2.default.PropTypes.string,
    protocol: _react2.default.PropTypes.string,
    host: _react2.default.PropTypes.string,
    timeout: _react2.default.PropTypes.number,
    minWidth: _react2.default.PropTypes.string,
    minHeight: _react2.default.PropTypes.string,
    width: _react2.default.PropTypes.string,
    height: _react2.default.PropTypes.string,
    applicationKey: _react2.default.PropTypes.string.isRequired,
    hmacKey: _react2.default.PropTypes.string.isRequired,
    onError: _react2.default.PropTypes.func,
    onChange: _react2.default.PropTypes.func,
    onInit: _react2.default.PropTypes.func,
    onShutdown: _react2.default.PropTypes.func
  },
  getDefaultProps: function getDefaultProps() {
    return {
      type: 'TEXT',
      language: 'en_US',
      protocol: 'REST',
      host: 'cloud.myscript.com',
      timeout: 2000,
      minWidth: '400px',
      minHeight: '300px',
      width: '100%',
      height: '100%',
      onError: function onError() {
        return {};
      },
      onChange: function onChange() {
        return {};
      },
      onInit: function onInit() {
        return {};
      },
      onShutdown: function onShutdown() {
        return {};
      }
    };
  },
  componentDidMount: function componentDidMount() {
    var _this = this;

    var configOptions = _extends({}, this.props);
    delete configOptions.width;
    delete configOptions.height;
    delete configOptions.onError;
    delete configOptions.onChange;
    this.inkPaper = new _myscript2.default.InkPaper(this.handwritingInputArea, configOptions, function (data, err) {
      if (data) {
        _this.props.onChange(data, data.result.textSegmentResult.candidates.length > 0 ? data.result.textSegmentResult.candidates[0].label : undefined);
      }
      if (err) {
        _this.props.onError(err);
      }
    });
    this.props.onInit({ inkPaper: this.inkPaper, clear: this.delete, undo: this.undo, redo: this.redo });
  },
  componentWillUnmount: function componentWillUnmount() {
    this.props.onShutdown({ inkPaper: this.inkPaper, clear: this.delete, undo: this.undo, redo: this.redo });
  },
  delete: function _delete() {
    this.inkPaper.clear();
    this.props.onChange({}, '');
  },
  undo: function undo() {
    this.inkPaper.undo();
  },
  redo: function redo() {
    this.inkPaper.redo();
  },
  render: function render() {
    var _this2 = this;

    var style = {
      height: this.props.height,
      width: this.props.width,
      minHeight: this.props.minHeight,
      minWidth: this.props.minWidth
    };
    return _react2.default.createElement('div', { ref: function ref(c) {
        return _this2.handwritingInputArea = c;
      }, style: style });
  }
});