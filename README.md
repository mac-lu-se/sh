# sh

Functions used then writing jss scripts in Deno

## Running external commands

```js
const { status, stdout, stderr } = sh.run('ls -l');

const { status, stdout, stderr } = sh.run(['ls', '-l']);
```
