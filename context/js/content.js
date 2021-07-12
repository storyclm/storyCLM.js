; (function () {

    window.logToDiv = function (value) {
        $('#logs').append(`<div>${value}</div>`);
    }
    logToDiv(window.story);
    _set_story();

    // Заголовок (notes)
    const setNotesText = () => {
        $('#notes').text(story.presentation?.form?.notes?.text);
    }

    // Поля ввода (items)
    const getFields = () => {
        let fields = [];
        for (let itemName in story.presentation.form.items) {
            var item = story.presentation.form.items[itemName];
            fields.push({ name: itemName, inputValue: item.inputValue, order: item.order });
        }
        return fields.sort((a, b) => a.order - b.order);
    }

    let onChange = function (event) {
        story.presentation.items[event.target.name].inputValue = event.target.value;
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
    let setStars = function (quantity, progress) {
        for (let i = 1; i < quantity + 1; i++) {
            $(`label[for='star${i}'] img`).attr("src", i <= progress ? "svg/star-filled.svg" : "svg/star-outlined.svg")
        }
    }

    $("#btn-add").click(function () {
        let fields = getFields();
        let name = `field_${fields.length + 1}`;
        fields.push({
            name: name,
            inputValue: '',
            order: fields.length
        });
        story.presentation.form.items[name] = {
            inputValue: '',
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
        delete story.presentation.form.items[name];
        $("#text-input-list div:last-child").remove();
        fields.pop();
    });

    const init = () => {

        // story init
        if (story.presentation === undefined) {
            story.presentation = {};
        }

        if (story.presentation.form.items === undefined ||
            story.presentation.form.items === null) {
            story.presentation.form.items = {};

        }

        setNotesText();

        if (Object.keys(story.presentation.form.items).length === 0) {
            story.presentation.items.field_1 = {
                inputValue: "",
                order: 1
            }
        }

        // items
        var fields = getFields();
        for (field of fields) {
            addFieldAndChangeListener(field.name, field.inputValue);
        }

        // rating
        if (story.presentation.rating?.ratingVisible) {
            $('#rating-root').removeClass('hidden');
            setStars(story.presentation.rating.parameters.quantity, story.presentation.rating.parameters.progress);
        }

        $("input[name='rate']").change(function (e) {
            story.presentation.rating.parameters.progress = e.target.value;
            setStars(story.presentation.rating.parameters.quantity, e.target.value);
        });
    }

    init();

    story.onStoryChange = () => {
        setNotesText();
    }
})();