const db = require("../models")
const Blog = db.Blog;

exports.views = async (req, res) => {
    try {
        const blogs = await Blog.findAll();
        return res.status(200).json({
            message: 'Success',
            blogs
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error',
            error: 'Data Fetched Successfully.',
            errors: [{ error }],
        });
    }
}

exports.create = async (req, res) => {
    try {
        const {
            title, 
            image,
            tags,
            desc,
            long_text,
            category_id,          
        } = req.body;
        const user = req.user;
        const blog = await Blog.create({
            title, tags, desc, long_text, category_id, user_id: user.id,
        });

        return res.status(201).json({
            message: 'Success',
            success: 'Blog Created Successfully.',
            blog,
        })
    } catch (error) {
        if(error.name === 'SequelizeValidationError'){
            const messages = error.errros.map(err => err.message);
            return res.status(400).json({ errors: messages });
        }

        console.error(error);
        return res.status(500).json({
            message: 'Error',
            error: 'something went worong.',
            errors: [{ error }],
        });
    }
}

exports.update = async (req, res) => {
    try {
        const id = req.params.id;
        const {
            title, 
            image,
            tags,
            desc,
            long_text,
            category_id,          
        } = req.body;

        const blog = await Blog.findByPk(id);
        if(!blog) return res.status(401).json({ message: 'Error', error: 'Blog not found.'});

        blog.title = title;
        blog.tags = tags;
        blog.desc = desc;
        blog.long_text = long_text;
        blog.category_id = category_id;
        await blog.save();

        return res.status(201).json({
            message: 'Success',
            success: 'Blog updated successfully.',
            blog,
        })
    } catch (error) {
        if(error.name === 'SequelizeValidationError'){
            const messages = error.errros.map(err => err.message);
            return res.status(400).json({ errors: messages });
        }

        console.error(error);
        return res.status(500).json({
            message: 'Error',
            errors: [{ error }],
        });
    }
}

exports.destroy = async (req, res) => {
    try {
        const id = req.params.id;
        const blog = await Blog.findByPk(id);
        if(!blog){
            return res.status(401).json({ message: 'Error', error: 'Blog not found.' });
        }
        await blog.destroy();
        return res.status(200).json({ 
            message: 'Success', 
            success: "Blog Deleted Successfully."
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
        id = req.params.id;

        const blog = await Blog.findByPk(id);
        if(!blog) return res.status(401).json({ message: 'Error', error: 'Blog not found.'});

        return res.status(200).json({
            message: 'Success',
            success: 'Blog Data fetched Successfully',
            blog,
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error',
            error: 'Server Error.',
        });
    }
}