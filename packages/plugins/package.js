Package.describe({
	name: 'convexset:plugins',
	version: '0.1.0',
	summary: 'A tool for building simple plugin frameworks',
	git: 'https://github.com/convexset/meteor-plugins',
	documentation: '../../README.md'
});


Package.onUse(function(api) {
	api.versionsFrom('1.2.0.2');

	api.use(
		[
			'ecmascript', 'underscore', 'check', 'ejson',
			'convexset:package-utils@0.1.8',
		]
	);
	api.addFiles(['plugins.js']);
	api.export('Plugins');
});
