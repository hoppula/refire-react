import * as PropTypes from "prop-types"
import * as React from "react"
import { Component } from "react"
import { syncFirebaseAPI } from "refire"

export interface RefireProviderProps {
  syncFirebase: syncFirebaseAPI
}

export class RefireProvider extends Component<RefireProviderProps, {}> {
  static childContextTypes = {
    syncFirebase: PropTypes.object.isRequired
  }

  getChildContext() {
    return {
      syncFirebase: this.props.syncFirebase
    }
  }

  render() {
    const { children } = this.props
    return children ? React.Children.only(children) : null
  }
}

export default RefireProvider
