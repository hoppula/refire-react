# FirebaseOAuth

> Wrapper component for easy Firebase OAuth login

Available providers are `facebook`, `google`, `twitter` and `github`.

Available authentication flows are `popup` and `redirect`.

You can also pass `scopes` prop to request extra information in OAuth authentication dialog, e.g. obtaining birthday with Facebook authentication you'd pass `['user_birthday']` as prop.

You can also pass `onClick` and `onError` callback functions as props.

Renders given child component.

```js
import { FirebaseOAuth } from 'refire-react'
const LoginWithGoogle = () => {
  return (
    <FirebaseOAuth provider="google" flow="popup">
      <Button>Login with Google</Button>
    </FirebaseOAuth>
  )
}
```
