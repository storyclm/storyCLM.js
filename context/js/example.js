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