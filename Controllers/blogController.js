const blog_Models = require('../Modules/BlogModels')
const username = require('../Modules/Authontication');
const fs = require('fs')

const addBlogFormController = (req, res) => {
    res.render('addBlogForm');
}


const myBlogerController = async (req, res) => {
    const bloggerEmail = req.user.email;
    const bloggersData = await blog_Models.find({ userEmail: bloggerEmail });

    const loggedInUser = req.user; 
    res.render('my_blogs', { blogs: bloggersData,loggedInUser: loggedInUser  });
}


const createBlogController = async (req, res) => {
    const authenticatedEmail = req.user.email;

    const newBlog = new blog_Models({

        title: req.body.title,
        content: req.body.content,
        path: req.file ? req.file.path : '',
        userEmail: authenticatedEmail

    })

    await newBlog.save()
    res.redirect('/')
}


const editBlogController = async (req, res) => {

    const blogId = req.params.id;
    const editBlog = await blog_Models.findById(blogId)


    res.render('edit_blogs', { editBlog })
}


const updateBlogController = async (req, res) => {
    const updateid = req.params.id
    const updateBlog = await blog_Models.findById(updateid)
    if (req.file) {
        fs.unlink(updateBlog.path, (err) => {
            console.log(err);

        })
    }

    updateBlog.title = req.body.title
    updateBlog.content = req.body.content
    if (req.file) {
        updateBlog.path = req.file.path
    }

    const updateData = await blog_Models.findByIdAndUpdate(updateid, updateBlog, { new: true })
    res.redirect('/myBlogs');

}

const deleteBlogController = async (req, res) => {
    const deleteId = req.params.id;
    const deletedata = await blog_Models.findById(deleteId)

    fs.unlink(deletedata.path, (err) => {
        console.log(err);
    })

    const deleteBlog = await blog_Models.findByIdAndDelete(deleteId)
    res.redirect('/myBlogs');

}

module.exports = {
    addBlogFormController,
    createBlogController,
    myBlogerController,
    editBlogController,
    updateBlogController,
    deleteBlogController
};