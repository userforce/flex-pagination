import vue from 'rollup-plugin-vue';
import commonjs from 'rollup-plugin-commonjs';

export default {
    input: 'src/js/index.js',
    output: {
        format: 'umd',
        file: 'dist/js/flex-pagination.js',
        compact: true,
        name: 'FlexPagination',
    },
    plugins: [
        commonjs(),
        vue()
    ],
}