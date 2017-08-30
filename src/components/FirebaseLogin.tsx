import * as React from "react"
import { Component } from "react"
import * as ReactRedux from "react-redux"
import { connect } from "react-redux"
import { firebaseActions, firebaseToProps } from "refire"

const { clearLoginError, passwordLogin } = firebaseActions

interface ValidatorState {
  [key: string]: any
}

const defaultValidator = (state: ValidatorState = {}): boolean => {
  return Object.keys(state).every((field) => {
    return !!state[field]
  })
}

export interface Status {
  errors: {
    login: string
  },
  processing: {
    login: boolean
  },
  completed: {
    login: boolean
  }
}

export interface ExtraProps {
  email?: string,
  password?: string,
  submit?: (event: React.FormEvent<HTMLElement>) => void,
  updateEmail?: (event: React.FormEvent<HTMLInputElement>) => void,
  updatePassword?: (event: React.FormEvent<HTMLInputElement>) => void,
  validInput?: boolean,
  error?: string,
  processing?: boolean,
  completed?: boolean
}

export interface LoginOptions {
  validator?: (state: LoginState) => boolean
}

export interface LoginProps {
  readonly _status: Status,
  readonly dispatch?: ReactRedux.Dispatch<{}>
}

export interface LoginState {
  readonly email?: string,
  readonly password?: string
}

export default function(options: LoginOptions = {}) {

  const { validator = defaultValidator } = options

  return function <P>(
    WrappedComponent: ReactRedux.Component<P>
  ) {
    class FirebaseLogin extends Component<LoginProps & P, LoginState> {

      constructor(props: LoginProps & P) {
        super(props)
        this.state = {
          email: null,
          password: null
        }
      }

      submit = (event: React.FormEvent<HTMLElement>) => {
        event.preventDefault()
        this.props.dispatch(
          passwordLogin(this.state.email, this.state.password)
        ).catch(() => {})
      }

      updateEmail = (event: React.FormEvent<HTMLInputElement>) => {
        const { errors: { login: error } } = this.props._status
        if (error) {
          this.props.dispatch(clearLoginError())
        }
        this.setState({ email: event.currentTarget.value })
      }

      updatePassword = (event: React.FormEvent<HTMLInputElement>) => {
        const { errors: { login: error } } = this.props._status
        if (error) {
          this.props.dispatch(clearLoginError())
        }
        this.setState({ password: event.currentTarget.value })
      }

      render() {
        const validInput: boolean = validator(this.state)
        const {
          errors: { login: error },
          processing: { login: processing },
          completed: { login: completed }
        } = this.props._status

        const extraProps = {
          email: this.state.email,
          password: this.state.password,
          submit: this.submit,
          updateEmail: this.updateEmail,
          updatePassword: this.updatePassword,
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

    return connect<LoginProps, void, P>(
      firebaseToProps(["_status"])
    )(FirebaseLogin)
  }
}
