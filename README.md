notify
======

Light Weight library for bind and trigger custom events.

Methods:
--------

bind('topic', callback);
```javascript
notify.bind('waitingStart', function() {
	//your code
});
```

trigger('topic', data);
```javascript
var data = {
	message: 'Please Wait',
	timeout: 10000
}

notify.trigger('waitingStart', data);
```

unbind('topic');
```javascript
notify.bind('waitingStart', function() {
	//your code
});

notify.bind('waitingStart.mynamespace', function() {
	//your code
});

notify.unbind('waitingStart', data);
```