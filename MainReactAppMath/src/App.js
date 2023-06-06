import ScientificKeyboard from "./components/scientificKeyboard ";
import React, { useState, useEffect, useRef } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { WindowSharp } from "@mui/icons-material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";
import katex from 'katex';
import "./App.css";
import QRCode from 'qrcode.react';







const App = () => {







  //................... .............................../'/keyboard part \'/...................................//.................................//

  //.................. .............................../'/keyboard part \'/...................................//.................................//


  const userData = [
    { token: 'token1', key: 'key1' },
    { token: 'token2', key: 'key2' },
    // Add more user data as needed
  ];
  const [mobileData, setMobileData] = useState('');


  const sendDataToBackend = (value) => {
    try {
      const res = document.getElementById('result');
      console.log(res.innerText, "..................../div res tag of the latex/................");

      const keyValue = res.innerText;

      console.log(keyValue, "this is the key value of the latex/................");

      // Send the data to the WebSocket server
      const ws = new WebSocket('ws://192.168.100.59:8080');

      // Handle WebSocket connection open
      ws.onopen = () => {
        console.log('Connected to WebSocket server');

        // Send the data to the server
        ws.send(keyValue);
      };

      // Handle WebSocket errors
      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      // Handle WebSocket connection close
      ws.onclose = () => {
        console.log('Disconnected from WebSocket server');
      };

      // Handle WebSocket received messages
      ws.onmessage = (message) => {
        console.log('Received message:', message.data);
        // Handle the received message as needed
        const resData = message.data;
        setMobileData(resData);
        const editorElement = document.getElementById('editor');
        editorElement.innerHTML = `<span style="font-size: 20px">${mobileData}</span>`;

      };
    } catch (error) {
      console.error(error);
      setInput(false);
    }
  };



  const [outputValue, setOutputValue] = useState('');
  const [error, setError] = useState('');
  const fetchData = async (value, sendDataToBackend) => {
    try {
      sendDataToBackend(value);
      setInput("");
      
      const keyValue = (input);

      console.log(keyValue, "this is the key value");

      const ws = new WebSocket('ws://localhost:8080');

      // Handle WebSocket connection open
      ws.onopen = () => {
        console.log('Connected to WebSocket server');

        // Send the data to the server
        ws.send(keyValue);
      };

      // Handle WebSocket errors
      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      // Handle WebSocket connection close
      ws.onclose = () => {
        console.log('Disconnected from WebSocket server');
      };

      // Handle WebSocket received messages
      ws.onmessage = (message) => {
        console.log('Received message:', message.data);
        // Handle the received message as needed
        const resData = message.data;
        const editorElement = document.getElementById('editor');
        editorElement.innerHTML = `<span style="font-size: 20px">${resData}</span>`;
      };
    } catch (error) {
      console.error(error);
      console.log('Error:', error);
      setError('Error occurred while processing the request, Please try again...');
      setTimeout(function () {
        window.location.reload();
      }, 5000000000000000);
      setInput(false);
    }
  };


  const handleChange = (event) => {
    setInput(event.target.value);
    console.log("key pressed by the user ", input);

  };

  // const element =  document.createElementById('myElement');

  const [input, setInput] = useState("");
  const string = (input)
  // onst latex = katex.render(string, element,{
  //       font: 'mathit' // or another font name
  //     });

  const handleInput = (value) => {
    const latex = katex.renderToString(input + value)
    const inpResultField = document.getElementById("result")
    inpResultField.innerHTML = latex;
    setInput(input + value);
    console.log('.......................//result//.........................', input.slice(0, -4));
    if (value === '\u232b') {
      // Handle backspace action
      const updatedInput = input.slice(0, -1); // Remove the last character from the input
      setInput(updatedInput);
    } else {
      // Handle other input actions
      // Perform the desired logic for other symbols
      setInput(prevInput => prevInput + value);
    }


    console.log(typeof (input), ":", input)

  };
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;






  });

  const handleLatex = {};
  // const inputs = input.split(" "); // Split the input into an array of separate LaTeX strings
  // const latex = inputs.map((input) => katex.renderToString(input, { throwOnError: false })).join(""); // Render each LaTeX string separately and join them into a single string

  // console.log(latex, "latex of  the user input///////");

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    window.location.reload();

    setOpen(false);
  }
  const handleClick = () => {
    console.log('input field submit key pressed');
  }

  // Dark theme settings.......

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      fetchData();
    }
  };



  return (


    <div className="app" style={{
      backgroundColor: '#000',
      color: '#4caf50',
      padding: '15px',
      border: '10px solid #4caf50',
      borderRadius: '10px',
      boxShadow: '10px 10px 15px rgba(10, 40, 100, 0.25)',
      textShadow: '0px 0px 10px cyan',
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <h1
          style={{
            backgroundColor: '#000',
            color: '#4caf50',
            padding: '15px',
            border: '10px solid #4caf50',
            borderRadius: '10px',
            boxShadow: '10px 10px 15px rgba(10, 40, 100, 0.25)',
            textShadow: '0px 0px 10px cyan',
          }}
        >
          Scientific Keyboard
        </h1>
        <Button
          variant="contained"
          onClick={handleClickOpen}
          style={{
            backgroundColor: '#4caf50',
            color: '#000',
            padding: '15px',
            border: '10px solid #4caf50',
            borderRadius: '10px',
            boxShadow: '10px 10px 15px rgba(10, 40, 100, 0.25)',
            textShadow: '0px 0px 10px cyan',
          }}
        >
          Click to Open Math Keyboard
        </Button>



      </div>


      <Dialog
        fullScreen
        open={open}


      // TransitionComponent={Transition}
      >
        <AppBar position="relative" style={{ backgroundColor: '#000' }}>
          <Toolbar>
            <IconButton
              style={{ backgroundColor: '#000', color: '#4caf50', float: 'right' }}
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography
              sx={{
                ml: 2,
                flex: 1,
                backgroundColor: 'transparent',
                color: '#4caf50',
                padding: '12px',
                border: 'none',
                fontWeight: 'bold',
                fontSize: '24px', // Increased font size
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textShadow: '2px 2px 4px grey', // Added grey text shadow
              }}
              variant="h1"
              component="div"
            >
              Scientific Keyboard
            </Typography>

          </Toolbar>
        </AppBar>
        <List style={{ backgroundColor: '#000' }}>
          <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#000' }}>
            <input
              onKeyDown={handleKeyDown}
              type="text"
              value={input}
              onChange={handleChange}
              size="100"
              style={{ backgroundColor: "lightgrey", width: '1460px', height: '40px', border: '1px solid #4caf50', marginRight: '10px' }}

            />
            <button
              onClick={() => fetchData(input, sendDataToBackend)}

              size="150"
              style={{
                height: '43px',
                backgroundColor: '#4caf50',
                width: '160px',
                color: '#000',
                border: '1px solid #4caf50',
                padding: '10px',
                boxShadow: '5px 10px 10px rgba(10, 40, 100, 0.25)',
              }}
            >
              Submit
            </button>
          </div>

          <p></p>

          <ScientificKeyboard handleInput={handleInput} />


          {error && <p style={{ color: '#4caf50' }}>Error: {error}</p>}

          <div
            className="output"
            dangerouslySetInnerHTML={{ __html: outputValue }}
            style={{ fontSize: '18px', marginBottom: '10px', color: "black" }}
          ></div>
          <QRCode value="http:192.168.100.59:3000" />

          <Button
            autoFocus
            color="inherit"
            style={{
              float: 'right',
              backgroundColor: '#4caf50',
              border: '1px solid #4caf50',
              width: '10px',
            }}
            onClick={handleClose}
          >
            Close
          </Button>
        </List>
      </Dialog>


    </div >


  );
};

export default App;