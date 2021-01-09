## Core Modules

While working with core modules, the callback function don't work same as they do when we use third party packages.

## Example

With http library:
```js
http.request(url, (response) => {
  response.on('data', (chunk) => {

  })
})
```
http data can be streamed in multiple parts.

here the full response object does not come on the first go, we will not have access to body object on it directly.

We have to use the method `on` which has event `data`.