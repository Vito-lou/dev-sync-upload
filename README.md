# dev-sync-upload

Seamlessly sync your local development changes to a remote server in real-time, perfect for webpack and React projects.

## package usage

In the webpack.config.js of the playground, just require the plugin and use it like follows:

```
const WebpackHotUploader = require('@dev-sync-upload/webpack');

new WebpackHotUploader({
            sshConfig: {
                host: 'your ip',
                username: 'your username',
                password: 'your password'
            },
            remoteDir: 'your remote dir'
        }),
```
