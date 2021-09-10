// create a new express-promise-router, can use async function as route handlers
const router = require('express-promise-router')();

router.get('/', (req, res) => {
    res.send('hrtech-be is live! But shoo shoo!');
});

module.exports = router;