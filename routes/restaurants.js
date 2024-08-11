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
    getSpaceById,
    editSpace,
    deleteSpace,
    updateRestaurantTiming
} = require('../controllers/restaurantController');
const auth = require('../middlewares/auth');

//routes for menu management
router.post('/addMenuItem', auth, addMenuItem);
router.get('/getMenuItem', auth, getMenuItem);
router.get('/getmenuItemById/:id', auth, getMenuItemById);
router.put('/editMenuItem/:id', auth, editMenuItem);
router.delete('/deleteMenuItem/:id', auth, deleteMenuItem);


//routes for amenity management
router.post('/addAmenity', auth, addAmenity);
router.get('/getAmenity', auth, getAmenity);
router.get('/getAmenityById/:id', auth, getAmenityById);
router.put('/editAmenity/:id', auth, editAmenity);
router.delete('/deleteAmenity/:id', auth,  deleteAmenity);


//routes for space management 
router.post('/addSpace', auth, addSpace);
router.get('/getSpace', auth, getSpace);
router.get('/getSpaceById/:id', auth, getSpaceById);
router.put('/editSpace/:id', auth, editSpace);
router.delete('/deleteSpace/:id', auth,  deleteSpace);


//route for update restaurant timings 
router.put('/update-timing',auth,  updateRestaurantTiming);

module.exports = router;
