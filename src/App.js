import React, { Component } from 'react';

/* eslint-disable react/no-multi-comp, react/prefer-stateless-function */

class EditableRow extends Component {
  // Implement a row with state for whether the row is in editable mode or not.
  // If it isn't editable, render the "edit" button and the title
  // If it IS editable, render the "save" button and the editable text field
  //
  // A hint: think about what functions/event handlers should be part of this
  // component and which functions should be _passed_ to this function as a
  // "prop". A common pattern in react is to keep all the ajax logic in one
  // place (App, in our case).
}

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      books: [],
      loading: false
    }
  }

  componentDidMount() {
    this.setState({
      loading: true
    })
    fetch('http://mutably.herokuapp.com/books')
      .then(response => response.json())
      .then((data) => {
        this.setState({
          books: data.books,
          loading: false
        })
      })
      .catch((err) => {
        console.log("Error during fetch GET request", err)
        this.setState({
          loading: false
        })
      })
  }

  render() {
    const { books, loading } = this.state

    return (
      <div className="col-sm-8 col-sm-offset-2">
        <nav className="navbar navbar-default">
          <a className="navbar-brand" href="/">Mutably Front-end</a>
        </nav>
        <div className="panel panel-default">
          <div className="panel-heading">Books!</div>
          {
            loading ? (
              <div>Loading...</div>
            ) : (
              ""
            )
          }
          <ul className="list-group">
            {
              books.map(book => (
                <li>
                  {book.title}&nbsp;
                  ({book.author})
                  <img src={book.image} style={{ width: "50px", height: "50px" }} />
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
