class WebSite {
  constructor() {
    this.request  = require('request');
    this.cheerio  = require('cheerio');
    this.products = Object.create(null);
    this.pages    = Array();
    this.delay    = 0; // Milliseconds between requests

    this.url      = "";
    this.name     = "";
  }

  fetch(url) {
    return  new Promise((resolve, reject) => {
      WebSite._fetch(url, this.delay).then((html) => {
        resolve(html);
      }).catch((err) => {
        reject("site error: " + err);
      });
    });
  }

  addProduct(product) {
    this.products[product.id] = product;
  }

  crawlSite(){
    console.log("morph crawlSite of: " + this.name);
  }

  crawlItems(url){
    console.log("morph crawlSite of: " + this.name);
  }

  crawlPage(url) {
   console.log("Attempting to crawl " + url + " please overwrite crawlPage(url) to scrape this page.");
  }

  static extractHostname(url) {
    var hostname;
    if (url.indexOf("://") > -1) {
        hostname = url.split('/')[2];
    } else {
        hostname = url.split('/')[0];
    }
    hostname = hostname.split(':')[0];
    hostname = hostname.split('?')[0];
    return hostname;
  }

  static _fetch(url, delay=0) {
    if (WebSite.queue == undefined) {
      WebSite.queue = Array();
      WebSite.timing = new Map();
      WebSite.count = 0;
    }

    var host = WebSite.extractHostname(url);
    if (WebSite.timing.has(host)) {
    } else {
      WebSite.timing.set(host, { delay: delay, lastCall: 0 });
    }

    return  new Promise((resolve, reject) => {
      if (WebSite.count <= 5) {
        var timing = WebSite.timing.get(host);
        if (timing.lastCall < ((new Date()).getTime() - timing.delay)) { // Check for delay between requests.
          timing.lastCall = (new Date()).getTime()-1; // Last call done, now
          WebSite.count++;
          WebSite.crawl(url).then((html) => {
            resolve(html);
            WebSite.count--;
            //console.log("In Queue: " + WebSite.queue.length + " Crawling: " + WebSite.count);
            if (WebSite.queue.length >= 1) {
              var site = WebSite.queue.shift();
              WebSite._fetch(site.url).then((html) => {
                site.resolve(html);
              }).catch((err) => {
                site.reject(err);
              });
            }
          }).catch((err) => {
            WebSite.count--;
            reject(err);
          });
        } else { // Timer not expired
          var site = {url:url, resolve:resolve, reject:reject};
          WebSite.queue.push(site); // move it to back of the line
          //console.log(WebSite.queue);
          site = WebSite.queue.shift(); // Query the next on the list.
          //console.log(site);
          WebSite._fetch(site.url).then((html) => {
             site.resolve(html);
          }).catch((err) => {
            site.reject(err);
          });
        }
      } else {
        var siteQueue = {url:url, resolve:resolve, reject:reject};
        WebSite.queue.push(siteQueue);
      }
    });
  }

  postCrawl(params,dir){
     return new Promise((resolve,reject)=>{
      var querystring = require('querystring');
      var http = require('http');
      var fs = require('fs');

      var post_data = querystring.stringify(params);
      var post_options = {
          host: this.url.replace("https:\/\/","").replace("http:\/\/","").replace("www.","").replace("\/",""),
          port: '80',
          path: dir,
          method: 'POST',
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Content-Length': Buffer.byteLength(post_data)
          }
      };

      var post_req = http.request(post_options, function(res) {
          var html = [];
          res.setEncoding('utf8');
          res.on('data', function (data) {
              html.push(data);
            });
          res.on('end', function(){
            resolve(html.join(""));
          });
      });
      post_req.write(post_data);
      post_req.end();
    });
    }

  readSitemap(url) {
    return  new Promise((resolve, reject) => {
      this.fetch(url).then((html) => {
        var site = this.cheerio.load(html);
        var links = Array();
        site("loc").each((res,ind)=>{
          links.push(site(ind).text());
        });
        resolve(links);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  static crawl(url) {
    return  new Promise((resolve, reject) => {
      var request = require('request');
      var options = {url:url,headers: {'User-Agent': "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36"}};
      request(options, (error, response, data) => {
        if (!error && (response.statusCode == 200 || response.statusCode == 508)) {
          resolve(data);
        } else {
	console.log(url);
          reject(response);
        }
      });
    });
  }
}
module.exports = WebSite;
