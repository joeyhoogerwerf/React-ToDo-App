(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"C:\\Users\\Rembrandt\\Desktop\\sites\\react-test-3\\node_modules\\fbjs\\lib\\invariant.js":[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule invariant
 */

'use strict';

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function (condition, format, a, b, c, d, e, f) {
  if (process.env.NODE_ENV !== 'production') {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error('Invariant Violation: ' + format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

module.exports = invariant;
}).call(this,require('_process'))
},{"_process":"C:\\Users\\Rembrandt\\Desktop\\sites\\react-test-3\\node_modules\\process\\browser.js"}],"C:\\Users\\Rembrandt\\Desktop\\sites\\react-test-3\\node_modules\\fbjs\\lib\\keyOf.js":[function(require,module,exports){
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule keyOf
 */

/**
 * Allows extraction of a minified key. Let's the build system minify keys
 * without losing the ability to dynamically use key strings as values
 * themselves. Pass in an object with a single key/val pair and it will return
 * you the string key of that single record. Suppose you want to grab the
 * value for a key 'className' inside of an object. Key/val minification may
 * have aliased that key to be 'xa12'. keyOf({className: null}) will return
 * 'xa12' in that case. Resolve keys you want to use once at startup time, then
 * reuse those resolutions.
 */
"use strict";

var keyOf = function (oneKeyObj) {
  var key;
  for (key in oneKeyObj) {
    if (!oneKeyObj.hasOwnProperty(key)) {
      continue;
    }
    return key;
  }
  return null;
};

module.exports = keyOf;
},{}],"C:\\Users\\Rembrandt\\Desktop\\sites\\react-test-3\\node_modules\\process\\browser.js":[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        setTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],"C:\\Users\\Rembrandt\\Desktop\\sites\\react-test-3\\node_modules\\react-addons-update\\index.js":[function(require,module,exports){
module.exports = require('react/lib/update');
},{"react/lib/update":"C:\\Users\\Rembrandt\\Desktop\\sites\\react-test-3\\node_modules\\react\\lib\\update.js"}],"C:\\Users\\Rembrandt\\Desktop\\sites\\react-test-3\\node_modules\\react\\lib\\Object.assign.js":[function(require,module,exports){
/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule Object.assign
 */

// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.assign

'use strict';

function assign(target, sources) {
  if (target == null) {
    throw new TypeError('Object.assign target cannot be null or undefined');
  }

  var to = Object(target);
  var hasOwnProperty = Object.prototype.hasOwnProperty;

  for (var nextIndex = 1; nextIndex < arguments.length; nextIndex++) {
    var nextSource = arguments[nextIndex];
    if (nextSource == null) {
      continue;
    }

    var from = Object(nextSource);

    // We don't currently support accessors nor proxies. Therefore this
    // copy cannot throw. If we ever supported this then we must handle
    // exceptions and side-effects. We don't support symbols so they won't
    // be transferred.

    for (var key in from) {
      if (hasOwnProperty.call(from, key)) {
        to[key] = from[key];
      }
    }
  }

  return to;
}

module.exports = assign;
},{}],"C:\\Users\\Rembrandt\\Desktop\\sites\\react-test-3\\node_modules\\react\\lib\\update.js":[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule update
 */

/* global hasOwnProperty:true */

'use strict';

var assign = require('./Object.assign');
var keyOf = require('fbjs/lib/keyOf');
var invariant = require('fbjs/lib/invariant');
var hasOwnProperty = ({}).hasOwnProperty;

function shallowCopy(x) {
  if (Array.isArray(x)) {
    return x.concat();
  } else if (x && typeof x === 'object') {
    return assign(new x.constructor(), x);
  } else {
    return x;
  }
}

var COMMAND_PUSH = keyOf({ $push: null });
var COMMAND_UNSHIFT = keyOf({ $unshift: null });
var COMMAND_SPLICE = keyOf({ $splice: null });
var COMMAND_SET = keyOf({ $set: null });
var COMMAND_MERGE = keyOf({ $merge: null });
var COMMAND_APPLY = keyOf({ $apply: null });

var ALL_COMMANDS_LIST = [COMMAND_PUSH, COMMAND_UNSHIFT, COMMAND_SPLICE, COMMAND_SET, COMMAND_MERGE, COMMAND_APPLY];

var ALL_COMMANDS_SET = {};

ALL_COMMANDS_LIST.forEach(function (command) {
  ALL_COMMANDS_SET[command] = true;
});

function invariantArrayCase(value, spec, command) {
  !Array.isArray(value) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'update(): expected target of %s to be an array; got %s.', command, value) : invariant(false) : undefined;
  var specValue = spec[command];
  !Array.isArray(specValue) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'update(): expected spec of %s to be an array; got %s. ' + 'Did you forget to wrap your parameter in an array?', command, specValue) : invariant(false) : undefined;
}

