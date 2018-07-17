/*
===Script Purpose===
To convert a CSV file with two columns (seperated by a comma), key/value, to a properties i18n file.
===Script Usage===
Run with node on command line:
SYNTAX: node csvto18n.js [name of csv file]
EXAMPLE: node csvto18n.js lang_fr.csv
*/

console.log('Starting script...');
var args = './' + process.argv.slice(2);
var fs = require("fs");

fs.readFile(args, 'utf8', function (err, contents) {
    console.log('Fetched .csv file');
    saveFile(changeValues(contents));
});

function changeValues(contents) {
    var lines = contents.split("\n");
    var howManyLines = lines.length;

    console.log('There are ' + howManyLines + ' lines in this file.');

    for (var i = 0; i < howManyLines; i++) {
        var lineParts = lines[i].split(/,(.+)/);
        lines[i] = lineParts[0] + '=' + lineParts[1] + '\n';
        console.log(lines[i])
    }
    return lines
}

function saveFile(lines) {
    var fileNameSplit = process.argv.slice(2)[0].split(".csv");
    var outputName = fileNameSplit[0] + ".properties";

    fs.writeFile(outputName, lines, (err) => {
        if (err) throw err;
        console.log('File saved: "'+ outputName + '"');
    });
}
