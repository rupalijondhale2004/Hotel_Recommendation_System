let routes=require("express");
let controller=require("../controllers/regCtrl.js");

let router=routes.Router();


router.get("/",controller.homePage);
router.get("/savereg",controller.regctrl);
router.get("/login",controller.regLogin);
router.post("/saveUser",controller.saveReg);
router.post("/validate",controller.validate);
router.get("/city",controller.Citypage);
router.post("/save",controller.SaveCity)
router.get("/area",controller.Areapage);
router.post("/savearea",controller.SaveArea)
router.get("/review",controller.Reviewpage);
router.post("/savereview",controller.SaveReview)
router.get("/hotel",controller.Hotelpage);
router.post("/savehotel",controller.SaveHotel)
router.get("/hotelpic",controller.Picpage);
router.post("/savepic",controller.SavePic)
router.get("/viewhotel",controller.HotelView);
module.exports=router;


