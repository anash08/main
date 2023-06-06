const { Configuration, OpenAIApi } = require("openai");
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

  app.use(cors());
app.use(bodyParser.urlencoded({ extended: true })); // Corrected the extended option
app.use(bodyParser.json());

app.get('/api/data', (req, res) => {
  const data = { value: 'Hello from the server!', req };
  res.json(data);
  console.log("got response", data);
});

app.listen(5000, () => console.log('Server listening on port 5000'));

app.post('/keyboard', (req, res) => {
  const key = req.body.key;
  console.log(key, "this is the key of the keyboard");

  if (typeof key === 'undefined') {
    // Handle the case when 'key' is undefined
    return res.status(400).json({ error: 'Missing or invalid key parameter' });
  }

  const query = key;
  console.log('query: this is the converted string of the user input', typeof query, query);
  const userQuery = { query };

  console.log(userQuery, 'user query sent to server................................................................');

  // Rest of your code...

  // const configuration = new Configuration({
  //   apiKey: "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",
  // });
  // console.log("set the configuration properties................................................................");

  // const openai = new OpenAIApi(configuration);
  // console.log("new configuration properties set for the API................................................................");

  // const response = openai.createCompletion({
  //   model: "text-davinci-003",
  //   prompt: query,
  //   max_tokens: 3000,
  //   temperature: 0.7,
  // });

  // response.then((result) => {
  //   console.log(result.data.choices[0].text.split(',  '));
  //   const responseData = { value: result.data.choices[0].text };
  //   res.json(responseData);
  // }).catch((error) => {
  //   console.log(error);
  // });
});

app.post('/myscript', (req, res) => {
  console.log("..............//request paramenter fetched from client//.................")
  const key = req.body.key;
  console.log(key, "this is the key of the keyboard");

 

  const query = key;
  console.log('query: this is the converted string of the user input', typeof query, query);
  const userQuery = { query };

  console.log(userQuery, 'user query sent to server................................................................');
  
   const configuration = new Configuration({
     apiKey: "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",
   });
   console.log("set the configuration properties................................................................");

   const openai = new OpenAIApi(configuration);
   console.log("new configuration properties set for the API................................................................");

   const response = openai.createCompletion({
     model: "text-davinci-003",
     prompt: (query,"explain this piece of problem and show the entire solving problem process and show me the steps solved it line by line  its usage with a real world example and explain like iam 4."),
     max_tokens: 3000,
     temperature: 0.7,
   });

   response.then((result) => {
     console.log(result.data.choices[0].text.split(',  '));
     const responseData = { value: result.data.choices[0].text };
     res.json(responseData);
     console.log("Response data:for the query: ............//", responseData);
   }).catch((error) => {
     console.log(error);
   });
});



console.log("..............//server initiaated//.................")



































