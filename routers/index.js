const express = require("express");
const router = new express.Router();

var request = require("request");
cheerio = require("cheerio");

const Url = require("../models/url");

router.post("/url", async (req, res) => {
    const url = "https://" + req.query.url;
    parseUrl(res, url);
});
router.get("/urls", async (req, res) => {
    Url.find().then(urls => {
        res.status(200).send(urls);
    });
});

function parseUrl(res, url) {
    request(
        {
            method: "GET",
            url,
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36"
            }
        },
        async (err, resp, body) => {
            if (err) return res.status(500).send(err);
            var $ = cheerio.load(body);
            var h1 = stringifyArrayOfTags($, $("h1"), []);
            var h2 = stringifyArrayOfTags($, $("h2"), []);
            var h3 = stringifyArrayOfTags($, $("h3"), []);
            var aHref = stringifyArrayOfTags($, $("a"), []);
            const record = new Url({
                url,
                h1,
                h2,
                h3,
                aHref
            });
            try {
                let result = await record.saveUrl();
                res.status(200).send(result);
            } catch (e) {
                res.status(500).send(e);
            }
        }
    );
}

function stringifyArrayOfTags($, tag, arr) {
    tag.each(function() {
        let text = $(this)
            .text()
            .trim();
        if (text !== "") arr.push(text);
    });
    return JSON.stringify(arr);
}

module.exports = router;
