const express = require('express');
const app = express.Router();
const con = require("./db");
const ddc = con.ddc;

app.get("/api/getdata/:year/:age/:cause", async (req, res) => {
    const year = req.params.year;
    const age = req.params.age;
    const cause = req.params.cause;
    const sql = `SELECT v.${cause} as cause, v.province, ST_AsGeoJSON(geom) as geometry
                FROM r506code_sim_4326 g
                LEFT JOIN (SELECT * FROM le_14092022 WHERE year = ${year} AND agegroup = '${age}') as v
                ON g.province_t = v.province`;
    // console.log(sql)
    let jsonFeatures = [];
    ddc.query(sql).then(data => {
        var rows = data.rows;
        rows.map(r => {
            // console.log(r)
            let feature = {
                type: "Feature",
                properties: {
                    cause: r.cause,
                    province: r.province,
                    // le52_stk: r.le52_stk,
                    // lk52_hart: r.lk52_hart,
                    // le52_acc: r.le52_acc,
                    // le52_lica: r.le52_lica,
                    // le52_dm: r.le52_dm,
                },
                geometry: JSON.parse(r.geometry)
            };
            jsonFeatures.push(feature);
        })


        let geoJson = {
            type: "FeatureCollection",
            features: jsonFeatures
        };
        res.status(200).json(geoJson);
    });
});

module.exports = app;