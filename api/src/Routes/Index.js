const {Router} = require("express");
const router = Router();
const {
    getAllDogs,
    getDogById,
    getDogByName,
    getAllTemperaments,
    addDog,
} = require("./Routes")


router.get("/dogs", (req, res) => {
    if(!req.url.includes("?")){
        getAllDogs(req, res)
    }

    else{
        getDogByName(req, res)
    }
});

router.get("/dogs/:idRaza", getDogById);
router.get("/temperaments", getAllTemperaments);


router.post("/dogs", addDog);

module.exports = router;