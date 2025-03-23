require('dotenv').config()
const app = require('./src/app')
// const db = require('./src/db')
app.listen(4000, () => {
    console.log("Server is running...")
})