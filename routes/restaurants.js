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
    getAmenityById,
    editAmenity,
    deleteAmenity,
    addSpace,
    getSpace,
    updateRestaurantTiming
} = require('../controllers/restaurantController');
const auth = require('../middlewares/auth');

router.post('/addMenuItem', auth, addMenuItem);
router.get('/getMenuItem', auth, getMenuItem);
router.get('/getmenuItemById/:id', auth, getMenuItemById);
router.put('/editMenuItem/:id', auth, editMenuItem);
router.delete('/deleteMenuItem/:id', auth, deleteMenuItem);


router.post('/addAmenity', auth, addAmenity);
router.get('/getAmenity', auth, getAmenity);
router.get('/getAmenityById/:id', auth, getAmenityById);
router.put('/editAmenity/:id', auth, editAmenity);
router.delete('/deleteAmenity/:id',  deleteAmenity);

router.post('/addSpace', auth, addSpace);
router.get('/getSpace', auth, getSpace);

router.put('/update-timing',auth,  updateRestaurantTiming);

module.exports = router;
