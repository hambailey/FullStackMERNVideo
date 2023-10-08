// server/index.js

const path = require('path')
const express = require('express')
const app = express()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieSession = require('coockie-session')

const User = require('./models/user.model')

var corsOptions = {
	origin: "http//:localhost:8081"
};

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(cookieSession({
	
}))

// mongoose.connect('mongodb://localhost:27017/full-mern-stack-video')
mongoose.connect('mongodb+srv://doadmin:8y0t5z4p6T321kno@db-mongodb-nyc3-81708-d674af5d.mongo.ondigitalocean.com/admin')

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) =>{
	res.send('hello world')
}),

app.get('/checklist', async (req, res) => {
	res.send('checklist')
})

app.get('/hello', (req, res) => {
	res.send('hello world')
})

app.post('/api/register', async (req, res) => {
	console.log(req.body)
	try {
		await User.create({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
		}),
		res.json({ status: 'ok'})
	} catch (error){
		res.json({ status: 'error', error: 'Duplicate email' })
	}
}),

// app.get('/api/login', async (req, res) => {
// 	const token = req.headers['x-access-token']
	
// 	try{
// 		const decoded = jwt.verify(token, 'secret123')
// 		const email = decoded.email
// 	} catch (error){
// 		console.log(error)
// 		res.json({ status: 'error', error: 'invalid token'})
// 	}
// })

app.post('/api/login', async (req, res) => {
	console.log(req.body)
	const user = await User.findOne({
		email: req.body.email,
		password: req.body.password,
	})
	
	if(!user){
		return res.json({status: 'error', error: 'Invalid login'})
	}
	
	if (user){
		return res.json({ status: 'ok', user: true })
	} else {
		return res.json({ status: 'error', user: false })
	}
}),

app.get('/api/quote', async (req, res) => {
	const token = req.headers['x-access-token']
	
	try{
		const decoded = jwt.verify(token, 'secret123')
		const email = decoded.email
		const user = await User.findOne({ email: email })
		
		return res.json({ status: 'ok', quote: user.quote })
	} catch (error){
		console.log(error)
		res.json({ status: 'error', error: 'invalid token' })
	}
}),

app.post('/api/quote', async (req, res) => {
	const token = req.headers['x-access-token']
	
	try {
		const decoded = jwt.verify(token, 'secret123')
		const email = decoded.email
		await User.updateOne(
			{ email: email }, 
			{ $set: { quote: req.body.quote} }
		)
		return res.json({ status: 'ok' })
	} catch (error){
		console.log(error),
		res.json({ status: 'error', error: 'invalid token' })
	}
}),

app.post('/post-feedback', (req,res) => {
	mongoose.then((db) => {
		delete req.body._id;
		db.collection('feedbacks').insertOne(req.body);
	});
	res.send('Data received:/n' + JSON.stringify(req.body));
});

app.get('view-feedbacks', (req, res) => {
	mongoose.then((db) => {
		db.collection('feedbacks').find({}).toArray().then((feedback) => {
			res.status(200).json(feedbacks);
		});
	});
});

app.get('*', (req, res) => {
	// send the index.html folder from build
	res.sendFile(path.join(__dirname, 'static/index.html'))
})

app.listen(process.env.PORT || 3000, process.env.IP || '0.0.0.0', () => {
	console.log('Server started on port 3000');
});

// app.listen(1337, () => {
// 	console.log('Server started on 1337')
// })