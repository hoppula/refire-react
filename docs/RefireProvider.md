# RefireProvider

> Places refire's syncFirebase instance to your React app's context and allows
> you to use `<Bind>` component anywhere in your application's component tree

## Usage

```js
import { syncFirebase } from 'refire'
import { RefireProvider } from 'refire-react'

...
 const syncFirebaseInstance = syncFirebase({
    apiKey: apiKey,
    projectId: projectId,
    store: store
  })
...

class RootComponent extends Component {
  render() {
    return (
      <RefireProvider syncFirebase={syncFirebaseInstance}>
        <App />
      <RefireProvider>
    )
  }
}
```
