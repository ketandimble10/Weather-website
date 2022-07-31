
const weatherForm = document.querySelector('form')  // querySelector method returns the first element matches a css selector
const search = document.querySelector('input')    // manupulating input 
const messageOne = document.querySelector('#message-1')    // for id we use #   // manupulate paragraph by class
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = 'From javascript'

// Goal: Rendering content to paragrapths
// 
// 1. select the second message p from javascript
// 2. just before fetch, render message and empty p
// 3. if error render error
// 4. if no error, render locaion and forecast
// 5. test

weatherForm.addEventListener('submit',(e) => {   // addEventListener() method attaches an event handler to a document. // callback function run when this event occur
    e.preventDefault()    //preventDefault() method cancels the event if it is cancelable, 

    const location = search.value   // extract the input value from search, it is representation of input 

    messageOne.textContent = 'Loading'   // textContent property sets or returns the text content of the specified node // manupulate text content in browser
    messageTwo.textContent = ''        // render message and empty p

    fetch('/weather?address='+ location).then((response) => {    
    response.json().then((data) => { // Data can be forecast in browser with json format
        if (data.error){
            messageOne.textContent = data.error
        }else{
            messageOne.textContent = data.location    // forecast the location in browser
            messageTwo.textContent = data.forecast    // forecast weather in browser
            // console.log(data.location)
            // console.log(data.forecast)
        }
    })
})
})


// Goal: Use input value to get weather
// 1. Migrate fetch call into the submit callback
// 2. Use the search text as the address query string value
// 3. Submit the form with a valid and invalid value to test