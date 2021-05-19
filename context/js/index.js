story.onStoryChange = function () {
    $('#state').text(JSON.stringify(window.story, null, 4));
}

$('#state').text(JSON.stringify(window.story, null, 4));

$("button[name='log1'").click(function () {
    $('#state').text(JSON.stringify(window.story, null, 4));
});

$("button[name='test1'").click(function () {
    story.setState({ debugAppState: { f1: "v3" } });
});

$("button[name='test2'").click(function () {
    story.setState({ debugAppState: { f2: null } });
});

$("button[name='test3'").click(function () {
    story.setState({ debugAppState: { f3: undefined } });
});

$("button[name='test4'").click(function () {
    story.setState({ debugAppState: { f4: "new f4" } });
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
    story.setState({ debugAppState: { f10: { f101: "value of f101 - 1" } } });
});

$("button[name='test9'").click(function () {
    story.setState({ debugAppState: { f11: { f111: "value of new object field f111" } } });
});

$("button[name='test10'").click(function () {
    story.setState({ debugAppState: { f11: { f111: "updated value of new object field f111" } } });
});

$("button[name='test11'").click(function () {
    story.debugAppState.f11.f112 = "field f112";
    $('#state').text(JSON.stringify(window.story, null, 4));
});