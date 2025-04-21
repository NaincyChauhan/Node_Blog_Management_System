const db = require("../models")
const Category = db.Category;

exports.views = async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.status(201).json({ 
            message: "Success", 
            success: 'Categories Fetched successfully.',
            categories, 
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Error',
            errors: [{ error }],
        });
    }
}

exports.create = async (req, res) => {
    try {
        const { title, desc } = req.body;
        if(title === '' || title === null) res.status(401).json({ message: "Error", error: 'Category not found.' });
        const category = await Category.create({ title, desc });
        res.status(201).json({ 
            message: "Success", 
            success: 'category created successfully.',
            category,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error',
            errors: [{ error }],
        });
    }
}

exports.update = async (req, res) => {
    try {
        const id = req.params.id;
        const { title, desc } = req.body;

        const category = await Category.findByPk(id);
        if(!category) return res.status(401).json({ message: 'Error', error: 'Category not found' });

        category.title = title;
        category.desc = desc;
        await category.save();

        res.status(201).json({ 
            message: "Success",
            success: 'Categories updated successfully',
            category
        });
    } catch (error) {        
        return res.status(500).json({
            message: 'Error',
            errors: [{ error }],
        })
    }
}

exports.destroy = async (req, res) => {
    try {
        const id = req.params.id;
        const category = await Category.findByPk(id);
        if(!category) return res.status(401).json({ message: 'Error', error: 'Category not found' });

        await category.destroy();
    
        res.status(201).json({ 
            message: "Success",
            success: "Category Deleted Successfully"
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error',
            errors: [{ error }],
        });
    }
}

exports.show = async (req, res) => {
    try {
        const id = req.params.id;
        const category = await Category.findByPk(id);
        if(!category) return res.status(401).json({ message: 'Error', errors: 'Category not found' });
    
        res.status(201).json({ 
            message: "Success",
            success: "Category Fetched Successfully",
            category: category,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error',
            errors: [{ error }],
        });
    }
}