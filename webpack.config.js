module.exports = {
    context: __dirname + '/app/scripts.babel/',
    entry: {
        background: './background.js',
        chromereload: './chromereload.js',
        contentscript: './contentscript.js',
        popup: './popup.js',
        inject: './inject.js',
    },
    output: { filename: '[name].js' },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }, {
            test: /\.vue$/,
            loader: 'vue-loader'
        }]
    }
};
