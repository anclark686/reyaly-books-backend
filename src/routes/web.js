const express = require("express");
const router = express.Router();
const book = require("../controllers/books")
const user = require("../controllers/users")
const verifyToken = require("../middleware/VerifyToken")
const refresh_token = require("../controllers/RefreshToken")


let routes = (app) => {
  router.get('/', (req, res) => {
    res.send('hello world')
  })
  router.post("/addBook", book.addBook)
  router.post("/book", book.getBook)
  router.post("/books", book.getBooks)
  router.post("/wish", book.getWishList)
  router.post("/fav", book.getFavList)
  router.post("/edit", book.editBook)
  router.post("/search", book.searchBooks)
  router.delete("/delete", book.deleteBook)

  router.get('/users', verifyToken.verifyToken, user.getUsers);
  router.post('/users', user.Register);
  router.post('/login', user.Login);
  router.post('/token', refresh_token.refreshToken);
  router.post('/logout', user.Logout);

  return app.use("/", router);
};

module.exports = routes;