function update(value, spec) {
  !(typeof spec === 'object') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'update(): You provided a key path to update() that did not contain one ' + 'of %s. Did you forget to include {%s: ...}?', ALL_COMMANDS_LIST.join(', '), COMMAND_SET) : invariant(false) : undefined;

  if (hasOwnProperty.call(spec, COMMAND_SET)) {
    !(Object.keys(spec).length === 1) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Cannot have more than one key in an object with %s', COMMAND_SET) : invariant(false) : undefined;

    return spec[COMMAND_SET];
  }

  var nextValue = shallowCopy(value);

  if (hasOwnProperty.call(spec, COMMAND_MERGE)) {
    var mergeObj = spec[COMMAND_MERGE];
    !(mergeObj && typeof mergeObj === 'object') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'update(): %s expects a spec of type \'object\'; got %s', COMMAND_MERGE, mergeObj) : invariant(false) : undefined;
    !(nextValue && typeof nextValue === 'object') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'update(): %s expects a target of type \'object\'; got %s', COMMAND_MERGE, nextValue) : invariant(false) : undefined;
    assign(nextValue, spec[COMMAND_MERGE]);
  }

  if (hasOwnProperty.call(spec, COMMAND_PUSH)) {
    invariantArrayCase(value, spec, COMMAND_PUSH);
    spec[COMMAND_PUSH].forEach(function (item) {
      nextValue.push(item);
    });
  }

  if (hasOwnProperty.call(spec, COMMAND_UNSHIFT)) {
    invariantArrayCase(value, spec, COMMAND_UNSHIFT);
    spec[COMMAND_UNSHIFT].forEach(function (item) {
      nextValue.unshift(item);
    });
  }

  if (hasOwnProperty.call(spec, COMMAND_SPLICE)) {
    !Array.isArray(value) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected %s target to be an array; got %s', COMMAND_SPLICE, value) : invariant(false) : undefined;
    !Array.isArray(spec[COMMAND_SPLICE]) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'update(): expected spec of %s to be an array of arrays; got %s. ' + 'Did you forget to wrap your parameters in an array?', COMMAND_SPLICE, spec[COMMAND_SPLICE]) : invariant(false) : undefined;
    spec[COMMAND_SPLICE].forEach(function (args) {
      !Array.isArray(args) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'update(): expected spec of %s to be an array of arrays; got %s. ' + 'Did you forget to wrap your parameters in an array?', COMMAND_SPLICE, spec[COMMAND_SPLICE]) : invariant(false) : undefined;
      nextValue.splice.apply(nextValue, args);
    });
  }

  if (hasOwnProperty.call(spec, COMMAND_APPLY)) {
    !(typeof spec[COMMAND_APPLY] === 'function') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'update(): expected spec of %s to be a function; got %s.', COMMAND_APPLY, spec[COMMAND_APPLY]) : invariant(false) : undefined;
    nextValue = spec[COMMAND_APPLY](nextValue);
  }

  for (var k in spec) {
    if (!(ALL_COMMANDS_SET.hasOwnProperty(k) && ALL_COMMANDS_SET[k])) {
      nextValue[k] = update(value[k], spec[k]);
    }
  }

  return nextValue;
}

