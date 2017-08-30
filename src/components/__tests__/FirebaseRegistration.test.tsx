import * as React from "react"
import { Provider } from "react-redux"
import * as renderer from "react-test-renderer"
import { applyMiddleware, compose, createStore } from "redux"
import thunk from "redux-thunk"

import { firebaseActions } from "refire"
// createUser action is mocked in ../__mocks__/refire.ts
const { createUser } = firebaseActions

import FirebaseRegistration from "../FirebaseRegistration"

function createEmptyStore() {
  return compose(
    applyMiddleware(thunk)
  )(createStore)((state, action) => {
    return {
      firebase: {
        initialValuesReceived: true,
        errors: {
          createUser: null
        },
        processing: {
          createUser: false
        },
        completed: {
          createUser: false
        }
      }
    }
  })
}

describe("FirebaseRegistration", () => {
  it("update updates chosen field", () => {

    interface UsernameProps {
      username?: string,
      update?: (field: string) => (e) => void,
    }
    function Username({ username, update }: UsernameProps) {
      const changeUsername = (e) => {
        update("username")(e)
      }
      return (
        <div onClick={ changeUsername }>
          { username }
        </div>
      )
    }

    const UsernameComponent = FirebaseRegistration({
      fields: ["email", "password"],
    })(Username)

    let component = renderer.create(
      <Provider store={ createEmptyStore() }>
        <UsernameComponent />
      </Provider>
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()

    tree.props.onClick({currentTarget: {value: "test@test.com"}})

    tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("submit calls dispatch prop", () => {

    interface SubmitProps {
      dispatch?: () => void,
      submit?: (event: any) => void
    }
    function Submit({ submit }: SubmitProps) {
      return (
        <button onClick={ submit }>
          Submit
        </button>
      )
    }

    const SubmitComponent = FirebaseRegistration({})(Submit)

    let component = renderer.create(
      <Provider store={ createEmptyStore() }>
        <SubmitComponent />
      </Provider>
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()

    tree.props.onClick({ preventDefault() {} })
    expect(createUser.mock.calls.length).toBe(1)
  })

  it("validator functions properly")
  it("errors are generated")
  it("processing prop gets updated")
  it("completed prop gets updated")

})




