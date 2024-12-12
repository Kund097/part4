const dummy = (blogs) => {
    return 1;
};

const totalLikes = (blogs) => {
    let likes = 0;
    blogs.map((blog) => {
        likes += blog.likes;
    });

    return likes;
};

const favoriteBlog = (blogs) => {
    let maxLikes = blogs[0].likes;
    let indexOfFavorite = 0;
    blogs.map((blog, index) => {
        if (blog.likes > maxLikes) {
            maxLikes = blog.likes;
            indexOfFavorite = index;
        }
    });
    const { title, author, likes } = blogs[indexOfFavorite];
    return { title, author, likes };
};

const mostBlogs = (blogsList) => {
    // blogs.map((blog) => {
    //     if (!currentAuthor) {
    //         currentAuthor = blog.author;

    //     }
    // });
    let author = "";
    let blogs = 0;
    for (let i = 0; i < blogsList.length; i++) {
        let currentAuthor = blogsList[i].author;
        let currentCount = 0;
        blogsList.map((blog) => {
            currentAuthor === blog.author ? currentCount++ : "";
        });
        if (currentCount > blogs) {
            blogs = currentCount;
            author = currentAuthor;
        }
    }
    console.log({ author });
    return { author, blogs };
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs };
