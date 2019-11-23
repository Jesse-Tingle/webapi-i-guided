const express = require('express');

const server = express();

// should be last step
server.listen(4000, () => {
    console.log('Server is running on port 4000...')
});