window.logToDiv = function (value) {
    $('#logs').append(`<div>${value}</div>`);
}
window.syncWait = ms => {
    let start = Date.now();
    let finish = start + ms;
    while (Date.now() < finish) {
        continue;
    }
}
// _set_story();
logToDiv(window.story?.app?.name);

story.onStoryChange = function () {
    $('#story').text(JSON.stringify(window.story, null, 4));

    if (window.story.debugAppState.f50 !== undefined && window.story.debugAppState.f50 !== null) {
        logToDiv(window.story.debugAppState.f50);
        // syncWait(500);
        window.test50.push(window.story.debugAppState.f50);
        console.log(test50.join());
        if (test50.length === 5) {
            let test50passed = true;
            for (let i = 0; i < 5; i++) {
                test50passed = test50passed && test50[i] === i;
            }
            logToDiv(test50.join());
            logToDiv(`test50passed: ${test50passed}`);
            window.test50 = undefined;
            story.removeStoryProp('debugAppState.f50');
            $("button[name='test50'").prop('disabled', false);
        }
    }

    if (window.test51running) {
        logToDiv(JSON.stringify(window.test51func()));
        window.test51running = false;
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
    $("button[name='test50'").prop('disabled', true);
    window.test50 = [];
    for (let i = 0; i < 5; i++) {
        story.setStory({ debugAppState: { f50: i } });
    }
});

$("button[name='test51'").click(function () {
    window.test51running = true;
    window.test51func = test51closureFunc();
    story.setStory({ debugAppState: { f51: { "f51_test": "updated value" } } });

});

let test51closureFunc = () => {
    let result = story.debugAppState.f51;
    return () => result;
}