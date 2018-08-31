const express = require('express')
const path = require('path')

const app = express();
const PORT = 8800;

app.use(express.static(__dirname))

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})