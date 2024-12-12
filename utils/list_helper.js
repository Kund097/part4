const dummy = (blogs) => {
    return 1;
};

const totalLikes = (blogsList) => {
    let likes = 0;
    blogsList.map((blog) => {
        likes += blog.likes;
    });

    return likes;
};

const favoriteBlog = (blogsList) => {
    let maxLikes = blogsList[0].likes;
    let indexOfFavorite = 0;
    blogsList.map((blog, index) => {
        if (blog.likes > maxLikes) {
            maxLikes = blog.likes;
            indexOfFavorite = index;
        }
    });
    const { title, author, likes } = blogsList[indexOfFavorite];
    return { title, author, likes };
};

const mostBlogs = (blogsList) => {
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

const mostLikes = (blogsList) => {
    let author = "";
    let likes = 0;
    for (let i = 0; i < blogsList.length; i++) {
        let currentAuthor = blogsList[i].author;
        let currentLikes = 0;
        blogsList.map((blog) => {
            currentAuthor === blog.author ? (currentLikes += blog.likes) : "";
        });
        if (currentLikes > likes) {
            likes = currentLikes;
            author = currentAuthor;
        }
    }
    console.log({ author });
    return { author, likes };
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
