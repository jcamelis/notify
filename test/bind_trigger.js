module("Bind/Unbind & Trigger Methods.");
test("Bind Topic", function () {

	var expected = "Value_To_Set";
	var actual;
	notify.bind("someTopic", function () {
		actual = expected;
	});

	notEqual(actual, expected, "The topic triggered unexpectedly");
});

test("Trigger Topic", function () {

	var expected = "Value_To_Set";
	var actual;
	notify.bind("someTopic", function () {
		actual = expected;
	});

	notify.trigger("someTopic");

	deepEqual(actual, expected, "The topic hasn't triggered");
});

test("Unbind Topic", function () {

	var expected = "Value_To_Set";
	var actual;
	notify.bind("someTopic", function () {
		actual = expected;
	});
	
	notify.unbind("someTopic");

	notify.trigger("someTopic");

	notEqual(actual, expected, "The Topic hasn't been detached.");
});

test("Bind Topic.Namepace / Trigger Topic.Namepace", function () {

	var expected = "Value_To_Set";
	var actual;
	notify.bind("someTopic.someNamespace", function () {
		actual = expected;
	});

	notify.trigger("someTopic.someNamespace");

	deepEqual(actual, expected, "Cannot Bind or Trigger Topic.Namepace.");
});

test("Bind Topic.Namepace / Trigger Topic", function () {

	var expected = "Value_To_Set";
	var actual1;
	var actual2;

	notify.bind("someTopic.someNamespace", function () {
		actual1 = expected;
	});

	notify.bind("anotherTopic.someNamespace", function () {
		actual2 = expected;
	});

	notify.trigger("someTopic");
	notify.trigger("anotherTopic");

	deepEqual(actual1, expected, "Cannot Bind or Trigger Topics with the same namespace.");

	deepEqual(actual2, expected, "Cannot Bind or Trigger Topics with the same namespace.");
});

test("Bind Topic.Namepace / Unbind Topic.Namepace", function () {

	var expected = "Value_To_Set";
	var actual1;
	var actual2;

	notify.bind("someTopic.someNamespace", function () {
		actual1 = expected;
	});

	notify.bind("someTopic", function () {
		actual2 = expected;
	});
	
	notify.unbind("someTopic.someNamespace");

	notify.trigger("someTopic");

	notEqual(actual1, expected, "Cannot Bind or Unbind Topics with differents namespace.");
	
	deepEqual(actual2, expected, "Cannot Bind or Unbind Topics with differents namespace.");
});