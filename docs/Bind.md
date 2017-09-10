# Bind

> `<Bind>` allows you to create Refire bindings anywhere in your app
>
> Make sure you have wrapped your app with [RefireProvider](RefireProvider.md) 

## Usage

```js
import { Bind } from 'refire-react'

class Bindings extends Component {
  render() {
    return (
      <Bind>
        <Bind array from={adminUsersPath} as="adminUsers" />
        <Bind array from="categories" as="categories" query={sortByActive} />
        <Bind array from="boards" as="boards" query={sortByActive} />
        <Bind from={boardPath} as="board" />
      <Bind>
    )
  }
}
```
