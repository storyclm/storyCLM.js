$(document).ready(function () {

    window.logToDiv = function (value) {
        $('#logs').append(`<div>${value}</div>`);
    }
    logToDiv(window.story);
    // _set_story();

    // Заголовок (notes)
    const setNotesText = () => {
        $('#notes').text(story.debugAppState.presentation?.notes?.text);
    }

    // Поля ввода (items)
    const getFields = () => {
        let fields = [];
        for (let itemName in story.debugAppState.presentation.items) {
            var item = story.debugAppState.presentation.items[itemName];
            fields.push({ name: itemName, value: item.value, order: item.order });
        }
        return fields.sort((a, b) => a.order - b.order);
    }

    let onChange = function (event) {
        story.debugAppState.presentation.items[event.target.name].value = event.target.value;
    }

    let addFieldAndChangeListener = function (fieldName, value) {
        var input = $("#input-wrapper-container");
        input.find("div span").text(`Name ${fieldName}`);
        input.find("input").attr("name", fieldName);
        $("#text-input-list").append(input.html());
        $(`input[name='${fieldName}'`).change(onChange);
        $(`input[name='${fieldName}'`).val(value);
    }

    $("#btn-close").click(function () {
        StoryCLM.Presentation.Close(2);
    });

    // Рейтинг
    let setStars = function (value) {
        for (let i = 1; i < 6; i++) {
            $(`label[for='star${i}'] img`).attr("src", i <= value ? "svg/star-filled.svg" : "svg/star-outlined.svg")
        }
    }

    $("#btn-add").click(function () {
        let fields = getFields();
        let name = `field_${fields.length + 1}`;
        fields.push({
            name: name,
            value: '',
            order: fields.length
        });
        story.debugAppState.presentation.items[name] = {
            value: '',
            order: fields.length
        };
        addFieldAndChangeListener(name);
    });

    $("#btn-remove").click(function () {
        let fields = getFields();

        if (fields.length === 1) {
            return;
        }

        var name = fields[fields.length - 1].name;
        delete story.debugAppState.presentation.items[name];
        $("#text-input-list div:last-child").remove();
        fields.pop();
    });

    const init = () => {

        // story init
        if (story.debugAppState.presentation === undefined) {
            story.debugAppState.presentation = {};
        }

        if (story.debugAppState.presentation.items === undefined ||
            story.debugAppState.presentation.items === null) {
            story.debugAppState.presentation.items = {};

        }

        setNotesText();

        if (Object.keys(story.debugAppState.presentation.items).length === 0) {
            story.debugAppState.presentation.items.field_1 = {
                value: "",
                order: 1
            }
        }

        // items
        var fields = getFields();
        for (field of fields) {
            addFieldAndChangeListener(field.name, field.value);
        }

        // rating
        if (story.debugAppState.presentation.rating?.visible) {
            $('#rating-root').removeClass('hidden');
            setStars(story.debugAppState.presentation.rating.value);
        }

        $("input[name='rate']").change(function (e) {
            story.debugAppState.presentation.rating.value = e.target.value;
            setStars(e.target.value);
        });
    }

    init();

    story.onStoryChange = () => {
        setNotesText();
    }
});