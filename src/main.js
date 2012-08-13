//- JavaScript source code

//- main.js ~~
//
//  This program's main purpose is to provide an interactive environment for
//  using the QMachine web service, but it is by no means feature-complete.
//  It doesn't load "q.js" dynamically anymore -- that task has been replaced
//  by a script tag load in the HTML page:
//
//      <script src="http://qmachine.org/q.js"></script>
//
//  NOTE: For maximum performance in your own app, embed "q-min.js", which is
//  a minified, optimized version of "q.js". Typically, I use either Google's
//  Closure compiler or else the YUI Compressor to produce this version. I
//  make it available out of the goodness of my heart (what little there is),
//  but I will not respond to bug reports that cannot be reproduced in "q.js"
//  because I am not an active developer for either of the optimizers.
//
//                                                      ~~ (c) SRW, 23 May 2012
//                                                  ~~ last updated 13 Aug 2012

(function (global) {
    'use strict';

 // Pragmas

    /*jslint indent: 4, maxlen: 80 */

    /*global jQuery: false */

    /*properties
        Q, blur, box, call, click, console, document, error, exit, getItem,
        global, hasOwnProperty, is, jQuery, join, key, keydown, localStorage,
        log, onerror, onready, preventDefault, prototype, ready, setItem,
        setTimeout, stay, val, value, volunteer, which
    */

 // Prerequisites

    if (global.hasOwnProperty('jQuery') === false) {
        throw new Error('jQuery is missing.');
    }

    if (Object.prototype.hasOwnProperty('Q') === false) {
        throw new Error('Method Q is missing.');
    }

 // Declarations

    var $, Q, isFunction, jserr, jsout, volunteer;

 // Definitions

    $ = global.jQuery;

    Q = Object.prototype.Q;

    isFunction = function (f) {
     // This function returns `true` only if and only if `f` is a function.
     // The second condition is necessary to return `false` for a regular
     // expression in some of the older browsers.
        return ((typeof f === 'function') && (f instanceof Function));
    };

    jserr = function () {
     // This function needs documentation.
        if ((global.hasOwnProperty('console')) &&
                isFunction(global.console.error)) {
            global.console.error(Array.prototype.join.call(arguments, ' '));
        }
        return;
    };

    jsout = function () {
     // This function needs documentation.
        if ((global.hasOwnProperty('console')) &&
                isFunction(global.console.log)) {
            global.console.log(Array.prototype.join.call(arguments, ' '));
        }
        return;
    };

    volunteer = function () {
     // This function needs documentation.
        if ($('#QM-volunteer-input').is(':checked') === false) {
            return;
        }
        var task = Q.volunteer();
        task.onerror = function (message) {
         // This function needs documentation.
            if (message !== 'Nothing to do ...') {
                jserr('Error:', message);
            }
            global.setTimeout(volunteer, 1000);
            return;
        };
        task.onready = function (evt) {
         // This function needs documentation.
            jsout('Done:', this.key);
            global.setTimeout(volunteer, 1000);
            return evt.exit();
        };
        return;
    };

 // Invocations

    $(global.document).ready(function () {
     // This function needs documentation.
        if (global.hasOwnProperty('localStorage')) {
         // Here, we load a user's previous settings if they are available.
            if (global.localStorage.hasOwnProperty('QM_box')) {
                Q.box = global.localStorage.getItem('QM_box');
            }
        }
        $('#QM-box-input').blur(function () {
         // This function needs documentation.
            Q.box = this.value;
            return;
        }).keydown(function (evt) {
         // This function needs documentation.
            if (evt.which === 13) {
                evt.preventDefault();
                $(this).blur();
            }
            return;
        }).Q(function (evt) {
         // This function synchronizes the jQuery object that represents the
         // input element directly with QM's `box` property using Quanah's own
         // event loop. Thankfully, this function won't distribute to another
         // machine because it closes over `Q.box` :-)
            if (this.val.is(':focus') === false) {
                this.val.val(Q.box);
            }
            if (global.hasOwnProperty('localStorage')) {
             // We assume here that HTML5 localStorage has not been tampered
             // with. Super-secure code isn't necessary here because the value
             // of `Q.box` is already publicly available anyway.
                global.localStorage.setItem('QM_box', Q.box);
            }
            return evt.stay('This task repeats indefinitely.');
        });
        $('#QM-volunteer-input').click(volunteer);
        return;
    });

 // That's all, folks!

    return;

}(Function.prototype.call.call(function (that) {
    'use strict';
 // See the bottom of "quanah.js" for documentation.
    /*jslint indent: 4, maxlen: 80 */
    /*global global: true */
    if (this === null) {
        return (typeof global === 'object') ? global : that;
    }
    return (typeof this.global === 'object') ? this.global : this;
}, null, this)));

//- vim:set syntax=javascript:
