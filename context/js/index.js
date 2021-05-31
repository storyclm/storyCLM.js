window.logToDiv = function (value) {
    $('#logs').append(`<div>${value}</div>`);
}
// _set_story();
// logToDiv(window.story.app.name);

story.onStoryChange = function () {
    $('#story').text(JSON.stringify(window.story, null, 4));

    if (window.story.debugAppState.f50) {
        test50.push(window.story.debugAppState.f50);
        let sum = test50.reduce((total, curr) => total + curr);
        let expected = test50.length * (test50.length + 1) / 2;
        test50passed = sum === expected;
        if (test50.length === 100) {
            logToDiv(`test50passed: ${test50passed}`);
            window.test50passed = undefined;
            window.test50 = undefined;
            story.removeStoryProp('debugAppState.f50');
        }
    }
}

$('#story').text(JSON.stringify(window.story, null, 4));

$("button[name='log1'").click(function () {
    $('#story').text(JSON.stringify(window.story, null, 4));
});

$("button[name='set_story'").click(function () {
    _set_story();
});

$("button[name='clear-logs'").click(function () {
    $('#logs').empty();
});

$("button[name='test1'").click(function () {
    story.debugAppState.f1 = window.story.debugAppState.f1 + 1;
});

$("button[name='test2'").click(function () {
    story.debugAppState.f2 = window.story.debugAppState.f2 + '1';
});

$("button[name='test3'").click(function () {
    story.debugAppState.f3 = !window.story.debugAppState.f3;
});

$("button[name='test4'").click(function () {
    story.debugAppState.f2 = null;
});

$("button[name='test5'").click(function () {
    story.debugAppState.f5 = 1.23;
});

$("button[name='test6'").click(function () {
    story.debugAppState.f6 = undefined;
});

$("button[name='test7'").click(function () {
    Object.defineProperty(story.debugAppState, "f7", {
        value: "defined f7"
    });
});

$("button[name='test8'").click(function () {
    delete story.debugAppState.f8;
});

// $("button[name='test8'").click(function () {
//     try {
//         window.story.debugAppState = {};
//         console.log(JSON.stringify(window.story, null, 4));
//     } catch (error) {
//         $('#story').text(error);
//         return;
//     }
//     $('#story').text('No exception was thrown');
// });

$("button[name='test9'").click(function () {
    story.debugAppState.f9 = { f91: 'value of f91 - 1' };
});

$("button[name='test10'").click(function () {
    story.debugAppState.f10 = { f101: "updated value of f101" };
});

$("button[name='test11'").click(function () {
    story.debugAppState.f11 = { f111: "value of new object field f111" };
});

$("button[name='test12'").click(function () {
    story.debugAppState.f11.f112 = "value of new object field f112";
});

$("button[name='test13'").click(function () {
    story.setStory({ debugAppState: { f13: "setStory value f13" } });
});

$("button[name='test14'").click(function () {
    story.removeStoryProp('debugAppState.f14');
});

$("button[name='test50'").click(function () {
    window.test50 = [];
    window.test50passed = true;
    for (let i = 1; i <= 100; i++) {
        story.setStory({ debugAppState: { f50: i } });
    }
});