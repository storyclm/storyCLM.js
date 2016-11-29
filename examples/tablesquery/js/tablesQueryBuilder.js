var tablesQueryBuilder = (function () {

    var options = {};

    function _getSchema() {
        return options.schema;
    }

    function _getOperators() {
        return [
            { name: "[eq]", isLogical: false, enValue: "Equals", ruValue: "Равно", types: ["string", "int", "double", "bool", "date"] },
            { name: "[lt]", isLogical: false, enValue: "Less Than operator", ruValue: "Меньше", types: ["int", "double", "date"] },
            { name: "[lte]", isLogical: false, enValue: "Less Than or Equal to operator", ruValue: "Меньше или равно", types: ["int", "double", "date"] },
            { name: "[gt]", isLogical: false, enValue: "Greater Than operator", ruValue: "Больше", types: ["int", "double", "date"] },
            { name: "[gte]", isLogical: false, enValue: "Greater Than or Equal to operator", ruValue: "Больше или равно", types: ["int", "double", "date"] },
            { name: "[ne]", isLogical: false, enValue: "Not Equal to operator", ruValue: "Не равно", types: ["string", "int", "double", "bool", "date"] },
            { name: "[in]", isLogical: false, enValue: "Contained IN array operator", ruValue: "Содержит", types: ["string", "int", "double", "bool", "date"] },
            { name: "[nin]", isLogical: false, enValue: "Not contained IN array", ruValue: "Не содержит", types: ["string", "int", "double", "bool", "date"] },
            { name: "[cn]", isLogical: false, enValue: "Contains", ruValue: "Содержит", types: ["string"] },
            { name: "[re]", isLogical: false, enValue: "Regular Expression", ruValue: "Рег", types: ["string"] },
            { name: "[sw]", isLogical: false, enValue: "Starts With", ruValue: "Начинается с", types: ["string"] },
            { name: "[ew]", isLogical: false, enValue: "Ends With", ruValue: "Заканчивается на", types: ["string"] },
            { name: "[or]", isLogical: true, enValue: "Or", ruValue: "Или", types: [] },
            { name: "[and]", isLogical: true, enValue: "And", ruValue: "И", types: [] }
        ];
    }

    function _getOperatorByName(name) {
        var operators = _getOperators();
        for (var i = 0; i < operators.length; i++)
            if (operators[i].name === name) return operators[i];
    }

    function _getSchemaItemByName(name) {
        var schema = _getSchema();
        for (var i = 0; i < schema.length; i++)
            if (schema[i].k === name) return schema[i];
    }

    function _getSchemaTypeValidationParams(type) {
        var result = {};
        switch (type) {
            case 1:
                {
                    result.type = "string";
                    result.reg = /.*/;
                    result.message = 'Поле должно содержать строку';
                    return result;
                }
            case 2:
                {
                    result.type = "int";
                    result.message = 'Поле должно содержать целое число';
                    result.reg = /^\-?[0-9]+$/;
                    return result;
                }
            case 3:
                {
                    result.type = "double";
                    result.message = 'Поле должно содержать число с плавающей точкой';
                    result.reg = /-?[0-9]*[.][0-9]+$/;
                    return result;
                }
            case 4:
                {
                    result.type = "bool";
                    result.message = 'Поле должно содержать логическую переменную';
                    result.reg = /^true|false$/i;
                    return result;
                }
            case 5:
                {
                    result.type = "date";
                    result.message = 'Поле должно содержать дату в формате дд.мм.гггг';
                    result.reg = /^[0-9]{1,2}\.[0-9]{1,2}\.[0-9]{4}( ([0-1]?[0-9]|2[0-3])(:[0-9][0-9]){1,2})?$/;
                    return result;
                }
            default:
                return result;
        }
    }

    function _getTriplets() {
        var result = [];
        var triplets = $(".triplet");
        triplets.each(function (index, el) {
            var triplet = {};
            triplet.isOperatorLogical = $(el).find('.tripletOperatorMenu input').data("log");
            triplet.operator = $(el).find('.tripletOperatorMenu input').data("type");
            triplet.fieldType = $(el).find('.tripletFieldMenu input').data("type");
            triplet.field = $(el).find('.tripletFieldMenu input').data("key");
            triplet.value = $(el).find(' > input').val();
            result.push(triplet);
        });
        return result;
    }

    function _createTriplet(data) {
        var triplets = $('.triplet');
        if (triplets.length > 0) {
            if (!_validate()) return false;
        }

        var template = '<div class="form-group multiple-form-group input-group triplet">'
                 + '<div class="input-group-btn input-group-select tripletFieldMenu">'
                 + '<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">'
                 + '       <span class="concept"></span><span class="caret"></span>'
                 + '   </button>'
                 + '   <ul class="dropdown-menu" role="menu"></ul>'
                 + '   <input type="hidden" class="input-group-select-val" value="">'
                 + '</div>'
                 + '<div class="input-group-btn input-group-select tripletOperatorMenu">'
                 + '    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">'
                 + '        <span class="concept"></span><span class="caret"></span>'
                 + '    </button>'
                 + '    <ul class="dropdown-menu" role="menu"></ul>'
                 + '    <input type="hidden" class="input-group-select-val" value="">'
                 + '</div>'
                 + '<input type="text" class="form-control">'
                 + '<span class="input-group-btn">'
                 + '    <button type="button" class="btn ms btn-default btn-add">+</button>'
                 + '</span>'
                 + '</div>';


        var triplet = $(template);
        var isLogical = (triplets.length % 2 !== 0);
        if (isLogical) {
            _getOperators().forEach(function (item) {
                if (item.isLogical) {
                    triplet.find(".tripletOperatorMenu ul").append(`<li><a data-type="${item.name}" data-m="1" data-log="${item.isLogical}" href="#${item.name}">${item.ruValue}</a></li>`);
                }
            });
        }
        else {
            _getOperators().forEach(function (item) {
                if (!item.isLogical) {
                    triplet.find(".tripletOperatorMenu ul").append(`<li><a data-type="${item.name}" data-m="1" data-log="${item.isLogical}" href="#${item.name}">${item.ruValue}</a></li>`);
                }
            });
            _getSchema().forEach(function (item) {
                triplet.find(".tripletFieldMenu ul").append(`<li><a data-type="${item.t}" data-m="0" data-key="${item.k}" href="#${item.k}">${item.k}</a></li>`);
            });
        }

        console.log(data);
        if (typeof data !== "undefined") {
            var op = _getOperatorByName(data.operator);
            if (data.isOperatorLogical) {
                _setLogicalValue(triplet, data.operator, true, op.ruValue);
            }
            else {
                _setValue(triplet, data.fieldType, data.field, data.field);
                _setLogicalValue(triplet, data.operator, false, op.ruValue);
                triplet.find("> input").val(data.value);
            }
        }
        else {
            if (isLogical) _setLogicalValue(triplet, "[and]", true, "И");
        }

        _changeState(isLogical, triplet);
        $(options.root).append(triplet);
        _updateButtons();

    }

    function _validate() {
        var triplets = _getTriplets();
        if (triplets.length === 0) return false;
        var validationState = [];
        triplets.forEach(function (item, index) {
            var vsItem = {};
            var isError = false;
            vsItem.index = `Номер оператора: ${index + 1}`;

            if (typeof item.operator === "undefined") {
                isError = true;
                vsItem.operator = 'Необходимо выбрать оператор';
            }

            if (!item.isOperatorLogical) {
                if (item.value === "") {
                    isError = true;
                    vsItem.value = 'Значение оператора не может быть пустым';
                }
                if (typeof item.field === "undefined") {
                    isError = true;
                    vsItem.field = 'Необходимо выбрать поле таблицы';
                }

                if (typeof item.operator !== "undefined" && typeof item.field !== "undefined") {
                    var op = _getOperatorByName(item.operator);
                    var f = _getSchemaTypeValidationParams(item.fieldType);
                    if (op.types.indexOf(f.type) === -1) {
                        isError = true;
                        vsItem.fieldType = 'Тип поля не соответсвует оператору';
                    }
                }

                if (typeof item.field !== "undefined" && item.value !== "") {
                    var f = _getSchemaTypeValidationParams(item.fieldType);
                    if (!f.reg.test(item.value)) {
                        isError = true;
                        vsItem.value = 'Значение не соответсвует типу поля';
                    }
                }
            }
            if (isError) validationState.push(vsItem);
        });

        if (typeof options.onValidate === "function")
            options.onValidate(validationState);

        if (validationState.length > 0) return false;
        
        return true;
    }

    function _updateButtons() {
        var allTriplets = $('.triplet');
        var lastTriplets = $('.triplet:last');
        if (allTriplets.length > 1) {
            allTriplets.find(".ms").removeClass('btn-add btn-remove');
            allTriplets.find(".ms").addClass('btn-remove').html('–');

            lastTriplets.find(".ms").removeClass('btn-add btn-remove');
            lastTriplets.find(".ms").addClass('btn-add').html('+');
        }
        else {
            allTriplets.find(".ms").removeClass('btn-add btn-remove');
            allTriplets.find(".ms").addClass('btn-add').html('+');
        }
    }

    function _addTriplet(event) {
        event.preventDefault();
        _createTriplet();
        _render();
    };

    function _removeTriplet(event) {
        event.preventDefault();
        var $formGroup = $(this).closest('.form-group');
        var $multipleFormGroup = $formGroup.closest('.multiple-form-group');
        $($formGroup).nextAll().remove();
        $formGroup.remove();
        _updateButtons();
        _render();
    };

    function _changeState(isLogical, triplet) {

        if (isLogical) {
            triplet.find("> .tripletFieldMenu").css("display", "none");
            triplet.find("> input").css("display", "none");
        }
        else {
            triplet.find("> .tripletFieldMenu").css("display", "table-cell");
            triplet.find("> input").css("display", "table-cell");
        }
    }

    function _setLogicalValue(triplet, type, log, text){
        triplet.find('.tripletOperatorMenu input').data("type", type);
        triplet.find('.tripletOperatorMenu input').data("log", log);
        triplet.find('.tripletOperatorMenu .concept').text(text);
    }

    function _setValue(triplet, type, key, text) {
        triplet.find('.tripletFieldMenu input').data("type", type);
        triplet.find('.tripletFieldMenu input').data("key", key);
        triplet.find('.tripletFieldMenu .concept').text(text);
    }

    function _selectGroup(event) {
        event.preventDefault();
        var $selectGroup = $(this).closest('.triplet');
        if (Number.parseInt($(this).data("m")) === 1) {
            var type = $(this).data("type");
            var isLogical = $(this).data("log");
            _setLogicalValue($selectGroup, type, isLogical, $(this).text());
        }
        else {
            var type = $(this).data("type");
            var key = $(this).data("key");
            _setValue($selectGroup, type, key, $(this).text());
        }
        _render();
    }

    function _render(){

        if (!_validate()) return;
        var query = '';
        var triplets = _getTriplets();
        if (triplets.length === 0) return false;
        triplets.forEach(function (item) {
            if (item.isOperatorLogical) {
                query += item.operator;
            }
            else {
                query += `[${item.field}]`;
                query += item.operator;

                if (item.operator === "[in]" || item.operator === "[nin]") {
                    if (item.fieldType === 1 || item.fieldType === 5) {
                        vArr = item.value.split(',')
                        if (vArr.length > 0){
                            vArr = vArr.map((item) => `"${item}"` );
                            query += `["${vArr.join()}"]`;
                        }
                        else {
                            query += `["${item.value}"]`;
                        }
                    }
                    else {
                        query += `[${item.value}]`;
                    }

                }
                else {
                    if (item.fieldType === 1 || item.fieldType === 5) {
                        query += `["${item.value}"]`;
                    }
                    else {
                        query += `[${item.value}]`;
                    }
                }
            }
        });
        if (typeof options.onRender === "function")
            options.onRender(query, triplets);
    }

    function _init(op) {
        options = op;
        $(document).on('click', '.btn-add', _addTriplet);
        $(document).on('click', '.btn-remove', _removeTriplet);
        $(document).on('click', '.dropdown-menu a', _selectGroup);
        $(document).on('input', 'input', _render);
    }

    return {
        init: _init,
        getSchema: _getSchema,
        createTriplet: _createTriplet,
        render: _render
    };

})();