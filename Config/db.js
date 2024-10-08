const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/blog-post-panel')
  .then(() => console.log('Data base is Connected Successfully....')).catch((err)=>{
    console.log('Database conectivity is faild..!',err);
  });
