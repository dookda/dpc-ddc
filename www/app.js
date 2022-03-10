"usestrict"

var map = L.map('map1', {
    center: [14.17033, 100.984700],
    zoom: 6
});

var cartoDB = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19
});

cartoDB.addTo(map);


let year = $("#year option:selected").text();
let age = $("#age option:selected").text();
let cause = $("#cause option:selected").text();
let causeVal = $("#cause option:selected").val();

getData(year, age, causeVal)

$("#year").change(function () {
    year = $("#year option:selected").val();
    getData(year, age, causeVal)
})

$("#age").change(function () {
    age = $("#age option:selected").val();
    getData(year, age, causeVal)
})

$("#cause").change(function () {
    cause = $("#cause option:selected").text();
    causeVal = $("#cause option:selected").val();
    getData(year, age, causeVal)
})

var geojson;

function getData(y, a, c) {
    rmLyr();

    $.get(`https://rti2dss.com/p3300/api/getdata/${y}/${a}/${c}`).done(r => {
        geojson = L.geoJson(r.features, {
            name: 'lyr1',
            style: style,
            onEachFeature: onEachFeature
        }).addTo(map);
    })
}

var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    this._div.innerHTML = '<h4>Life</h4>' + (props ?
        '<b>' + cause + ': ' + props.cause.toFixed(1) + ' ปี' : 'Hover over a province');
};

info.addTo(map);

var legend = L.control({ position: 'bottomright' });

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 10, 20, 30, 40, 50, 60, 70, 80],
        labels = [];

    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(map);

function rmLyr() {
    map.eachLayer(lyr => {
        // console.log(lyr)
        if (lyr.options.name == 'lyr1') {
            map.removeLayer(lyr)
        }
    })
}

function getColor(d) {
    return d > 80 ? '#196F3D' :
        d > 70 ? '#229954' :
            d > 60 ? '#52BE80' :
                d > 50 ? '#A9DFBF' :
                    d > 40 ? '#D5F5E3' :
                        d > 30 ? '#FCF3CF' :
                            d > 20 ? '#F9E79F' :
                                d > 10 ? '#F8C471' :
                                    '#E67E22';
}

function style(f) {
    return {
        fillColor: getColor(f.properties.cause),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.8
    };
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

function resetHighlight(e) {
    geojson.resetStyle(e.target);
    info.update();
}

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.8
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }

    info.update(layer.feature.properties);
}

// map 2
var map2 = L.map('map2', {
    center: [14.17033, 100.984700],
    zoom: 6
});
var cartoDB2 = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19
});

cartoDB2.addTo(map2)

let year2 = $("#year2 option:selected").val();
let age2 = $("#age2 option:selected").val();
let cause2 = $("#cause2 option:selected").text();
let cause2Val = $("#cause2 option:selected").val();
console.log(cause2Val)

getData2(year2, age2, cause2Val)

$("#year2").change(function () {
    year2 = $("#year2 option:selected").val();
    getData2(year2, age2, cause2Val)
})

$("#age2").change(function () {
    age2 = $("#age2 option:selected").val();
    getData2(year2, age2, cause2Val)
})

$("#cause2").change(function () {
    cause2 = $("#cause2 option:selected").text();
    cause2Val = $("#cause2 option:selected").val();
    getData2(year2, age2, cause2Val)
})

var geojson2;

function getData2(y, a, c) {
    rmLyr2();
    $.get(`https://rti2dss.com/p3300/api/getdata/${y}/${a}/${c}`).done(r => {
        geojson2 = L.geoJson(r.features, {
            name: 'lyr2',
            style: style,
            onEachFeature: onEachFeature2
        }).addTo(map2);
    })
}

function rmLyr2() {
    map2.eachLayer(lyr => {
        console.log(lyr)
        if (lyr.options.name == 'lyr2') {
            map2.removeLayer(lyr)
        }
    })
}

var info2 = L.control();

info2.onAdd = function (map2) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info2.update = function (props) {
    this._div.innerHTML = '<h4>Life</h4>' + (props ?
        '<b>' + cause2 + ': ' + props.cause.toFixed(1) + ' ปี' : 'Hover over a province');
};

info2.addTo(map2);

var legend2 = L.control({ position: 'bottomright' });

legend2.onAdd = function (map2) {

    var div2 = L.DomUtil.create('div', 'info legend'),
        grades = [0, 10, 20, 30, 40, 50, 60, 70, 80],
        labels = [];

    for (var i = 0; i < grades.length; i++) {
        div2.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div2;
};

legend2.addTo(map2);

function onEachFeature2(feature, layer) {
    layer.on({
        mouseover: highlightFeature2,
        mouseout: resetHighlight2,
        click: zoomToFeature2
    });
}

function zoomToFeature2(e) {
    map2.fitBounds(e.target.getBounds());
}

function resetHighlight2(e) {
    geojson2.resetStyle(e.target);
    info2.update();
}

function highlightFeature2(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.9
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }

    info2.update(layer.feature.properties);
}