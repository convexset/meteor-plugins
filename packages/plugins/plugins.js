/* global Plugins: true */

import { checkNpmVersions } from 'meteor/tmeasday:check-npm-versions';
checkNpmVersions({
  'package-utils': '^0.2.1',
  'underscore' : '^1.8.3',
});
const PackageUtilities = require('package-utils');
const _ = require('underscore');

var __plugins = function Plugins() {};

function Plugin({
	name, index, load, unload, methods
}) {
	var _pluginContext = {};
	var _loaded = false;

	// name
	PackageUtilities.addImmutablePropertyValue(this, 'name', name);

	// index
	PackageUtilities.addImmutablePropertyValue(this, 'index', index);

	// isLoaded
	PackageUtilities.addPropertyGetter(this, 'isLoaded', function isLoaded() {
		return _loaded;
	});

	// Load	
	if (typeof load !== "undefined") {
		if (!_.isFunction(load)) {
			throw new Meteor.Error('invalid-plugin', 'Invalid load function.');
		} else {
			var _load = _.bind(load, _pluginContext);
			PackageUtilities.addImmutablePropertyFunction(this, 'load', function load() {
				if (!this.isLoaded) {
					_load();
				}
				_loaded = true;
			});
		}
	} else {
		PackageUtilities.addImmutablePropertyFunction(this, 'load', function() {
			_loaded = true;
		});
	}

	// Unload
	if (typeof unload !== "undefined") {
		if (!_.isFunction(unload)) {
			throw new Meteor.Error('invalid-plugin', 'Invalid unload function.');
		} else {
			var _unload = _.bind(unload, _pluginContext);
			PackageUtilities.addImmutablePropertyFunction(this, 'unload', function unload() {
				if (this.isLoaded) {
					_unload();
				}
				_loaded = false;
			});
		}
	} else {
		PackageUtilities.addImmutablePropertyFunction(this, 'unload', function() {
			_loaded = false;
		});
	}

	// Reload
	PackageUtilities.addImmutablePropertyFunction(this, 'reload', function reload() {
		this.unload();
		this.load();
	});

	// Methods
	var _methods = {};
	if (_.isObject(methods)) {
		_.forEach(methods, function(fn, fnName) {
			if (_.isFunction(fn)) {
				PackageUtilities.addImmutablePropertyFunction(_methods, fnName, _.bind(fn, _pluginContext));
			}
		});
	}
	PackageUtilities.addImmutablePropertyObject(this, 'methods', _methods);

	return this;
}

Plugins = new __plugins();
var _plugInNamespaces = {};
PackageUtilities.addImmutablePropertyFunction(Plugins, 'register', function register(ns, plugin, loadNow) {
	if (!_.isObject(_plugInNamespaces[ns])) {
		_plugInNamespaces[ns] = [];
	}
	var thisPlugin = new Plugin({
		name: plugin.name,
		index: _plugInNamespaces[ns].length,
		load: plugin.load,
		unload: plugin.unload,
		methods: plugin.methods,
	});
	_plugInNamespaces[ns].push(thisPlugin);

	if (loadNow) {
		thisPlugin.load();
	}
});

PackageUtilities.addPropertyGetter(Plugins, 'namespaces', function listNamespaces() {
	return Object.keys(_plugInNamespaces);
});

PackageUtilities.addImmutablePropertyFunction(Plugins, 'listPluginsNS', function listPluginsNS(ns) {
	return (_plugInNamespaces[ns] || []).map(x => x);
});

PackageUtilities.addImmutablePropertyFunction(Plugins, 'loadedPluginsNS', function loadedPluginsNS(ns) {
	return (_plugInNamespaces[ns] || []).filter(x => x.isLoaded);
});

PackageUtilities.addImmutablePropertyFunction(Plugins, 'unloadedPluginsNS', function unloadedPluginsNS(ns) {
	return (_plugInNamespaces[ns] || []).filter(x => !x.isLoaded);
});