const { getItems, getItemDescription } = require('../controllers/main.controller');

const routes = (app) => {
    app.use('/api/items/:id', getItemDescription);
    app.use('/api/items', getItems);
};
module.exports = routes;