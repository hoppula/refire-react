import * as PropTypes from "prop-types"
import * as React from "react"
import { Component } from "react"
import { syncFirebaseAPI } from "refire"

export interface BindContext {
  syncFirebase: syncFirebaseAPI
}

export interface BindProps {
  array: boolean
  as?: string
  name?: string
  populateWith?: string
  populate?: string
  path?: string
  from?: string
  query?: string
}

export class Bind extends Component<BindProps, {}> {
  static contextTypes = {
    syncFirebase: PropTypes.object.isRequired
  }

  context: BindContext

  componentDidMount() {
    const {
      array,
      as,
      name,
      path,
      populate,
      populateWith,
      from,
      query
    } = this.props
    this.context.syncFirebase.addBinding({
      name: as || name,
      path: from || path,
      populate: populateWith || populate,
      query,
      type: array ? "Array" : "Object"
    })
  }

  componenWillUnmount() {
    this.context.syncFirebase.removeBinding(this.props.as)
  }

  componentWillReceiveProps(nextProps: BindProps, nextContext: BindContext) {
    const {
      array,
      as,
      name,
      path,
      populate,
      populateWith,
      from,
      query
    } = nextProps
    nextContext.syncFirebase.updateBinding({
      name: as || name,
      path: from || path,
      populate: populateWith || populate,
      query,
      type: array ? "Array" : "Object"
    })
  }

  render(): React.ReactElement<any> {
    const { children } = this.props
    if (children) {
      return <div>{children}</div>
    }
    return null
  }
}

export default Bind