module.exports = update;
}).call(this,require('_process'))
},{"./Object.assign":"C:\\Users\\Rembrandt\\Desktop\\sites\\react-test-3\\node_modules\\react\\lib\\Object.assign.js","_process":"C:\\Users\\Rembrandt\\Desktop\\sites\\react-test-3\\node_modules\\process\\browser.js","fbjs/lib/invariant":"C:\\Users\\Rembrandt\\Desktop\\sites\\react-test-3\\node_modules\\fbjs\\lib\\invariant.js","fbjs/lib/keyOf":"C:\\Users\\Rembrandt\\Desktop\\sites\\react-test-3\\node_modules\\fbjs\\lib\\keyOf.js"}],"C:\\Users\\Rembrandt\\Desktop\\sites\\react-test-3\\src\\js\\AddToDoButton.jsx":[function(require,module,exports){
'use strict';

var React = require('react');
var update = require('react-addons-update');

var AddToDoButton = React.createClass({
	displayName: 'AddToDoButton',

	_createToDo: function _createToDo() {
		console.log('ATDB: create todo...');
		//var savedToDos = JSON.parse(localStorage.getItem('todos'));
		//if(!savedToDos) savedToDos = [];

		var todos = update(this.props.todos, {
			$push: [{ id: Date.now(), text: '' }]
		});

		this.props.onToDosChange(todos);

		//savedToDos.push({id: Date.now(), text: ''});
		//localStorage.setItem('todos', JSON.stringify(todos));
		//this.setState({todos: todos});
	},
	render: function render() {
		return React.createElement(
			'button',
			{ onClick: this._createToDo },
			'Add ToDo'
		);
	}
});

AddToDoButton.propTypes = {
	todos: React.PropTypes.array
};

module.exports = AddToDoButton;

},{"react":"react","react-addons-update":"C:\\Users\\Rembrandt\\Desktop\\sites\\react-test-3\\node_modules\\react-addons-update\\index.js"}],"C:\\Users\\Rembrandt\\Desktop\\sites\\react-test-3\\src\\js\\App.jsx":[function(require,module,exports){
'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var update = require('react-addons-update');
var ToDoList = require('./ToDoList.jsx');
var AddToDoButton = require('./AddToDoButton.jsx');

var App = React.createClass({
	displayName: 'App',

	getInitialState: function getInitialState() {
		return { todos: [] };
	},
	_handleToDosChange: function _handleToDosChange(todos) {
		localStorage.setItem('todos', JSON.stringify(todos));
		this.setState({ todos: todos });
	},
	componentDidMount: function componentDidMount() {
		var savedToDos = localStorage.getItem('todos');
		if (savedToDos) this.setState({ todos: JSON.parse(savedToDos) });
	},
	render: function render() {
		console.log('render');

		return React.createElement(
			'div',
			{ className: 'todo-app' },
			React.createElement(
				'h1',
				null,
				'ToDo List'
			),
			React.createElement(ToDoList, { todos: this.state.todos, onToDosChange: this._handleToDosChange }),
			React.createElement(AddToDoButton, { todos: this.state.todos, onToDosChange: this._handleToDosChange })
		);
	}
});

ReactDOM.render(React.createElement(App, null), document.getElementById('content')); //

},{"./AddToDoButton.jsx":"C:\\Users\\Rembrandt\\Desktop\\sites\\react-test-3\\src\\js\\AddToDoButton.jsx","./ToDoList.jsx":"C:\\Users\\Rembrandt\\Desktop\\sites\\react-test-3\\src\\js\\ToDoList.jsx","react":"react","react-addons-update":"C:\\Users\\Rembrandt\\Desktop\\sites\\react-test-3\\node_modules\\react-addons-update\\index.js","react-dom":"react-dom"}],"C:\\Users\\Rembrandt\\Desktop\\sites\\react-test-3\\src\\js\\ToDoItem.jsx":[function(require,module,exports){
'use strict';

var React = require('react');
var update = require('react-addons-update');

var ToDoItem = React.createClass({
	displayName: 'ToDoItem',

	_handleUpdateToDo: function _handleUpdateToDo(e) {
		var todo = update(this.props, {
			text: { $set: e.target.value }
		});
		this.props.handleUpdateToDo(todo);
	},
	_handleDeleteToDo: function _handleDeleteToDo() {
		this.props.handleDeleteToDo(this.props.index);
	},
	render: function render() {
		return React.createElement(
			'li',
			null,
			React.createElement('input', { type: 'text', placeholder: 'Type something..', key: this.props.id, value: this.props.text, onChange: this._handleUpdateToDo }),
			React.createElement(
				'button',
				{ onClick: this._handleDeleteToDo },
				'x'
			)
		);
	}
});

ToDoItem.propTypes = {
	handleUpdateToDo: React.PropTypes.func,
	handleDeleteToDo: React.PropTypes.func,
	id: React.PropTypes.number,
	text: React.PropTypes.string
};

module.exports = ToDoItem;

},{"react":"react","react-addons-update":"C:\\Users\\Rembrandt\\Desktop\\sites\\react-test-3\\node_modules\\react-addons-update\\index.js"}],"C:\\Users\\Rembrandt\\Desktop\\sites\\react-test-3\\src\\js\\ToDoList.jsx":[function(require,module,exports){
'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var React = require('react');
var update = require('react-addons-update');
var ToDoItem = require('./ToDoItem.jsx');

var ToDoList = React.createClass({
	displayName: 'ToDoList',

	_handleUpdateToDo: function _handleUpdateToDo(todo) {
		console.log('updating todo...');
		var todos = update(this.props.todos, _defineProperty({}, todo.index, {
			$set: todo
		}));
		this.props.onToDosChange(todos);
	},
	_handleDeleteToDo: function _handleDeleteToDo(index) {
		console.log('deleting todo...');
		var todos = update(this.props.todos, {
			$splice: [[index, 1]]
		});
		this.props.onToDosChange(todos);
	},
	render: function render() {

		var todos = this.props.todos.map((function (todo, i) {
			return React.createElement(ToDoItem, { key: todo.id, index: i, id: todo.id, text: todo.text, handleUpdateToDo: this._handleUpdateToDo, handleDeleteToDo: this._handleDeleteToDo });
		}).bind(this));

		return React.createElement(
			'ul',
			{ className: 'todo-list' },
			todos
		);
	}
});

ToDoList.propTypes = {
	todos: React.PropTypes.array
};

module.exports = ToDoList;

},{"./ToDoItem.jsx":"C:\\Users\\Rembrandt\\Desktop\\sites\\react-test-3\\src\\js\\ToDoItem.jsx","react":"react","react-addons-update":"C:\\Users\\Rembrandt\\Desktop\\sites\\react-test-3\\node_modules\\react-addons-update\\index.js"}]},{},["C:\\Users\\Rembrandt\\Desktop\\sites\\react-test-3\\src\\js\\App.jsx"]);
