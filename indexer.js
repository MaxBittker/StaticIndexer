var path = require("path");
var fs = require('fs');
var dir = __dirname; //'./tmpl/';
var data = {};
var cheerio = require('cheerio');

fs.writeFile('tipuesearch_content.js', 'var tipuesearch = {"pages": [\n', function(err) {
    if (err) throw err;
    console.log('Cleared:');
});

function cleanup(str, stripCommas = 0) {
    if (str == undefined) {
        str = "";
    } else {
        if (stripCommas == 1) {
            str = str.replace(/,/g, ' ');           // Replace all commas with spaces.
        }
        if (stripCommas == 2) {                     // Replace all punctuation with spaces.
            body = body.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/, ' ');
        }
        str = $('<textarea />').html(str).text(); // Unescape html entities.
        str = str.replace(/\s\s+/g, ' ');           // Replace tabs, newlines and multiple spaces with 1 space.
    }
    return str;
}

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

                    var body = $('h1,h2,p,table,div').map(function(i, el) {
                        return $(this).text();
                    }).get().join(' ');
                    body = cleanup(body);

                    var title = $('title').text();
                    title = cleanup(title);
                                        
                    var tags = $('meta[name="keywords"]').attr('content');
                    tags = cleanup(tags, 1);

                    fs.appendFile('tipuesearch_content.js', JSON.stringify({
                        title: title,
                        text: body,
                        tags: tags,
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
