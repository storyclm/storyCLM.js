$('#state').text(JSON.stringify(window.story, null, 4));

var onStoryChange = function () {
    // console.log('onStoryChange');
    // console.log(JSON.stringify(window.story));
    $('#state').text(JSON.stringify(window.story, null, 4));
}

// ; (function () {
//     let getter = function (target, property, receiver) {

//         // TODO: some logic

//         console.log("getter: " + property);
//         console.log("getter path: " + target.path);
//         return target[property];
//     };
//     let setter = function (target, property, value, receiver) {

//         // TODO: some logic

//         console.log("setter of: " + property + " value: " + value);
//         console.log("setter path: " + target.path);
//         target[property] = value;
//         return true;
//     };

//     let nestedProxy = function (target, path = []) {
//         console.log(path);
//         for (targetProp in target) {
//             if (typeof target[targetProp] === 'object') {
//                 path.push(targetProp);
//                 target[targetProp] = nestedProxy(target[targetProp], path);

//             }
//         }

//         let result = new Proxy(target, {
//             get: getter,
//             set: setter
//         });
//         result.path = path.join(".");
//         return result;
//     }

//     let proxyTarget = {
//         prop1: "val1",
//         prop2: {
//             prop3: "val2",
//             prop4: "val3"
//         }
//     };

//     let proxy = new nestedProxy(proxyTarget, ["root"]);
//     var v = proxy.prop1; // getter test
//     var v1 = proxy.prop2.prop3; // getter test

//     proxy.prop1 = "set1"; // setter test
//     proxy.prop2.prop3 = "set2"; //setter test
//     proxy.prop5 = "val4"; //setter test

//     console.log(proxy);

// })();

// // LAB FINISh

// var storyContext = window.story;
// console.log(window.Native);

// if (!storyContext) {
//     storyContext = {
//         accentColor: {
//             color: "blue"
//         }

//     }
// }

// var logState = function () {
//     if (!storyContext) {
//         console.log("no storyContext");
//         return
//     }
//     $("body").css("background-color", storyContext.accentColor.color);
//     console.log(JSON.stringify(storyContext.State, 4));
// }

// var TestFunc2 = function () {
//     if (!storyContext) {
//         console.log("no context");
//         return
//     }
//     let val = $("input[name='testInput2']").val();
//     console.log(val);

//     if (storyContext != undefined) {
//         var result = context.TestMethod2(val);
//         $("#result").val(result);
//     }

//     return result;
// }

// var Native = {
//     TestCall1: function () {
//         return 123;
//     }
// }

// Native.TestCall1();