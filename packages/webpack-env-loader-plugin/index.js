const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

class EnvLoaderPlugin {
    constructor(options = {}) {
        this.path = options.path || '.env';
    }

    apply(compiler) {
        const envVariables = this.loadEnv();

        // 使用 DefinePlugin 注入环境变量
        new webpack.DefinePlugin({
            'process.env': JSON.stringify(envVariables)
        }).apply(compiler);
    }

    loadEnv() {
        const envPath = path.resolve(process.cwd(), this.path);
        let envVariables = {};

        if (fs.existsSync(envPath)) {
            const envContent = fs.readFileSync(envPath, 'utf-8');
            envVariables = this.parseEnv(envContent);
        }

        return envVariables;
    }

    parseEnv(content) {
        const result = {};
        const lines = content.split('\n');

        lines.forEach(line => {
            const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
            if (match) {
                const key = match[1];
                let value = match[2] || '';
                value = value.trim();
                result[key] = value;
            }
        });

        return result;
    }
}

module.exports = EnvLoaderPlugin;
