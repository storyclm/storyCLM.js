// rev:39

; (function () {
    if (window._story === undefined) {
        window._story = {};
    }

    let getType = function (value) {
        let type;
        switch (typeof value) {
            case 'boolean':
                type = 'boolean';
                break;
            case 'number':
                if (!Number.isFinite(value)) {
                    throw new TypeError('story: infinite numbers and NaN\'s are not supported');
                }

                if (Number.isInteger(value)) {
                    type = 'integer';
                } else {
                    type = 'float';
                }

                break;
            case 'string':
                type = 'string';
                break;
            case 'undefined':
                type = 'undefined';
                break;
            case 'object':
                if (value === null) {
                    type = 'null';
                }
                break;
            default:
                throw new TypeError(`story: type ${typeof value} is not supported`);

        }

        return type;
    }

    let notifyApp = function (operation, objectName, keyPath, value) {

        let type = getType(value);

        // android
        if (typeof window.nativeStory?.setStoryProp === 'function') {
            if (operation === 'set') {
                window.nativeStory.setStoryProp(objectName, keyPath, type, value);
            }
            if (operation === 'delete') {
                window.nativeStory.deleteStoryProp(objectName, keyPath);
            }
        }

        // ios
        logToDiv(window.webkit === undefined);
        if (window.webkit !== undefined) {
            logToDiv(window.webkit.messageHandlers === undefined);
            logToDiv(window.webkit.messageHandlers?.setStoryProp === undefined);
            logToDiv(window.webkit.messageHandlers?.setStoryProp?.postMessage === undefined);
        }
        if (window.webkit !== undefined && typeof webkit.messageHandlers?.setStoryProp?.postMessage === 'function') {
            if (operation === 'set') {
                let model = { objectName, keyPath, type, value };
                webkit.messageHandlers.setStoryProp.postMessage(JSON.stringify(model));
            } else {
                let model = { objectName, keyPath };
                webkit.messageHandlers.deleteStoryProp.postMessage(JSON.stringify(model));
            }
        }

    }

    let pushKeyPathPart = function (keyPathParts, part) {
        let newKeyPathParts = keyPathParts.slice();
        newKeyPathParts.push(part);
        return newKeyPathParts;
    }

    let validateAndNotify = function (objectName, keyPathParts, property, value) {
        setTimeout(function () {
            try {
                let newKeyPathParts = pushKeyPathPart(keyPathParts, property);
                let keyPath = newKeyPathParts.join('.');
                if (typeof value === 'undefined') {
                    notifyApp('delete', objectName, keyPath, value);
                } else if (typeof value === 'object' && value !== null) {
                    for (prop in value) {
                        validateAndNotify(objectName, newKeyPathParts, prop, value[prop]);
                    }
                } else if (value === null ||
                    typeof value === 'boolean' ||
                    typeof value === 'number' ||
                    typeof value === 'string') {
                    notifyApp('set', objectName, keyPath, value);
                } else {
                    throw new Error(`story: ${typeof value} is not supported`);
                }
            } catch (e) {
                logToDiv(e);
            }
        }, 5);
    }

    let setStory = function (newStory) {
        for (objectName in newStory) {
            var state = newStory[objectName];
            for (prop in state) {
                validateAndNotify(objectName, [], prop, state[prop]);
            }
        }
    }

    let removeStoryProp = function (prop) {
        let parts = prop.split('.');
        let objectName = parts.shift();
        notifyApp('delete', objectName, parts.join('.'));
    }

    let proxifyState = function (objectName, keyPathParts, state, mutable) {

        let getter = function (target, property) {
            return target[property];
        };

        let setter = function (target, property, value) {
            if (!mutable) {
                throw new Error(`story: property ${property} is immutable`);
            }

            // let obj = story[objectName];
            // for (keyPart of keyPathParts) {
            //     ogj = obj[keyPart];
            // }
            target[property] = value;
            validateAndNotify(objectName, keyPathParts, property, value);
            return true;
        };

        let definer = function (target, property, attributes) {
            if (!mutable) {
                throw new Error(`story: property ${property} is immutable`);
            }

            if (attributes === undefined) {
                throw new Error('story: property attributes must be set');
            }

            validateAndNotify(objectName, keyPathParts, property, attributes.value);
            return true;
        };

        let deleter = function (target, property) {
            if (!mutable) {
                throw new Error(`story: property ${property} is immutable`);
            }

            validateAndNotify(objectName, keyPathParts, property);
            return true;
        };

        let newState = {};
        for (stateProp in state) {
            newState[stateProp] = state[stateProp] !== null && typeof state[stateProp] === 'object'
                ? proxifyState(objectName, pushKeyPathPart(keyPathParts, stateProp), state[stateProp], mutable)
                : state[stateProp];
        }

        let result = new Proxy(newState, {
            get: getter,
            set: setter,
            defineProperty: definer,
            deleteProperty: deleter
        });

        return result;
    }

    let proxifyStory = function (newStory) {
        let newState = {};
        for (newStoryProp in newStory) {
            if (!newStoryProp in newStory.scheme || newStoryProp === 'scheme') {
                continue;
            }

            newState[newStoryProp] = proxifyState(newStoryProp, [], newStory[newStoryProp], newStory.scheme[newStoryProp].contentMutable);
        }

        let onStoryChange = window.story?.onStoryChange;
        window.story = newState;
        window.story.onStoryChange = onStoryChange;

        window.story.setStory = setStory;
        window.story.removeStoryProp = removeStoryProp;
    }

    proxifyStory(_story);

    if (window._onStoryChange === undefined) {
        Object.defineProperty(window, '_onStoryChange', {
            value: function () {
                logToDiv('_onStoryChange enter');
                try {
                    proxifyStory(_story);
                    if (typeof window.story.onStoryChange === 'function') {
                        story.onStoryChange();
                    }
                } catch (e) {
                    logToDiv(e);
                }

            },
            configurable: false,
            enumerable: false,
            writable: false
        });
    }

})();