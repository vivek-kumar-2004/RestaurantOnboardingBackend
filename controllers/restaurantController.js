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

// menu management section
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
                message: "Item not found",
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




// Amenity section

exports.addAmenity = async (req, res) => {
    try {
        const { amenityTitle } = req.body;
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

        let amenity = await Amenity.create({ imageUrl: response.secure_url, amenityTitle });

        res.status(200).json({
            success: true,
            message: 'Amenity added successfully',
            data: amenity
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

exports.getAmenityById = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await Amenity.findById({ _id: id });

        if (!response) {
            return res.status(404).json({
                success: false,
                data: null,
                message: "Amenity not found",
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

exports.deleteAmenity = async (req, res) => {
    try {
        const { id } = req.params;
        await Amenity.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: 'Amenity deleted successfully',
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

exports.editAmenity = async (req, res) => {
    try {
        const { id } = req.params;
        const { imageUrl, amenityTitle } = req.body;

        const response = await Amenity.findByIdAndUpdate(
            { _id: id },
            { imageUrl, amenityTitle },
        );

        res.status(200).json({
            success: true,
            data: response,
            message: 'Amenity updated successfully',
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



//Space management section

exports.addSpace = async (req, res) => {
    try {
        const { spaceTitle } = req.body;
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

        let space = await Space.create({ imageUrl: response.secure_url, spaceTitle });

        res.status(200).json({
            success: true,
            message: 'Space added successfully',
            data: space
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

exports.getSpaceById = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await Space.findById({ _id: id });

        if (!response) {
            return res.status(404).json({
                success: false,
                data: null,
                message: "Space not found",
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

exports.deleteSpace = async (req, res) => {
    try {
        const { id } = req.params;
        await Space.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: 'Space deleted successfully',
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
exports.editSpace = async (req, res) => {
    try {
        const { id } = req.params;
        const { imageUrl, spaceTitle } = req.body;

        const response = await Space.findByIdAndUpdate(
            { _id: id },
            { imageUrl, spaceTitle },
        );

        res.status(200).json({
            success: true,
            data: response,
            message: 'Space updated successfully',
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
