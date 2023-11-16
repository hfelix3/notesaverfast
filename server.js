// import Express.js 
const express = require('express');
const path = require('path');
var fs = require('fs');

//Initialize instance of Express.js
const app = express();

// PORT where Express.js server will run
// Add heroku compatibility by inserting "process.env.PORT || "
const PORT = process.env.PORT || 3001;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

//"GET route" that gets notes
app.get('/api/notes', (req, res) => {
fs.readFile('./db/db.json', function(err, data) {
  res.json(JSON.parse(data));
});
});

// Serve the home page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// Serve the CSS file
app.get('/css', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/css/styles.css'))
);

// GET route that returns text and title from json
app.get('/api/db/:title', (req, res) => {
    // Change to lowercase
    const requestedTitle = req.params.title.toLowerCase();
    
  });

  //POST notes
  app.post('/api/notes', (req, res) => {

    // Destructuring this gets the text in the body for noteTitle and noteText
  const { title , text } = req.body;

//if noteTitle and notText are present 
if (title && text) {

  //variable 
  const newNote = {
    title,
    text,
  };

  // Convert the data to a string so we can save it
  const noteString = JSON.stringify(newNote);

  // TODO:REFACTOR NOTES IN READ FILE NOT DO JSON .PARSE NOTES NEEDS TO RETUN READ FILE AND GET THE NEW NOTES AND PUSH. PARSE RESPONSE FOMR READ FILE INSIDE OR READ FILE METHOD. THEN PUSH

  // TODO: LOOK AT POST, FETCH 17-20, EX20 THE SOLUTION. UUID PACKAGE
  //reads the note created 
  // const notes = JSON.parse(data);
  // fs.readFile('./db/db.json', 'utf8', (err) =>
  // err
  // ? console.error(err)
  // : notes.push(newNote)
  // );

  // Write the string in the file following the path to db folder then .json file
  fs.writeFile(`./db/db.json`, noteString, (err) =>
    err
      ? console.error(err)
      : console.log(
        `Note has been written to JSON file`
        )
  );

  
  const response = {
    status: 'success',
    body: newNote,
  };

  console.log (response);
  res.status (201).json(response);
} else {
  res.status (500).json('Error posting note')
}
});

  // Listen for connections
app.listen(PORT, () =>
console.info(`Example app listening at http://localhost:${PORT}`)
);