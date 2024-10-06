# 📝 Blog Website

A simple blog website built using **Node.js**, **Express.js**, and **EJS** for templating. This project allows users to create, view, edit, and delete blog posts. Each blog post is stored as a JSON file in the file system.

## 🚀 Features

- Create a new blog post with a title and content.
- View all blog posts on the homepage.
- Edit existing blog posts.
- Delete blog posts.
- Each blog post is saved as a JSON file in the `Blogs` folder.

## 🛠️ Technologies Used

- **Node.js**: Backend runtime environment.
- **Express.js**: Framework for handling routes and HTTP requests.
- **EJS (Embedded JavaScript)**: Template engine to render HTML pages.
- **Bootstrap**: For responsive and modern UI.
- **Body-Parser**: To parse form data.
- **fs (File System)**: For reading and writing blog posts to the file system.

## 🔧 Setup and Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/Tirthesh13/BlogWebsite_node.git
    ```

2. Navigate to the project directory:
    ```bash
    cd BlogProject
    ```

3. Install the required dependencies:
    ```bash
    npm install
    ```

4. Start the application:
    ```bash
    node index.js
    ```

5. Open your browser and go to `http://localhost:3000`.

## 📝 How It Works

- **Homepage ("/")**: Displays all blog titles and links to individual blog posts.
- **New Blog Post**: Fill out the form and submit to create a new post.
- **View Blog Post ("/:id")**: View a specific blog post by clicking the title.
- **Edit and Delete Functionality**: Allows users to modify or remove blog posts.

## 🛠️ Future Enhancements

- Implement a database for blog storage (e.g., MongoDB).
- Add user authentication for creating and managing posts.
- Add tags/categories for better blog organization.

## ✨ Contributions

Feel free to fork this repository and contribute by submitting a pull request. You can also create issues for any bugs or feature suggestions.


Happy Coding! ✨

