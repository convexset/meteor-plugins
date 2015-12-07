# Plugins

This Meteor package is a simple framework for building plug-ins.


## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Install](#install)
- [Plugin Registration](#plugin-registration)
- [Load/Unload](#loadunload)
- [Methods](#methods)
- [Plug-in Information](#plug-in-information)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Install

This is available as [`convexset:plugins`](https://atmospherejs.com/convexset/plugins) on [Atmosphere](https://atmospherejs.com/). (Install with `meteor add convexset:plugins`.)

## Plugin Registration

Select a namespace, register a plug-in
```javascript
Plugins.register('namespace', {
    name: 'some-plugin',

    // set-up of plugin
    // bound to a plug-in specific data-context
    load: function() {
        this['data'] = {
            // ...
        };
    },

    // tear-down of plugin
    // bound to a plug-in specific data-context
    unload: function() {
        delete this['data'];
    },

    // methods
    // bound to a plug-in specific data-context
    methods: {
        data: function(item) {
            return this['data'][item];
        },
        otherMethod: function() {
            // ...
        },
    },
}, loadOnStartup);
```

## Load/Unload

Each plug-in "should" have (a possibly empty) a pair of `load` and `unload` methods.
Attached to a plug-in `plugin` is the property `plugin.isLoaded`.

The methods `load` and `unload` are called bound to a plugin-specific data context (via `this`).

## Methods

For a plug-in `plugin`, `plugin.methods` contains the methods defined at plug-in registration (see: [Plugin Registration](#plugin-registration)).
When called, they are bound (via `this`) to a plugin-specific data context.

## Plug-in Information

 - `Plugins.namespaces`: list all plug-in namespaces
 - `Plugins.listPluginsNS(ns)`: list all plug-ins in namespace `ns`
 - `Plugins.loadedPluginsNS(ns)`: list all loaded plug-ins in namespace `ns`
 - `Plugins.unloadedPluginsNS(ns)`: list all unloaded plug-ins in namespace `ns`