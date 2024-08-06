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

// const {auth }= require('../middlewares/auth');

// router.post('/createRestaurant', auth, createRestaurant, (req, res) => {
//     res.status(200).json({
//         success: true,
//         message: 'created',
//         user: req.user,
//     })});


router.post('/addMenuItem', addMenuItem);
router.get('/getMenuItem', getMenuItem);
router.get("/getmenuItemById/:id",getMenuItemById);
router.put('/editMenuItem/:id', editMenuItem);
router.delete('/deleteMenuItem/:id', deleteMenuItem);

router.post('/addAmenity', addAmenity);
router.get('/getAmenity', getAmenity);

router.post('/addSpace', addSpace);
router.get('/getSpace', getSpace);


router.post('/setTimings', setTimings);
router.get('/getTimings', getTimings);



module.exports = router;
