// index.ts
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';
require("dotenv").config()

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

// Define API
app.get('/api/data', async (req: Request, res: Response) => {
  try {
    const response = await fetch('https://api.spacexdata.com/v5/launches');
    if (!response.ok) {
      throw new Error('Failed to fetch data from third-party API');
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data from third-party API:', error);
    res.status(500).json({ error: 'Failed to fetch data from third-party API' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
