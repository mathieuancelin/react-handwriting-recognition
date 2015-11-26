# react-handwriting-recognition

`react-handwriting-recognition` provides an input component with handwriting recognition provided by [MyScript](http://myscript.com/)

You can you it inside from a React component, or just use the pure Javascript API.

## Options

Passed as `props` of the React component or to the Javascript API

* `type`: React.PropTypes.string
* `language`: React.PropTypes.string
* `protocol`: React.PropTypes.string
* `host`: React.PropTypes.string
* `timeout`: React.PropTypes.number
* `minWidth`: React.PropTypes.string
* `minHeight`: React.PropTypes.string
* `width`: React.PropTypes.string
* `height`: React.PropTypes.string
* `applicationKey`: React.PropTypes.string.isRequired
* `hmacKey`: React.PropTypes.string.isRequired
* `onError`: React.PropTypes.func
* `onChange`: React.PropTypes.func
* `onInit`: React.PropTypes.func
* `onShutdown`: React.PropTypes.func

See the documentation of the MyScript javascript library for more details [here](http://doc.myscript.com/MyScriptCloud/3.0.0/myscript-web.html)

## Usage as a React component

```javascript
import React from 'react';

export default React.createClass({
  getInitialState() {
    return {
      recognized: '',
      error: undefined,
    };
  },
  clear() {
    this.controls.clear();
  },
  inputChanged(data, label) {
    this.setState({ recognized: label });
  },
  displayError(error) {
    this.setState({ error });
  },
  render() {
    return (
      <div style={{ marginBottom: '10px' }}>
        {
          this.state.error ?
          <span className="label label-danger">Last error : {this.state.error}</span> :
          null
        }
        <button type="button" onClick={this.clear}>Clear</button>
        <input type="text" style="width: 340px; font-size: 18px"></input>
        <HandwritingInput
          applicationKey="xxxxx-xxxxx" hmacKey="xxxxx-xxxxx"
          protocol="WebSocket"
          onChange={this.inputChanged} onError={this.displayError}
          onInit={(controls) => this.controls = controls} />
      </div>
    );
  },
});
```

## Usage from Javascript

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Handwriting Recognition</title>
    <link rel="stylesheet" href="./index.css"/>
  </head>
  <body>
    <div style="margin-bottom: 10px">
      <button id="delete" type="button">Delete</button>
      <input type="text" id="recognized" style="width: 340px; font-size: 18px"></input>
    </div>
    <div id="app"></div>
    <script src="/dist/react-handwriting-recognition.js"></script>
    <script>
      (function() {

        var inputControls;
        var input = document.getElementById('recognized');
        var deleteButton = document.getElementById('delete');

        function clearHandwritingInput(e) {
          e.preventDefault();
          inputControls.clear();
        }

        HandwritingRecognition.input({
          node: document.getElementById('app'), // where to render the handwriting recognition input
          applicationKey: 'xxxxx-xxxxx',
          hmacKey: 'xxxxx-xxxxx',
          protocol: 'WebSocket',
          onChange: function(data, label) {
            input.value = label;
          },
          onInit: function(controls) {
            inputControls = controls;
            deleteButton.addEventListener('click', clearHandwritingInput);
          },
          onShutdown: function(controls) {
            deleteButton.removeEventListener('click', clearHandwritingInput);
          }
        });
      })();
    </script>
  </body>
</html>
```
