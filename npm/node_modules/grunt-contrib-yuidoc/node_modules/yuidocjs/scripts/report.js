#!/usr/bin/env node

var istanbul = require('istanbul');
var fs = require('fs');
var path = require('path');
var json = JSON.parse(fs.readFileSync(path.join(__dirname, '../coverage/test-coverage.json')));

var collect = new istanbul.Collector(),
    report = istanbul.Report.create('text'),
    summary = istanbul.Report.create('text-summary');

    collect.add(json);

report.writeReport(collect);
summary.writeReport(collect);
