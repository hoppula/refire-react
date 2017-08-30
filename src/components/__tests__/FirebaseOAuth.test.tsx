import * as React from "react"
import * as renderer from "react-test-renderer"

import { FirebaseOAuth } from "../FirebaseOAuth"

it("FirebaseOAuth renders given children and calls onClick on click", () => {
  const loginFn = jest.fn()
  const dispatch = () => {
    return new Promise(() => {})
  }

  let component = renderer.create(
    <FirebaseOAuth
      flow="popup"
      provider="facebook"
      dispatch={ dispatch }
      onClick={ loginFn }
    >
      <button>Login with Facebook</button>
    </FirebaseOAuth>
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()

  tree.props.onClick()
  expect(loginFn.mock.calls.length).toBe(1)
})
