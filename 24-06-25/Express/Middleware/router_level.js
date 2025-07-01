/*Router-level middleware:

These work in the same way as application-level middleware, except they are bound to an instance of express.Router().
*/
const express = require('express');
const app = express();
const router = express.Router();

// Router-level middleware
router.use((req, res, next) => {
    console.log('Time:', Date.now());
    next();
});
router.use('/user/:id', (req, res, next) => {
    console.log('Request Type:', req.method);
    next();
});

// Routes
router.get('/user/:id', (req, res, next) => {
    res.send(`User ID: ${req.params.id}`);
});

router.post('/user', (req, res, next) => {
    res.send('Add User');
});

// Use the router in the application
app.use('/api', router);
// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});