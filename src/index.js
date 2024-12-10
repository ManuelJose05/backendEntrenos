const express = require('express')
const bodyParser = require('body-parser')
const v1Router = require('./v1/routes/workout_routes')


const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json())

app.use("/api/v1/entrenamientos",v1Router);

app.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`)
})
