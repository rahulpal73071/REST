require('dotenv').config();

const app = require('./app');
const MYDB = require('./config/db');

const PORT = process.env.PORT || 3000;

MYDB().then(()=>{
    app.listen(PORT , ()=>{
        console.log(`Listening at post ${PORT}`);
        
    });
});