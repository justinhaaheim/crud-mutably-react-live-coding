import React, { Component } from 'react';

class App extends Component {

  render() {
    return (

      <div class="col-sm-8 col-sm-offset-2">
        <nav class="navbar navbar-default">
          <a class="navbar-brand" href="/">Mutably Front-end</a>
        </nav>
        <div class="panel panel-default">
          <div class="panel-heading">Books!</div>
          <ul class="list-group">
          </ul>
        </div>
      </div>

    );
  }
}

export default App;
