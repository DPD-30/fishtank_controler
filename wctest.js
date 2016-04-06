'use strict';
var nools = require("nools");
var util = require("util");
//const doWaterChange = require('./waterchange.js')
var WaterChange = (date,status) => {return {date:date, status:status, temp:0}}
var d = new Date();
var flow = nools.compile(__dirname + "/newruleset.nools",{scope:{util:util}});
var x =d.setDate(d.getDate()-2)
var x =d.setMinutes(d.getMinutes()+0)

var session = flow.getSession( WaterChange(d,'complete'));
session.on("fire", function(name, rule){
    util.log(name)
    util.log(util.inspect(rule))
});
session.on('doWaterChange',util.log)

session.match();

