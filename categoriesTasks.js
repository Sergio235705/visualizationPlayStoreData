
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
    //plotRatings(data);
    //plotReviews(data);
    plotInstalls(data);
    //plotPrices(data);
   // plotSizes(data);


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

    trace = [{
        type:'histogram',
        x : data.map(d=>d.Rating),
    }];
    layout = {
        title : {
            text : 'Rating Distribution',
            font: 25,

        },
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

    Plotly.newPlot('rating_mean',trace,layout)

}


function plotInstalls(data){
    sorted = _.sortBy(data, d=>d.installs_mean);
    trace = [{
        type:'bar',
        y : sorted.map(d=>d.Category),
        x : sorted.map(d=>d.installs_mean),
        orientation: 'h'
    }];

    layout = [];

    Plotly.newPlot('installs_mean',trace)

}

function plotPrices(data){
    sorted = _.sortBy(data, d=>d.prices_mean);
    trace = [{
        type:'bar',
        y : sorted.map(d=>d.Category),
        x : sorted.map(d=>d.prices_mean),
        orientation: 'h'
    }];

    layout = [];

    Plotly.newPlot('prices_mean',trace)

}

function plotSizes(data){
    sorted = _.sortBy(data, d=>d.sizeMega_mean);
    trace = [{
        type:'scatter',
        mode:'markers',
        y : sorted.map(d=>d.Category),
        x : sorted.map(d=>d.sizeMega_mean),
        //orientation: 'h'
    }];

    layout = {
        title: {
            text:'App sizes',
        },
        xaxis : {
            type:'log',
            range: [0.9351436589130417,1.7220513371052903],
            nticks : 6,
            tickmode : 'auto',
            showgrid :true,
            fixedrange:true,
            autorange :true,
        },
        yaxis: {
            side: "left",
            type: "category",
            range: [
                -0.2479,
                34.66402375081093
            ],
            tickson: "labels",
            autorange: false,
            tickangle: "auto",
            automargin: true,
        },



    };

    Plotly.newPlot('sizeMega_mean',trace,layout)

}




function plotReviews(data){
    sorted = _.sortBy(data, d=>d.reviews_mean);
    trace = [{
        type:'bar',
        y : sorted.map(d=>d.Category),
        x : sorted.map(d=>d.reviews_mean),
        orientation: 'h'
    }];

    layout = {
        width : 600,
        height: 300,
        margin: {
            l:200,
            t:0,
            b:50,
            r:500,
            pad:6,
            autoexpand: true,

        },
       // autosize: true,
       /* title:{
        text: 'Reviews vs Categories',
        x : 0.42,
        },
       margin: {
            l:200,
            t:0,
            b:50,
            r:500,
            pad:6,
           autoexpand: true,

        },
        automargin:true,


        xaxis: {
            autorange:true,
            //exponentformat:"SI",
            //showexponent:"all",
            //side:'bottom',
            automargin:true,
            //tickfont:{tickangle: "auto"},

        },
        yaxis:{
           autorange:true,
           automargin:true,
           type:'category',
           fixedrange:true,
           tickfont : {size: 11, family: 'Arial'},
           showgrid:true,
            nticks: 38,

        },
        barmode:'overlay',
        barnorm:'fraction',
        bargap:0.86,
        bargroupgap:0.55,
        spikedistance:20,
        hoverdistance:20,*/






    };

    Plotly.newPlot('reviews_mean',trace,layout)

}
