import * as React from "react"
import { Provider } from "react-redux"
import * as renderer from "react-test-renderer"
import { applyMiddleware, compose, createStore } from "redux"
import thunk from "redux-thunk"

import { firebaseActions } from "refire"
// passwordLogin action is mocked in ../__mocks__/refire.ts
const { passwordLogin } = firebaseActions

import FirebaseLogin from "../FirebaseLogin"

function createEmptyStore() {
  return compose(
    applyMiddleware(thunk)
  )(createStore)((state, action) => {
    return {
      firebase: {
        initialValuesReceived: true,
        errors: {
          login: null
        },
        processing: {
          login: false
        },
        completed: {
          login: false
        }
      }
    }
  })
}

describe("FirebaseLogin", () => {
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

    const LoginComponent = FirebaseLogin({})(Email)

    let component = renderer.create(
      <Provider store={ createEmptyStore() }>
        <LoginComponent />
      </Provider>
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()

    tree.props.onClick({currentTarget: {value: "test@test.com"}})

    tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })


  it("updatePassword updates password", () => {

    interface PasswordProps {
      password?: string,
      updatePassword?: (event: any) => void,
    }
    function Password({ password, updatePassword }: PasswordProps) {
      return (
        <div onClick={ updatePassword }>
          { password }
        </div>
      )
    }

    const LoginComponent = FirebaseLogin({})(Password)

    let component = renderer.create(
      <Provider store={ createEmptyStore() }>
        <LoginComponent />
      </Provider>
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()

    tree.props.onClick({currentTarget: {value: "password"}})

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

    const LoginComponent = FirebaseLogin({})(Submit)

    let component = renderer.create(
      <Provider store={ createEmptyStore() }>
        <LoginComponent />
      </Provider>
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()

    tree.props.onClick({ preventDefault() {} })
    expect(passwordLogin.mock.calls.length).toBe(1)
  })

  it("validator functions properly")
  it("errors are generated")
  it("processing prop gets updated")
  it("completed prop gets updated")

})




