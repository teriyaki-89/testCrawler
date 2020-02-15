const express = require("express");
const router = new express.Router();

const jsdom = require("jsdom");
var request = require("request");
const { JSDOM } = jsdom;

router.get("/", async (req, res) => {
    const url = "https://" + req.query.url;

    // JSDOM.fromURL(url).then(function(dom) {
    //     //let h1 = dom.window.document.querySelector("a");
    //     //console.log(dom.window.document.querySelectorAll("a"));
    //     var aArr = dom.window.document.querySelectorAll("a");
    //     // var h1Arr = dom.window.document.querySelectorAll("h1");
    //     //console.log(dom.window.document);
    //     // console.log(dom.serialize());
    //     //console.log(dom.window);
    //     aArr.forEach(item => {
    //         console.log(item.textContent);
    //     });
    //     // h1Arr.forEach(item => {
    //     //     //console.log(item.textContent);
    //     // });

    //     // var window = JSDOM(dom).createWindow();
    //     // var h1Arr = window.document.querySelectorAll("h1");
    //     // console.log(h1Arr);

    //     res.status(200).send("123");
    // });

    //res.status(200).send(dom.window.document.querySelector("p").textContent);
});

module.exports = router;
