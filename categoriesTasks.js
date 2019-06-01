
/*
@author: Andrea Favia
@id : 237758
 */
const mean = arr =>arr.reduce( (p,c) => +p + (+c),0)/arr.length;

var groupByCategory = (data)=>{
    let groups = _.groupBy(data,'Category');
    let categories = Object.keys(groups); //get categories
    //Number((6.688689).toFixed(1)); // 6.7
    let vect = [];
    for (let i =0; i<categories.length; ++i){
        //console.log(categories[i]);

        let rating = +(mean(groups[categories[i]].map(v=>v.Rating)).toFixed(2));
        let reviews = +(mean(groups[categories[i]].map(v=>v.Reviews)).toFixed(2));
        let size_mega = +(mean(groups[categories[i]].map(v=>v.Size_Mega)).toFixed(2));
        let installs = +(mean(groups[categories[i]].map(v=>v.Installs)).toFixed(2));
        let prices = +(mean(groups[categories[i]].map(v=>v.Price_dollar)).toFixed(2));

        let obj = {};
        obj.Category = categories[i];
        obj.rating_mean = rating;
        obj.reviews_mean = reviews;
        obj.sizeMega_mean = size_mega;
        obj.installs_mean = installs;
        obj.prices_mean = prices;

        vect.push(obj);
    }
    return vect;
};


function plotStatsCategories(data) {
    plotRatings(data);
    plotReviews(data);
}
function plotRatings(data){
    sorted = _.sortBy(data, d=>d.rating_mean);
    trace = [{
        type:'bar',
        y : sorted.map(d=>d.Category),
        x : sorted.map(d=>d.rating_mean),
        orientation: 'h'
    }];

    layout = [];

    Plotly.newPlot('rating_mean',trace)

}

function plotReviews(data){
    sorted = _.sortBy(data, d=>d.reviews_mean);
    trace = [{
        type:'bar',
        y : sorted.map(d=>d.Category),
        x : sorted.map(d=>d.reviews_mean),
        orientation: 'h'
    }];

    layout = [];

    Plotly.newPlot('reviews_mean',trace)

}
