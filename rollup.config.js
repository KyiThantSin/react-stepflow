import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import dts from 'rollup-plugin-dts';

export default [
	{
	input : 'src/index.ts',
		output: [
			{
				file: 'dist/index.js',
				format: 'cjs',
				sourcemap: true,
      			exports: 'named',
			},
			{
				file: 'dist/index.esm.js',
        		format: 'esm',
        		sourcemap: true,
        		exports: 'named',
			},
		],
		plugins : [
			peerDepsExternal(),
			resolve(),
			commonjs(),
			typescript({
				tsconfig: './tsconfig.json',
				exclude: [
					'**/__tests__/**', 
					'**/*.test.ts', 
					'**/*.test.tsx',
					'**/stories/**',
					'**/*.stories.ts',
					'**/*.stories.tsx',
					'.storybook/**',
					'**/setupTests.ts',
					'**/setupTests.js'
				],
			}),
			postcss({
				extensions:['.css'],
				minimize: true,
				inject:{insertAt: 'top'},
				extract:false,
			}),
			terser(),
		],
		external:['react','react-dom'],
	},
	{
		input: 'src/index.ts',
		output: [{ file: 'dist/index.d.ts', format: 'esm' }],
		plugins: [dts()],
		external: [/\.css$/],
	},
]