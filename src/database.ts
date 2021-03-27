import { Sequelize } from "sequelize"

// Use sqlite instead of real database for simplicity
// Also for this reason simple db.sync instead of migrations
const db = new Sequelize("sqlite:db.sqlite")
await db.sync({ alter: true })

export default db
