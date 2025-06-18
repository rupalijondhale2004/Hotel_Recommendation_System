let routes=require("express");
let controller=require("../controllers/regCtrl.js");

let router=routes.Router();


router.get("/",controller.homePage);
router.get("/savereg",controller.regctrl);
router.get("/login",controller.regLogin);
router.post("/saveUser",controller.saveReg);
router.post("/validate",controller.validate);


router.get("/cityDash",controller.CityDash);
router.get("/city",controller.Citypage);
router.post("/save",controller.SaveCity)
router.get("/viewCity",controller.ViewCitypage);
router.get("/deleteCityById",controller.CityDelete);
 


router.get("/amenitiesDash",controller.AmenitiesDash);
router.get("/amenities",controller.Amenitiespage);
router.post("/saveamenities",controller.Saveamenities)
router.get("/viewAmenities",controller.ViewAmenitiespage);
router.get("/deleteAmenitiesById",controller.AmenitiesDelete);


router.get("/areaDash",controller.AreaDash);
router.get("/area",controller.Areapage);
router.post("/savearea",controller.SaveArea)
router.get("/viewArea",controller.ViewAreapage);
router.get("/deleteAreaById",controller.AreaDelete);


router.get("/addpicDash",controller.AddImageDash);
router.get("/addImage",controller.AddImagepage);
router.post("/saveaddImage",controller.SaveAddImage)


router.get("/reviewDash",controller.ReviewDash);
router.get("/review",controller.Reviewpage);
router.post("/savereview",controller.SaveReview)
router.get("/viewReview",controller.ViewReviewpage);


router.get("/hotelDash",controller.HotelDash);
router.get("/hotel",controller.Hotelpage);
router.post("/savehotel",controller.SaveHotel)
router.get("/viewhotelAdmin",controller.ViewHotelAdminpage);
router.get("/deleteHotelAdminById",controller.HotelAdminDelete);
router.get("/updateHotel",controller.HotelUpadate)
router.post("/finalupdateHotel",controller.FinlHotelUpadate)


router.get("/hotelpicDash",controller.HotelPicDash);
router.get("/hotelpic",controller.Picpage);
router.get("/viewHotelpic",controller.ViewHotelPicpage);
router.get("/deleteHotelPicById",controller.HotelPicDelete);
router.post("/savepic",controller.SavePic)


router.get("/viewhotel",controller.HotelView);
router.get("/viewhotelDash",controller.ViewHotelDash);
router.get("/getareadata",controller.getareadata);

router.get("/viewspecifichotel",controller.ViewSpecificDash);

router.get("/viewcustomer",controller.CustomerView);
 

router.get("/searchHotel",controller.SearchHotel);


router.get("/getFilterCity",controller.getFilterCity);

module.exports=router;


