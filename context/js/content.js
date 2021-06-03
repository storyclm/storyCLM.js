$(document).ready(function () {

    window.logToDiv = function (value) {
        $('#logs').append(`<div>${value}</div>`);
    }

    _set_story();

    if (story.debugAppState.presentation === undefined) {
        story.debugAppState.presentation = {};
    }

    if (story.debugAppState.presentation.items === undefined) {
        story.debugAppState.presentation.items = {};

    }

    if (Object.keys(story.debugAppState.presentation.items).length === 0) {
        story.debugAppState.presentation.items.field_1 = {
            value: "",
            order: 1
        }
    }

    var fields = Object.keys(story.debugAppState.presentation.items);

    let onChange = function (event) {
        console.log(event.target.value);
    }

    let addFieldAndChangeListener = function (name) {
        var input = $("#input-wrapper-container");
        input.find("div span").text(`Name ${name}`);
        input.find("input").attr("name", name);
        $("#text-input-list").append(input.html());
        $(`input[name='${name}'`).change(onChange);
        // $("input[name='field_2'").val();
    }

    for (field in story.debugAppState.presentation.items) {
        addFieldAndChangeListener(field);
    }

    $("#btn-close").click(function () {
        StoryCLM.Presentation.Close(2);
    });

    let setStars = function (value) {
        for (let i = 1; i < 6; i++) {
            $(`label[for='star${i}'] img`).attr("src", i <= value ? "svg/star-filled.svg" : "svg/star-outlined.svg")
        }
    }

    if (story.debugAppState.presentation.rating.visible) {
        $('#rating-root').removeClass('hidden');
        setStars(story.debugAppState.presentation.rating.value);
    }

    $("input[name='rate']").change(function (e) {
        story.debugAppState.presentation.rating.value = e.target.value;
        setStars(e.target.value);
    });


    $("#btn-add").click(function () {
        let name = `field_${fields.length + 1}`;
        fields.push(name);
        story.debugAppState.presentation.items[name] = {
            value: "",
            order: fields.length
        };
        addFieldAndChangeListener(name);
        // var input = $("#input-wrapper-container");
        // input.find("div span").text(`Name ${name}`);
        // input.find("input").attr("name", name);
        // $("#text-input-list").append(input.html());
        // $(`input[name='${name}'`).change(onChange);
        // $("input[name='field_2'").val();
    });

    $("#btn-remove").click(function () {
        if (fields.length === 1) {
            return;
        }

        delete story.debugAppState.presentation.items[`field_${fields.length}`]
        $("#text-input-list div:last-child").remove();
        fields.pop();
    });
});