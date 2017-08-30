import * as React from "react"
import { Component } from "react"
import * as ReactRedux from "react-redux"
import { connect } from "react-redux"
import { firebaseActions, firebaseToProps } from "refire"

const { resetPassword, clearResetPasswordError } = firebaseActions

const defaultValidator = (input: string): boolean => {
  return !!input
}

export interface Status {
  errors: {
    resetPassword: string
  },
  processing: {
    resetPassword: boolean
  },
  completed: {
    resetPassword: boolean
  }
}

export interface ResetPasswordOptions {
  validator?: (email: string) => boolean
}

export interface ResetPasswordProps {
  readonly _status?: Status,
  readonly dispatch?: ReactRedux.Dispatch<{}>,
  readonly children?: React.ReactNode,
  readonly context?: any
}

interface ResetPasswordState {
  readonly email: string
}

export interface ExtraProps {
  email?: string,
  submit?: (event: React.FormEvent<HTMLElement>) => void,
  updateEmail?: (event: React.FormEvent<HTMLInputElement>) => void,
  validInput?: boolean,
  error?: string,
  processing?: boolean,
  completed?: boolean
}

export default function(options: ResetPasswordOptions = {}) {

  const { validator = defaultValidator } = options

  return function <P>(
    WrappedComponent: ReactRedux.Component<P>
  ) {

    class FirebaseResetPassword extends Component<ResetPasswordProps & P, ResetPasswordState> {

      constructor(props: ResetPasswordProps & P) {
        super(props)
        this.state = {
          email: null
        }
      }

      submit = (event: React.FormEvent<HTMLElement>) => {
        event.preventDefault()
        this.props.dispatch(
          resetPassword(this.state.email)
        )
      }

      updateEmail = (event: React.FormEvent<HTMLInputElement>) => {
        const { errors: { resetPassword: error } } = this.props._status
        if (error) {
          this.props.dispatch(clearResetPasswordError())
        }
        this.setState({ email: event.currentTarget.value })
      }

      render() {
        const validInput: boolean = validator(this.state.email)
        const {
          errors: { resetPassword: error },
          processing: { resetPassword: processing },
          completed: { resetPassword: completed }
        } = this.props._status

        const extraProps: ExtraProps = {
          email: this.state.email,
          submit: this.submit,
          updateEmail: this.updateEmail,
          validInput,
          error,
          processing,
          completed
        }

        return (
          <WrappedComponent
            { ...this.props }
            { ...extraProps }
          />
        )
      }

    }

    return connect<ResetPasswordProps, void, P>(
      firebaseToProps(["_status"])
    )(FirebaseResetPassword)
  }
}
