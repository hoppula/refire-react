import * as React from "react"
import { Component } from "react"
import * as ReactRedux from "react-redux"
import { connect } from "react-redux"
import { firebaseActions, firebaseToProps } from "refire"

const { clearRegistrationError, createUser } = firebaseActions

// default validator assumes that each field has some value
const defaultValidator = (state: ValidatorState): boolean => {
  return Object.keys(state).every((field) => {
    return !!state[field]
  })
}

// default submit dispatches createUser action
const defaultSubmit = (dispatch: ReactRedux.Dispatch<any>, state: RegistrationState) => {
  return dispatch(
    createUser(state.email, state.password)
  ).catch(() => {})
}

interface ValidatorState {
  [key: string]: any
}

export interface RegistrationOptions {
  fields?: string[],
  submit?: (dispatch: ReactRedux.Dispatch<any>, state: RegistrationState) => void,
  validator?: (state: RegistrationState) => boolean
}

export interface Status {
  errors: {
    createUser: string
  },
  processing: {
    createUser: boolean
  },
  completed: {
    createUser: boolean
  }
}

export interface RegistrationProps {
  readonly _status: Status,
  readonly dispatch?: ReactRedux.Dispatch<any>
}

export interface RegistrationState {
  [name: string]: any
}

export interface ExtraProps {
  submit?: (event: React.FormEvent<HTMLElement>) => void,
  update?: (field: string) => (event: React.FormEvent<HTMLInputElement>) => void,
  validInput?: boolean,
  error?: string,
  processing?: boolean,
  completed?: boolean
}

export default function(
  options: RegistrationOptions = {}
) {

  const {
    fields = ["email", "password"],
    submit = defaultSubmit,
    validator = defaultValidator
  } = options

  return function <P>(
    WrappedComponent: ReactRedux.Component<P>
  ) {

    class FirebaseRegistration extends Component<RegistrationProps & P, RegistrationState> {

      constructor(props: RegistrationProps & P) {
        super(props)
        this.state = fields.reduce((initialState, field) => {
          return { ...initialState, [field]: null }
        }, {})
      }

      update = (field: string) => {
        return (event: React.FormEvent<HTMLInputElement>) => {
          const { errors: { createUser: error } } = this.props._status
          if (error) {
            this.props.dispatch(clearRegistrationError())
          }
          this.setState({ [field]: event.currentTarget.value })
        }
      }

      submit = (event: React.FormEvent<HTMLElement>) => {
        event.preventDefault()
        submit(this.props.dispatch, this.state)
      }

      render() {
        const validInput: boolean = validator(this.state)
        const {
          errors: { createUser: error },
          processing: { createUser: processing },
          completed: { createUser: completed }
        } = this.props._status

        const extraProps = {
          ...this.state,
          submit: this.submit,
          update: this.update,
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

    return connect<RegistrationProps, void, P>(
      firebaseToProps(["_status"])
    )(FirebaseRegistration)
  }
}
