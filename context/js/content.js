$(document).ready(function () {

    var fields = [
        "field_1"
    ];

    $("#btn-close").click(function () {
        StoryCLM.Presentation.Close(2);
    });

    $("input[name='rate']").change(function (e) {
        for (let i = 1; i < 6; i++) {
            $(`label[for='star${i}'] img`).attr("src", i <= e.target.value ? "svg/star-filled.svg" : "svg/star-outlined.svg")
        }
    });

    $("#btn-add").click(function () {
        let name = `field_${fields.length + 1}`;
        fields.push(name);
        var input = $("#input-wrapper-container");
        input.find("div span").text(`Name ${name}`);
        $("#text-input-list").append(input.html());

    });

    $("#btn-remove").click(function () {
        if (fields.length === 1) {
            return;
        }

        $("#text-input-list div:last-child").remove();
        fields.pop();
    });
});