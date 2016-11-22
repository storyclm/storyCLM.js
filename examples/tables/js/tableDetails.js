$.validator.addMethod("js-modal-input", function (value, element) {
    var val = $(element).val(),
        inputType = $(element).data('type');

    if (!val.length) {
        message = 'Поле не может быть пустым';
        $(element).next().text(message);
    } else {
        switch (inputType) {
            case 1:   //string
                var reg = /[а-яА-ЯёЁa-zA-Z0-9]+$/;
                message = 'Поле должно содержать строку';
                $(element).next().text(message);
                return reg.test(val);
                break;
            case 2:   // integer
                message = 'Поле должно содержать целое число';
                $(element).next().text(message);
                var reg = /^[0-9]+$/;
                return reg.test(val);
                break;
            case 3:   //float
                message = 'Поле должно содержать число с плавающей точкой';
                $(element).next().text(message);
                var reg = /\-?[0-9]*[.][0-9]*$/;
                return reg.test(val);
                break;
            case 4:   //bool
                message = 'Поле должно содержать логическую переменную';
                $(element).next().text(message);
                return $(element).val();
                break;
            case 5:   //date
                message = 'Поле должно содержать дату в формате дд.мм.гггг';
                $(element).next().text(message);
                var reg = /[0-9]{2}\.[0-9]{2}\.[0-9]{4}$/;
                return reg.test(val);
                break;
            default:
                break;
        }
    }

    return true;
});

$.validator.setDefaults({
    onkeyup: false,
    onsubmit: false,
    errorLabelContainer: '.table-detailes__modal-error-msg',
    errorContainer: '.table-detailes__modal-error-msg',
    errorClass: 'input-validation-error'
});

