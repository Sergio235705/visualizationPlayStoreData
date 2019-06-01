url = 'play_store_cleaned.csv';
data = null;

window.onload = function () {
    getData(url,20,function () {

        var groups = groupByCategory(data);
        //plotStatsCategories(groups);
        histRating(data);
        boxPlotCategories(data);



    });

};

function  getData(url,n,callback) {
    $.get(url,function (csv) {
        data = $.csv.toObjects(csv);
        // show first n values
        let table = tableToHtmlElement(data.slice(0,n));
        $("#csv").append(table);

        callback()
    });

};

function tableToHtmlElement(data) {
    let res = document.createElement("table");
    let html = "<tr>";
    for (let h in data[0])
        if (data[0].hasOwnProperty(h))
            html += "<th>" + h + "</th>";
    html += "</tr>";
    for (let i = 0; i < data.length; ++i) {
        html += "<tr>";
        for (let f in data[i])
            if (data[i].hasOwnProperty(f))
                html += "<td>" + data[i][f] + "</td>";
        html += "</tr>";
    }
    html += "</table>";
    res.innerHTML = html;
    return res;
};

