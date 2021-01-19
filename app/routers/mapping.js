let express = require("express");
let router = express.Router();
let upload = require("../config/multer.config.js");

let path = __basedir + "/views/";
router.get("/", (req, res) => {

    console.log("__basedir" + __basedir);
    res.sendFile(path + "map.html");

});


module.exports = router;





