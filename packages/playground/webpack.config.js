const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackHotUploader = require('@dev-sync-upload/webpack');
const EnvLoaderPlugin = require('webpack-env-loader-plugin');
const dotenv = require('dotenv');
dotenv.config();
console.log('SSH_USERNAME:', process.env.SSH_USERNAME);
module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    },
                },
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader'],
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    plugins: [
        new EnvLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
        new WebpackHotUploader({
            sshConfig: {
                host: process.env.SSH_HOST,
                username: process.env.SSH_USERNAME,
                password: process.env.SSH_PASSWORD
            },
            remoteDir: process.env.REMOTE_DIR
        }),
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        hot: true,
        port: 3000,
        //调试用，强制热更新产物存储在本地磁盘的dist包中，而不是内存中；
        devMiddleware: {
            writeToDisk: true
        }
    },
};