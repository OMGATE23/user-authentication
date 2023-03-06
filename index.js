const express = require("express");
const app = express();
const userRoute = require('./routes/user')

app.use('/user' , userRoute)

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});


app.get('/' , (req,res) => {
    res.send('<h1>Home Page</h1>')
})
