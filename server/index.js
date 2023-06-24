// server/index.js

const express = require('express')
const app = express()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const User = require('./models/user.model')

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb+srv://doadmin:8y0t5z4p6T321kno@db-mongodb-nyc3-81708-d674af5d.mongo.ondigitalocean.com/admin')

app.get('/', (req, res) =>{
	res.send('hello world')
}),

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

app.get('/api/login', async (req, res) => {
	const token = req.headers['x-access-token']
	
	try{
		const decoded = jwt.verify(token, 'secret123')
		const email = decoded.email
	} catch (error){
		console.log(error)
		res.json({ status: 'error', error: 'invalid token'})
	}
})

app.post('/api/login', async (req, res) => {
	console.log(req.body)
	const user = await User.findOne({
		email: req.body.email,
		password: req.body.password,
	})
	
	if(!user){
		return res.json({status: 'error', error: 'Invalid login'})
	}
	
	if (isPasswordValid){
		const token = jwt.sign(
			{
				email: user.email,
				name: user.name
			},
			'secret123'
		)
		return res.json({ status: 'ok', user: true, token })
	} else {
		res.json({ status: 'error', user: false })
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

app.get('*', (req, res) => {
	// send the index.html folder from build
	res.send('This is the everything.')
}),

app.listen(1337, () => {
	console.log('Server started on 1337')
})