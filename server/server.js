const chalk = require('chalk');
const app = require('./app')
const dotenv = require('dotenv');


dotenv.config()

const PORT = process.env.PORT || 3004 


const server = app.listen(PORT, () => {
  console.log(chalk.bgCyan.black(`server start on http://localhost:${PORT}`));
})
