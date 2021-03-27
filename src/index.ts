import express, { json, urlencoded } from 'express'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

import indexRouter from './routes/index.js'
import usersRouter from './routes/users.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express()
const port = process.env.PORT ?? 3000 

app.use(json())
app.use(urlencoded({ extended: false }))
app.use(express.static(join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)

app.listen(port, () => console.log(`YATL app listening at http://localhost:${port}`))