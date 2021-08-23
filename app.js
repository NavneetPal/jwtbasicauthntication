const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

app.use(bodyParser.json());

app.get('/api', (req, res) => {
	res.json({
		message: 'Welcome to api'
	});
});

app.post('/api/posts',verifyToken, (req, res) => {
    const authData=jwt.verify(req.token,"navneetisfullstackdeveloper");
	res.json({
		message: 'Post id created',
        authData
	});
});

app.post('/api/login', (req, res) => {
	const user = {
		id: 1,
		username: 'brad',
		email: 'brad@gmail.com'
	};

	const token = jwt.sign({ user: user }, 'navneetisfullstackdeveloper', {
		expiresIn: '2 days',
		algorithm: 'HS256'
	});

	res.json({
		token: token
	});
});

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// verify Token
function verifyToken(req, res, next){
    //Get auth Header value
    const bearerHeader=req.headers['authorization'];
    //Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined'){
        const bearerToken=bearerHeader.split(" ")[1];
        req.token=bearerToken;
        next();
    }else{
        //Forbidden
        res.sendStatus(403);
    }
};

const port = 3000;
app.listen(port, () => {
	console.log(`Server is listening on port ${port}`);
});
