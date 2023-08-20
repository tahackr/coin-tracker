const path = require("path");
const HTMLPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: {
        index: "./src/index.js",
    },
    mode: "production",
    module: {
        rules: [
            {
                test: /\.[jt]s?$/,
                loader: "esbuild-loader",
                options: {
                    target: "es2015",
                    loader: "jsx",
                },
            },
            {
                exclude: /node_modules/,
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    plugins: [
        new CopyPlugin({
            patterns: [{ from: "manifest.json", to: "../manifest.json" }],
        }),
        ...getHtmlPlugins(["index"]),
    ],
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    output: {
        path: path.join(__dirname, "dist/js"),
        filename: "[name].js",
    },
};

function getHtmlPlugins(chunks) {
    return chunks.map(
        (chunk) =>
            new HTMLPlugin({
                title: "Coin Tracker",
                filename: `${chunk}.html`,
                chunks: [chunk],
            })
    );
}
