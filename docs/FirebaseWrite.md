# FirebaseWrite

> Higher order component that enables easy write operations to Firebase

## Options

**path**

Firebase root path for write operation

**method**

Firebase write method, one of `push`, `set`, `transaction` or `update`.


```js
import { FirebaseWrite } from 'refire-react'
class CommentComponent extends Component {
  render() {
    const {
      submit,
      clearErrors,
      errors,
      processing
    } = this.props
  }
}
export default FirebaseWrite({
  path: "",
  method: "update"
})(CommentComponent)
```
