import * as React from "react"
import { Component } from "react"
import * as ReactRedux from "react-redux"
import { connect } from "react-redux"
import { firebaseActions } from "refire"

const { clearWriteErrors, write } = firebaseActions

interface ValidMethods {
  [key: string]: boolean
}

const validMethods: ValidMethods = {
  push: true,
  set: true,
  transaction: true,
  update: true
}

export interface WriteProps {
  readonly dispatch?: ReactRedux.Dispatch<{}>,
  readonly processing?: string[],
  readonly errors?: string[],
  readonly path: string
}

export interface FirebaseWriteState {
  firebase: {
    writes: {
      processing: {
        [name: string]: string[]
      },
      errors: {
        [name: string]: string[]
      }
    }
  }
}

export type pathFunction = (state: FirebaseWriteState, ownProps: any) => string

export interface WriteOptions {
  path?: string | pathFunction,
  method?: "" | "push" | "set" | "transaction" | "update"
}

export interface ExtraProps {
  clearErrors?: () => void,
  errors?: string[],
  processing?: boolean,
  submit?: (value: any) => void
}

export default function(options: WriteOptions = {}) {

  const { path = "", method } = options

  if (typeof path !== "function" && typeof path !== "string") {
    throw new Error("options.path must be a function or string")
  }

  if (typeof method !== "string" || !validMethods[method]) {
    throw new Error(`options.method must be one of: ${Object.keys(validMethods).join(", ")}`)
  }

  function mapStateToProps(state: FirebaseWriteState, ownProps: any) {
    const processing = state.firebase.writes.processing
    const errors = state.firebase.writes.errors
    const firebasePath: string = typeof path === "function"
      ? path(state, ownProps)
      : path

    return {
      errors: errors[firebasePath],
      path: firebasePath,
      processing: processing[firebasePath]
    }
  }

  return function <P>(
    WrappedComponent: ReactRedux.Component<P>
  ) {

    class FirebaseWrite extends Component<WriteProps & P, {}> {

      submit = (value: any) => {
        const { dispatch } = this.props

        return dispatch(
          write({ method, path, value, ownProps: this.props })
        )
      }

      clearErrors = () => {
        this.props.dispatch(
          clearWriteErrors(this.props.path)
        )
      }

      render() {
        const processing = this.props.processing && !!this.props.processing.length
        const errors = this.props.errors || []

        const extraProps: ExtraProps = {
          clearErrors: this.clearErrors,
          errors,
          processing,
          submit: this.submit
        }

        return (
          <WrappedComponent
            { ...this.props }
            { ...extraProps }
          />
        )
      }

    }

    return connect<WriteProps, void, P>(
      mapStateToProps
    )(FirebaseWrite)
  }
}
