var context = window.ContextBridge;

var TestFunc1 = function () {
    if (!context) {
        console.log("no context");
        return
    }
    let val = 1;
    var result = context.TestMethod1(val);
    return result;
}

var TestFunc2 = function () {
    if (!context) {
        console.log("no context");
        return
    }
    let val = $("input[name='testInput2']").val();
    console.log(val);

    if (Native != undefined) {
        var result = context.TestMethod2(val);
        $("#result").val(result);
    }

    return result;
}