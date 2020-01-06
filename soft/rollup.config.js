import template from 'rollup-plugin-generate-html-template';
import scss from 'rollup-plugin-scss';
import autoprefixer from 'autoprefixer'
import postcss from 'rollup-plugin-postcss-modules'
// import sourceMaps from 'rollup-plugin-sourcemaps'
import { terser } from "rollup-plugin-terser";
// const VER = 1;
export default [
  {
    input: './src/index.js',
    output: {
      file: `./dist/index.js`,
      format: 'esm'
    },
    plugins: [
      // uglify(),
      terser(),
      scss({
        output: `./dist/index.css`
      }),
      postcss({
        plugins: [autoprefixer()]
      }),
      template({
        template: './public/index.html',
        target: './dist/index.html',
        replaceVars: {
          '__STYLE_URL__': `index.css`
        }
      })
    ]
  },
  {
    input: './src/intro.js',
    output: {
      file: `./dist/intro.js`,
      format: 'esm'
    },
    plugins: [
      // uglify(),
      terser(),
      scss({
        output: `./dist/intro.css`
      }),
      postcss({
        plugins: [autoprefixer()]
      }),
      template({
        template: './public/intro.html',
        target: './dist/intro.html',
        replaceVars: {
          '__STYLE_URL__': `intro.css`
        }
      })
    ]
  },
  {
    input: './src/upload-exe.js',
    output: {
      file: `./dist/upload-exe.js`,
      format: 'esm'
    },
    plugins: [
      // uglify(),
      terser(),
      scss({
        output: `./dist/upload-exe.css`
      }),
      postcss({
        plugins: [autoprefixer()]
      }),
      template({
        template: './public/upload-exe.html',
        target: './dist/upload-exe.html',
        replaceVars: {
          '__STYLE_URL__': `upload-exe.css`
        }
      })
    ]
  },
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
        replaceVars: {
          '__STYLE_URL__': `user.css`
        }
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
      // uglify(),
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
        replaceVars: {
          '__STYLE_URL__': `upload.css`
        }
      })
    ]
  },
];
