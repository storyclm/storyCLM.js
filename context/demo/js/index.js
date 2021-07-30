; (function () {

    window.logToDiv = function (value) {
        $('#logs').append(`<div>${value}</div>`);
    }
    logToDiv(window.story);
    //_set_story();

    // Заголовок (header)
    const renderHeader = () => {
        if (window.story.presentation?.accentColor?.accentColorVisible) {
            $("#header").removeClass('hidden');
        } else {
            $("#header").addClass('hidden');
        }

        if (window.story?.presentation?.accentColor?.accentColorVisible) {
            var params = story.presentation.accentColor.parameters;
            $("#header").css('background-color', params.color + params.transparent.substring(1));
        }
    }

    // Текст (notes)
    const renderNotes = () => {
        if (window.story.presentation?.notes?.notesVisible) {
            $("#notes-wrapper").removeClass('hidden');
        } else {
            $("#notes-wrapper").addClass('hidden');
        }
        let params = story.presentation.notes.parameters;
        $('#notes').text(params.text);
        $('#notes').css('font-size', params.fontSize);
        $('#notes').css('color', params.color);
    }

    // Поля ввода (items)
    const getFields = () => {
        let fields = [];
        for (let itemName in story.presentation.form.items) {
            var item = story.presentation.form.items[itemName];
            fields.push({
                backgroundColor: item.backgroundColor,
                fontColor: item.fontColor,
                fontSize: item.fontSize,
                name: itemName,
                inputTitle: item.name,
                inputValue: item.inputValue,
                order: item.order || 0
            });
        }
        return fields.sort((a, b) => a.order - b.order);
    }

    let onChange = function (event) {
        story.presentation.form.items[event.target.name].inputValue = event.target.value;
    }

    const updateField = (field) => {
        $(`input[name='${field.name}'`).css('background-color', field.backgroundColor);
        $(`input[name='${field.name}'`).css('color', field.fontColor);
        $(`input[name='${field.name}'`).css('font-size', field.fontSize);
        $(`input[name='${field.name}'`).change(onChange);
        $(`input[name='${field.name}'`).val(field.inputValue);
        $(`#input-wrapper-${field.name}`).find("div span").text(field.inputTitle);

    }
    let addFieldAndChangeListener = function (field) {
        var input = $("#input-wrapper-container");
        input.find("div").attr("id", "input-wrapper-" + field.name);
        input.find("input").attr("name", field.name);
        $("#text-input-list").append(input.html());
        updateField(field)
    }

    const renderFields = () => {
        if (window.story.presentation?.form?.formVisible) {
            $("#form-wrapper").removeClass('hidden');
        } else {
            $("#form-wrapper").addClass('hidden');
        }

        var fields = getFields();
        var currentFieldsCount = $("#text-input-list").children().length;

        for (let i = 1; i <= Math.min(currentFieldsCount, fields.length); i++) {
            let field = fields[i - 1];
            updateField(field);
        }

        if (currentFieldsCount > fields.length) {
            $("#text-input-list div:last-child").remove();
        }

        if (currentFieldsCount < fields.length) {
            for (let i = 1; i <= fields.length; i++) {
                let field = fields[i - 1];
                if (i > currentFieldsCount) {
                    addFieldAndChangeListener(field);
                }
            }
        }
    }

    $("#btn-close").click(function () {
        StoryCLM.Presentation.Close(2);
    });

    // Рейтинг
    let setStars = function (quantity, progress) {
        let color = window.story.presentation?.rating?.parameters?.color;
        for (let i = 1; i <= 5; i++) {
            if (i <= quantity) {
                $(`#rating-star-${i}`).removeClass('hidden');
            } else {
                $(`#rating-star-${i}`).addClass('hidden');
            }
            $("#star-wrapper svg path").attr('stroke', color);
            $("#star-wrapper svg").attr('fill', i <= progress ? color : 'none');
            $(`label[for='star${i}']`).html($("#star-wrapper").html());
        }
    }

    const renderRating = () => {
        if (story.presentation.rating?.ratingVisible) {
            $('#rating-root').removeClass('hidden');
        } else {
            $('#rating-root').addClass('hidden');
        }

        setStars(story.presentation.rating.parameters.quantity, story.presentation.rating.parameters.progress);

        $("input[name='rate']").unbind('change');
        $("input[name='rate']").change(function (e) {
            story.presentation.rating.parameters.progress = e.target.value;
        });
    }

    $("#btn-add").click(function () {
        let fields = getFields();
        let next = fields[fields.length - 1].order + 1;
        let name = `input_${next}`;
        var field = {
            backgroundColor: '#FFF',
            fontColor: '#000',
            fontSize: 15,
            name: name,
            inputValue: '',
            order: next
        };
        story.presentation.form.items[name] = field;

        field.inputTitle = name;
        fields.push(field);
        addFieldAndChangeListener(field);
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

    const render = () => {
        renderHeader();
        renderNotes();
        renderFields();
        renderRating();
    }

    const init = () => {

        // story init
        if (story.presentation === undefined) {
            story.presentation = {};
        }

        if (story.presentation.form.items === undefined ||
            story.presentation.form.items === null) {
            story.presentation.form.items = {};

        }

        if (Object.keys(story.presentation.form.items).length === 0) {
            story.presentation.items.field_1 = {
                inputValue: "",
                order: 1
            }
        }

        render();
    }

    init();

    story.onStoryChange = () => {
        render();
    }
})();