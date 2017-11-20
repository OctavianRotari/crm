/**
 * @author: Atyantik Technologies Private Limited
 */
import webpack from "webpack";
/**
 * Get path from nodejs
 */
import path from "path";

import fs from "fs";

import {
  buildDir, buildPublicPath, coreRootDir, coreSrcDir, distDir, rootDir, srcDir,
  srcPublicDir,
} from "../../directories";

let entries = {};

const isolateVendorScripts = false;

const rules = [
  {
    test: /pages(\/|\\).*\.jsx?$/,
    include: [
      srcDir,
      coreSrcDir
    ],
    use: [
      {
        loader: "babel-loader",
      },
      {
        loader: "route-loader",
      }
    ]
  },
  // Rules for js or jsx files. Use the babel loader.
  // Other babel configuration can be found in .babelrc
  {
    test: /\.jsx?$/,
    include: [
      srcDir,
      coreSrcDir
    ],
    use: [
      {
        loader: "babel-loader",
      }
    ]
  },
  
  // Managing fonts
  {
    test: /\.(eot|ttf|woff|woff2)$/,
    use: "file-loader?outputPath=fonts/&name=[hash].[ext]"
  },
  
  // Manage images
  {
    test: /\.(jpe?g|png|svg|gif|webp)$/i,
    // match one of the loader's main parameters (sizes and placeholder)
    resourceQuery: /[?&](sizes|placeholder)(=|&|\[|$)/i,
    use: [
      "pwa-srcset-loader",
    ]
  },
  {
    test: /\.(jpe?g|png|gif|svg|webp)$/i,
    // match one of the loader's main parameters (sizes and placeholder)
    use: [
      `file-loader?outputPath=images/&name=[path][hash].[ext]&context=${srcDir}`
    ]
  },
];

const commonStylePath = path.join(srcDir, "resources", "css", "style.scss");
const hasCommonStyle = fs.existsSync(commonStylePath);

const commonClientConfig = {
  name: "common-client",
  // The base directory, an absolute path, for resolving entry points
  // and loaders from configuration. Lets keep it to /src
  context: srcDir,
  
  // The point or points to enter the application. At this point the
  // application starts executing. If an array is passed all items will
  // be executed.
  entry: Object.assign({}, {
    "client": [
      "babel-polyfill",
      "react-hot-loader/patch",
      path.join(coreSrcDir, "client/dev.client.js"),
      "webpack-hot-middleware/client?name=common-client&path=/__hmr_update&timeout=2000&overlay=true"
    ],
    ...(hasCommonStyle ? {
      "common-style": commonStylePath
    }: {})
  }, entries),
  
  //These options determine how the different types of modules within
  // a project will be treated.
  module: {
    rules,
  },
  output: {
    
    // Output everything in build folder (dist/public/build)
    path: buildDir,
    
    // The file name to output
    filename: "[name].[hash].bundle.js",
    
    // public path is assets path
    publicPath: buildPublicPath,
  },
  
  resolve: {
    modules: [
      "node_modules",
      path.resolve(path.join(coreRootDir, "node_modules")),
    ],
    alias: {
      core: coreSrcDir,
      src: srcDir
    }
  },
  resolveLoader: {
    modules: [
      "node_modules",
      path.resolve(path.join(coreRootDir, "node_modules")),
      path.resolve(path.join(coreSrcDir, "webpack", "loaders"))
    ]
  },
  
  devServer: {
    // Do not open browser when dev server is started
    open: false,
    
    // the base of content, in our case its the "src/public" folder
    contentBase: srcPublicDir,
    
    compress: false,
    
    // Show errors and warning on overlap
    overlay: {
      warnings: true,
      errors: true
    },
  },
  
  devtool: "eval-source-map",
  
  plugins: [
  
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development"),
    }),
    
    // Hot module replacement for getting latest updates
    // thus no reload required
    new webpack.HotModuleReplacementPlugin(),
    
    // Create common chunk of data
    // Break data in common so that we have minimum data to load
    ...(
      isolateVendorScripts ? [
        new webpack.optimize.CommonsChunkPlugin({
          name: "commons-vendor",
          filename: "common-0-vendor-[hash].js",
          minChunks: function (module) {
            
            if(module.resource && (/^.*\.(css|scss|sass)$/).test(module.resource)) {
              return false;
            }
            
            // this assumes your vendor imports exist in the node_modules directory
            return module.context &&
              (
                module.context.indexOf("node_modules") !== -1 ||
                (module.resource && module.resource.indexOf("/src/client") !== -1)
              );
          },
        })
      ]: []
    ),
    
    // Enable no errors plugin
    new webpack.NoEmitOnErrorsPlugin(),
  ]
};

/**
 * Service worker need to only worry about JavaScript, other thing should be
 * available via cache or install activity
 */
const serviceWorkerConfig = {
  name: "service-worker",
  // The base directory, an absolute path, for resolving entry points
  // and loaders from configuration. Lets keep it to /src
  context: srcDir,
  
  // The point or points to enter the application. At this point the
  // application starts executing. If an array is passed all items will
  // be executed.
  entry: Object.assign({}, {
    "service-worker": [
      "babel-polyfill",
      path.join(srcDir, "service-worker.js"),
    ]
  }),
  
  //These options determine how the different types of modules within
  // a project will be treated.
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          srcDir,
          coreSrcDir
        ],
        use: [
          {
            loader: "babel-loader",
          }
        ]
      },
    ],
  },
  output: {
    
    // Output everything in build folder (dist)
    path: distDir,
    
    // The file name to output
    filename: "[name].js",
    
    // public path is assets path
    publicPath: "/",
  },
  
  resolve: {
    modules: [
      "node_modules",
      path.resolve(path.join(coreRootDir, "node_modules"))
    ],
    alias: {
      core: coreSrcDir,
      src: srcDir
    }
  },
  
  devtool: "eval-source-map",
  
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development"),
    }),
    // Enable no errors plugin
    new webpack.NoEmitOnErrorsPlugin(),
  ]
};

export default [commonClientConfig, serviceWorkerConfig];
