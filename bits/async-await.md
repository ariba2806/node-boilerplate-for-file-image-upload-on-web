## Async Await

Output of this program??
```js
const hello = () => {

}

console.log(hello());
```

It logs `undefined`, as if something is not returned explicitly, javascript functions return `undefined` implicitely.

Output of this program??
```js
const hello = async () => {

}

console.log(hello());
```

The output is `Promise { undefined }`.

asynchronous functions return a promise.