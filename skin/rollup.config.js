import template from 'rollup-plugin-generate-html-template';
import scss from 'rollup-plugin-scss';
import autoprefixer from 'autoprefixer'
import postcss from 'rollup-plugin-postcss-modules'
// import sourceMaps from 'rollup-plugin-sourcemaps'
import { terser } from "rollup-plugin-terser";
export default [
  {
    input: './src/user.js',
    output: {
      file: `./dist/user.js`,
      format: 'esm'
    },
    plugins: [
      // uglify(),
      terser(),
      scss({
        output: `./dist/user.css`
      }),
      postcss({
        plugins: [autoprefixer()]
      }),
      template({
        template: './public/user.html',
        target: './dist/user.html',
      })
    ]
  },
  {
    input: './src/upload.js',
    output: {
      file: `./dist/upload.js`,
      format: 'esm'
    },
    plugins: [
      terser(),
      scss({
        output: `./dist/upload.css`
      }),
      postcss({
        plugins: [autoprefixer()]
      }),
      template({
        template: './public/upload.html',
        target: './dist/upload.html',
      })
    ]
  },
  {
    input: './src/skin.js',
    output: {
        file: `./dist/skin-upload.js`,
        format: 'esm'
    },
    plugins: [
      terser(),
      scss({
        output: `./dist/skin-upload.css`
      }),
      postcss({
        plugins: [autoprefixer()]
      }),
      template({
        template: './public/skin-upload.html',
        target: './dist/skin-upload.html',
      })
    ]
  }
];
