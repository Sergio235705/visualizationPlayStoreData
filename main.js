url = 'google_play_store_cleaned.csv';
data = null;

window.onload = function () {
    getData(url,20);
    // first task
    var grouped = groupByCategory(data);
    plotRatings(grouped);



};

function  getData(url,n) {
    $.get(url,function (csv) {
        data = $.csv.toObjects(csv);
        // show first n values
        let table = tableToHtmlElement(data.slice(0,n));
        $("#csv").append(table);

    });


};
