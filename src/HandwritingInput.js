import React from 'react';
import MyScript from './ext/myscript.min';

// TODO : tweak css
// TODO : on resize

export default React.createClass({
  propTypes: {
    type: React.PropTypes.string,
    language: React.PropTypes.string,
    protocol: React.PropTypes.string,
    host: React.PropTypes.string,
    timeout: React.PropTypes.number,
    minWidth: React.PropTypes.string,
    minHeight: React.PropTypes.string,
    width: React.PropTypes.string,
    height: React.PropTypes.string,
    applicationKey: React.PropTypes.string.isRequired,
    hmacKey: React.PropTypes.string.isRequired,
    onError: React.PropTypes.func,
    onChange: React.PropTypes.func,
    onInit: React.PropTypes.func,
    onShutdown: React.PropTypes.func,
  },
  getDefaultProps() {
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
      onError: () => ({}),
      onChange: () => ({}),
      onInit: () => ({}),
      onShutdown: () => ({}),
    };
  },
  componentDidMount() {
    let configOptions = {...this.props};
    delete configOptions.width;
    delete configOptions.height;
    delete configOptions.onError;
    delete configOptions.onChange;
    this.inkPaper = new MyScript.InkPaper(this.handwritingInputArea, configOptions, (data, err) => {
      if (data) {
        this.props.onChange(data,
          data.result.textSegmentResult.candidates.length > 0 ? data.result.textSegmentResult.candidates[0].label : undefined);
      }
      if (err) {
        this.props.onError(err);
      }
    });
    this.props.onInit({ inkPaper: this.inkPaper, clear: this.delete, undo: this.undo, redo: this.redo });
  },
  componentWillUnmount() {
    this.props.onShutdown({ inkPaper: this.inkPaper, clear: this.delete, undo: this.undo, redo: this.redo });
  },
  delete() {
    this.inkPaper.clear();
    this.props.onChange({}, '');
  },
  undo() {
    this.inkPaper.undo();
  },
  redo() {
    this.inkPaper.redo();
  },
  render() {
    const style = {
      height: this.props.height,
      width: this.props.width,
      minHeight: this.props.minHeight,
      minWidth: this.props.minWidth,
    };
    return (
      <div ref={(c) => this.handwritingInputArea = c} style={style}></div>
    );
  },
});
