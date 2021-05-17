$('#state').text(JSON.stringify(window.story, null, 4));

var onStoryChange = function () {
    $('#state').text(JSON.stringify(window.story, null, 4));
}

$("button[name='test1'").click(function () {
    story.debugAppState.f1 = "v3";
    $('#state').text(JSON.stringify(window.story, null, 4));
});

$("button[name='test2'").click(function () {
    delete story.debugAppState.fToDelete;
    $('#state').text(JSON.stringify(window.story, null, 4));
});

$("button[name='test3'").click(function () {
    story.debugAppState.f2 = undefined;
    $('#state').text(JSON.stringify(window.story, null, 4));
});

$("button[name='test4'").click(function () {
    story.debugAppState.f4 = "new f4";
    $('#state').text(JSON.stringify(window.story, null, 4));
});

$("button[name='test5'").click(function () {
    Object.defineProperty(window.story.debugAppState, "f5", {
        value: "definded f5",
        enumerable: true,
        writable: true
    });
    $('#state').text(JSON.stringify(window.story, null, 4));
});

$("button[name='test6'").click(function () {
    story.debugAppState.f5 = "updated definded f5";
    $('#state').text(JSON.stringify(window.story, null, 4));
});

$("button[name='test7'").click(function () {
    try {
        window.story.debugAppState = {};
        console.log(JSON.stringify(window.story, null, 4));
    } catch (error) {
        $('#state').text(error);
        return;
    }
    $('#state').text('No exception was thrown');
});

$("button[name='test8'").click(function () {
    story.debugAppState.f10.f101 = "value of f101 - 1";
    $('#state').text(JSON.stringify(window.story, null, 4));
});

$("button[name='test9'").click(function () {
    story.debugAppState.f11 = { f111: "value of new object field f111" };
    $('#state').text(JSON.stringify(window.story, null, 4));
});

$("button[name='test10'").click(function () {
    story.debugAppState.f11.f111 = "updated value of new object field f111";
    $('#state').text(JSON.stringify(window.story, null, 4));
});

$("button[name='test11'").click(function () {
    story.debugAppState.f11.f112 = "field f112";
    $('#state').text(JSON.stringify(window.story, null, 4));
});