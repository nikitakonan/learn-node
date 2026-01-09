import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';

export default {
  input: 'public/javascripts/delicious-app.js',
  output: {
    file: 'public/dist/App.bundle.js',
    format: 'iife',
    sourcemap: true,
  },
  watch: {
    clearScreen: false,
  },
  plugins: [
    resolve({
      browser: true,
    }),
    commonjs(),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      presets: [
        [
          '@babel/preset-env',
          {
            targets: 'last 3 versions',
          },
        ],
      ],
    }),
    postcss({
      extract: 'style.css',
      sourceMap: true,
      use: ['sass'],
      plugins: [autoprefixer],
    }),
  ],
};
