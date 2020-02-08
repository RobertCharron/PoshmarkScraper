class Product {
  constructor() {
    this._id       = "";    // Required unique identifier
    this._title     = "";   // Product name
    this._manufact = "";    // Product manufacturor
    this._lastmod  = "";    // Epoch Time
    this._cost     = "";    // Pricing info
    this._description = ""; // Product descripton
    this._page = "";        // The path on the site to the product
    this._path = ".";        // Path to source image directory, set after inheritence
    this._category = "";
    this._dimentions = new Object(); // .width, .height and .length
    this._modelid = new Array();
    this._colour = new Array();
    this._textureImg = new Array();
    this._images = new Array();

    this._source = "";	    // Domain of site
    this._warranty = ""     // warranty information
    this._stock = 0;	    // Products in stock
  }

  get id() { return this._id; }
  get title() { return this._title; }
  get manufact() { return this._manufact; }
  get lastMod() { return this._lastmod; }
  get cost() { return this._cost; }
  get description() { return this._description; }
  get page() { return this._page; }
  get path() { return this._path; }
  get source() { return this._source; }
  get modelid() { return this._modelid; }
  get colour() { return this._colour; }
  get textureImg() { return this._textureImg; }
  get dimentions() { return this._dimentions; }
  get warranty() { return this._warranty; }
  get stock() { return this._stock; }
  get category() {return this._category;}

  set id(val) { this._id = val.replace('/[\x00-\x1F\x7F]/u', ''); }
  set title(val) { this._title = val.replace('/[\x00-\x1F\x7F]/u', ''); }
  set manufact(val) { this._manufact = val.replace('/[\x00-\x1F\x7F]/u', ''); }
  set lastmod(val) { this._lastmod = val; }
  set cost(val) { this._cost = val; }
  set description(val) { if(val!==null)this._description = val.replace('/[\x00-\x1F\x7F]/u', ''); }
  set page(val) { this._page = val.replace('/[\x00-\x1F\x7F]/u', ''); }
  set path(val) { this._path = val.replace('/[\x00-\x1F\x7F]/u', ''); }
  set source(val) { this._source = val.replace('/[\x00-\x1F\x7F]/u', ''); }
  set modelid(val) { this._modelid = val; }
  set colour(val) { this._colour = val; }
  set textureImg(val) { this._textureImg = val; }
  set dimentions(val) { this._dimentions =  val; }
  set warranty(val) { if (val != null) this._warranty = val.replace('/[\x00-\x1F\x7F]/u', ''); }
  set stock(val) { this._stock = val; }
  set category(val) { this._category = val; }

  save() {
    return new Promise((resolve, reject) => {
      var con = Product.getConnection();
      var time = Math.ceil((new Date).getTime() / 1000);
      var sql = "INSERT INTO products " +
                "(`id`, `title`, `manufact`, `cost`, `description`, `page`, `lastmod`, `source`, `models`, `colour`, `textureimg`, `warranty`, `stock`, `path`, `images`)" +
                " VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE" +
                " `title`=?, `manufact`=?, `cost`=?, `description`=?, `page`=?, `lastmod`=?, `source`=?, `models`=?, `colour`=?, `textureimg`=?, `warranty`=?, `stock`=?, `path`=?, `images`=?;";

      var values = [this.id, this.title, this.manufact, this.cost, this.description, this.page, time, this.source, JSON.stringify(this.modelid), JSON.stringify(this.colour), JSON.stringify(this.textureimg),
                    this.warranty, this.stock, this.path, JSON.stringify(this._images),
                    this.title, this.manufact, this.cost, this.description, this.page, time, this.source, JSON.stringify(this.modelid), JSON.stringify(this.colour), JSON.stringify(this.textureimg),
                    this.warranty, this.stock, this.path, JSON.stringify(this._images)];

      con.query(sql, values, (err, result) => {
        if (err) {throw err; console.log(err);}
        resolve();
      });
    });
  }

  saveImage(url, newfilename = false) {
    var fs = require('fs');
    var dir = this.path + "/images/" + this.id.replace(new RegExp("/", "g"), "-") + "/";
    var path = this.path + "/images/";

    if (!fs.existsSync(path)){
      fs.mkdirSync(path);
    }

    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
    }

    var filenameA = url.split("/");
    var filename = filenameA[filenameA.length - 1];

    if (newfilename) {
      var count = 0;
      var thepath = this.path + "/images/" + this.id.replace(new RegExp("/", "g"), "-") + "/";
      while (fs.existsSync(thepath + count + "_" + filename)) {
        count++;
      }
      filename = count + "_" + filename;
    }

    this._images.push(filename);
    return new Promise((resolve, reject) => {
      var download = require('download-file');
      var options = {
        directory: this.path + "/images/" + this.id.replace(new RegExp("/", "g"), "-") + "/"
      }
      if (newfilename) {
        options.filename = filename;
      }
      download(url, options, function(err){
        resolve();
        //reject(err);
      });
    });
  }

  savePdf(url, newfilename = false) {
    var fs = require('fs');
    var dir = this.path + "/pdf/" + this.id.replace(new RegExp("/", "g"), "-") + "/";
    var path = this.path + "/pdf/";

    if (!fs.existsSync(path)){
      fs.mkdirSync(path);
    }

    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
    }

    var filenameA = url.split("/");
    var filename = filenameA[filenameA.length - 1];

    if (newfilename) {
      var count = 0;
      var thepath = this.path + "/pdf/" + this.id.replace(new RegExp("/", "g"), "-") + "/";
      while (fs.existsSync(thepath + count + "_" + filename)) {
        count++;
      }
      filename = count + "_" + filename;
    }

    this._images.push(filename);
    return new Promise((resolve, reject) => {
      var download = require('download-file');
      var options = {
        directory: this.path + "/pdf/" + this.id.replace(new RegExp("/", "g"), "-") + "/"
      }
      if (newfilename) {
        options.filename = filename;
      }
      download(url, options, function(err){
        resolve();
        //reject(err);
      });
    });
  }

  static getConnection() {
    if ( typeof Product.con == 'undefined' ) {
      var mysql = require('mysql');
      Product.con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "Password123",
        database: "mios",
        connectionLimit : 20
      });
    }
    return Product.con;
  }

  toString(){
    var string = "ID: " + this.id + "\n\r\
    Title: " + this.title + "\n\r\
    Manufacturor: " + this._manufact + "\n\r\
    Cost: " + this._cost + "\n\r\
    Description: " + this._description + "\n\r\
    Page: " + this._page + "\n\r\
    Dimensions: " + this._dimentions.length + " \"L " + this._dimentions.height + " \"H " + this._dimentions.width + " \"W \n\r\
    Source: " + this._source + "\n\r\
    Group id: " + this._groupid + "\n\r\
    warranty: " + this._warranty + "\n\r\
    Stock: " + this._stock + "\n\r\
    Textures: " + this._textureImg + "\n\r\
    Colours: " + this._colour + "\n\r";
    return string;
  }
}
module.exports = Product;
