import 'dotenv/config'
import express, { json, urlencoded } from 'express'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

import indexRouter from './routes/index.js'
import sequelize from './models/index.js'

// Use sequelize.sync instead of migrations for simplicity
await sequelize.sync({ alter: true })

const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express()
const port = process.env.PORT ?? 3000 
// Resolves against .env file
const publicFolder = join(__dirname, '..', process.env.PUBLIC ?? 'src/public')

app.use(json())
app.use(urlencoded({ extended: false }))
app.use(express.static(publicFolder))
app.use(indexRouter)

app.listen(port, () => console.log(`YATL app listening at http://localhost:${port}`))
