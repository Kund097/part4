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

module.exports = { dummy, totalLikes, favoriteBlog };
