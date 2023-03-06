const express = require('express')
const router = express.Router()

router.get('/message' , (req,res) => {
    res.send("The goated user but on a new route")
})

module.exports = router