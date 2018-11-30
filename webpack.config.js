const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

// Helper functions
var ROOT = path.resolve(__dirname);

function root(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [ROOT].concat(args));
}

module.exports = {
    entry: {
        main: './src/main/typescript/handler.ts'
    },
    target: 'node',
    externals: ["aws-sdk", nodeExternals()], // modules to be excluded from bundled file
    resolve: {
        extensions: ['.ts', '.js', '.json'],
        modules: [
            'node_modules'
        ]
    },
    output: {
        libraryTarget: 'commonjs',
        path: path.join(__dirname, '.webpack'),
        filename: 'handler.js'
    },
    node: {
        __dirname: true
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'string-replace-loader',
                enforce: 'pre',
                query: {
                    search: '(System|SystemJS)(.*[\\n\\r]\\s*\\.|\\.)import\\((.+)\\)',
                    replace: '$1.import($3).then(mod => mod.__esModule ? mod.default : mod)',
                    flags: 'g'
                },
                include: [root('.')]
            },
            /*
            {
                test: /\.ts$/,
                enforce: 'pre',
                loader: 'tslint-loader'
            },
            */
            {
                test: /\.ts$/,
                loader: 'awesome-typescript-loader',
                exclude: [/\.(spec|e2e)\.ts$/]
            },
            {
                test: /\.ts?$/,
                enforce: 'pre',
                loader: 'source-map-loader'
            }
        ]
    },
    devtool: 'source-map',
    plugins: [
        new CopyWebpackPlugin([
            {from: './.npmrc', to: "."}
        ]),
        new webpack.LoaderOptionsPlugin({
            options: {
                tslint: {
                    emitErrors: true,
                    failOnHint: true
                }
            }
        })
    ]
};
