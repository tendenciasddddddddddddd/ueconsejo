"use strict";

var express = require("express");

var router = express.Router();

var js2xmlparser = require("js2xmlparser");

var moment = require("moment");

router.get("/", function (req, res, next) {
  try {
    //our records to index
    var records = getRecordsFromDataSource();
    var collection = [];
    var today = moment();
    today = today.format("YYYY-MM-DD"); //add site root url

    var rootUrl = {};
    rootUrl.loc = "https://pcei-tulcan.com/";
    rootUrl.lastmod = today;
    rootUrl.changefreq = "daily";
    rootUrl.priority = "1.0";
    rootUrl["image:image"] = {
      "image:loc": "https://res.cloudinary.com/stebann/image/upload/v1635615961/LOGO_COLEGIO_bgfeoz.webp",
      "image:caption": "PCEI-tulcan Unidad Educativa Fiscomisional Mons. Leonidas Proaño"
    };
    collection.push(rootUrl); //add recipes urls

    for (var i = 0; i < records.length; i++) {
      var url = {};
      url.loc = records[i].url;
      url.lastmod = records[i].updated_at;
      url["image:image"] = {
        "image:loc": records[i].featured_image_url,
        "image:caption": records[i].description
      };
      collection.push(url);
    }

    var col = {
      "@": {
        xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9",
        "xmlns:image": "http://www.google.com/schemas/sitemap-image/1.1"
      },
      url: collection
    };
    var xml = js2xmlparser.parse("urlset", col);
    res.set("Content-Type", "text/xml");
    res.status(200);
    res.send(xml);
  } catch (e) {
    next(e);
  }
});

function getRecordsFromDataSource() {
  //these records will have our own structure, we return as they are and later we convert them to the xml standard format
  //so let's just define two records hard-coded
  var record1 = {
    url: "https://pcei-tulcan.com/",
    description: "Unidad Educativa Monsenor Leonidas Proaño tulcan",
    featured_image_url: "https://res.cloudinary.com/stebann/image/upload/v1635615961/LOGO_COLEGIO_bgfeoz.webp",
    updated_at: "2021-08-06"
  };
  var record2 = {
    url: "https://pcei-tulcan.com/",
    description: "Unidad Educativa Fiscomisional Mons. Leonidas Proaño tulcan",
    featured_image_url: "https://res.cloudinary.com/stebann/image/upload/v1635615961/LOGO_COLEGIO_bgfeoz.webp",
    updated_at: "2021-08-06"
  };
  return [record1, record2];
}

module.exports = router;