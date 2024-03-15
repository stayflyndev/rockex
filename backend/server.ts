// index.ts
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';
import cors from 'cors';
require("dotenv").config()

//setup express app and cors for xcross network communciation
const app = express();
const PORT = process.env.PORT || 5000;
let spacexData: any

app.use(cors())
app.use(bodyParser.json());

//func for GET request 
const getData = async () => {
  try {
    const response = await fetch('https://api.spacexdata.com/v5/launches');
    if (!response.ok) {
      throw new Error('Failed to fetch data from third-party API');
    }
    spacexData = await response.json();

  } catch (error) {
    console.error('Error fetching data ', error);
  }
}
getData();

// Define API calls made to 'api' route
app.get('/api', (req: Request, res: Response) => {
  if(!spacexData){
   getData();
  }
  res.json(spacexData || {error: Error})
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
