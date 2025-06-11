let routes=require("express");
let regCtrl=require("../controllers/regCtrl");
let router=routes.Router();

router.post("/register",regCtrl.regCtrl);
router.get("/",regCtrl.homePage);
router.get("/signup",regCtrl.signUpPage);
router.get("/signin",regCtrl.signInPage);
router.post("/validate",regCtrl.validateUser);
router.get("/viewprofile",regCtrl.viewProfile);
router.post("/updateprofile",regCtrl.updateProfile);

module.exports=router;



