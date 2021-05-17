// rev:3

if (!window._story) {
    window._story = {
        scheme: {
            propsToProxify: [
                'debugAppState'
            ]
        },
        state: {
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
}

Object.defineProperty(window, '_onStoryChange', {
    value: function () {
        console.log('_onStoryChange called')
    },
    configurable: false,
    enumerable: false,
    writable: false
});

Object.defineProperty(window, '_proxifyStoryState', {
    value: function (scheme, state) {

        let validateAndProxifyProperty = function (valueToProxify) {
            if (typeof valueToProxify === 'undefined') {
                return null;
            }

            if (typeof valueToProxify === 'object') {
                return _proxifyStoryState(valueToProxify);
            }

            if (typeof valueToProxify === 'bigint' ||
                typeof valueToProxify === 'boolean' ||
                typeof valueToProxify === 'number' ||
                typeof valueToProxify === 'string') {
                return valueToProxify;
            }

            throw new Error(`window.story: ${typeof valueToProxify} is not supported`)
        }

        let getter = function (target, property) {
            return target[property];
        };

        let setter = function (target, property, value) {
            console.log(`setter ${property}`);

            let newValue = validateAndProxifyProperty(value);
            target[property] = newValue;

            window.notifyApp('set', property, newValue);
            return true;
        };

        let definer = function (target, property, attributes) {
            console.log(`definer ${property}`);

            var newAttributes = {};
            Object.assign(newAttributes, attributes);
            newAttributes.value = validateAndProxifyProperty(attributes.value);
            Object.defineProperty(target, property, newAttributes);

            window.notifyApp('set', property, newAttributes.value);
            return true;
        };

        let deleter = function (target, property) {
            console.log(`deleter ${property}`);
            delete target[property];
            window.notifyApp('delete', property);
            return true;
        };

        let newState = {};
        for (stateProp in state) {

            if (state[stateProp] === null || typeof state[stateProp] !== 'object') {
                throw new Error(`window._story: shallow properies must be an object`);
            }

            if (!stateProp in scheme.propsToProxify) {
                newState[stateProp] = JSON.parse(JSON.stringify(state[stateProp]));
                Object.freeze(newState[stateProp]);
            } else {
                newState[stateProp] = {};
                for (fieldProp in state[stateProp]) {
                    newState[stateProp][fieldProp] = state[stateProp][fieldProp] !== null && typeof state[stateProp][fieldProp] === 'object'
                        ? _proxifyStoryState(state[stateProp][fieldProp])
                        : state[stateProp][fieldProp];
                }
            }
        }

        let result = new Proxy(newState, {
            get: getter,
            set: setter,
            defineProperty: definer,
            deleteProperty: deleter
        });

        return result;
    },
    configurable: false,
    enumerable: false,
    writable: false
});

; (function () {
    Object.defineProperty(window, '_storyProxified', {
        value: _proxifyStoryState(_story.scheme, _story.state),
        configurable: true,
        enumerable: false,
        writable: false
    });

    Object.defineProperty(window, 'story', {
        configurable: false,
        enumerable: true,
        get: function () {
            return window._storyProxified
        },
        set: function () {
            throw new Error('window.story can not be set')
        }
    });

    window.notifyApp = function (operation, property, value) {
        if (window.changeStoryObject?.changeStory === 'function') {
            window.changeStoryObject.changeStory(operation, property, value);
        }
        if (typeof webkit !== 'undefined' && typeof webkit.messageHandlers?.changeStory?.postMessage === 'function') {
            webkit.messageHandlers.changeStory.postMessage(operation, property, value);
        }
    }
})();