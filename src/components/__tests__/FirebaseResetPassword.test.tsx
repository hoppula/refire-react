import * as React from "react"
import { Provider } from "react-redux"
import * as renderer from "react-test-renderer"
import { applyMiddleware, compose, createStore } from "redux"
import thunk from "redux-thunk"

import { firebaseActions } from "refire"
// resetPassword action is mocked in ../__mocks__/refire.ts
const { resetPassword } = firebaseActions

import FirebaseResetPassword from "../FirebaseResetPassword"

function createEmptyStore() {
  return compose(
    applyMiddleware(thunk)
  )(createStore)((state, action) => {
    return {
      firebase: {
        initialValuesReceived: true,
        errors: {
          resetPassword: null
        },
        processing: {
          resetPassword: false
        },
        completed: {
          resetPassword: false
        }
      }
    }
  })
}

describe("FirebaseResetPassword", () => {
  it("updateEmail updates email", () => {

    interface EmailProps {
      email?: string,
      updateEmail?: (event: any) => void,
    }
    function Email({ email, updateEmail }: EmailProps) {
      return (
        <div onClick={ updateEmail }>
          { email }
        </div>
      )
    }

    const ResetPasswordComponent = FirebaseResetPassword({})(Email)

    let component = renderer.create(
      <Provider store={ createEmptyStore() }>
        <ResetPasswordComponent />
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

    const SubmitComponent = FirebaseResetPassword({})(Submit)

    let component = renderer.create(
      <Provider store={ createEmptyStore() }>
        <SubmitComponent />
      </Provider>
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()

    tree.props.onClick({ preventDefault() {} })
    expect(resetPassword.mock.calls.length).toBe(1)
  })

  it("validator functions properly")
  it("errors are generated")
  it("processing prop gets updated")
  it("completed prop gets updated")

})
