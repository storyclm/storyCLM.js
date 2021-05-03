console.log("context.js");

var StateRaw = {
    setField: function (parentId, key, value) {
        console.log(`Current state: ${JSON.stringify(window.State)}`);
        console.log(`Setter: ${parentId}, ${key}, ${value}`);
    },
    data: {
        id: "1",
        field1: "Hello World",
        field2: "2 field",
        field3: true,
        field4: 123,
        objField5: {
            id: "2",
            field51: "5 field",
            field52: false,
            field53: null,
            objField54: {
                id: "3",
                field541: "541_field",
                field542: 22345,
                field543: undefined

            }
        }
    }
};
console.log("context.js");

var wrap = function (obj) {

    var result = {};

    for (propName in obj) {

        if (typeof StateRaw[propName] === 'object') {
            result[propName] = wrap(StateRaw[propName]);
            continue;
        }

        Object.defineProperty(result, propName, {
            get: function () {
                return this[propName];
            },
            set: function (value) {
                StateRaw.setField(this.id, propName, value)
                this[propName] = value;
            }
        });
        result[propName] = obj[propName];
    }
    return result;
};

; (function () {
    window.State = wrap(StateRaw);
    console.log(`Current state: ${JSON.stringify(window.State)}`);

    window.State.field1 = "test Hello World";
})();
