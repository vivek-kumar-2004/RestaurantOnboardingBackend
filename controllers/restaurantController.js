// controllers/restaurantController.js
const Menu = require('../models/Menu');
const Amenity = require('../models/Amenity');
const Space = require('../models/Space');
const User = require('../models/User');
const cloudinary = require("cloudinary").v2;

async function cloudinaryFileUpload(file, folder) {
    const options = { folder }
    options.resource_type = "auto"
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

// Add menu item
exports.addMenuItem = async (req, res) => {
    try {
        const { itemTitle, price } = req.body;
        const file = req.files.file;

        if (!file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded"
            });
        }

        const formattypes = ["jpeg", "jpg", "png"];
        const fileformat = file.name.split(".")[1].toLowerCase();

        if (!formattypes.includes(fileformat)) {
            return res.status(400).json({
                success: false,
                message: "Invalid file format. Only jpeg, jpg, and png are allowed"
            });
        }
        const response = await cloudinaryFileUpload(file, "uploadFolder");

        let menu = await Menu.create({ imageUrl: response.secure_url, itemTitle, price });

        res.status(200).json({
            success: true,
            message: 'Menu item added successfully',
            data: menu
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

// Get menu items
exports.getMenuItem = async (req, res) => {
    try {
        const response = await Menu.find({});

        res.status(200).json({
            success: true,
            data: response,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            error: err.message,
        });
    }
};

exports.getMenuItemById = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await Menu.findById({ _id: id });

        if (!response) {
            return res.status(404).json({
                success: false,
                data: null,
                message: "Todo not found",
            });
        }

        res.status(200).json({
            success: true,
            data: response,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            error: err.message,
        });
    }
};

exports.deleteMenuItem = async (req, res) => {
    try {
        const { id } = req.params;
        await Menu.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: 'Item deleted successfully',
        });
    }
    catch (err) {
        console.error(err);
        console.log("error");
        res.status(500).json({
            success: false,
            message: 'Server Error',
        });
    }
};

// Update menu item
exports.editMenuItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { imageUrl, itemTitle, price } = req.body;

        const response = await Menu.findByIdAndUpdate(
            { _id: id },
            { imageUrl, itemTitle, price },
        );

        res.status(200).json({
            success: true,
            data: response,
            message: 'Item updated successfully',
        });
    }
    catch (err) {
        console.error(err);
        console.log("error");
        res.status(500).json({
            success: false,
            message: 'Server Error',
        });
    }
};

// Remove menu item
exports.addAmenity = async (req, res) => {
    const { imageUrl, amenityTitle } = req.body;
    try {
        let amenity = await Amenity.create({ imageUrl, amenityTitle });
        res.status(200).json({
            success: true,
            message: 'Amenity added successfully',
            data: amenity
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getAmenity = async (req, res) => {
    try {
        const response = await Amenity.find({});

        res.status(200).json({
            success: true,
            data: response,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            error: err.message,
        });
    }
};

exports.addSpace = async (req, res) => {
    const { imageUrl, spaceTitle } = req.body;
    try {
        let space = await Space.create({ imageUrl, spaceTitle });
        res.status(200).json({
            success: true,
            message: 'Space added successfully',
            data: space
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getSpace = async (req, res) => {
    try {
        const response = await Space.find({});

        res.status(200).json({
            success: true,
            data: response,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            error: err.message,
        });
    }
};


// Update Restaurant Timings
exports.updateRestaurantTiming = async (req, res) => {
    try {
        const userId = req.user._id; // Assuming user is authenticated and user ID is available in req.user

        const { opening_time, closing_time, status } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { opening_time, closing_time, status },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: 'Restaurant timings updated successfully',
            data: updatedUser
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};
