const Blog = require("../models/blog");


// Create a blog post
exports.create = async (req, res) => {
  try {
    // destructure title, author, content from req.body
    const { title, author, content } = req.body;

    // Check if title, author, and content are provided
    if (!title.trim()) {
      return res.json({ error: "Title is required" });
    }
    if (!author.trim()) {
      return res.json({ error: "author is required" });
    }
    if (!content.trim()) {
      return res.json({ error: "content is required" });
    }

    // Check if a blog post with the same title and author already exists
    const existingTitle = await Blog.findOne({ title });
    const existingAuthor = await Blog.findOne({ author });
    if (existingTitle && existingAuthor) {
      return res.json({ error: "This blog article already exists" });
    }

    // Create and save a new blog post
    const blog = await new Blog({ title, author, content }).save();
    res.status(200).json({ message: "Blog post create successfully", data: blog });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Failed to create blog post' });
  }

};



// List blog posts

// Fetch all blog posts from the database
exports.list = async (req, res) => {
  try {
    const allPost = await Blog.find({});

    // Return the list of blog posts as a JSON response
    res.status(200).json({ message: "All blog posts", data: allPost });
  } catch (err) {
    return res.status(400).json(err.message);
  }
};


//Get a specific blog post by id
exports.read = async (req, res) => {
  try {
    // Retrieve the blog post ID from the request parameters
    const id = req.params.id;

    // Find the blog post with the specified ID in the database
    const post = await Blog.findById(id);
    console.log(post)

    // If the blog post is not found, return a 404 error response
    if (!post) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    // If the blog post is found, return a success response with the post data
    res.status(200).json({ message: 'Success', data: post });
  } catch (err) {
    // Return an error response with a 500 status code and an error message
    console.log(err);
    res.status(500).json({ error: 'Failed to fetch blog post' });
  }
};



// Update a blog post
exports.update = async (req, res) => {
  try {
    // Retrieve the blog post ID from the request parameters
    const { id } = req.params;
    console.log(id);

    // Retrieve the updated fields (title, author, content) from the request body
    const { title, author, content } = req.body;

    // Find the blog post with the specified ID and update its fields
    const post = await Blog.findByIdAndUpdate(
      id,
      {
        title,
        author,
        content
      },
      { new: true }
    );

    // If the blog post is not found, return a 404 error response
    if (!post) {
      return res.status(404).json({ error: 'Blog post not found' });
    }
    // If the blog post is found and updated successfully, return a success response with the updated post data
    else {
      return res.status(200).json({ message: "Blog post updated successfully", data: post });
    }

  } catch (err) {
    // Return an error response with a 500 status code if an error occurs
    return res.status(500).json({ error: 'Failed to update blog post' });
  }
};

// Delete a blog post
exports.remove = async (req, res) => {
  try {
    let id = req.params.id;
    const removedBlog = await Blog.findByIdAndDelete(id);
    if (removedBlog) {
      return res.status(200).json({ message: "Blog post deleted successfully", data: removedBlog })

    }
    else {
      return res.status(404).json({ error: "Blog post not found" })
    }

  } catch (err) {
    console.log(err);
    return res.status(500).json(err.message);
  }
};