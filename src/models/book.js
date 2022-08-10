module.exports = (sequelize, DataTypes) => {
    const Book = sequelize.define("list", {
        user: {
            type: DataTypes.STRING,
        },
        title: {
            type: DataTypes.STRING,
        },
        author: {
            type: DataTypes.STRING,
        },
        read: {
            type: DataTypes.BOOLEAN,
        },
        dateRead: {
            type: DataTypes.STRING,
        },
        genre: { 
            type: DataTypes.STRING,
        },
        notes: {
            type: DataTypes.STRING,
        }, 
        favorite: {
            type: DataTypes.BOOLEAN,
        },
    })
    return Book
}