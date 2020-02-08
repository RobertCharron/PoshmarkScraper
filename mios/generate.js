var fs = require('fs');


  var newFile = process.argv[2];
  var newLink = process.argv[3];
var dir = "./sources/" + newFile;

if (!fs.existsSync(dir)){
  fs.mkdirSync(dir);
}

var file1 = fs.openSync(dir + "/" + newFile + "_product.js","a");
var file2 = fs.openSync(dir + "/" + newFile + "_website.js","a");

if(newLink.includes("https:\/\/")){
  var proto = "https:\\/\\/";
}else{
  var proto = "http:\\/\\/";
}

var products = "class " + newFile + "_Product extends require('../../classes/product.js'){\n\r\
constructor() {\n\r\
  super();\n\r\
  this.path = './sources/" + newFile + "';\n\r\
  this._source = '" + proto + (newLink.replace("http:\/\/","").replace("https:\/\/","").replace("/","\\/")) + "\\/';\n\r\
}\n\r\
\n\r\n\r\n\r\
}\n\r\
module.exports = " + newFile + "_Product;";


var website = "class " + newFile +"_WebSite extends require('../../classes/website.js') {\n\r\
  constructor() {\n\r\
    super();\n\r\
    this.url  = '" + proto + (newLink.replace("http:\/\/","").replace("https:\/\/","").replace("/","\\/")) + "\\/';\n\r\
    this.name = '" + newFile + "';\n\r\
    this.striptags = require('striptags');\n\r\
  }\n\r\n\r\
  crawlSite(){\n\r\
    var me = this;//refers to this class as 'this' gets overwritten\n\r\
    return new Promise((resolve, reject)=>{\n\r\
      this.fetch(this.url).then((html)=>{\n\r\
        var site = this.cheerio.load(html);\n\r\
      }).catch((err)=>{\n\r\
        console.log('Error: ' + err + ' Crawler: ' + me.name);\n\r\
      })\n\r\
    });\n\r\
  }\n\r\
  \n\r\n\r\n\r\
}\n\r\
module.exports =  " + newFile + "_WebSite";
fs.writeSync(file2,website);
fs.writeSync(file1,products);
