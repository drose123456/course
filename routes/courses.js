const router = require("express").Router();
const courseController = require("../controllers/courseController");
router.get("/add", courseController.add);
router.get("/all", courseController.all);
router.get("/filter", courseController.filterByProvider);
router.post("/create", courseController.create);
router.put("/update", courseController.update);
router.delete("/delete", courseController.delete);
router.get("/view", courseController.view);
router.post("/subscribe", courseController.subscribe);
router.post("/subscribed", courseController.subscribedCourse);
router.post("/edit/:id",courseController.edit);
router.get("/edit/:id",courseController.showedit)
router.delete("/delete/:id",courseController.deleteCourse)
router.get("/providers",courseController.allProviders)
router.post("/filterProviders",courseController.filterProviders)
router.post("/filterPrice",courseController.filterPrice)
router.post("/unsubscribe",courseController.unsubscribe)
router.post("/comment",courseController.comment)
router.get("/review/:id",courseController.showcommentarea)
router.get("/reviewlist/:id",courseController.showreview)
router.get("/reviewdata/:id",courseController.getallReview)
router.post("/subscriptions",courseController.subscription);

module.exports = router;
