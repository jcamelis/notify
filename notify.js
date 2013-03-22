
(function(){
	/**
	 * @description Will save a unique instance of TopicStack;
	 * @type {TopicStack}
	 */
	var topicStack;
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
	TopicStack.prototype.add = function(topic, callback) {
		var _topic = TopicFactory(topic, callback);
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
	TopicStack.prototype.get = function(topic) {
		var topicData = _getTopicName(topic);
		if (this.stack[topicData.name]) {
			return this.stack[topicData.name];
		}
		return [];
	};
	
	/**
	 * @description Facade for TopicStack.prototype.add
	 * @param {String} topic ie 'foo' || 'foo.var'
	 * @param {Function} callback
	 * @returns {void}
	 */
	function bind(topic, callback) {
		topicStack.add(topic, callback);
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
		if (stack.length) {
			for (var i = 0; i < stack.length; i++) {
				if (topicData.namespace === "" || topicData.namespace === stack[i].namespace) {
					if (typeof stack[i].callback === "function") {
						stack[i].callback.call(null, data);
					}
				}
			}
		}
	}
	/**
	 * @description Create a singleton of TopicStack
	 */
	topicStack = new TopicStack();
	
	/**
	 * @description Return a Facade of the public method.
	 */
	window.notify = {
		bind: bind,
		trigger: trigger
	};
}());