var TableDetails = function (data) {
    if (this instanceof TableDetails) {
        var self = this;
        var data = dataSource.getSchema(6),
            tableData = [{
                sTitle: 'Id'
            }];

        self.editingItemIndex = 0;

        for (var i = 0; i < data.length; i++) {
            var item = data[i];

            if (item.t == 5) {
                tableData.push({
                    "mDataProp": i + 1,
                    "sTitle": item.k,
                    "mRender": function (data, type, full) {
                        var dtStart = new Date(data);
                        var day = dtStart.getDate();
                        var monthIndex = dtStart.getMonth();
                        var year = dtStart.getFullYear();
                        return day + '.' + (monthIndex + 1) + '.' + year;
                    }
                });
            } else {
                tableData.push({
                    "mDataProp": i + 1,
                    "sTitle": item.k
                });
            }
        }

        tableData.push({
            sTitle: '',
            "mData": null,
            "mRender": function (data, type, full) {
                return self.config.templates.dropdown;
            }
        });

        $(self.config.classes.addModalWrap, self.config.classes.editModalWrap).on('submit', function () {
            return false;
        })

        oTable = $(self.config.classes.table).dataTable({
            "bProcessing": true,
            "bPaginate": true,
            "bLengthChange": true,
            "sPaginationType": "full_numbers",
            "bJQueryUI": false,
            "bStateSave": true,
            "bServerSide": true,
            "aoColumns": tableData,
            "ajax": function (data, callback, settings) {
                callback(dataSource.find(data));
            }
        });

        self.createAddModal(data);

        $(self.config.classes.openAddModalBtn).on('click', function () {
            $(self.config.classes.addModal).modal('show');
        });

        addModalValidator = $(self.config.classes.addModalWrap).validate({
            errorLabelContainer: self.config.classes.errorLabelContainer
        });

        $(self.config.classes.addModalSubmitBtn).on('click', function () {
            addModalValidator.form();
            if (!$(self.config.classes.addModalWrap).find(self.config.classes.errorInput).length) {
                var modalData = $(self.config.classes.addModalWrap).find(self.config.classes.modalInput),
                    dataArray = [],
                    dropdown = self.config.templates.dropdown;

                for (var i = 0; i < modalData.length; i++) {
                    dataArray.push(modalData.eq(i).val());
                }
                dataArray.push(dropdown);

                self.createAddObject(dataArray);
            }
            return false;
        });

        //Модальное окно редактирования
        $('body').on('click', self.config.classes.editRowLink, function (e) {
            var item = $(this).closest('tr');
            self.editingItemIndex = $(self.config.classes.table).find('tbody tr').index(item);
            self.createEditModal(data);
            $(self.config.classes.editModal).modal('show');
            e.preventDefault();
        });

        //Редактирование записи
        $(self.config.classes.editModalSubmitBtn).on('click', function () {
            editModalValidator.form();
            if (!$(self.config.classes.editModalWrap).find(self.config.classes.errorInput).length) {
                var modalData = $(self.config.classes.editModalWrap).find(self.config.classes.modalInput),
                    dataArray = [],
                    dropdown = self.config.templates.dropdown;

                for (var i = 0; i < modalData.length; i++) {
                    dataArray.push(modalData.eq(i).val());
                }

                dataArray.push(dropdown);

                self.editObject(dataArray);
            }
            return false;
        });

        //удаляет запись
        $(self.config.classes.deleteModalSubmitBtn).on('click', function (e) {
            self.deleteObject(self.removingIndex);
            e.preventDefault();
        });

        //вызывает модальное окно удаления
        $('body').on('click', self.config.classes.removeRowLink, function (e) {
            $(self.config.classes.deleteModal).modal('show');
            var item = $(this).closest('tr'),
                index = $(self.config.classes.table).find('tbody tr').index(item);

            self.removingIndex = index;
            e.preventDefault();
        });

    } else {
        return new TableDetails(data);
    }
}
TableDetails.prototype = {
    config: {
        classes: {
            addModalWrap: '.js-add-modal-body',
            editModalWrap: '.js-edit-modal-body',
            table: '#table',
            openAddModalBtn: '.js-add-btn',
            addModal: '#addData',
            editModal: '#editData',
            deleteModal: '#deleteData',
            addModalSubmitBtn: '#addButton',
            editModalSubmitBtn: '#editButton',
            deleteModalSubmitBtn: '#deleteButton',
            modalInput: '.js-modal-input',
            errorInput: '.input-validation-error',
            errorLabelContainer: '.table-detailes__modal-error-msg',
            editRowLink: '.js-edit-item-btn',
            removeRowLink: '.js-remove-item-btn',
            datepickerInput: '.js-datepicker',
            editModalInputWrap: '.js-edit-modal-input-wrap',
            addModalInputWrap: '.js-add-modal-input-wrap'
        },
        templates: {
            dropdown: '<div class="btn-group">' +
                                    '<button type="button" class="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown" aria-expanded="false">' +
                                        '<span class="glyphicon glyphicon-cog"></span>' +
                                        '<span class="caret"></span>' +
                                    '</button>' +
                                    '<ul role="menu" class="dropdown-menu pull-right">' +
                                        '<li>' +
                                            '<a href="#" role="menuitem" class="js-edit-item-btn" tabindex="-1">Редактировать</a>' +
                                        '</li>' +
                                        '<li>' +
                                            '<a href="#" role="menuitem" class="js-remove-item-btn" tabindex="-1">Удалить</a>' +
                                        '</li>' +
                                    '</ul>' +
                                '</div>'
        }
    },
    createAddModal: function (data) {
        var self = this;
        var template = '';
        var counter = 0;
        for (var i = 0; i < data.length; i++) {
            if (data[i].t == 4) {
                template = '<div class="table-detailes__modal-block">' +
                                '<label class="center-block" for="add-item-input-{0}">' + data[i].k + '</label>' +
                                '<select class="form-control js-modal-input table-detailes__modal-input" id="add-item-input-{0}" name="add-item-input-{0}" data-type="' + data[i].t + '" value="" required>' +
                                    '<option selected disabled>Выберите значение</option>' +
                                    '<option val="true">true</option>' +
                                    '<option val="false">false</option>' +
                                '</select>' +
                                '<span class="table-detailes__modal-error-msg">Поле не может быть пустым</span>' +
                            '</div>';
            } else if (data[i].t == 5) {
                template = '<div class="table-detailes__modal-block">' +
                                '<label class="center-block" for="add-item-input-{0}">' + data[i].k + '</label>' +
                                '<input class="form-control js-modal-input table-detailes__modal-input js-datepicker" id="add-item-input-{0}" name="add-item-input-{0}" data-type="' + data[i].t + '" value="" required>' +
                                '<span class="table-detailes__modal-error-msg">Поле не может быть пустым</span>' +
                            '</div>';
            } else {
                template = '<div class="table-detailes__modal-block"><label class="center-block" for="add-item-input-{0}">' + data[i].k + '</label>' + '<input class="form-control js-modal-input table-detailes__modal-input" id="add-item-input-{0}" name="add-item-input-{0}" data-type="' + data[i].t + '" value="" required><span class="table-detailes__modal-error-msg">Поле не может быть пустым</span></div>';
            }

            formTemplate = jQuery.validator.format($.trim(template));
            $(formTemplate(counter++)).appendTo(self.config.classes.addModalInputWrap);
        }
        //$(self.config.classes.datepickerInput).datepicker();
    },
    createEditModal: function (data) {
        var self = this;
        var rowData = $(self.config.classes.table).find('tbody tr').eq(self.editingItemIndex).find('td');
        var counter = 0;

        var template = '';
        $(self.config.classes.editModalInputWrap).html('');

        for (var i = 0; i < rowData.length - 2; i++) {
            if (data[i].t == 4) {
                var selectedOption = rowData.eq(i + 1).text();

                template = '<div class="table-detailes__modal-block">' +
                                '<label class="center-block" for="edit-item-input-{0}">' + data[i].k + '</label>' +
                                '<select class="form-control js-modal-input table-detailes__modal-input" id="edit-item-input-{0}" name="edit-item-input-{0}" data-type="' + data[i].t + '" value="' + rowData.eq(i + 1).text() + '" required>' +
                                    '<option val="true"' + (selectedOption == 'true' ? 'selected' : '') + '>true</option>' +
                                    '<option val="false"' + (selectedOption == 'false' ? 'selected' : '') + '>false</option>' +
                                '</select>' +
                                '<span class="table-detailes__modal-error-msg">Поле не может быть пустым</span>' +
                            '</div>';
            } else if (data[i].t == 5) {
                template = '<div class="table-detailes__modal-block">' +
                                '<label class="center-block" for="edit-item-input-{0}">' + data[i].k + '</label>' +
                                '<input class="form-control js-modal-input table-detailes__modal-input js-datepicker" id="edit-item-input-{0}" name="edit-item-input-{0}" data-type="' + data[i].t + '" value="' + rowData.eq(i + 1).text() + '" required>' +
                                '<span class="table-detailes__modal-error-msg">Поле не может быть пустым</span>' +
                            '</div>';
            } else {
                template = '<div class="table-detailes__modal-block"><label class="center-block" for="edit-item-input-{0}">' + data[i].k + '</label>' + '<input class="form-control js-modal-input table-detailes__modal-input" id="edit-item-input-{0}" name="edit-item-input-{0}" data-type="' + data[i].t + '" value="' + rowData.eq(i + 1).text() + '" required><span class="table-detailes__modal-error-msg">Поле не может быть пустым</span></div>';
            }

            formTemplate = jQuery.validator.format($.trim(template));
            $(formTemplate(counter++)).appendTo(self.config.classes.editModalInputWrap);
            //$(self.config.classes.editModal).find(self.config.classes.datepickerInput).datepicker();
        }

        editModalValidator = $(self.config.classes.editModalWrap).validate({
            onkeyup: false,
            onsubmit: false,
            errorLabelContainer: self.config.classes.errorLabelContainer,
            errorContainer: self.config.classes.errorLabelContainer,
            errorClass: 'input-validation-error'
        });
    },
    createAddObject: function (dataArray) {

        var self = this;
        var modalBlock = $(self.config.classes.addModalWrap),
            fields = modalBlock.find(self.config.classes.modalInput),
            data = {};

        for (var i = 0; i < fields.length; i++) {
            var field = fields.eq(i),
                val = field.val(),
                name = field.prev().text(),
                type = field.data('type');

            switch (type) {
                case 1:
                    break;
                case 2:
                    val = Number(val);
                    break;
                case 3:
                    val = Number(val);
                    break;
                case 4:
                    (val == 'false') ? val = false : val = true;
                    break;
                case 5:
                    var year = val.split('.')[2],
                        month = val.split('.')[1],
                        day = val.split('.')[0],
                        date = new Date(year, month - 1, day);
                    val = date.toISOString();

                    break;
                default:
                    break;
            }
            data[name] = val;
        }

        var dataResult = dataSource.insert(data);
        if (dataResult.IsOk) {
            dataArray.unshift(dataResult.id);
            var length = oTable.fnSettings().fnRecordsTotal();
            var temp = oTable.fnAddData(dataArray, false);
            var currentPage = Math.ceil(oTable.fnSettings()._iDisplayStart / oTable.fnSettings()._iDisplayLength);
            oTable.fnPageChange(currentPage);
        } else {
            //error
        }

        $(self.config.classes.addModal).modal('hide');
        addModalValidator.resetForm();
    },
    editObject: function (dataArray) {
        var self = this;
        var modalBlock = $(self.config.classes.editModalWrap),
            fields = modalBlock.find(self.config.classes.modalInput),
            data = {};

        for (var i = 0; i < fields.length; i++) {
            var field = fields.eq(i),
                val = field.val(),
                name = field.prev().text(),
                type = field.data('type');

            switch (type) {
                case 1:
                    break;
                case 2:
                    val = Number(val);
                    break;
                case 3:
                    val = Number(val);
                    break;
                case 4:
                    (val == 'false') ? val = false : val = true;
                    break;
                case 5:
                    var year = val.split('.')[2],
                        month = val.split('.')[1],
                        day = val.split('.')[0],
                        date = new Date(year, month - 1, day);

                    val = date.toISOString();

                    break;
                default:
                    break;
            }
            data[name] = val;
        }
        data._id = $('#table tbody tr').eq(self.editingItemIndex).find('td').first().text();
        
        
        var dataResult = dataSource.update(data);
        if (dataResult.IsOk) {
            var currentPage = Math.ceil(oTable.fnSettings()._iDisplayStart / oTable.fnSettings()._iDisplayLength);
            oTable.fnPageChange(currentPage);
        }
        else {
            //error
        }
        $(self.config.classes.editModal).modal('hide');
    },
    deleteObject: function (index) {
        var self = this;
        var id = $('#table tbody tr').eq(index).find('td').first().text();

        var dataResult = dataSource.delete(id);
        if (dataResult.IsOk) {
            oTable.fnDeleteRow(index);
        }
        else {
            //error
        }
        $(self.config.classes.deleteModal).modal('hide');
    }
}