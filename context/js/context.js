// rev:13

if (typeof _onStoryChange !== 'function') {
    Object.defineProperty(window, '_onStoryChange', {
        value: function () {
            let state = JSON.parse(JSON.stringify(_story.state));
            story.state = state;

            if (typeof window.story.onStoryChange === 'function') {
                story.onStoryChange();
            }
        },
        configurable: false,
        enumerable: false,
        writable: false
    });
}

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
            let newValue = validateAndProxifyProperty(value);
            target[property] = newValue;

            window.notifyApp('set', property, newValue);
            return true;
        };

        let definer = function (target, property, attributes) {
            var newAttributes = {};
            Object.assign(newAttributes, attributes);
            newAttributes.value = validateAndProxifyProperty(attributes.value);
            Object.defineProperty(target, property, newAttributes);

            window.notifyApp('set', property, newAttributes.value);
            return true;
        };

        let deleter = function (target, property) {
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
    window.story = JSON.parse(JSON.stringify(window._story));
    //let state = JSON.parse(JSON.stringify(window._story.state));
    // Object.freeze(state);

    let notifyApp = function (operation, property, value) {

        // android
        if (typeof window.nativeStory?.setStoryProp === 'function') {
            if (operation === 'set') {
                window.nativeStory.setStoryProp(property, value);
            }
            if (operation === 'delete') {
                window.nativeStory.deleteStoryProp(property);
            }
        }

        // ios
        if (typeof webkit !== 'undefined' && typeof webkit.messageHandlers?.setStoryProp?.postMessage === 'function') {
            if (operation === 'set') {
                webkit.messageHandlers.setStoryProp.postMessage(operation, property, value);
            } else {
                webkit.messageHandlers.deleteStoryProp.postMessage(operation, property, value);
            }
        }

    }

    let setStateDeep = function (path, newState) {
        for (let newStateProp in newState) {
            var newPath = `${path}.${newStateProp}`;
            if (typeof newState[newStateProp] === 'object' && newState[newStateProp] !== null) {
                // if (state[newStateProp] === undefined) {
                //     notifyApp('set', newPath, newState[newStateProp]);

                // } else {
                //     setStateDeep(newPath, newState[newStateProp])
                // }
                setStateDeep(newPath, newState[newStateProp]);
            } else {
                let operation = newState[newStateProp] === undefined ? 'delete' : 'set';
                notifyApp(operation, newPath, newState[newStateProp]);
            }
        }
    }

    let setState = function (newState) {
        for (let newStateProp in newState) {
            if (newState[newStateProp] === null || typeof newState[newStateProp] !== 'object') {
                throw new Error('setState: newState shallow properties must be an object')
            }
            setStateDeep(newStateProp, newState[newStateProp])

        }
    }

    window.story.setState = setState;

})();