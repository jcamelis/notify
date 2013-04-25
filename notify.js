// ==ClosureCompiler==
// @compilation_level ADVANCED_OPTIMIZATIONS
// @output_file_name notify.min.js
// ==/ClosureCompiler==

(function (console) {

	function isString(object) {
		return typeof object === "string";
	}
	/**
	 * @description Will save a unique instance of TopicStack;
	 * @type {TopicStack}
	 */
	var topicStack;
	/**
	 * @private function 
	 * @param {String} topicNamspace
	 * @param {String} stackNamespace
	 * @returns {boolean}
	 */	
	function _matchOrNullNamespace(topicNamspace, stackNamespace) {
		return topicNamspace === "" || topicNamspace === stackNamespace;
	}
	/**
	 * @description List of error messages.
	 * @type JSON
	 */
	var errors = {
		DEFAULT_PARAMETERS: "Wrong parameters. Topic as String and Callback as Function are expected.",
		TOPIC_STRING_EXPECTED: "Wrong 'topic' parameter, String expected."
	};
	/**
	 * @description show an error message in console.
	 * @param {String} message
	 * @returns {void}
	 */
	function error(message) {
		return console && console.error && console.error(message);
	}
	/**
	 * @param {String} name
	 * @param {String} namespace
	 * @param {Function} callback
	 * @returns {void}
	 */
	function Topic(name, namespace, callback) {
		this.name = name;
		this.namespace = namespace;
		this.callback = callback;
	};
	/**
	 * @param {String} topic ie 'foo' || 'foo.var'
	 * @param {Function} callback
	 * @returns {Topic} singleton instance of Topic
	 */
	function TopicFactory(topic, callback) {
		topic = _getTopicName(topic);
		return new Topic(topic.name, topic.namespace, callback);
	}
	/**
	 * @private
	 * @param {String} topic ie 'foo' || 'foo.var'
	 * @returns {Object} 
	 */
	function _getTopicName(topic) {
		var _topicData = topic.split(".");
		return {
			name: _topicData[0],
			namespace: _topicData[1] ? _topicData[1] : ""
		};
	}
	/**
	 * This Object will sabe all the topic in internal array;
	 * @returns {void}
	 */
	function TopicStack() {
		this.stack = [];
	}
	/**
	 * 
	 * @param {String} topic ie 'foo' || 'foo.var'
	 * @param {Function} callback
	 * @returns {void}
	 */
	TopicStack.prototype.add = function (topic, callback) {
		var _topic = new TopicFactory(topic, callback);
		if (!this.stack[_topic.name]) {
			this.stack[_topic.name] = [];
		}
		this.stack[_topic.name].push(_topic);
	};
	/**
	 * 
	 * @param {String} topic ie 'foo' || 'foo.var'
	 * @returns {Topic || Array}
	 */
	TopicStack.prototype.get = function (topic) {
		var topicData = _getTopicName(topic);
		if (this.stack[topicData.name]) {
			return this.stack[topicData.name];
		}
		return [];
	};

    TopicStack.prototype.set = function (topicName, stack) {
        this.stack[topicName] = stack;
    };
	/**
	 * @description Facade for TopicStack.prototype.add
	 * @param {String} topic ie 'foo' || 'foo.var'
	 * @param {Function} callback
	 * @returns {void}
	 */
	function bind(topic, callback) {
		if (isString(topic) || typeof callback === "function") {
			topicStack.add(topic, callback);
		} else {
			error(errors.DEFAULT_PARAMETERS);
		}
	}

	/**
	 * @description Will call all callback function for topics that match
	 * @param {String} topic ie 'foo' || 'foo.var'
	 * @param {Object|null} data
	 * @returns {void}
	 */
	function trigger(topic, data) {
		var topicData = _getTopicName(topic);
		var stack = topicStack.get(topicData.name);
		if (stack) {
			var i;
			for (i = 0; i < stack.length; i++) {
				if (_matchOrNullNamespace(topicData.namespace, stack[i].namespace)) {
					stack[i].callback.call(null, data);
				}
			}
		}
	}
    /**
     * @description Unbind topics
     * @param {String} topic ie 'foo' || 'foo.var'
     * @returns {void}
     */
    function unbind(topic) {
		if (!isString(topic)) {
			return error(errors.TOPIC_STRING_EXPECTED);
		}
        var topicData = _getTopicName(topic);
		var stack = topicStack.get(topicData.name);
		if (stack) {
            var _stack = [];
			var i;
			for (i = 0; i < stack.length; i++) {
				if (!_matchOrNullNamespace(topicData.namespace, stack[i].namespace)) {
					_stack.push(stack[i]);
				}
			}
            topicStack.set(topicData.name, _stack);
		}
    }
	/**
	 * @description Create a singleton of TopicStack
	 */
	topicStack = new TopicStack();

	/**
	 * @description Return a Facade of the public method.
	 */
	window["notify"] = {
		"bind": bind,
		"trigger": trigger,
        "unbind": unbind
	};
}(window.console));
