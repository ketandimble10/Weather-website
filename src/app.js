const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')   // ./ is for local file to run
const forecast = require('./utils/forecast')

// console.log(__dirname)
// console.log(path.join(__dirname,'../public'))   // manupulating file path

//  define path for express configuration
const app = express() // create a variable to store express application
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')  // customizing directory path
const PartialsPath = path.join(__dirname,'../templates/partials')

// setup handlebars engine and view location
app.set('view engine','hbs')   // set allow you to set a value for a given expression  // key:value pair   value is name of the module
app.set('views', viewsPath) // calling views directory
app.use(express.static(publicDirectoryPath))  // serving all static file in the server which are saved in public folder
hbs.registerPartials(PartialsPath)   // partial path variable contains the path that the handlebars module needs 


app.get('/index', (req, res)=>{
    res.render('index',{   // file name and value you want to render
        title: 'Weather',
        name: 'Ketan Dimble'

    })    // render allows us to render one of our views
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About us',
        name: 'Ketan Dimble'
    
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help',
        name: 'Ketan dimble'
    
    })
})

// app.get('', (req,res) => {   // function describe what we want to do when someone visits the particular url  // req: is the object containing information about the incoming request to the server
//     // res: this contains a bunch of methods allowing us to customize what we're going to send back to the requester
//     res.send('<h1>Hello Express!</h1>') // this allows us to send something back to requester

// })

// app.get('/help',(req,res) => {
//     res.send({
//         name: 'Ketan',   //send object to the server   jason format
//         age: 24
//     })
// })

// app.get('/about',(req,res) => {
//     res.send('<h1>About</h1>')
// })

app.get('/weather',(req,res) => {
    if(!req.query.address){      // The req.query property is an object containing the property for each query string parameter in the route. it is used in url, parse the boject available in query
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address,(error,{lattitude,longitude,location} = {}) => {  // return stops the program after execution   // {} set empty object as default value
        if (error){
            return res.send({error})  
        } 

        forecast(lattitude,longitude, (error, forecastdata) => {     // get the property of data from above, data comes to the input forecast is from geocode data 
            // if things can go wrong in forecast 
            if(error){
                return res.send({error})   //send respose to http server
            }
              res.send({
                forecast: forecastdata,
                location,
                address: req.query.address
              })  
          })  
    })


    // res.send({
    //     forecast: 'it is raining',
    //     location: 'pune',
    //     address:req.query.address
    // })
})

// goal: Update weather endpoints to accept address
// 
// 1. no adress? send back an error message
// 2. adress? send back static JSON
//  --add address property onto JSON which return the provided address
// 3. Test/Weather and /Weather?address=pune

app.get('/products',(req,res)=>{
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        product: []
    })
})



app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404 error',
        name:'Ketan Dimble',
        erromessage:'Help article not found'
    })
})

app.get('*', (req,res) => { // '*' wildcard character is for match anything that hasn't been matched so far 
    res.render('404',{
        title: '404 error',
        name:'Ketan Dimble',
        erromessage:'Page not found'
    })

})
// app.com
// app.com/home
// app.com/about

app.listen(3000,() => {
    console.log('Server is up on port 3000')
})    // to start the server // and listen on the specific port



// 
// Goal: Update route
// 
// 1. Setup about route to render a title with HTML
// 2. Setup a weather route to send back JSON object with forecast and location string

// Goal: Create and render a 404 page with handlebars
// 
// 1. Setup the template to render the header and footer
// 2. Setup the template to render an error message in a paragraph
// 3. Render the template for both 404 routes
// Page not found.
// Help article not found
// test your work


// Goal: wire up /Weather
// 1. Require geocode/forecast into app.js
// 2. use the address to geocode
// 3. use the coordinates to get forecast
// 4. send back the real forecast and location