import React from 'react';
import ReactDOM from 'react-dom';
import HandwritingInputImport from './HandwritingInput';

// React component
export const HandwritingInput = HandwritingInputImport;

// Javascript API
export function input(config) {
  ReactDOM.render(<HandwritingInputImport {...config} />, config.node);
}
