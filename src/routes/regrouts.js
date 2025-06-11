let routes=require("express");
let regCtrl=require("../controllers/regCtrl");
let router=routes.Router();

router.post("/register",regCtrl.regCtrl);
router.get("/",regCtrl.homePage);

module.exports=router;


