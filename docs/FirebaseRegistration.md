# FirebaseRegistration

> Higher order component for registering users to your Firebase with e-mail and password

## Options

**fields**

Optional. Defines the included fields, defaults are `email` and `password`

**submit** *(dispatch, state) => Promise*

Optional. Custom submit function. By default submitting the form dispatches `createUser` action.

**validator** *(state) => Boolean*

Optional. Custom validator function.

```js
import { FirebaseRegistration } from 'refire-react'
class RegistrationComponent extends Component {
  render() {
    const {
      submit,
      update,
      validInput,
      error,
      processing,
      completed,
      email,
      password
    } = this.props
  }
}
export default FirebaseRegistration({
  fields: ["email", "password"],
  submit: optionalCustomSubmitFn,
  validator: optionalCustomValidatorFn
})(RegistrationComponent)
```
