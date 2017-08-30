# FirebaseResetPassword

> Higher order component for Firebase password reset

## Options

**validator** *(input) => Boolean*

Optional. Custom validator function.

```js
import { FirebaseResetPassword } from 'refire-react'
class ResetPasswordComponent extends Component {
  render() {
    const {
      email,
      submit,
      updateEmail,
      validInput,
      error,
      processing,
      completed
    } = this.props
  }
}
export default FirebaseResetPassword({
  validator: optionalCustomValidatorFn
})(ResetPasswordComponent)
```
