import template from 'rollup-plugin-generate-html-template';
import scss from 'rollup-plugin-scss';
import autoprefixer from 'autoprefixer'
import postcss from 'rollup-plugin-postcss-modules'
// import sourceMaps from 'rollup-plugin-sourcemaps'
import { uglify } from "rollup-plugin-uglify";
export default [
  // 公共样式
  {
    input: './src/index.js',
    output: {
      file: `./dist/index.js`,
      format: 'esm'
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
  },
  {
    input: './src/soft/intro.js',
    output: {
        file: `./dist/soft/intro.js`,
        format: 'esm'
    },
    plugins: [
      uglify(),
      scss({
        output: `./dist/soft/intro.css`
      }),
      postcss({
        plugins: [autoprefixer()]
      }),
      template({
        template: './public/soft/intro.html',
        target: './dist/soft/intro.html',
      })
    ]
  },
  {
    input: './src/auth/upload.js',
    output: {
      file: `./dist/auth/upload.js`,
      format: 'esm'
    },
    plugins: [
      uglify(),
      scss({
        output: `./dist/auth/upload.css`
      }),
      postcss({
        plugins: [autoprefixer()]
      }),
      template({
        template: './public/auth/upload.html',
        target: './dist/auth/upload.html',
      })
    ]
  }
];
