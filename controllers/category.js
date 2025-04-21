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
            errors: { error },
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
            errors: { error },
        });
    }
}

exports.update = async (req, res) => {
    try {
        const { id, title, desc } = req.body;
        const category = await Category.findByPk(id);
        if(!category) return res.status(401).json({ message: 'Error', error: 'Category not found' });
    
        const category_ = await Category.update({
            where: {
                id: category.id,
            },
            title,
            desc,
        })
        res.status(201).json({ 
            message: "Success",
            success: 'Categories Fetched successfully',
            category: category_
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error',
            errors: { error },
        })
    }
}

exports.destroy = async (req, res) => {
    try {
        const { id } = req.body;
        const category = await Category.findByPk(id);
        if(!category) return res.status(401).json({ message: 'Error', error: 'Category not found' });

        await Category.destroy({ where: { id }});
    
        res.status(201).json({ 
            message: "Success",
            success: "Category Deleted Successfully"
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error',
            errors: { error },
        });
    }
}

exports.show = async (req, res) => {
    console.log("Debugging one is runnign ")
    try {
        const { id } = req.body;
        console.log("this isthe id", id)
        const category = await Category.findByPk(id);
        if(!category) return res.status(401).json({ message: 'Error', errors: 'Category not found' });

        console.log(category);
        const category_ = await Category.findOne({ where: { id }});
    
        res.status(201).json({ 
            message: "Success",
            success: "Category Deleted Successfully",
            category: category_,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error',
            errors: { error },
        });
    }
}