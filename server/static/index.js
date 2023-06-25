//'server/index.js'
// MERN = Mongo + Express + React + Node

// Development = Node.js server + React server

// MEN

// E - Express

const path = require('path')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user.model')
const jwt = require('jsonwebtoken')

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb+srv://doadmin:8y0t5z4p6T321kno@db-mongodb-nyc3-81708-d674af5d.mongo.ondigitalocean.com/admin')

app.post('/api/register', async (req,res) => {
	console.log(req.body);
	try{
		await User.create({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password
		})
		res.json({ status: 'ok' })
	} catch(error){
		res.json({ status: 'error', error: 'Duplicate email' })
	}
	res.json({ status: 'ok'})
})

app.post('/api/login', async (req,res) => {
	const user = await User.findOne({
		email: req.body.email,
		password: req.body.password,
	})
	
	if(user){
		const token = jwt.sign(
			{
				name: user.name,
				email: user.email,
			},
			'secret123' 
		)
		return res.json({ status: 'ok', user: true })
	} else {
		return res.json({ status: 'error', user: false })
	}
})

app.get('/hello', (req, res) => {
	res.send('hello world')
})

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'static/index.html'))
})

app.listen(1337, () => {
	console.log('Server started on port 1337')
})

