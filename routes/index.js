const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.redirect('/auth/register'); // Redirect to login if not authenticated
});

module.exports = router;
