const { NodeSSH } = require('node-ssh');

class WebpackHotUploader {
    constructor(options) {
        this.ssh = new NodeSSH();
        this.options = options;
    }

    apply(compiler) {
        compiler.hooks.afterEmit.tapAsync('WebpackHotUploader', (compilation, callback) => {
            const changedFiles = Array.from(compilation.emittedAssets.keys());
            console.log('chane', changedFiles)
            this.uploadFiles(changedFiles).then(callback);
        });
    }

    async uploadFiles(files) {
        await this.ssh.connect(this.options.sshConfig);
        for (const file of files) {
            await this.ssh.putFile(`dist/${file}`, `${this.options.remoteDir}/${file}`);
        }
        this.ssh.dispose();
    }
}

module.exports = WebpackHotUploader;