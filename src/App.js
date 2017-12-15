import React, { Component } from 'react'
import EditableRow from './EditableRow'
// import PropTypes from 'prop-types'

/* eslint-disable react/no-multi-comp */

// What state does my app need/have?
// When does it change?
//
const baseUrl = 'http://mutably.herokuapp.com/books/'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      books: [],
      loading: true,
    }

    this.updateElement = this.updateElement.bind(this)
    this.deleteElement = this.deleteElement.bind(this)
  }

  componentDidMount() {
    this.fetchAllElements()
  }

  fetchAllElements() {
    return fetch('http://mutably.herokuapp.com/books')
      .then(response => response.json())
      .then((data) => {
        this.setState({
          books: data.books,
          loading: false,
        })
      })
      .catch((err) => {
        console.log('Error during fetch GET request', err)
        this.setState({
          loading: false,
        })
      })
  }

  updateElement(book) {
    const {
      _id, title, author, image,
    } = book

    return fetch(`${baseUrl}${_id}`, {
      method: 'PUT',
      body: JSON.stringify({
        title: title,
        author: author,
        image: image,
      }),
      headers: { 'Content-Type': 'application/json' },
    }).then(console.log)
  }

  deleteElement() {
    return fetch()
    /// more here!
  }

  render() {
    const { books, loading } = this.state

    return (
      <div className="col-sm-8 col-sm-offset-2">
        <nav className="navbar navbar-default">
          <a className="navbar-brand" href="/">
            Mutably Front-end
          </a>
        </nav>
        <div className="panel panel-default">
          <div className="panel-heading">Books!</div>
          {loading ? <div>Loading...</div> : ''}
          <ul className="list-group">
            {books.map(book => (
              <li className="list-group-item" key={book._id}>
                <EditableRow
                  title={book.title}
                  author={book.author}
                  imageUrl={book.image}
                  bookId={book._id}
                  handleSave={this.updateElement}
                  handleDelete={this.deleteElement}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default App
