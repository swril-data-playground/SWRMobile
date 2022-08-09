module.exports = function (api) {
	api.cache(true)
	return {
		presets: ['babel-preset-expo'],
		plugins: [
			[
				'module-resolver',
				{
					alias: {
						// This needs to be mirrored in tsconfig.json
						src: './src',
						assets: './assets',
						data: './src/data',
						types: './src/types',
						contexts: './src/contexts',
						utils: './src/utils',
						components: './src/app/components',
						screens: './src/app/screens',
						styles: './src/app/styles',
					},
				},
			],
		],
	}
}
