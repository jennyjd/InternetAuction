﻿/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
    System.config({
        paths: {
            // paths serve as alias
            'npm:': 'node_modules/'
        },
        // map tells the System loader where to look for things
        map: {
            // our app is within the app folder
            app: 'app',
            // angular bundles
            '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
            '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
            '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
            '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
            '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
            '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
            '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
            '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
            // other libraries
            'rxjs': 'npm:rxjs',
            'angular-in-memory-web-api': 'npm:angular-in-memory-web-api',
            '@angular2-material/core': 'npm:@angular2-material/core/core.umd.js',
            '@angular2-material/card': 'npm:@angular2-material/card/card.umd.js',
            '@angular2-material/button': 'npm:@angular2-material/button/button.umd.js',
            '@angular2-material/icon': 'npm:@angular2-material/icon/icon.umd.js',
            '@angular2-material/sidenav': 'npm:@angular2-material/sidenav/sidenav.umd.js',
            '@angular2-material/toolbar': 'npm:@angular2-material/toolbar/toolbar.umd.js',
            '@angular2-material/list': 'npm:@angular2-material/list/list.umd.js',
            '@angular2-material/input': 'npm:@angular2-material/input/input.umd.js',
            '@angular2-material/radio': 'npm:@angular2-material/radio/radio.umd.js',
            '@angular2-material/progress-circle': 'npm:@angular2-material/progress-circle/progress-circle.umd.js',
            '@angular2-material/tabs': 'npm:@angular2-material/tabs/tabs.umd.js',
            'angular2-image-upload': 'npm:angular2-image-upload',
            'md2': 'node_modules/md2',
            'angular2-moment': 'npm:angular2-moment',
            'moment': 'npm:moment',
            'angular2-notifications': 'node_modules/angular2-notifications'
        },
        // packages tells the System loader how to load when no filename and/or no extension
        packages: {
            app: {
                main: './main.js',
                defaultExtension: 'js'
            },
            rxjs: {
                defaultExtension: 'js'
            },
            'angular-in-memory-web-api': {
                main: './index.js',
                defaultExtension: 'js'
            },
            'angular2-image-upload': {
                main: './index.js',
                defaultExtension: 'js'
            },
            'md2': {
                format: 'cjs',
                main: 'md2.umd.js'
            },
            'moment': {
                main: './moment.js',
                defaultExtension: 'js'
            },
            'angular2-moment': {
                main: './index.js',
                defaultExtension: 'js'
            },
            'angular2-notifications': {
                main: 'components.js',
                defaultExtension: 'js'
            }
        }
    });
})(this);