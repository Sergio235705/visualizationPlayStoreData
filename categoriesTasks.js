
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
    plotReviews(data);
    plotSizes(data);
    plotInstalls(data);
    plotPrices(data);



}
function boxPlotCategories(data){
    let groups = _.groupBy(data,'Category');
    let categories = Object.keys(groups);
    let vect = [];
    for (let i =0; i<categories.length; ++i){
        //console.log(categories[i]);

        let rating_v = groups[categories[i]].map(v=>v.Rating);

        let obj = {};
        obj.Category = categories[i];
        obj.ratings = rating_v;

        vect.push(obj);
    }

    plot_box(vect);



}
function plot_box(data){
    let tracks = [];
    for( let i=0; i<data.length; ++i){
        tracks.push({y:data[i].ratings,type:'box',name:data[i].Category,marker:{size:2},line:{width:1},boxpoints:"SuspectedOutliers"});
    }

    layout = {
        showlegend:false,
        title: 'App ratings for category',
        yaxis: {
            autorange: true,
            showgrid: true,
            zeroline: false,
            dtick: 5,
            gridcolor: 'rgb(255, 255, 255)',
            gridwidth: 1,
            zerolinecolor: 'rgb(255, 255, 255)',
            zerolinewidth: 4
        },
       margin: {
            r:130,
            t: 80,
            b: 100,
            pad: 2,
            l: 100,
           autoexpand: true,
       },
        automargin: true,
        autosize: true,




    };
    Plotly.newPlot('box-plot',tracks,layout)
}


function histRating(data){

    var trace = [{
        type:'histogram',
        x : data.map(d=>d.Rating),
    }];
    var layout = {
        title: 'Rating Histogram',
        width : 600,
        height: 600,
        margin:{
            pad	:	3,
            r	:	10,
            l	:	80,
            t	:	100,
            b	:	80,
            autoexpand:true,

        },
        bargap	:	0.13,
        bargroupgap	:	0.4,



    };

    Plotly.newPlot('rating_hist',trace,layout)

}


function histReviews(data){

    var trace = [{
        type:'histogram',
        x : data.map(d=>d.Reviews),
    }];
    var layout = {
        title: 'Reviews Histogram',
        width : 600,
        height: 600,
        margin:{
            pad	:	3,
            r	:	10,
            l	:	80,
            t	:	100,
            b	:	80,
            autoexpand:true,

        },
        bargap	:	0.13,
        bargroupgap	:	0.4,



    };

    Plotly.newPlot('reviews_hist',trace,layout)

}


function plotInstalls(data){
    var sorted = _.sortBy(data, d=>d.installs_mean);
    var trace = [{
        type:'bar',
        y : sorted.map(d=>d.Category),
        x : sorted.map(d=>d.installs_mean),
        orientation: 'h'
    }];


    var layout = {
        title: 'Categories vs Installs',
        xaxis: {
            title: 'Installs'
        },
        width : 600,
        height: 600,
        margin : {
            l: 200,
            r: 20,
            t:100,
            b: 100,
            pad:3
        }
    };

    Plotly.newPlot('installs_mean',trace,layout)

}

function plotPrices(data){
    var sorted = _.sortBy(data, d=>d.prices_mean);
    var trace = [{
        type:'bar',
        y : sorted.map(d=>d.Category),
        x : sorted.map(d=>d.prices_mean),
        orientation: 'h'
    }];

    var layout = {
        title: 'Categories vs Prices',
        xaxis: {
            title: 'dollars ($)'
        },
        width : 600,
        height: 600,
        margin : {
            l: 200,
            r: 20,
            t:100,
            b: 100,
            pad:3
        }
    };

    Plotly.newPlot('prices_mean',trace,layout)

}

function plotSizes(data){
    var sorted = _.sortBy(data, d=>d.sizeMega_mean);
    var trace = [{
        type:'bar',
        y : sorted.map(d=>d.Category),
        x : sorted.map(d=>d.sizeMega_mean),

        orientation: 'h'
    }];

    var layout = {
        title: 'Categories vs Sizes',
        xaxis: {
            title: 'Megabite'
        },
        width : 600,
        height: 600,
        margin : {
            l: 200,
            r: 20,
            t:100,
            b: 100,
            pad:3
        }
    };


    Plotly.newPlot('sizeMega_mean',trace,layout)

}




function plotReviews(data){
    var sorted = _.sortBy(data, d=>d.reviews_mean);
    var trace = [{
        type:'bar',
        y : sorted.map(d=>d.Category),
        x : sorted.map(d=>d.reviews_mean),
        orientation: 'h'
    }];

    var layout = {
        title:'Categories vs Reviewx',
        xaxis:{
            title: 'Reviews'
        },

        width : 600,
        height: 600,
        margin : {
            l: 200,
            r: 20,
            t:100,
            b: 100,
            pad:3
        }
    };


    Plotly.newPlot('reviews_mean',trace,layout)
    }


