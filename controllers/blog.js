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
            errors: { error },
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
            logn_text,
            user_id,
            category_id,          
        } = req.body;

        const blog = await Blog.create({
            title, tags, desc, logn_text, user_id, category_id
        });

        return res.status(201).json({
            message: 'Success',
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
            errors: { error },
        });
    }
}

exports.update = async (req, res) => {
    try {
        const {
            id,
            title, 
            image,
            tags,
            desc,
            logn_text,
            user_id,
            category_id,          
        } = req.body;

        const blog_ = await Blog.findByPk(id);
        if(!blog_) return res.status(401).json({ message: 'Error', error: 'Blog not found.'});

        const blog = await Blog.update({
            where: { id },
            title, tags, desc, logn_text, user_id, category_id
        });

        return res.status(201).json({
            message: 'Success',
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
            errors: { error },
        });
    }
}


exports.delete = async (req, res) => {
    const { id } = req.body;
    try {
        const blog = await Blog.findByPk(id);
        if(!blog){
            return res.status(401).json({ message: 'Error', error: 'Blog not found.' });
        }
        await Blog.destroy({ where: { id }});
        return res.status(200).json({ 
            message: 'Success', 
            success: "Blog Deleted Successfully."
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error',
            errors: { error },
        });
    }

}