// rev:1

// if (window.story === undefined) {
//     window.story = {
//         app: {
//             // ...
//         },
//         // ...
//         questProgress: {
//             id: "1",
//             field1: 'Hello World',
//             field2: '2 field',
//             field3: true,
//             field4: 123,
//             objField5: {
//                 id: "2",
//                 field51: '5 field',
//                 field52: false,
//                 field53: null,
//                 objField54: {
//                     id: "3",
//                     field541: '541_field1',
//                     field542: 22345,
//                     field543: undefined

//                 }
//             }
//         }
//     };
// };

// if (window.changeStoryObject !== undefined) {
//     console.log('changeStoryObject exists');
//     if (window.changeStoryObject.changeStory !== undefined) {
//         console.log('changeStory exists');
//         console.log(JSON.stringify(window.story));
//         window.changeStoryObject.changeStory(JSON.stringify(window.story));
//     } else {
//         console.log('changeStory does not exist');
//     }
// } else {
//     console.log('changeStoryObject does not exist');
// };



var StateRaw = {
    setState: function (parentId, key, value) {
        console.log(`Current state in setField: ${JSON.stringify(window.State)}`);
        console.log(`Setter: ${parentId}, ${key}, ${value}`);
    },
    onStateChange: undefined,
    get data() {
        return window.story;
    }
};

var proxify = function (obj) {

    let newObj = {};
    Object.assign(newObj, obj);

    let getter = function (target, property, receiver) {
        return target[property];
    };
    let setter = function (target, property, value, receiver) {
        console.log(`setter ${property}`);
        target[property] = value;
        return true;
    };

    for (prop in newObj) {
        console.log(prop);
        if (newObj[prop] !== null && typeof newObj[prop] === 'object') {
            newObj[prop] = proxify(newObj[prop]);
        }
    }

    let result = new Proxy(newObj, {
        get: getter,
        set: setter
    });

    return result;
};

; (function () {
    // window.State = proxify(StateRaw.data);
    // console.log(window.State);
    // console.log(`Current state in IIFE: ${JSON.stringify(window.State)}`);

    // window.State.field1 = 'test Hello World';
    // // window.State.objField5.field51 = 'test Hello World';
    // // window.State.objField5.field55 = 'test field555';

    // console.log(window.State);
})();