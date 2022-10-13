const express = require("express");
const router = express.Router();
 
const js2xmlparser = require("js2xmlparser");
const moment = require("moment");

router.get("/", function(req, res, next) {
    try {
        //our records to index
        const records = getRecordsFromDataSource();
        const collection = [];
        let today = moment();
        today = today.format("YYYY-MM-DD");
        //add site root url
        const rootUrl = {};
        rootUrl.loc = "https://uemah.com/";
        rootUrl.lastmod = today;
        rootUrl.changefreq = "daily";
        rootUrl.priority = "1.0";
        rootUrl["image:image"] = {
            "image:loc": "https://res.cloudinary.com/dvpp07pji/image/upload/v1665609308/alfonso_ufdtpj.jpg",
            "image:caption":
                "UEMAH Unidad Educativa del Milenio Alfonso Herrera",
        };
        collection.push(rootUrl);
 
        //add recipes urls
        for (let i = 0; i < records.length; i++) {
            const url = {};
            url.loc = records[i].url;
            url.lastmod = records[i].updated_at;
            url["image:image"] = {
                "image:loc": records[i].featured_image_url,
                "image:caption": records[i].description,
            };
 
            collection.push(url);
        }
        const col = {
            "@": {
                xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9",
                "xmlns:image": "http://www.google.com/schemas/sitemap-image/1.1",
            },
            url: collection,
        };
        const xml = js2xmlparser.parse("urlset", col);
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
 
    const record1 = {
        url: "https://uemah.com/",
        description:
            "Unidad Educativa del Milenio Alfonso Herrera",
        featured_image_url: "https://res.cloudinary.com/dvpp07pji/image/upload/v1665609308/alfonso_ufdtpj.jpg",
        updated_at: "2022-10-12",
    };
    const record2 = {
        url: "https://uemah.com/",
        description: "Colegio Alfonso Herrera",
        featured_image_url: "https://res.cloudinary.com/dvpp07pji/image/upload/v1665609308/alfonso_ufdtpj.jpg",
        updated_at: "2022-10-12",
    };
    return [record1, record2];
}
 
module.exports = router;