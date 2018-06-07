const path = require('path');
const CleanWebpackPlugin =require('clean-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const glob = require('glob');
var entries= function () {
    var jsDir = path.resolve(__dirname, 'js')
    var entryFiles = glob.sync(jsDir + '/*.{js,jsx}')
    var map = {};

    for (var i = 0; i < entryFiles.length; i++) {
        var filePath = entryFiles[i];
        var filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'));
        map[filename] = filePath;
    }
    return map;
}

module.exports = {
    entry: entries(),
    output: {
        path: path.resolve(__dirname, 'static'),
        filename: './js/[name].[chunkhash:8].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015',  'stage-2',],
                    plugins: [],
                    cacheDirectory: true
                }
            },
            {
                test: /\.css$/,
                use: [
                    'handlebars-loader',
                    'extract-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.scss$/,
                loader: "style-loader!css-loader!sass-loader"
            },
        ],
    },
    plugins:[
        new CleanWebpackPlugin(['static'], {
            root: __dirname,       　　　　　　　　　　//根目录
            verbose:  true,        　　　　　　　　　　//开启在控制台输出信息
            dry:      false        　　　　　　　　　　//启用删除文件
        }),
        new htmlWebpackPlugin({
            inject: true,
            template: 'index.html',
            chunks: ['index']
        }),
        new htmlWebpackPlugin({
            inject: true,
            filename:'test.html',
            template: 'test.html',
            chunks: ['test']
        }),
    ]

};
