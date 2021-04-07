/*
 * @Author: jing
 * @Date: 2021-03-31 14:18:27
 * @LastEditTime: 2021-04-06 14:16:53
 * @LastEditors: Jing
 * @Description: In User Settings Edit
 * @FilePath: /not-eject/craco.config.js
 */
/**
 * TODO: 区分环境 —— NODE_ENV
 * - whenDev ☞ process.env.NODE_ENV === 'development'
 * - whenTest ☞ process.env.NODE_ENV === 'test'
 * - whenProd ☞ process.env.NODE_ENV === 'production'
 */
const { when, whenDev, whenProd, whenTest, ESLINT_MODES, POSTCSS_MODES } = require('@craco/craco');
const webpack = require('webpack');
const CracoLessPlugin = require('craco-less');
const CracoAntDesignPlugin = require('craco-antd');
const CracoVtkPlugin = require('craco-vtk');
const WebpackBar = require('webpackbar');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const FastRefreshCracoPlugin = require('craco-fast-refresh');
const TerserPlugin = require('terser-webpack-plugin');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin');

const path = require('path');

// 判断编译环境是否为生产
const isBuildAnalyzer = process.env.BUILD_ANALYZER === 'true';

const pathResolve = (pathUrl) => path.join(__dirname, pathUrl);

