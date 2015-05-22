var path = require("path");
var fs = require('fs');
var dir = __dirname; //'./tmpl/';
var data = {};
var cheerio = require('cheerio');

fs.writeFile('tipuesearch_content.js', 'var tipuesearch = {"pages": [\n', function(err) {
    if (err) throw err;
    console.log('Cleared:');
});

fs.readdir(dir, function(err, files) {
    if (err) throw err;
    var c = 0;

    files.forEach(function(file) {

        fs.stat(path.join(dir, file), function(err, stats) {

            if (!stats.isDirectory() && (path.extname(path.join(dir, file)) === ".html" || path.extname(path.join(dir, file)) === ".htm")) {
                c++;

                fs.readFile(path.join(__dirname, file), function(err, data) {
                    if (err) throw err;
                    $ = cheerio.load(data);


                    body = $('h1,h2,p').map(function(i, el) {
                        return $(this).text();
                    }).get().join(' ');


                    title = $('title').text();
                   

                    fs.appendFile('tipuesearch_content.js', JSON.stringify({
                        title: title,
                        text: body,
                        tags: "",
                        url: file
                    }) + ',\n', function(err) {
                        if (err) throw err;
                        console.log(file + ' processed!');
                        if (0 === --c) {
                            fs.appendFile('tipuesearch_content.js', ']};', function(err) {
                                if (err) throw err;
                                console.log('Done');
                            });
                        }
                    });
                });
            }
        });
    });
});
