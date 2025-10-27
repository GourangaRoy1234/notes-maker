const express = require('express');
const app= express();
const path = require('path');
const fs=require('fs');//fs module to work with file system

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the 'public' directory to use hml , css, valina js
app.set('view engine', 'ejs');//backend will render ejs pages


 

app.get('/',function(req, res){
    fs.readdir(`./files`, (err, files) => {
    /*
    res.render('index', { files: files  });//jab folder me index.ejs hoga to ye render kr dega
    });//isme dikat ye hai ki files ke name txt formate mei aayenge, hume unka title aur details chahiye
    */
    // remove .txt from every filename
    const cleanedFiles = files.map(file => file.replace('.txt', ''));
    res.render('index', { files: cleanedFiles });
    });
});
app.get('/files/:filename', function(req, res){
    fs.readFile(`./files/${req.params.filename}`, 'utf8', (err, filedata) => {
      //console.log(filedata);//checking if we are getting file data
      res.render('show',{filename:req.params.filename, filedata:filedata});//render show.ejs file
});
});

app.post('/create',function(req, res){
  // console.log(req.body); //to see what data is coming from the form
   fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.details, (err) => {
    res.redirect('/');//after creating the file redirect to home page
});
});



// app.get('/profile/:username',function(req, res){
//     res.send(`Welcome to the profile of ${req.params.username}`);//dynamic routing
// });
app.listen(3000, function(){
    console.log("Server is running on port 3000");
});
