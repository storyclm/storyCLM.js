window._story = {
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
    "state": {
        "debugAppState": {
            "f1": "f2",
            "f2": 243,
            "f3": true,
            "fToDelete": "noValue",
            "f10": {
                "f101": "value of f101"
            }
        }
    }
};

window.nativeStory = {
    setStoryProp: function (property, value) {
        let parts = property.split('.');
        let lastPart = parts.pop();
        let newState = JSON.parse(JSON.stringify(_story.state))
        let field = newState;
        for (part of parts) {
            if (field[part] === undefined) {
                field[part] = {}
            }
            field = field[part];
            if (field === undefined) {
                field = {};
            }
        }
        field[lastPart] = value;
        window._story.state = newState;
        _onStoryChange();
    },
    deleteStoryProp: function (property, value) {
        let parts = property.split('.');
        let lastPart = parts.pop();
        let newState = JSON.parse(JSON.stringify(_story.state))
        let field = newState;
        for (part of parts) {
            if (field[part] === undefined) {
                field[part] = {}
            }
            field = field[part];
        }
        delete field[lastPart];
        window._story.state = newState;
        _onStoryChange();
    }
}