import template from 'rollup-plugin-generate-html-template';
import scss from 'rollup-plugin-scss';
import autoprefixer from 'autoprefixer'
import postcss from 'rollup-plugin-postcss-modules'
// import sourceMaps from 'rollup-plugin-sourcemaps'
import { uglify } from "rollup-plugin-uglify";
import { terser } from "rollup-plugin-terser";
const VER = 1;
export default [
  {
    input: './src/user.js',
    output: {
        file: `./dist/user_v${VER}.js`,
        format: 'esm'
    },
    plugins: [
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
        replaceVars: {
          '__STYLE_URL__': `user_v${VER}.css`
        }
      })
    ]
  },
  {
    input: './src/look-upload.js',
    output: {
      file: `./dist/look-upload_v${VER}.js`,
      format: 'esm'
    },
    plugins: [
      terser(),
      scss({
        output: `./dist/look-upload_v${VER}.css`
      }),
      postcss({
        plugins: [autoprefixer()]
      }),
      template({
        template: './public/look-upload.html',
        target: './dist/look-upload.html',
        replaceVars: {
          '__STYLE_URL__': `look-upload_v${VER}.css`
        }
      })
    ]
  },
  {
    input: './src/upload.js',
    output: {
      file: `./dist/upload_v${VER}.js`,
      format: 'esm'
    },
    plugins: [
      terser(),
      scss({
        output: `./dist/upload_v${VER}.css`
      }),
      postcss({
        plugins: [autoprefixer()]
      }),
      template({
        template: './public/upload.html',
        target: './dist/upload.html',
        replaceVars: {
          '__STYLE_URL__': `upload_v${VER}.css`
        }
      })
    ]
  }
];
