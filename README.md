# StaticIndexer
Index static html within a directory, for use with [Tipue Search](https://github.com/Tipue/Tipue-Search) in static mode, using cheerio.js
This file is run one time to generate your static index! it does not get included in any page. 

##Usage:
1. Ensure that indexer.js is in the same directory as your static .html
2. run node indexer.js 
3. place generated tipuesearch_content.js inside tipuesearch directory.

## Output file will follow this form:
```var tipuesearch = {"pages": [
     {"title": "Tipue", "text": "", "tags": "jQuery HTML5 CSS", "url": "http://www.tipue.com"},
     {"title": "Tipue Search, a site search engine jQuery plugin", "text": "Tipue Search is a site search engine jQuery plugin. It's free, open source, responsive and fast. Tipue Search only needs a browser that supports jQuery. It doesn't need MySQL or similar. In Static mode it doesn't even need a web server.", "tags": "JavaScript", "url": "http://www.tipue.com/search"},
     {"title": "Tipue Search Documentation", "text": "Tipue Search is a site search engine jQuery plugin. It's free, open source and responsive. Tipue Search uses various modes for loading content. Static mode uses a JavaScript object, while JSON mode uses JSON. Live mode grabs content from a list of pages dynamically.", "tags": "docs", "url": "http://www.tipue.com/search/docs"},  
]};```
###yep
 ```                      });
                        }
                    });
                });
            }
        });
    });
});
```
