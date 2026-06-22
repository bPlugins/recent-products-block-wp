const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const ESLintPlugin = require('eslint-webpack-plugin');
const webpack = require('webpack');

const plugins = defaultConfig.plugins.filter(p => {
	if (Object.values(p).length === 2 && Object.values(p)?.[1]['filename'] && Object.values(p)?.[1]['filename'] === '[name]-rtl.css') {
		return false;
	}
	return true;
});

/**
 * Custom webpack plugin to remove @import url() rules that load remote Google Fonts.
 * Required for WordPress.org compliance — plugins must not load remote CSS/JS assets.
 * This strips the import from the final built CSS without modifying the shared bpl-tools library.
 */
class RemoveGoogleFontsPlugin {
	apply(compiler) {
		compiler.hooks.compilation.tap('RemoveGoogleFontsPlugin', (compilation) => {
			compilation.hooks.processAssets.tap(
				{
					name: 'RemoveGoogleFontsPlugin',
					stage: webpack.Compilation.PROCESS_ASSETS_STAGE_OPTIMIZE_SIZE,
				},
				(assets) => {
					Object.keys(assets).forEach((filename) => {
						if (filename.endsWith('.css')) {
							const source = assets[filename].source();
							const updated = source.replace(
								/@import\s+url\([^)]*fonts\.googleapis\.com[^)]*\);?/gi,
								'/* Google Fonts import removed for WordPress.org compliance */'
							);
							if (source !== updated) {
								assets[filename] = new webpack.sources.RawSource(updated);
							}
						}
					});
				}
			);
		});
	}
}

module.exports = {
	...defaultConfig,
	entry: {
		...defaultConfig.entry(),
		'admin-dashboard': './src/admin/dashboard.js',
		'admin-post': './src/admin/post.js'
	} ,
	plugins: [
		...plugins,
		new ESLintPlugin(),
		new RemoveGoogleFontsPlugin()
	],
	optimization: {}
};