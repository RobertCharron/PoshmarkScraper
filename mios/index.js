var request = require("request");
var cheerio = require("cheerio");
var fs = require("fs");

/*
fs.readdir("./sources", function (err,files){ //will be used to run full scrape. do not delete

  files.forEach(function(file){
    fs.stat('./sources/' + file + '/'+ file + '_website.js',function(err,stat){
      if(err == null){
        var obj = new (require('./sources/' + file + '/'+ file + '_website.js'));
        obj.crawlSite();
      }else{
	console.log(err);
      }
    })
  });
});
*/

var b = new (require("./sources/PoshMark/PoshMark_website.js"))(); //replace with the source being worked on at that moment.

b.crawlSite().catch(err => {
  console.log(err);
});
