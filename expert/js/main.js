var clickEvent = ('ontouchstart' in window ? 'touchend' : 'click');

function b64_to_utf8(str) {
    //return decodeURIComponent(escape(window.atob(str)));
   //return window.atob(str);
}

function setJson(id, json) {
    $("#" + id).html("<pre>" + JSON.stringify(json, null, 4) + "</pre>");
    $("#responsebody").html("<pre>" + b64_to_utf8(json.data) + "</pre>");
}

function loadDocData(id)
{
    var e = $("[data-i=" + id + "]");
    $("#signa").val(e.find(".signa").text());
    $("#text").html(e.find(".text").text());
    $("#request").html(e.find(".request").html());
}