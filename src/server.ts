import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());
   
  app.get('/filteredimage', async (req, res) => {
      const {image_url} = req.query
      // Validating Query String
      if(!image_url){
        return res.status(400).send("image_url query parameter is required")
      }
      //Filtering Image
      const images = await filterImageFromURL(image_url)  
      return res.status(200).sendFile(images, () => deleteLocalFiles([images]))
    
  })
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();