import React, { useState } from "react";
import Keys from "./Keys";

const Calculator = () => {
  const keys = [
    "AC",
    "C",
    "%", 
    "/", 
    "7",
    "8",
    "9",
    "*",
    "4",
    "5",
    "6",
    "-",
    "1",
    "2",
    "3",
    "+",
    ".",
    "0",
    "EQUALS",
  ];
  const [activeField, setActiveField] = useState("first");

  const [firstNumber, setFirstNumber] = useState("");
  const [secondNumber, setSecondNumber] = useState("");
  const [operator, setOperator] = useState("");
  const [result, setResult] = useState("");

  function handleButton(value) {
    if (value === "AC") {
      setFirstNumber("");
      setSecondNumber("");
      setOperator("");
      setResult("");
      return;
    }
    if (value === "C") {
      if (activeField === "first") {
        setFirstNumber(firstNumber.slice(0, -1));
      } else if (activeField === "second") {
        setSecondNumber(secondNumber.slice(0, -1));
      }
      return;
    }
    if (["+", "-", "*", "/", "%"].includes(value)) {
      setOperator(value);
      setActiveField("second");
      return;
    }
    if (value === "EQUALS") {
      calculateResult();
      return;
    }
    if (activeField === "first") {
      setFirstNumber(firstNumber + value);
    } else if (activeField === "second") {
      setSecondNumber(secondNumber + value);
    }
  }

  function calculateResult() {
    const n1 = parseFloat(firstNumber);
    const n2 = parseFloat(secondNumber);

    if (isNaN(n1) || isNaN(n2) || !operator) {
      setResult("Error");
      return;
    }

    let ans = 0;
    switch (operator) {
      case "+": ans = n1 + n2; break;
      case "-": ans = n1 - n2; break;
      case "*": ans = n1 * n2; break;
      case "/": ans = n2 === 0 ? "Infinity" : n1 / n2; break;
      case "%": ans = n1 % n2; break;
    }

    setResult(ans);
  }

  return (
    <div className="min-w-[320px] bg-black flex flex-col gap-4 p-4 rounded-2xl text-white">
      <div className="flex flex-col gap-3">
        <input
          type="text"
          value={firstNumber}
          readOnly
          onClick={() => setActiveField("first")}
          placeholder="First Number"
          className={`p-2 rounded bg-[#141414] outline-none border 
            ${activeField === "first" ? "border-green-400" : "border-transparent"}`}
        />

        <input
          type="text"
          value={secondNumber}
          readOnly
          onClick={() => setActiveField("second")}
          placeholder="Second Number"
          className={`p-2 rounded bg-[#141414] outline-none border 
            ${activeField === "second" ? "border-green-400" : "border-transparent"}`}
        />

        <input
          type="text"
          value={result}
          readOnly
          placeholder="Result"
          className="p-2 rounded bg-[#141414] outline-none border border-blue-400"
        />
      </div>
      <div className="grid grid-cols-4 gap-2">
        {keys.map((item, index) => (
          <Keys
            label={item}
            key={index}
            keyClass={item === "EQUALS" && "equals"}
            onButtonClick={handleButton}
          />
        ))}
      </div>
    </div>
  );
};

export default Calculator;