module.exports = {
  webpack: {
    // 别名配置
    extensions: ['.ts', '.tsx', '.js', 'config.js', '.json'],
    alias: {
      '@': pathResolve('.'),
      src: pathResolve('src'),
      assets: pathResolve('src/assets'),
      common: pathResolve('src/common'),
      components: pathResolve('src/components'),
      hooks: pathResolve('src/hooks'),
      pages: pathResolve('src/pages'),
      router: pathResolve('src/router'),
      store: pathResolve('src/store'),
      utils: pathResolve('src/utils'),
      // 此处是一个示例，实际可根据各自需求配置
    },
    plugins: [
      // webpack构建进度条
      new WebpackBar({
        profile: true,
      }),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      // 查看打包的进度
      new SimpleProgressWebpackPlugin(),
      // 时间转换工具采取day替换moment
      new AntdDayjsWebpackPlugin(),
      // // 新增模块循环依赖检测插件
      ...whenDev(
        () => [
          new CircularDependencyPlugin({
            exclude: /node_modules/,
            include: /src/,
            failOnError: true,
            allowAsyncCycles: false,
            cwd: process.cwd(),
          }),
          // webpack-dev-server 强化插件
          new DashboardPlugin(),
          // new webpack.HotModuleReplacementPlugin(),
        ],
        [],
      ),
      /**
       * 编译产物分析
       *  - https://www.npmjs.com/package/webpack-bundle-analyzer
       * 新增打包产物分析插件
       */
      ...when(
        isBuildAnalyzer,
        () => [
          new BundleAnalyzerPlugin({
            analyzerMode: 'static', // html 文件方式输出编译分析
            openAnalyzer: true,
            reportFilename: path.resolve(__dirname, `analyzer/index.html`),

            // //  可以是`server`，`static`或`disabled`。
            // //  在`server`模式下，分析器将启动HTTP服务器来显示软件包报告。
            // //  在“静态”模式下，会生成带有报告的单个HTML文件。
            // //  在`disabled`模式下，你可以使用这个插件来将`generateStatsFile`设置为`true`来生成Webpack Stats JSON文件。
            // analyzerMode: 'server',
            // //  将在“服务器”模式下使用的主机启动HTTP服务器。
            // analyzerHost: '127.0.0.1',
            // //  将在“服务器”模式下使用的端口启动HTTP服务器。
            // analyzerPort: 8888,
            // //  路径捆绑，将在`static`模式下生成的报告文件。
            // //  相对于捆绑输出目录。
            // reportFilename: 'report.html',
            // //  模块大小默认显示在报告中。
            // //  应该是`stat`，`parsed`或者`gzip`中的一个。
            // //  有关更多信息，请参见“定义”一节。
            // defaultSizes: 'parsed',
            // //  在默认浏览器中自动打开报告
            // openAnalyzer: true,
            // //  如果为true，则Webpack Stats JSON文件将在bundle输出目录中生成
            // generateStatsFile: false,
            // //  如果`generateStatsFile`为`true`，将会生成Webpack Stats JSON文件的名字。
            // //  相对于捆绑输出目录。
            // statsFilename: 'stats.json',
            // //  stats.toJson（）方法的选项。
            // //  例如，您可以使用`source：false`选项排除统计文件中模块的来源。
            // //  在这里查看更多选项：https：  //github.com/webpack/webpack/blob/webpack-1/lib/Stats.js#L21
            // statsOptions: null,
            // logLevel: 'info', // 日志级别。可以是'信息'，'警告'，'错误'或'沉默'。
          }),
        ],
        [],
      ),
      ...whenProd(
        () => [
          // new TerserPlugin({
          //   sourceMap: true, // Must be set to true if using source-maps in production 如果在生产环境中使用源映射，必须设置为true
          //   terserOptions: {
          //     ecma: undefined,
          //     parse: {},
          //     compress: {
          //       warnings: false,
          //       drop_console: true, // 生产环境下移除控制台所有的内容
          //       drop_debugger: true, // 移除断点
          //       pure_funcs: ['console.log'] // 生产环境下移除console
          //     }
          //   }
          // }),
          // 打压缩包
          new CompressionWebpackPlugin({
            algorithm: 'gzip',
            test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
            threshold: 1024,
            minRatio: 0.8,
          }),
        ],
        [],
      ),
    ],
    //抽离公用模块
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            chunks: 'initial',
            minChunks: 2,
            maxInitialRequests: 5,
            minSize: 0,
          },
          vendor: {
            test: /node_modules/,
            chunks: 'initial',
            name: 'vendor',
            priority: 10,
            enforce: true,
          },
        },
      },
    },
    /**
     * 重写 webpack 任意配置
     *  - configure 能够重写 webpack 相关的所有配置，但是，仍然推荐你优先阅读 craco 提供的快捷配置，把解决不了的配置放到 configure 里解决；
     *  - 这里选择配置为函数，与直接定义 configure 对象方式互斥；
     */
    configure: (webpackConfig, { env, paths }) => {
      // paths.appPath='public'
      paths.appBuild = 'dist'; // 配合输出打包修改文件目录
      // webpackConfig中可以解构出你想要的参数比如mode、devtool、entry等等，更多信息请查看webpackConfig.json文件
      /**
       * 修改 output
       */
      webpackConfig.output = {
        ...webpackConfig.output,
        // ...{
        //   filename: whenDev(() => 'static/js/bundle.js', 'static/js/[name].js'),
        //   chunkFilename: 'static/js/[name].js'
        // },
        path: path.resolve(__dirname, 'dist'), // 修改输出文件目录
        publicPath: '/',
      };
      /**
       * webpack split chunks
       */
      // webpackConfig.optimization.splitChunks = {
      //   ...webpackConfig.optimization.splitChunks,
      //   ...{
      //     chunks: 'all',
      //     name: true
      //   }
      // }
      // 返回重写后的新配置
      return webpackConfig;
    },
  },
  babel: {
    presets: [],
    plugins: [
      // AntDesign 按需加载
      [
        'import',
        {
          libraryName: 'antd',
          libraryDirectory: 'es',
          style: true,
        },
        'antd',
      ],
      [
        'import',
        {
          libraryName: '@ant-design/icons',
          // "style": false,
          libraryDirectory: 'es/icons',
          camel2DashComponentName: false,
        },
        '@ant-design/icons',
      ],
      [
        '@babel/plugin-proposal-decorators',
        {
          legacy: true,
        },
      ], // 用来支持装饰器
    ],
    loaderOptions: {},
    loaderOptions: (babelLoaderOptions, { env, paths }) => {
      return babelLoaderOptions;
    },
  },
  /**
   * 新增 craco 提供的 plugin
   */
  plugins: [
    // 热更新
    ...whenDev(
      () => [
        {
          plugin: FastRefreshCracoPlugin,
        },
        {
          plugin: CracoVtkPlugin(),
        },
        {
          plugin: new AntdDayjsWebpackPlugin(),
        },
      ],
      [],
    ),
    // 方案1、配置Antd主题less
    // {
    //   plugin: CracoLessPlugin,
    //   options: {
    //     lessLoaderOptions: {
    //       lessOptions: {
    //         modifyVars: { '@primary-color': '#1DA57A' },
    //         javascriptEnabled: true,
    //       },
    //     },
    //   },
    // },
    // 方案2、配置Antd主题
    // {
    //   plugin: CracoAntDesignPlugin,
    //   options: {
    //     customizeTheme: {
    //       '@primary-color': '#FF061C'
    //     }
    //   }
    // },
    // 方案3、配置Antd主题
    {
      plugin: CracoAntDesignPlugin,
      options: {
        customizeThemeLessPath: path.join(__dirname, 'antd.customize.less'),
      },
    },
  ],
  //   devServer: {
  //     port: 9000,
  //     proxy: {
  //       "/api": {
  //         target: "https://placeholder.com/",
  //         changeOrigin: true,
  //         secure: false,
  //         xfwd: false,
  //       },
  //     },
  //   },
};
