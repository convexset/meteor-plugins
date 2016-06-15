Package.describe({
	name: 'convexset:plugins',
	version: '0.1.0_3',
	summary: 'A tool for building simple plugin frameworks',
	git: 'https://github.com/convexset/meteor-plugins',
	documentation: '../../README.md'
});


Package.onUse(function(api) {
	api.versionsFrom('1.3.1');

	api.use(
		[
			'ecmascript', 'check', 'ejson',
			'tmeasday:check-npm-versions@0.3.1'
		]
	);
	api.addFiles(['plugins.js']);
	api.export('Plugins');
});
