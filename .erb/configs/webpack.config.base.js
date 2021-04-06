/**
 * Base webpack config used across other specific configs
 */

import path from 'path';
import webpack from 'webpack';
import { dependencies as externals } from '../../src/package.json';
import TerserPlugin from 'terser-webpack-plugin';
import WasmPackPlugin from '@wasm-tool/wasm-pack-plugin';

export default {
    externals: [...Object.keys(externals || {})],

    module: {
        rules: [{
            test: /\.tsx?$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true,
                },
            },
        }, ],
    },

    output: {
        path: path.join(__dirname, '../../src'),
        // https://github.com/webpack/webpack/issues/1114
        libraryTarget: 'commonjs2',
    },

    // optimization: {
    //     minimizer: [
    //         new TerserPlugin({
    //             terserOptions: {
    //                 mangle: false,
    //             }
    //         }),
    //     ]
    // },

    /**
     * Determine the array of extensions that should be used to resolve modules.
     */
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
        modules: [path.join(__dirname, '../src'), 'node_modules'],
    },

    experiments: {
        asyncWebAssembly: true
    },

    plugins: [
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'production',
        }),

        // new WasmPackPlugin({
        //     crateDirectory: path.resolve(__dirname, "can-dbc-wasmx"),
        //     args: "--log-level warn",
        //     // Default arguments are `--typescript --target browser --mode normal`.
        //     extraArgs: "--no-typescript",
        // }),
    ]
};