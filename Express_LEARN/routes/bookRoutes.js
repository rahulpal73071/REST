const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadMiddleware');
const {
    createBook,
    getBooks,
    getBook,
    deleteBook
} = require('../controllers/bookController');

router.post('/' ,upload.single('image'), createBook);
router.get('/',getBooks);
router.get('/:id' , getBook);
router.delete('/:id' , deleteBook);

module.exports = router;