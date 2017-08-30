import * as React from "react"
import { Provider } from "react-redux"
import * as renderer from "react-test-renderer"
import { applyMiddleware, compose, createStore } from "redux"
import thunk from "redux-thunk"

import { firebaseActions } from "refire"
// actions are mocked in ../__mocks__/refire.ts
const { clearWriteErrors, write } = firebaseActions

import FirebaseWrite from "../FirebaseWrite"

function createEmptyStore() {
  return compose(
    applyMiddleware(thunk)
  )(createStore)((state, action) => {
    return {
      firebase: {
        writes: {
          errors: {
            "": ["Error"]
          },
          processing: {}
        }
      }
    }
  })
}

describe("FirebaseWrite", () => {
  it("invokes write action with submit", () => {

    interface CommentProps {
      submit?: (value: any) => void
    }
    function Comment({ submit }: CommentProps) {
      const submitComment = () => submit("Test")
      return (
        <button onClick={ submitComment } />
      )
    }

    const CommentComponent = FirebaseWrite({
      method: "update",
      path: ""
    })(Comment)

    const component = renderer.create(
      <Provider store={ createEmptyStore() }>
        <CommentComponent />
      </Provider>
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()

    tree.props.onClick({})
    expect(write.mock.calls.length).toBe(1)
  })

  it("clears write error with clearErrors", () => {

    interface ErrorsProps {
      errors?: string[],
      clearErrors?: () => void
    }
    function Errors({ errors, clearErrors }: ErrorsProps) {
      return (
        <button onClick={ clearErrors }>
          { errors[0] }
        </button>
      )
    }

    const ErrorsComponent = FirebaseWrite({
      method: "update",
      path: ""
    })(Errors)

    const component = renderer.create(
      <Provider store={ createEmptyStore() }>
        <ErrorsComponent />
      </Provider>
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()

    tree.props.onClick({})
    expect(clearWriteErrors.mock.calls.length).toBe(1)
  })

  it("errors are generated")
  it("processing prop gets updated")

})
