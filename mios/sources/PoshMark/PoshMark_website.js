class Poshmark_WebSite extends require("../../classes/website.js") {
  constructor() {
    super();
    this.url = "https://poshmark.com/closet/secondove";
    this.name = "Poshmark";
    this.striptags = require("striptags");
  }

  crawlSite() {
    return new Promise((resolve, reject) => {
      this.crawlIndex(1)
        .then(() => {
          resolve();
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  crawlIndex(page) {
    var me = this;
    // Get total number of items and pages (12 items per page)
    return new Promise((resolve, reject) => {
      this.fetch("https://poshmark.com/closet/secondove")
        .then(html => {
          var me = this;
          var $ = this.cheerio.load(html);
          var nextLoad = $("div#tiles-con").attr("data-max-id");

          $("div.tile").each(function(itm, index, arr) {
            let product = new require("../../classes/product.js");

            $ = me.cheerio.load(this);
            product.title = $("a.title").text();
            product.cost = $(".price").text();
            product.dimensions = $(".size").text();
            product.manufact = $(".brand").text();

            console.log(product);
            // var id = $(this).attr("id");
            // if (id != undefined) {
            //   if (
            //     $(this)
            //       .attr("id")
            //       .endsWith("prodName")
            //   ) {
            //     // Crawl product page and fetch details
            //     me.crawlProduct($(this).attr("href"));
            //   }
            // }
          });

          // Crawl next page if any left
          // var count = $(
          //   "#ctl02_produit_pagingIndexCtrl_lblResultsTotal"
          // ).html();
          // var pages = Math.ceil(count / 12);
          // if (page < pages) {
          //   this.crawlIndex(page + 1)
          //     .then(() => {
          //       resolve();
          //     })
          //     .catch(err => {
          //       reject(err);
          //     });
          // } else {
          //   resolve();
          // }
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}
//   crawlProduct(page) {
//     return new Promise((resolve, reject) => {
//       var Product = new require("./Amisco_product.js");
//       var product = new Product();
//       this.fetch(this.url + page)
//         .then(html => {
//           var $ = this.cheerio.load(html);
//           product.id = $("#ctl02_ctl01_mz1Div_ctl00_pdc_lbNumero")
//             .text()
//             .replace(/[^a-z|A-Z|0-9|\-]*/g, "");
//           product.title = $("#ctl02_ctl01_mz1Div_ctl00_pdc_prodName")
//             .text()
//             .replace(/[^a-z|A-Z|0-9|\-\s\.\,]*/g, "");
//           product.manufact = this.name;
//           product.cost = "";
//           product.description = $("#ctl02_ctl01_mz1Div_ctl00_pdc_lbLongDesc")
//             .text()
//             .replace(/[^a-z|A-Z|0-9|\-\s\.\,]*/g, "")
//             .replace(/[\t\n]*/g, "")
//             .replace(/\s{2,}/g, " ");
//           product.page = this.url;
//           var images = Array();

//           $("a[rel='lightbox[pp_gal_prod]']").each(function(itm, index, arr) {
//             var iurl = $(this).attr("href");
//             if (images.indexOf(iurl) == -1) {
//               images.push(iurl);
//               product
//                 .saveImage(iurl)
//                 .then(() => {
//                   if (product._images.length <= 0) {
//                     // No images from lightbox, get primary image
//                     $("#ctl02_ctl01_mz1Div_ctl00_pdc_imgCtrl_imageCtrl").each(
//                       function(itm, index, arr) {
//                         var iurl = $(this).attr("href");
//                         if (images.indexOf(iurl) == -1) {
//                           images.push(iurl);
//                           product
//                             .saveImage(iurl)
//                             .then()
//                             .catch(err => {
//                               console.log(err);
//                             });
//                         }
//                       }
//                     );
//                   }
//                 })
//                 .catch(err => {
//                   console.log(err);
//                 });
//             }
//           });

//           product.save();
//           resolve();
//         })
//         .catch(err => {
//           reject(err);
//         });
//     });
//   }
// }
module.exports = Poshmark_WebSite;
