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
        "presentation": {
            "notes": {
                "text": "Тут большое или маленькое предложение, которое можно задать в конфигураторе"
            },
            "items": {
                "field_1": {
                    "value": "field_1 val",
                    "order": 1
                },
                "field_3": {
                    "value": "field_3 val 3",
                    "order": 3
                },
                "field_2": {
                    "value": "field_2 val 2",
                    "order": 2
                }
            },
            "rating": {
                "visible": true,
                "parameters": {
                    "color": "#000000",
                    "fontSize": 12
                },
                "value": 3

            }
        },
        "f1": 0,
        "f2": "v2",
        "f3": true,
        "f6": "f6 value",
        "f8": "f8 value",
        "f10": {
            "f101": "value of f101"
        },
        "f14": "f14 to removeStoryProp",
        "f51": {
            "f51_test": "initial value"
        }
    }
};

window._storyTemplate = {
    "scheme": {
        "presentation": {
            "appMutable": true,
            "contentMutable": true
        }
    },
    "presentation": {
        "accentColor": {
            "accentColorVisible": true,
            "parameters": {
                "color": "#000000",
                "transparent": "32"
            }
        },
        "form": {
            "formVisible": false,
            "items": {
                "input_1": {
                    "backgroundColor": "#ffffff",
                    "fontColor": "#000000",
                    "fontSize": 15,
                    "inputValue": "some value",
                    "name": "input name",
                    "order": 1
                },
                "input_2": {
                    "backgroundColor": "#123334",
                    "fontColor": "#344445",
                    "fontSize": 12,
                    "inputValue": "",
                    "name": "knanfoaf",
                    "order": 2
                }
            }
        },
        "notes": {
            "notesVisible": false,
            "parameters": {
                "color": "#000000",
                "fontSize": 12,
                "text": "Hello world!"
            }
        },
        "rating": {
            "parameters": {
                "color": "#000000",
                "progress": 1,
                "quantity": 6
            },
            "ratingVisible": true
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