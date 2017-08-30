import * as PropTypes from "prop-types"
import * as React from "react"
import { Component } from "react"
import * as ReactRedux from "react-redux"
import { connect } from "react-redux"
import { firebaseActions } from "refire"
const { oAuthLogin } = firebaseActions
const validProviders = ["facebook", "google", "twitter", "github"]
const validFlows = ["popup", "redirect"]

export interface OAuthProps {
  readonly children?: any,
  readonly dispatch?: ReactRedux.Dispatch<{}>
  readonly flow: "popup" | "redirect",
  readonly onClick?: (event?: React.FormEvent<HTMLElement>) => void,
  readonly onError?: (error: OAuthError) => void,
  readonly provider: "facebook" | "google" | "twitter" | "github",
  readonly scopes?: string[]
}

export interface OAuthError { message: string }

export class FirebaseOAuth extends Component<OAuthProps & ReactRedux.DispatchProp<any>, {}> {

  static propTypes = {
    flow: PropTypes.oneOf(validFlows),
    onClick: PropTypes.func,
    onError: PropTypes.func,
    provider: PropTypes.oneOf(validProviders),
    scopes: PropTypes.array
  }

  authenticate = () => {
    const flow = this.props.flow || "popup"
    this.props.dispatch(
      oAuthLogin(flow, this.props.provider, this.props.scopes)
    ).catch((error: OAuthError) => {
      if (typeof this.props.onError === "function") {
        this.props.onError(error)
      }
    })
    if (typeof this.props.onClick === "function") {
      this.props.onClick()
    }
  }

  render() {
    return React.Children.only(
      React.cloneElement(this.props.children, {
        onClick: this.authenticate
      })
    )
  }

}

export default connect()(FirebaseOAuth)
