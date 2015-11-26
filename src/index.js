import React from 'react';
import ReactDOM from 'react-dom';
import HandwritingInputImport from './HandwritingInput';

export const HandwritingInput = HandwritingInputImport;

export function input(config) {
  ReactDOM.render(<HandwritingInputImport {...config} />, config.node);
}
