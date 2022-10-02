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

var geojson;
var info = L.control();
function updateInfo() {
    info.remove()
    info.onAdd = function (map) {
        this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
        this.update();
        return this._div;
    };

    info.update = function (props) {

        let causeTxt = $("#cause option:selected").text();
        this._div.innerHTML = '<h4>' + causeTxt + '</h4>' + (props ?
            '<b>' + props.province + ': ' + props.cause.toFixed(1) + ' ปี' : 'Hover over a province');
    };

    info.addTo(map);
}

var legend = L.control({ position: 'bottomright' });
var grades;

function getColor(d) {
    // console.log(grades);
    return d > grades[5] ? '#196F3D' :
        d > grades[4] ? '#229954' :
            d > grades[3] ? '#52BE80' :
                d > grades[2] ? '#F9E79F' :
                    d > grades[1] ? '#F8C471' :
                        '#E67E22';
}

function setLegend1() {
    legend.remove()
    legend.onAdd = function (map) {

        var div = L.DomUtil.create('div', 'info legend')

        for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
                '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
                (grades[i]).toFixed(0) + (grades[i + 1] ? '&ndash;' + (grades[i + 1]).toFixed(0) + '<br>' : '+');
        }

        return div;
    };
    legend.addTo(map);
    updateInfo()
}

function rmLyr() {
    map.eachLayer(lyr => {
        // console.log(lyr)
        if (lyr.options.name == 'lyr1') {
            map.removeLayer(lyr)
        }
    })
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



var geojson2;

function rmLyr2() {
    map2.eachLayer(lyr => {
        if (lyr.options.name == 'lyr2') {
            map2.removeLayer(lyr)
        }
    })
}

var info2 = L.control();

function updateInfo2() {
    info2.remove()
    info2.onAdd = function (map2) {
        this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
        this.update();
        return this._div;
    };

    info2.update = function (props) {

        let cause2Txt = $("#cause2 option:selected").text();
        this._div.innerHTML = '<h4>' + cause2Txt + '</h4>' + (props ?
            '<b>' + props.province + ': ' + props.cause.toFixed(1) + ' ปี' : 'Hover over a province');
    };
    info2.addTo(map2);
}


var legend2 = L.control({ position: 'bottomright' });

function setLegend2() {
    legend2.remove()
    // console.log(grades);
    legend2.onAdd = function (map2) {
        var div2 = L.DomUtil.create('div', 'info legend'),
            // grades = g,
            labels = [];

        for (var i = 0; i < grades.length; i++) {
            div2.innerHTML +=
                '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
                (grades[i]).toFixed(0) + (grades[i + 1] ? '&ndash;' + (grades[i + 1]).toFixed(0) + '<br>' : '+');
        }

        return div2;
    };

    legend2.addTo(map2);
    updateInfo2()
}

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

/////

async function getArr(arr1, arr2) {
    let datArr3 = []
    await arr1.filter(i => i.properties.cause !== null).map(x => datArr3.push(x.properties.cause))
    await arr2.filter(i => i.properties.cause !== null).map(x => datArr3.push(x.properties.cause))

    let min = Math.min(...datArr3)
    let max = Math.max(...datArr3)

    let intv = (max - min) / 5
    grades = [min];
    let i = 1
    while (i <= 5) {
        grades.push(min + (intv * i))
        i++
    }
    setLegend1()
    setLegend2()


    geojson = await L.geoJson(arr1, {
        name: 'lyr1',
        style: function (f) {
            return {
                fillColor: getColor(f.properties.cause),
                weight: 2,
                opacity: 1,
                color: 'white',
                dashArray: '3',
                fillOpacity: 0.8
            };
        },
        onEachFeature: onEachFeature
    }).addTo(map);

    geojson2 = await L.geoJson(arr2, {
        name: 'lyr2',
        style: function (f) {
            return {
                fillColor: getColor(f.properties.cause),
                weight: 2,
                opacity: 1,
                color: 'white',
                dashArray: '3',
                fillOpacity: 0.8
            };
        },
        onEachFeature: onEachFeature2
    }).addTo(map2);
}

function getData() {
    let y = $("#year option:selected").text();
    let a = $("#age option:selected").text();
    let c = $("#cause option:selected").val();

    let y2 = $("#year2 option:selected").val();
    let a2 = $("#age2 option:selected").val();
    let c2 = $("#cause2 option:selected").val();

    rmLyr();
    rmLyr2();
    let url = 'https://rti2dss.com/p3300'
    // let url = "http://localhost:3300"
    $.get(`${url}/api/getdata/${y}/${a}/${c}`).done(r1 => {
        $.get(`${url}/api/getdata/${y2}/${a2}/${c2}`).done(r2 => {
            getArr(r1.features, r2.features)

        })
    })

}

getData()