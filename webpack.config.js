const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const GLOBALS = {
    'process.env.NODE_ENV': JSON.stringify('production')
};
const PROD = process.env.NODE_ENV === 'production';

module.exports = {
    devtool: PROD ? 'source-map' : 'eval-source-map',
    entry: PROD ? './client/index' :
        [
            //'webpack-hot-middleware/client?reload=true', // reloads the page if hot module reloading fails.
            './client/index'
        ],
    target: 'web',
    output: {
        filename: 'bundle.js'
    },
    plugins: PROD ?
        [
            new webpack.optimize.OccurenceOrderPlugin(),
            new webpack.DefinePlugin(GLOBALS),
            new ExtractTextPlugin('bundle.css'),
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}})
        ] :
        [
            //new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin()
        ],
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                include: path.join(__dirname, '/client'),
                loader: 'babel-loader'
            }
        ]
    }
};