import React, { Component } from 'react';

/* eslint-disable react/no-multi-comp */

// What state does my app need/have?
// When does it change?

class EditableRow extends Component {
  constructor(props) {
    super(props)

    this.state = {
      editable: false,
      title: this.props.title,
      author: this.props.author,
    }

    this.toggleEditable = this.toggleEditable.bind(this)
    this.handleInput = this.handleInput.bind(this)
  }

  toggleEditable() {
    const { bookId } = this.props

    if (this.state.editable) {
      this.setState({ editable: false })

      // TODO:
      // It's considered a React best practice to have your components be either
      // *presentational* components (whose sole job is to present something)
      // and *container* components (whose job is to handle the
      // logic/fetching/etc and pass the right data to the right components).
      // Given that, it'd be a good idea to refactor this code so that the PUT
      // request that's happening here actually is written in the <App />
      // component.
      //
      // How do we do that? It's common to pass *handler* functions down to
      // presentational components from container components through props!
      fetch(`http://mutably.herokuapp.com/books/${bookId}`, {
        method: 'PUT',
        body: JSON.stringify({
          title: this.state.title,
          author: this.state.author,
          image: this.props.imageUrl
        }),
        headers: { 'Content-Type': 'application/json' }
      })
        .then(console.log)

      return
    }
    this.setState({ editable: true })
  }

  handleInput(e) {
    const name = e.target.name
    console.log(name)
    this.setState({
      [name]: e.target.value
    })
  }

  render() {
    const { imageUrl } = this.props
    const { editable, title, author } = this.state

    return (
      <div>
        { editable ? (
          <div>
            <button className="btn btn-primary" onClick={this.toggleEditable}>Save</button>
            <input value={title} className="form-control" name="title" onChange={this.handleInput} />
            <input value={author} className="form-control" name="author" onChange={this.handleInput} />
          </div>
        ) : (
          <div>
            <button className="btn btn-success" onClick={this.toggleEditable}>Edit</button>
            <span>{title}&nbsp;({author})</span>
          </div>
        )}
        <img src={imageUrl} style={{ width: "50px", height: "50px" }} />
      </div>
    )
  }
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
                <li className="list-group-item" key={book._id}>
                  <EditableRow
                    title={book.title}
                    author={book.author}
                    imageUrl={book.image}
                    bookId={book._id}
                  />
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    )
  }
}

export default App
