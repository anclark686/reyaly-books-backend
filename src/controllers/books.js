const db = require("../models")
const user = require("../models/user")
const Book = db.books
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const addBook = async (req, res) => {
    const { user, title, author, read, dateRead, genre, notes, favorite } = req.body
    try {
        const book = await Book.create({
            user: user,
            title: title,
            author: author,
            read: read,
            dateRead: dateRead,
            genre: genre,
            notes: notes,
            favorite: favorite,
        }).then((book) => {
            return res.send("Your book has been added!")
        })
    } catch (err) {
        console.log(err)
        return res.send(`Error when trying to add book: ${err}`)
    } 
}

const getBook = async(req, res) => { 
    try { 
        console.log(req.body)
        const book = await Book.findAll({
            where:{
                id: req.body.id
            },
        })
        res.send(book)
    } catch (error) {
        console.log(error)
    }
}  

const getBooks = async(req, res) => { 
    try { 
        const books = await Book.findAll({
            where:{
                user: req.body.user
            },
            // attributes:['id', 'title', 'read', 'dateRead', 'genre', 'notes']
        })
        res.send(books)
    } catch (error) {
        console.log(error)
    }
}

const getWishList = async(req, res) => { 
    try { 
        const books = await Book.findAll({
            where:{
                user: req.body.user,
                read: false
            },
            // attributes:['id', 'title', 'read', 'dateRead', 'genre', 'notes']
        })
        res.send(books)
    } catch (error) {
        console.log(error)
    }
} 

const getFavList = async(req, res) => { 
    try { 
        const books = await Book.findAll({
            where:{
                user: req.body.user,
                favorite: true
            },
            // attributes:['id', 'title', 'read', 'dateRead', 'genre', 'notes']
        })
        res.send(books)
    } catch (error) {
        console.log(error)
    }
} 

const editBook = async (req, res) => {
    const { id, title, author, read, dateRead, genre, notes, favorite } = req.body
    try {
        await Book.update({
        title: title, 
        author: author,
        read: read,
        dateRead: dateRead,
        genre: genre,
        notes: notes,
        favorite: favorite, 
        }, {
            where:{
                id: id
            }
        }).then(() => {
            return res.send("Your book has been edited!")
        })
    } catch (err) {
        console.log(err)
    }
}

const searchBooks = async (req, res) => {
    try {
        if (req.body.filter === "Title") {
            const books = await Book.findAll({
                where: {
                    user: req.body.user,
                    title: {
                        [Op.like]: `%${req.body.value}%`
                    }
                },
            })
            res.send(books)
        } else if (req.body.filter === "Author") {
            const books = await Book.findAll({
                where: {
                    user: req.body.user,
                    author: {
                        [Op.like]: `%${req.body.value}%`
                    }
                },
            })
            res.send(books)
        } else if (req.body.filter === "Genre") {
            const books = await Book.findAll({
                where: {
                    user: req.body.user,
                    genre: {
                        [Op.like]: `%${req.body.value}%`
                    }
                },
            })
            res.send(books)
        } else if (req.body.filter === "Notes") {
            const books = await Book.findAll({
                where: {
                    user: req.body.user,
                    notes: {
                        [Op.like]: `%${req.body.value}%`
                    }
                },
            })
            res.send(books)
        } else {
            console.log(req.body.value)
            const books = await Book.findAll({
                where: {
                    user: req.body.user,
                    [Op.or]: [
                        {
                            title: {
                                [Op.like]: `%${req.body.value}%`
                            }
                        },
                        {
                            genre: {
                                [Op.like]: `%${req.body.value}%`
                            }
                        },
                        {
                            notes: {
                                [Op.like]: `%${req.body.value}%`
                            }
                        },
                        {
                            author: {
                                [Op.like]: `%${req.body.value}%`
                            }
                        }
                    ]
                }
            })
            res.send(books)
        }
    } catch (err) {
        console.log(err)
    }
    

}

const deleteBook = async (req, res) => {
    try{
        await Book.destroy({
            where: {id: req.body.id}
        }).then(() => {
            return res.send("Your book has been deleted.")
        })
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    addBook,
    getBook,
    getBooks,
    getWishList,
    getFavList,
    editBook, 
    searchBooks,
    deleteBook
}