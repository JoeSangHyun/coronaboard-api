const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./database');
const globalStatController = require('./controller/global-stat.controller');

async function launchServer() {
    const app = express();
    app.use(bodyParser.json());
    
    app.get('/', (req,res) => {
        res.json({ message: 'Hello CoronaBoard!'});
    });

    try {
        await sequelize.sync(),
        console.log('Database is ready!');
    } catch(error) {
        console.log('unable to connect to the database:');
        console.log(error);
        process.exit(1);
    }
    const port = process.env.Port || 8085;
    app.listen(port, () => {
        console.log(`Server is running on port => ${port}`);
    });

    app.get('/global-stats', globalStatController.getAll);
    app.post('/global-stats',globalStatController.insertOrUpdate);
    app.delete('/global-stats',globalStatController.remove);
}

launchServer();



