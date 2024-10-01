const express = require('express')

const app = express()

app.use(express.json())


PORT = process.env.PORT || 3000

app.listen(PORT,() => console.log(`Servidor iniciado em http://localhost:${PORT}/`))