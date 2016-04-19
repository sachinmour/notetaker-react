var path = require("path");

module.exports = {
    entry: "./app/App.js",
    output: {
        path: path.join(__dirname, '/'),
        publicPath: "/",
        filename: "public/bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015']
                }
            }    
        ]
    }
}