const Books = require('../models/books');

exports.createBook = async (req , res)=>{
    try {
        const {title , author,url,description , isAvailable , price } = req.body;
        const imagePath = req.file ? req.file.path : null;
        const book = new Books({
            title,
            author,
            url,
            description,
            isAvailable,
            price,
            image:imagePath
        });
        const saved = await book.save();
        res.status(201).json({ message: "Product created", product: saved });
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"failed to create book"});
    }
};

exports.getBooks = async (req,res)=>{
    try {
        const books = await Books.find();
        res.status(200).json(books);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"failed to fetch books data"});
    }

};

exports.getBook = async (req,res)=>{
    try {
        const book = await Books.findById(req.params.id);
        if(!book) return res.status(404).json({message:"Id does not exist!"})
        res.status(200).json(book)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"something went wrong!"})
    };
};
exports.deleteBook = async (req , res) =>{
    try {
        await Books.findByIdAndDelete(req.params.id);
        res.send("Book deleted successfully!");
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"something went wrong!"})
    }
}