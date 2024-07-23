## Usage

this plugin is used to load env config and inject it into the compiled code.

## For example

we have .env file like this:

```
API_URL='www'
```

And we use it in out react code:

```
console.log('注入信息', process.env.SSH_HOST)
```

and the final output dist, will be '注入信息, www';

If we do not use the plugin to transfer it, the process.env.SSH_HOST will still be the same.
