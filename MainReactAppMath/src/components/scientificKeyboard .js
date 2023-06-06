
import React, { useRef, useEffect, useState } from "react";
import { Button, Grid, MenuItem, Select, Tooltip } from '@mui/material';
import ButtonGroup from '@mui/material/ButtonGroup';
import axios from "axios";
import katex from 'katex';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import KeyboardHideTwoToneIcon from '@mui/icons-material/KeyboardHideTwoTone';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import io from "socket.io-client"




import '../App.css';
import * as iink from 'iink-js';




const ScientificKeyboard = ({ handleInput }) => {
  
  






  const keys = [
    ['\\sin', '\\cos', '\\tan', '\\cot', '\\sec', '\\csc', '\\arcsin', '\\arccos', '\\arctan'],
    ['\\text{acot}', '\\text{asec}', '\\text{acsc}', '\\log', '\\ln', '\\exp', '\\sqrt{}', '\\sqrt[3]{}', '\\sqrt[4]{}'],
    ['x^n', 'x^2', 'x^3', '\\int', '\\iint', '\\iiint', '\\oint', '\\oiint', '\\oiiint', '\\nabla', '\\Delta', '\\partial'],
    ['(', ')', '[', ']', '{}', '\\pi', '\\text{e}', '\\varphi', '\\gamma', '\\phi', '\\theta', '\\lambda', '\\mu', '\\nu'],
    ['\\rho', '\\sigma', '\\tau', '\\omega', '<', '>', '\\neq', '\\approx', '\\cong', '\\equiv', '\\not\\equiv'],
    ['\\prec', '\\succ', '\\preceq', '\\succeq', '\\in', '\\notin', '\\ni', '\\not\\ni', '\\subset', '\\supset'],
    ['\\subseteq', '\\supseteq', '\\nsubseteq', '\\nsupseteq', '\\forall', '\\exists', '\\nexists', '\\land'],
    ['\\lor', '\\neg', '\\implies', '\\iff', '%', '\\pm', '!', '^\\circ', '\\div', '\\times'],
    ['\\cdot', '\\mp', '\\square\\mkern-10mu\\raisebox{0.3ex}{\\small{$\\scriptstyle\\langle$}}', '\\angle'],
    ['\\measuredangle', '\\sphericalangle', '\\parallel', '\\nparallel', '\\mid', '\\perp', '\\infty'],
    ['1', '2', '3',],
    ['4', '5', '6', '+'],
    ['7', '8', '9', '-'],
    ['.', '0', '=', '*', '\u232b'],
  ];



  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const toggleKeyboard = () => {
    setKeyboardVisible(!isKeyboardVisible);
  };

 
  //.......................//phone Conversions//........................//


  //.......................//phone Conversions//.......................//



  // ........................//..................................//

  // ........................//..................................//






  const [outputValue, setOutputValue] = useState('');
  const [error, setError] = useState('');
  const [input, setInput] = useState('');

  const [resultValue, setresultValue] = useState("");
  const [penType, setPenType] = useState('PEN');
  
  
  //............................///..................................//

  useEffect(() => {



    
    const editorElement = document.getElementById('editor');
    const resultElement = document.getElementById('result');
    const undoElement = document.getElementById('undo');
    const redoElement = document.getElementById('redo');
    const clearElement = document.getElementById('clear');
    const convertElement = document.getElementById('convert');
    const eraserElement = document.getElementById('eraser');
    const penElement = document.getElementById('pen');
    const erasePreciselyElement = document.getElementById('erase-precisely');

    const handleChanged = (event) => {
      undoElement.disabled = !event.detail.canUndo;
      redoElement.disabled = !event.detail.canRedo;
      clearElement.disabled = event.detail.isEmpty;
    };

    const cleanLatex = (latexExport) => {
      if (latexExport.includes('\\\\')) {
        const steps = '\\begin{align*}' + latexExport + '\\end{align*}';
        return steps
          .replace("\\begin{aligned}", "")
          .replace("\\end{aligned}", "")
          .replace(new RegExp("(align.{1})", "g"), "aligned");
      }
      return latexExport.replace(new RegExp("(align.{1})", "g"), "aligned");
    };

    const handleExported = (evt) => {
      const exports = evt.detail.exports;
      if (exports && exports['application/x-latex']) {
        const cleanedLatex = cleanLatex(exports['application/x-latex']);
        resultElement.innerHTML = cleanedLatex;
        convertElement.disabled = false;
      }
      else if (exports && exports['application/mathml+xml']) {
        convertElement.disabled = false;
        resultElement.innerText = exports['application/mathml+xml'];
      } else if (exports && exports['application/mathofficeXML']) {
        convertElement.disabled = false;
        resultElement.innerText = exports['application/mathofficeXML'];
      } else {
        convertElement.disabled = true;
        resultElement.innerHTML = '';
      }
    };

    const handleUndo = () => {
      editorElement.editor.undo();
    };

    const handleRedo = () => {
      editorElement.editor.redo();
    };

    const handleClear = () => {
      editorElement.editor.clear();
    };

    const handleResult = () => {
      editorElement.editor("result");
      console.log("result from editor was.................//");
    };

    const handleConvert = () => {
      editorElement.editor.convert();
    };

    const handlePen = () => {
      console.log('Handle pen selection change');
      setPenType('PEN');
      eraserElement.disabled = false;
      eraserElement.classList.remove('active');
      penElement.disabled = true;
      penElement.classList.add('active');
    };

    const handleEraser = () => {
      setPenType('ERASER');
      eraserElement.disabled = true;
      eraserElement.classList.add('active');
      penElement.disabled = false;
      penElement.classList.remove('active');
    };

    const handleErasePrecisely = (e) => {
      const configuration = { ...editorElement.editor.configuration };
      configuration.recognitionParams.iink.math.eraser = {
        'erase-precisely': e.target.checked,
      };
      editorElement.editor.configuration = configuration;
    };

    editorElement.addEventListener('changed', handleChanged);
    editorElement.addEventListener('exported', handleExported);
    undoElement.addEventListener('click', handleUndo);
    redoElement.addEventListener('click', handleRedo);
    clearElement.addEventListener('click', handleClear);
    convertElement.addEventListener('click', handleConvert);
    resultElement.addEventListener('click', handleResult);
    // eraserElement.addEventListener('click', handleEraser);
    // penElement.addEventListener('click', handlePen);
    // erasePreciselyElement.addEventListener('change', handleErasePrecisely);

    const recognitionParams = {
      type: 'MATH',
      protocol: 'WEBSOCKET',
      server: {
        scheme: 'https',
        host: 'webdemoapi.myscript.com',
        applicationKey: 'da4d9314-3f94-4e4c-be14-d57fdd71adde',
        hmacKey: '6d36bbad-9527-4062-8268-e686bd56640f'
      },
      iink: {
        math: {
          mimeTypes: ['application/x-latex', 'application/vnd.myscript.jiix', 'application/mathml+xml'],
        },
        eraser: {
          'erase-precisely': false,
        },
        export: {
          jiix: {
            strokes: true
          }
        }
      }
    };
    iink.register(editorElement, {
      recognitionParams: recognitionParams,
      iink: {
        eraser: {
          'erase-precisely': false,
        },
        export: {
          jiix: {
            strokes: true
          }
        },
      }
    });

   
    window.addEventListener('resize', () => {
      editorElement.editor.resize();
    });

    // Clean up event listeners on component unmount
    return () => {
      editorElement.removeEventListener('changed', handleChanged);
      editorElement.removeEventListener('exported', handleExported);
      undoElement.removeEventListener('click', handleUndo);
      redoElement.removeEventListener('click', handleRedo);
      clearElement.removeEventListener('click', handleClear);
      convertElement.removeEventListener('click', handleConvert);
      resultElement.removeEventListener('click', handleResult);


      window.removeEventListener('resize', () => {
        editorElement.editor.resize();
      });
    };
  }, []);

  






  const res = document.getElementById('result');
  const handleClick = (symbol) => {
    handleInput(symbol);
    if (res) {
      setresultValue(res.innerText);
    }

  }

  console.log(resultValue, "resultValue latex string")
  const handleChange = (event) => {
    setInput(event.target.value);
  };



  // Call sendDataToBackend with the resultValue

  return (
    <div style={{ maxWidth: '1500px' }}>
      <div id="result" style={{ backgroundColor: 'grey' }}></div>
      <div>
        <nav
          style={{
            backgroundColor: '#000',
            padding: '10px',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.5)',
            zIndex: '1',
            position: 'sticky',
            top: '0',
          }}
        >
          <div className="button-div">
            <button
              id="clear"
              style={{
                backgroundColor: 'grey',
                boxShadow: '0px 2px 4px rgba(0, 255, 255, 0.3)',
                padding: '1px',
              }}
              className="nav-btn btn-fab-mini btn-neonBlue"
              disabled
            >
              <DeleteIcon />
            </button>

            <button
              id="undo"
              className="nav-btn btn-fab-mini btn-neonBlue"
              disabled
              style={{
                backgroundColor: 'grey',
                boxShadow: '0px 2px 4px rgba(0, 255, 255, 0.3)',
              }}
            ></button>
            <button
              id="redo"
              className="nav-btn btn-fab-mini btn-neonBlue"
              disabled
              style={{
                backgroundColor: 'grey',
                boxShadow: '0px 2px 4px rgba(0, 255, 255, 0.3)',
              }}
            ></button>
          </div>

          <div className="spacer"></div>
          <button
            className="classic-btn btn-neonBlue"
            id="convert"
            style={{
              backgroundColor: 'grey',
              boxShadow: '0px 2px 4px rgba(0, 255, 255, 0.3)',
            }}
            disabled
          >
            Convert
          </button>

          {/* Place the keyboard icon here */}
          <div style={{ maxWidth: '100%' }}>
            <div style={{ display: 'inline-block', position: 'relative' }}>
              <IconButton
                onClick={toggleKeyboard}
                color="default"
                style={{
                  backgroundColor: isKeyboardVisible ? '#111' : '',
                  padding: '8px',
                  fontSize: '18px',
                  display: 'inline-block',
                  marginTop: '10px',
                }}
              >
                {isKeyboardVisible ? (
                  <KeyboardHideTwoToneIcon style={{ fontSize: '30px', color: '#00ff00' }} />
                ) : (
                  <KeyboardIcon style={{ fontSize: '30px', color: '#00ff00' }} />
                )}
              </IconButton>

              {isKeyboardVisible && (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Grid container spacing={1} alignItems="center">
                    {keys.map((keyGroup, index) => (
                      <Grid item key={index}>
                        <ButtonGroup
                          variant="contained"
                          aria-label="symbol-group"
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            margin: '5px',
                          }}
                        >
                          {keyGroup.map((symbol, index) => (
                            <Tooltip key={index} title={symbol} placement="top" style={{ maxWidth: '100px' }}>
                              <IconButton
                                onClick={() => handleInput(symbol)}
                                style={{
                                  backgroundColor: '#111',
                                  fontWeight: 'bold',
                                  padding: '4px',
                                  width: '32px',
                                  height: '32px',
                                  margin: '2px',
                                  color: '#00ff00',
                                }}
                              >
                                <span
                                  style={{
                                    fontWeight: 'bold',
                                    fontSize: '8px',
                                    fontOpticalSizing: 'vertical',
                                    padding: '15px',
                                    width: '50px',
                                    height: '48px',
                                    margin: '6px',
                                    color: '#00ff00',
                                  }}
                                  dangerouslySetInnerHTML={{ __html: katex.renderToString(symbol) }}
                                  className="button-text"
                                />
                              </IconButton>
                            </Tooltip>
                          ))}
                        </ButtonGroup>
                      </Grid>
                    ))}
                  </Grid>
                </div>
              )}
            </div>
          </div>
        </nav>

        <div id="editor" touch-action="none" fon-size="1000px" style={{ color: 'black', backgroundColor: 'lightgrey', display: 'flex', flexDirection: 'column', padding: '15px' }}>
          <h1 style={{ color: 'grey' }}>Write Here:</h1>


          <div>
            <div>
            </div>
          </div>
        </div>
      </div>
    </div>






  );
};

export default ScientificKeyboard;







// applicationKey: '515131ab-35fa-411c-bb4d-3917e00faf60',
//         hmacKey: '54b2ca8a-6752-469d-87dd-553bb450e9ad'












