import express from "express";
import bodyParser from "body-parser";
import fs from "fs/promises";
import { dirname } from "path";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));

async function getBlogTitlesFromFolder(folderPath) {
    let titlesArray = [];
    let blogId = [];

    try {
        // Read all files in the specified folder
        const files = await fs.readdir(folderPath);

        // Loop through each file and read its content
        for (const file of files) {
            const filePath = path.join(folderPath, file);

            // Read the content of the JSON file
            const data = await fs.readFile(filePath, 'utf8');

            // Parse the JSON content
            const blogData = JSON.parse(data);

            // Extract the title and push it to the array
            if (blogData.title && blogData.id) {
                titlesArray.push(blogData.title);
                blogId.push(blogData.id);
            }
        }

        // Return the array of titles
        return {titlesArray, blogId};
    } catch (err) {
        console.error('Error:', err);
        return [];
    }
}




app.get("/",(req,res)=>{
    const folderPath = path.join(__dirname, '/Blogs');
    getBlogTitlesFromFolder(folderPath).then(result => {
        // Pass both titles and IDs to the EJS template
        res.render("index.ejs", { BlogsTitle: result.titlesArray, BlogIds: result.blogId });
    });
});

app.get("/:id", async (req, res) => {
    const blogId = req.params.id; // Get the blog ID from the URL
    const filePath = path.join(__dirname, '/Blogs', `${blogId}.json`); // Correct path

    try {
        // Read the JSON file of the blog
        const data = await fs.readFile(filePath, 'utf8');
        const blog = JSON.parse(data); 
        
        // Render the blog page with the blog data
        res.render('blog.ejs', { blog }); 
    } catch (err) {
        console.error('Error reading blog:', err);
        return res.status(404).send('Blog not found');
    }
});

app.post("/submit",async (req, res) =>{
    var blogTitle = req.body["blog-title"];
    var blogBody = req.body["blog-body"];

    const blogs = {
        id : Date.now(),
        title : blogTitle,
        content : blogBody
    }
    const filePath = path.join(__dirname, '/Blogs', `${blogs.id}.json`);

    
    try {
        // Write the new blog to the folder
        await fs.writeFile(filePath, JSON.stringify(blogs));

        // Redirect to home page after the blog is saved to avoid resubmission
        res.redirect("/");
    } catch (err) {
        console.error('Error saving blog:', err);
        res.status(500).send('Error saving blog');
    }

    
    // console.log(blogs)
});


// Route to display the edit form
app.get("/edit/:id", async (req, res) => {
    const blogId = req.params.id;
    const filePath = path.join(__dirname, '/Blogs', `${blogId}.json`);

    try {
        const data = await fs.readFile(filePath, 'utf8');
        const blog = JSON.parse(data);

        // Render the edit form with existing blog data
        res.render('edit.ejs', { blog });
    } catch (err) {
        console.error('Error reading blog:', err);
        res.status(500).send('Blog not found');
    }
});

// Route to handle the submission of edited blog data
app.post("/edit/:id", async (req, res) => {
    const blogId = req.params.id;
    const filePath = path.join(__dirname, '/Blogs', `${blogId}.json`);

    const updatedBlog = {
        id: blogId,
        title: req.body["blog-title"],
        content: req.body["blog-body"]
    };

    try {
        // Write the updated blog to the file
        await fs.writeFile(filePath, JSON.stringify(updatedBlog));

        // Redirect to the home page or the blog page
        res.redirect(`/`);
    } catch (err) {
        console.error('Error updating blog:', err);
        res.status(500).send('Error updating blog');
    }
});

// Route to delete a blog post
app.post("/delete/:id", async (req, res) => {
    const blogId = req.params.id;
    const filePath = path.join(__dirname, '/Blogs', `${blogId}.json`);

    try {
        // Delete the blog JSON file
        await fs.unlink(filePath);

        // Redirect to the home page
        res.redirect(`/`);
    } catch (err) {
        console.error('Error deleting blog:', err);
        res.status(500).send('Error deleting blog');
    }
});




app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
});