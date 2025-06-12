let routes=require("express");
let controller=require("../controllers/regCtrl.js");

let router=routes.Router();


router.get("/",controller.homePage);
router.get("/savereg",controller.regctrl);
router.get("/login",controller.regLogin);
router.post("/saveUser",controller.saveReg)
module.exports=router;


