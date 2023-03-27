const path = require('path')
require('dotenv').config({
  path: `.env`,
})

exports.onCreateWebpackConfig = ({ actions, stage, loaders }) => {
  const config = {
    node: {
      fs: 'empty',
    },
    resolve: {
      alias: {
        '@images': path.resolve(__dirname, 'src/images'),
        '@videos': path.resolve(__dirname, 'src/videos'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@containers': path.resolve(__dirname, 'src/containers'),
        '@context': path.resolve(__dirname, 'src/context'),
        '@fonts': path.resolve(__dirname, 'src/fonts'),
        '@provider': path.resolve(__dirname, 'src/provider'),
        '@hooks': path.resolve(__dirname, 'src/hooks'),
        '@containers': path.resolve(__dirname, 'src/containers'),
        '@pages': path.resolve(__dirname, 'src/pages'),
        '@templates': path.resolve(__dirname, 'src/templates'),
        '@utils': path.resolve(__dirname, 'src/utils'),
        '@themes': path.resolve(__dirname, 'src/themes'),
        '@styles': path.resolve(__dirname, 'src/styles'),
        '@constants': path.resolve(__dirname, 'src/constants'),
        '@config': path.resolve(__dirname, 'config/index'),
        '@featureflags': path.resolve(__dirname, 'featureflags/index.js'),
      },
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
  }
  actions.setWebpackConfig(config)
}
