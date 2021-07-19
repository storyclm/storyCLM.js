window._storyTemplate = {
    "app": {

        "name": "context debug app",
        "version": "0.1.2"
    },
    "user": {
        "phone": "70000000001"
    },
    "presentation": {
        "id": "209"
    },
    "questProgress_1-side": {

    },
    "debugAppState_2-side": {
        "f1": 0,
        "f2": "v2",
        "f3": true,
        "f10": {
            "f101": "value of f101"
        }
    }
};

window.story = {
    "app": {

        "name": "context debug app",
        "version": "0.1.2"
    },
    "user": {
        "phone": "70000000001"
    },
    "presentation": {
        "id": "209"
    },
    "questProgress_1-side-to": {

    },
    "presentation-state_1-side-from": {

    },
    "debugAppState_2-side": {
        "f1": 0,
        "f2": "v2",
        "f3": true,
        "f10": {
            "f101": "value of f101"
        }
    },



    
    "on{questProgress_1-side-to}Change": function () {
        // ...
    },
    "on{debugAppState_2-side}Change": function () {
        // ...
    }
};







// начальный стейт
window.storyRaw = { // id родительской сущности "root-id"
    "key1": "value1", // id атрибута "1"
    "key2": { // id атрибута "2"
        "key3": "value3",  // id атрибута "3"
        "key4": "value4",  // id атрибута "4"
    }
};



// test 1;
// в контенте устанавливается значение поля
window.storyRaw.key2.key3 = "value3 - new from content";
// в апп улетает
window.changeStoryObject.changeStory("set", "key2.key3", "value3 - new from content");



// test 2
// в апп пришло событие ("4", "key4", "value4 - new from attributes")

// в контенте нужно вызвать
window.onStoryChange("key2.key4", "value4 - new from attributes");

// либо как сейчас
window.storyRaw = {
    "key1": "value1",
    "key2": {
        "key3": "value3",
        "key4": "value4 - new from attributes",
    }
};
window.onStoryChange();
// но тогда парсинг изменений ложится на плечи контента

var l = {
    // ...
    state: {
        licence: { // в приложении привязка к licenceId
            // атрибуты лицензии
        },
        questProgress: {// в приложении привязка к questProgressId
            // атрибуты квест-прогресса
        },
        stateSourceN: { // в приложении привязка к источнику
            // другой произвольный источник состояния
        }
    }
}