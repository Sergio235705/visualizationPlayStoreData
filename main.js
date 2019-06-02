url = 'google_play_store_cleaned.csv';
data = null;

window.onload = function () {
    getData(url,10,function () {

        var groups = groupByCategory(data);
        histRating(data);
        plotStatsCategories(groups);
        boxPlotCategories(data);
        plot_ratings_reviews(data);
        plot_ratings_download(data);
        plot_ratings_price(data);


    });

};

function  getData(url,n,callback) {
    $.get(url,function (csv) {
        data = $.csv.toObjects(csv);
        // show first n values
        let table = tableToHtmlElement(_.sampleSize(data,n));
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

