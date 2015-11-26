'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HandwritingInput = undefined;
exports.input = input;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _HandwritingInput = require('./HandwritingInput');

var _HandwritingInput2 = _interopRequireDefault(_HandwritingInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HandwritingInput = exports.HandwritingInput = _HandwritingInput2.default;

function input(config) {
  _reactDom2.default.render(_react2.default.createElement(_HandwritingInput2.default, config), config.node);
}