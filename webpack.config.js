const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const appDirectory = path.resolve(__dirname);
const {presets} = require(`${appDirectory}/babel.config.js`);

const compileNodeModules = [
// Add every react-native package that needs compiling
// 'react-native-gesture-handler',
].map((moduleName) => path.resolve(appDirectory, `node_modules/${moduleName}`));

const babelLoaderConfiguration = {
test: /\.(js|jsx|ts|tsx)$/,
include: [
path.resolve(__dirname, 'index.web.js'),
path.resolve(__dirname, 'App.web.jsx'),
path.resolve(__dirname, 'src'),
path.resolve(__dirname, "./App/AppRunner.jsx"),
path.resolve(appDirectory, "./App/AssignmentScreen.jsx"),
path.resolve(appDirectory, "./App/Attendance.jsx"),
path.resolve(appDirectory, "./App/BusTracking.jsx"),
path.resolve(appDirectory, "./App/Calendar.jsx"),
path.resolve(appDirectory, "./App/CalendarEvent.jsx"),
path.resolve(appDirectory, "./App/ContactTeacher.jsx"),
path.resolve(appDirectory, "./App/ContactUs.jsx"),
path.resolve(appDirectory, "./App/GoogleFeedback.jsx"),
path.resolve(appDirectory, "./App/Grades.jsx"),
path.resolve(appDirectory, "./App/Home.jsx"),
path.resolve(appDirectory, "./App/NewsScreen.jsx"),
path.resolve(appDirectory, "./App/QuickLinks.jsx"),
path.resolve(appDirectory, "./App/Navigation.jsx"),
path.resolve(appDirectory, "./App/SettingsDropdown.jsx"),
path.resolve(appDirectory, "./App/SplashScreen.jsx"),
path.resolve(appDirectory, "./App/SupportPage.jsx"),
path.resolve(appDirectory, "./App/ThemeContext.jsx"),
path.resolve(appDirectory, "./App/VirtualAssistant.jsx"),
path.resolve(appDirectory, "./App/WebViewScreen.jsx"),
path.resolve(__dirname, 'App'),
/node_modules\/(@?react-(navigation|native)).*\.(ts|js)x?$/, // add this line
...compileNodeModules,
],
exclude: [/react-native-web/, /\.(native|ios|android)\.(ts|js)x?$/],
use: [
{
loader: 'babel-loader',
options: {
cacheDirectory: true,
presets,
plugins: ['react-native-web'],
},
},
],
};


const svgLoaderConfiguration = {
test: /\.svg$/,
use: [
{
loader: '@svgr/webpack',
},
],
};

const imageLoaderConfiguration = {
test: /\.(gif|jpe?g|png)$/,
use: {
loader: 'url-loader',
options: {
name: '[name].[ext]',
},
},
};

module.exports = {
entry: {
app: path.join(__dirname, 'index.web.js'),
},
output: {
path: path.resolve(appDirectory, 'dist'),
publicPath: '/',
filename: 'rnw_blogpost.bundle.js',
},
resolve: {
extensions: ['.web.js', '.js', '.jsx'],
alias: {
'react-native$': 'react-native-web',
},
},
externals: {
"react-native": false,
},
module: {
rules: [
babelLoaderConfiguration,
imageLoaderConfiguration,
svgLoaderConfiguration,

],
},
plugins: [
new HtmlWebpackPlugin({
template: path.join(__dirname, 'index.html'),
}),
new webpack.HotModuleReplacementPlugin(),
new webpack.DefinePlugin({
// See: https://github.com/necolas/react-native-web/issues/349
__DEV__: JSON.stringify(true),
}),
],
};