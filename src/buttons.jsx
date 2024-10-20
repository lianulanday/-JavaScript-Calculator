import './App.css';
import React, { useState } from 'react';

function Calculator() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [lastClickedEqual, setLastClickedEqual] = useState(false);

  const handleClick = (value) => {
    if (value === 'C') {
      handleClear();
    } else if (value === '=') {
      handleEqual();
    } else {
      handleInput(value);
    }
  };

  const handleInput = (value) => {
    if (lastClickedEqual) {
      if (!isNaN(value)) {
        setInput(value);  
      } else {
        setInput(result + value);  
      }
      setLastClickedEqual(false);
    } else {
      if (value === '0' && input === '0') return;
      if (value === '.' && input.split(/[+\-*/]/).pop().includes('.')) return;
      if (/[+\-*/]$/.test(input) && /[+\-*/]/.test(value)) {
        if (value === '-') {
          setInput(input + value);
        } else if (/[+\-*/]$/.test(input.slice(-2)) && value === '-') {
          setInput(input);
        } else {
          setInput(input.slice(0, -1) + value);
        }
      } else {
        setInput(input + value);
      }
    }
  };

  const handleEqual = () => {
    try {
      let sanitizedInput = input.replace(/x/g, '*');  
      let filtered = sanitizedInput.match(/(\*|\+|\/|-)?(\.|\-)?\d+/g).join('');
      const evaluatedResult = Function('return ' + filtered)();
      setResult(evaluatedResult.toString());
      setInput('');
      setLastClickedEqual(true);
    } catch (error) {
      setResult('Error');
    }
  };

  const handleClear = () => {
    setInput('');
    setResult('');
  };

  return (
    <div className="calculator">
      <div id="display">
        <p>{input || result || '0'}</p>
      </div>

      <div id="btns">
        <button id="one" onClick={() => handleClick("1")}>1</button>
        <button id="two" onClick={() => handleClick("2")}>2</button>
        <button id="three" onClick={() => handleClick("3")}>3</button>
        <button id="four" onClick={() => handleClick("4")}>4</button>
        <button id="five" onClick={() => handleClick("5")}>5</button>
        <button id="six" onClick={() => handleClick("6")}>6</button>
        <button id="seven" onClick={() => handleClick("7")}>7</button>
        <button id="eight" onClick={() => handleClick("8")}>8</button>
        <button id="nine" onClick={() => handleClick("9")}>9</button>
        <button id="zero" onClick={() => handleClick("0")}>0</button>
        <button id="add" onClick={() => handleClick("+")}>+</button>
        <button id="subtract" onClick={() => handleClick("-")}>-</button>
        <button id="multiply" onClick={() => handleClick("x")}>x</button>
        <button id="divide" onClick={() => handleClick("/")}>/</button>
        <button id="decimal" onClick={() => handleClick(".")}>.</button>
        <button id="clear" onClick={() => handleClick("C")}>C</button>
        <button id="equals" onClick={handleEqual}>=</button>
      </div>
    </div>
  );
}

export default Calculator;
