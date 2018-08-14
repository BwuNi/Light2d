module.exports = {
    entry:'./entry.js',
    output:{
        filename:'bundle.js'
    },
	devServer:{
        port:8082,
        inline:true,
    },
    devtool:"source-map",
    module:{
        loaders:[
            {
                test:/\.css$/,
                loader:'style-loader!css-loader'
            },
            {
                test:/\.js$/,
                loader:'babel-loader',
                exclude:/node_modules/
            }
        ]
    },
    resolve:{
        "extensions":['.js','.css']
    }
}