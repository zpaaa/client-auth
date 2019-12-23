import template from 'rollup-plugin-generate-html-template';
import scss from 'rollup-plugin-scss';
import autoprefixer from 'autoprefixer'
import postcss from 'rollup-plugin-postcss-modules'
// import sourceMaps from 'rollup-plugin-sourcemaps'
import { uglify } from "rollup-plugin-uglify";
export default [
  {
    input: './src/style/reset.scss',
    output: {
      file: `./dist/common.css`,
      format: 'cjs'
    },
    plugins: [
      uglify(),
      scss({
        output: `./dist/common.css`
      }),
      postcss({
        plugins: [autoprefixer()]
      })
    ]
  },
  {
    input: './src/auth/user.js',
    output: {
        file: `./dist/auth/user.js`,
        format: 'esm'
    },
    plugins: [
      uglify(),
      scss({
        output: `./dist/auth/user.css`
      }),
      postcss({
        plugins: [autoprefixer()]
      }),
      template({
        template: './public/auth/user.html',
        target: './dist/auth/user.html',
      })
    ]
  }
];
