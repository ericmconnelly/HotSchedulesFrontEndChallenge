(function() {

    'use strict';

    module.exports = [
        {
            name: 'TopSalesList',
            entry: './src/top-sales-list/index.js',
            output: {
                filename: './dist/TopSalesList/index.js',
                library: ['TopSalesListModule'],
                libraryTarget: 'umd'
            },
            module: {
                loaders: [
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        loader: "babel-loader"
                    },
                    {
                        test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
                        loader: "file"
                    },
                    {
                        test: /\.scss$/,
                        exclude: /node_modules/,
                        use: [
                            {
                                loader: 'style-loader'  // creates style nodes from JS strings
                            },
                            {
                                loader: 'css-loader',   // translates CSS into CommonJS
                                options: {
                                    modules: true,
                                    localIdentName: 'echo-component-[name]-[hash:base64:5]'
                                }
                            },
                            {
                                loader: "sass-loader"   // compiles Sass to CSS
                            }
                        ]
                    }
                ]
            }
        },
        {
            name: 'Utils',
            entry: './src/utils/transformData.js',
            output: {
                filename: './dist/Utils/transformData.js',
                library: ['Utils'],
                libraryTarget: 'umd'
            },
            module: {
                loaders: [
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        loader: "babel-loader"
                    },
                    {
                        test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
                        loader: "file"
                    },
                    {
                        test: /\.scss$/,
                        exclude: /node_modules/,
                        use: [
                            {
                                loader: 'style-loader'  // creates style nodes from JS strings
                            },
                            {
                                loader: 'css-loader',   // translates CSS into CommonJS
                                options: {
                                    modules: true,
                                    localIdentName: 'echo-component-[name]-[hash:base64:5]'
                                }
                            },
                            {
                                loader: "sass-loader"   // compiles Sass to CSS
                            }
                        ]
                    }
                ]
            }

        },
        {
            name: 'test-app',
            entry: './test-app/src/app.js',
            output: {
                filename: './public/build/bundle.js',
            },
            module: {
                loaders: [
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        loader: "babel-loader"
                    },
                    {
                        test: /\.scss$/,
                        exclude: /node_modules/,
                        use: [
                            {
                                loader: 'style-loader'  // creates style nodes from JS strings
                            },
                            {
                                loader: 'css-loader',   // translates CSS into CommonJS
                                options: {
                                    modules: true,
                                    localIdentName: 'echo-component-[name]-[hash:base64:5]'
                                }
                            },
                            {
                                loader: "sass-loader"   // compiles Sass to CSS
                            }
                        ]
                    }
                ]
            },
            node: {
                console: true,
                fs: 'empty',
                tls: 'empty',
                net: 'empty'
            },
        },
        {
            name: 'stylesheets',
            entry: './src/stylesheets/top_sales.scss',
            output: {
                filename: './public/stylesheets/top_sales.css',
            },
            devtool: "source-map",
            module: {
                loaders: [
                    {
                        test: /\.scss$/,
                        exclude: /node_modules/,
                        use: [
                            {
                                loader: 'style-loader'  // creates style nodes from JS strings
                            },
                            {
                                loader: 'css-loader',   // translates CSS into CommonJS
                                options: {
                                    modules: true,
                                    localIdentName: 'echo-component-[name]-[hash:base64:5]',
                                    sourceMap: true
                                }
                            },
                            {
                                loader: "sass-loader",   // compiles Sass to CSS
                                options: {
                                    sourceMap: true
                                }
                            }
                        ]
                    }
                ]
            },
            node: {
                console: true,
                fs: 'empty',
                tls: 'empty',
                net: 'empty'
            },
        }
    ];

})();
