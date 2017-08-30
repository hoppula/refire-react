import * as React from "react"
import * as renderer from "react-test-renderer"

import { FirebaseLogout } from "../FirebaseLogout"

it("FirebaseLogout renders given children and calls dispatch on click", () => {
  const logoutFn = jest.fn()

  let component = renderer.create(
    <FirebaseLogout dispatch={ logoutFn }>
      <button>Logout</button>
    </FirebaseLogout>
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()

  tree.props.onClick()
  expect(logoutFn.mock.calls.length).toBe(1)
})
