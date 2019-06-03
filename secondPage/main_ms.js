url = '../datasets/google_play_store_cleaned.csv';
data = null;

window.onload = function () {
    getData(url,0,function () {
        plot_ratings_reviews(data);
        plot_ratings_download(data);
        plot_ratings_size(data);
        plot_ratings_price(data);


    });

};

function  getData(url,n,callback) {
    $.get(url,function (csv) {
        data = $.csv.toObjects(csv);
        // show first n values
        //let table = tableToHtmlElement(_.sampleSize(data,n));
       // $("#csv").html(table);
        callback()
    });

};
