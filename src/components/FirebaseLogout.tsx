import * as React from "react"
import { Component } from "react"
import * as ReactRedux from "react-redux"
import { connect } from "react-redux"
import { firebaseActions } from "refire"

const { logout } = firebaseActions

export interface LogoutProps {
  readonly children?: any,
  readonly dispatch?: ReactRedux.Dispatch<any>
}

export class FirebaseLogout extends Component<LogoutProps & ReactRedux.DispatchProp<any>, {}> {

  logout = () => {
    this.props.dispatch(logout())
  }

  render() {
    return React.Children.only(
      React.cloneElement(this.props.children, {
        onClick: this.logout
      })
    )
  }

}

export default connect()(FirebaseLogout)
