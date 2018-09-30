//Install express server
const express = require('express');
const path = require('path');

const app = express();


// Serve only the static files form the dist directory
// Replace the '/dist/<to_your_project_name>'
app.use(express.static(__dirname + '/dist/savaApp/'));

app.get('*', function(req,res) {
  // Replace the '/dist/<to_your_project_name>/index.html'

  https.get('http://savas-recipe-backend.herokuapp.com/start', (resp) => {
    let data = '';
  
    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      console.log(JSON.parse(data));
      res.sendFile(path.join(__dirname+ '/src/index.html'));
    });
  
  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });

});
// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);