const express = require('express');
const router = express.Router();
const {
    addMenuItem,
    getMenuItem,
    getMenuItemById,
    editMenuItem,
    deleteMenuItem,
    addAmenity,
    getAmenity,
    addSpace,
    getSpace,
    setTimings,
    getTimings,
 
} = require('../controllers/restaurantController');
const {auth}=require("../middlewares/auth")



router.post('/addMenuItem', auth,  addMenuItem);
router.get('/getMenuItem', auth, getMenuItem);
router.get("/getmenuItemById/:id", auth, getMenuItemById);
router.put('/editMenuItem/:id', auth,  editMenuItem);
router.delete('/deleteMenuItem/:id', auth, deleteMenuItem);

router.post('/addAmenity', addAmenity);
router.get('/getAmenity', getAmenity);

router.post('/addSpace', addSpace);
router.get('/getSpace', getSpace);


router.post('/setTimings', setTimings);
router.get('/getTimings', getTimings);



module.exports = router;
