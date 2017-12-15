import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import App, { EditableRow } from './App'

global.fetch = jest.fn()

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<EditableRow />, div)
})

test('EditableRow changes output when edit is clicked', () => {
  const component = renderer.create(<EditableRow
    title="Test Title"
    author="Test Author"
    bookId={1}
    imageUrl="http://facebook.github.io/jest/img/jest.svg"
  />)

  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()

  // manually trigger the callback
  tree.props.toggleEditable()
  // re-rendering
  tree = component.toJSON()
  expect(tree).toMatchSnapshot()
  //
  // // manually trigger the callback
  // tree.toggleEditable()
  // // re-rendering
  // tree = component.toJSON()
  // expect(tree).toMatchSnapshot()
})
