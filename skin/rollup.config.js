import template from 'rollup-plugin-generate-html-template';
import scss from 'rollup-plugin-scss';
import autoprefixer from 'autoprefixer'
import postcss from 'rollup-plugin-postcss-modules'
// import sourceMaps from 'rollup-plugin-sourcemaps'
import { terser } from "rollup-plugin-terser";
export default [
  {
    input: './src/ie/auth/user.js',
    output: {
      file: `./dist/auth/user.js`,
      format: 'esm'
    },
    plugins: [
      // uglify(),
      terser(),
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
    input: './src/ie/auth/upload.js',
    output: {
      file: `./dist/auth/upload.js`,
      format: 'esm'
    },
    plugins: [
      terser(),
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
  },
  {
    input: './src/ie/skin/skin.js',
    output: {
        file: `./dist/ie/skin-upload.js`,
        format: 'esm'
    },
    plugins: [
      terser(),
      scss({
        output: `./dist/ie/upload.css`
      }),
      postcss({
        plugins: [autoprefixer()]
      }),
      template({
        template: './public/ie/skin-upload.html',
        target: './dist/ie/skin-upload.html',
      })
    ]
  }
];
