var clickEvent = ('ontouchstart' in window ? 'touchend' : 'click');

function setJson(id, json) {
    $("#" + id).html("<pre>" + JSON.stringify(json, null, 4) + "</pre>");
}

function loadDocData(id)
{
    var e = $("[data-i=" + id + "]");
    $("#signa").val(e.find(".signa").text());
    $("#text").html(e.find(".text").text());
    $("#request").html(e.find(".request").html());
}