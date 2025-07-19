// controllers/restaurantController.js
const mongoose = require('mongoose');
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

exports.updateMenuOrder = async (req, res) => {
    try {
        const { items } = req.body; 

        const bulkOperations = items.map(item => ({
            updateOne: {
                filter: { _id: item.id },
                update: { order: item.order }
            }
        }));

        await Menu.bulkWrite(bulkOperations);

        res.status(200).json({
            success: true,
            message: "Menu order updated successfully"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};


exports.addMenuItem = async (req, res) => {
    try {
        const { itemTitle, price, userId } = req.body;

        // Ensure files are uploaded correctly
        if (!req.files || !req.files.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded"
            });
        }

        const file = req.files.file;

        // Validate file format
        const allowedFormats = ["jpeg", "jpg", "png"];
        const fileParts = file.name.split(".");

        if (fileParts.length < 2) {
            return res.status(400).json({
                success: false,
                message: "Invalid file name. File must have an extension."
            });
        }

        const fileFormat = fileParts.pop().toLowerCase();

        if (!allowedFormats.includes(fileFormat)) {
            return res.status(400).json({
                success: false,
                message: "Invalid file format. Only jpeg, jpg, and png are allowed."
            });
        }

        // Upload file to Cloudinary
        let response;
        try {
            response = await cloudinaryFileUpload(file, "uploadFolder");
            console.log("Cloudinary Response:", response);
        } catch (uploadError) {
            console.error("Cloudinary Upload Error:", uploadError);
            return res.status(500).json({ success: false, message: "Error uploading image" });
        }

        // Validate userId
        if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid or missing userId"
            });
        }

        // Find the highest order value for this user's items
        const lastItem = await Menu.findOne({ userId }).sort({ order: -1 });

        // Assign order value: highest found order +1 or 0 if no items exist
        const newOrder = lastItem ? lastItem.order + 1 : 0;

        // Save new menu item with correct order
        const newMenuItem = new Menu({
            imageUrl: response.secure_url,
            itemTitle,
            price,
            userId: new mongoose.Types.ObjectId(userId),
            order: newOrder,  // Ensure new items get correct order
        });

        await newMenuItem.save();

        res.status(200).json({
            success: true,
            message: 'Menu item added successfully',
            data: newMenuItem
        });

    } catch (err) {
        console.error("Server Error:", err);
        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: err.message
        });
    }
};


exports.getMenuItemByUserId = async (req, res) => {
    try {
        const userId = req.user.id; // Extract userId from authenticated user

        // Validate userId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid userId",
            });
        }

        // Find menu items that belong to the logged-in user
        const menuItems = await Menu.find({ userId }).sort({ order: 1 });

        if (!menuItems.length) {
            return res.status(404).json({
                success: false,
                data: [],
                message: "No menu items found for this user",
            });
        }

        res.status(200).json({
            success: true,
            data: menuItems,
        });
    } catch (err) {
        console.error("Error fetching menu items:", err);
        res.status(500).json({
            success: false,
            message: "Server error",
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
        const userId = req.user._id; 

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
