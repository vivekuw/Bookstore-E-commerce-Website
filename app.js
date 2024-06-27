const express=require('express');
const path = require('path');
const options=require('options')
const fs=require('fs');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const session = require('express-session');
const app=express();
const port = 8800;
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test'
});

db.connect((err) => {
    if (err) {
      console.error('Database connection error:', err);
    } else {
      console.log('Connected to the database');
    }
});
app.use(session({
	secret : '1234567890abcdefghijklmnopqrstuvwxyz',
	resave : false,
	saveUninitialized : true,
	cookie : { secure : false }
}));

// EXPRESS SPECIFIC STUFF
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('static',options))
app.use('/static',express.static('static'))
app.use(express.urlencoded())


// pug specific stuff
app.set('view engine','pug') 
app.set('views', path.join(__dirname, 'views')) 

// first pages as login
app.get('/',(req,res)=>{
    const params = {}
    res.status(200).render('login.pug', params);
});

// this for login page to regrister page 
app.get('/link/regrister.pug',(req,res)=>{
  const params = {}
  res.status(200).render('regrister.pug', params);
});

// this for home page to about page
app.get('/about',(req,res)=>{
    const params = {}
    res.status(200).render('about.pug', params);
});

// this for home page to contact page
app.get('/contact',(req,res)=>{
    const params = {}
    res.status(200).render('contact.pug', params);
});
// go to home page
app.get('/home',(req,res)=>{
  const params={}
  res.status(200).render('home.pug',params);
});

// go to product page
app.get('/product',(req,res)=>{
  const params = {}
  res.status(200).render('product.pug', params);
});

// contact page - from data to database 
app.post('/submit', (req, res) => {
    const params = {}
    const { firstname, lastname , contact, subject} = req.body;
    const sql = 'INSERT INTO contact_form (firstname, lastname , contact, subject) VALUES (?,?,?,?)';
    db.query(sql, [firstname, lastname , contact, subject], (err, result) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log('User added to the database');
        res.status(200).render('home.pug', params);
      }
    });
});
// regrister page - record from database the data and the check the email and password  
app.post('/auth/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const query = 'SELECT * FROM user WHERE email = ? AND password = ?';
  db.query(query, [email, password], (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Error querying the database' });
    }
    if (results.length > 0) {
      //login successful
      res.render('home.pug'); 
    } else {
      //login failed
      res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
  });
});
// regrister page -  insert form data to database
app.post("/auth/register", async (req, res) => {    
  const { name, email, password, password_confirm } = req.body
  try {
      const result = await db.query('SELECT email FROM user WHERE email = ?', [email]);
      if (result.length > 0) {
          return res.render('regrister', {
              message: 'This email is already in use'
          });
      } else if (password !== password_confirm) {
          return res.render('regrister', {
              message: 'Passwords do not match!'
          });
      }
      
      await db.query('INSERT INTO user SET ?', {name, email, password}, (err, result) => {
          if(err) {
              console.log(err)
          } 
          else {
              return res.render('login.pug', {
                  message: 'User registered!'
              });
          }
      });
  } catch (error) {
          console.log(error);
          return res.status(500).send('Internal Server Error');
  }
});

// book page redirected  --- all the data from server side ---
app.get("/book", (request, response) => {
	const query = `SELECT * FROM product LIMIT 3`;
	//Execute Query
	db.query(query, (error, result) => {
		if(!request.session.cart)
		{
			request.session.cart = [];
		}
		response.render('product.pug', { products : result, cart : request.session.cart });
	});
});

// 
app.post('/add_cart', (request, response) => {
	const product_id = request.body.product_id;
	const product_name = request.body.product_name;
	const product_price = request.body.product_price;
	let count = 0;
	for(let i = 0; i < request.session.cart.length; i++)
	{
		if(request.session.cart[i].product_id === product_id)
		{
			request.session.cart[i].quantity += 1;
			count++;
		}
	}
	if(count === 0)
	{
		const cart_data = {
			product_id : product_id,
			product_name : product_name,
			product_price : parseFloat(product_price),
			quantity : 1
		};
		request.session.cart.push(cart_data);
	}
	response.redirect("/book");
});
app.get('/remove_item', (request, response) => {
	const product_id = request.query.id;
	for(let i = 0; i < request.session.cart.length; i++)
	{
		if(request.session.cart[i].product_id === product_id)
		{
			request.session.cart.splice(i, 1);
		}
	}
	response.redirect("/book");
});
// SERVER START
app.listen(port,()=>{
    console.log(`the applicaiton started http://127.0.0.1:${port}`);
})