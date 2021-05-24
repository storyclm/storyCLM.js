window._storyTemplate = {
    "scheme": {
        "app": {
            "appMutable": false,
            "contentMutable": false
        },
        "user": {
            "appMutable": false,
            "contentMutable": false
        },
        "presentation": {
            "appMutable": false,
            "contentMutable": false
        },
        "questProgress": {
            "appMutable": true,
            "contentMutable": false
        },
        "debugAppState": {
            "appMutable": true,
            "contentMutable": true
        }
    },
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
    "questProgress": {
        "stageName": "Изучение",
        "state": "Success"
    },
    "debugAppState": {
        "f1": 0,
        "f2": "v2",
        "f3": true,
        "f6": "f6 value",
        "f8": "f8 value",
        "f10": {
            "f101": "value of f101"
        }
    }
};

window._set_story = function () {
    window._story = _storyTemplate;
    _onStoryChange();
}

window.nativeStory = {
    setStoryProp: function (objectName, keyPath, _, value) {
        let parts = keyPath.split('.');
        let lastPart = parts.pop();
        let newState = JSON.parse(JSON.stringify(_story))
        let field = newState[objectName];
        for (part of parts) {
            if (field[part] === undefined || field[part] === null) {
                field[part] = {}
            }
            field = field[part];
            if (field === undefined) {
                field = {};
            }
        }
        field[lastPart] = value;
        window._story = newState;
        _onStoryChange();
    },
    deleteStoryProp: function (objectName, keyPath) {
        let parts = keyPath.split('.');
        let lastPart = parts.pop();
        let newState = JSON.parse(JSON.stringify(_story))
        let field = newState[objectName];
        for (part of parts) {
            if (field[part] === undefined || field[part] === null) {
                field[part] = {}
            }
            field = field[part];
        }
        delete field[lastPart];
        window._story = newState;
        _onStoryChange();
    }
}