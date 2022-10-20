import React, { Component } from "react";
import styled from "styled-components";

class CalculatorInput extends Component {
  render() {
    return <div>{this.props.children}</div>;
  }
}

const Grid = styled.div`
  background: #aaa;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(6, 1fr);
  grid-gap: 1px;
  padding: 1px;
`;

const ResultRow = styled.div`
  grid-column: span 4;
  text-align: right;
  font-size: 4em;
  padding: 16px;
  background: #aaa;
  color: #fff;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2em;
  background: #eef;
`;

const UtilityButton = Button.extend`
  background: #eee;
`;

const OperatorButton = Button.extend`
  background: orange;
`;

const Span2Button = Button.extend`
  grid-column: span 2;
`;

const endsInOperation = (string) => {
  let str = string.trim();
  if (str.endsWith("+")) {
    return "+";
  } else if (str.endsWith("-")) {
    return "-";
  } else if (str.endsWith("/")) {
    return "/";
  } else if (str.endsWith("*")) {
    return "*";
  } else {
    return null;
  }
};

export default class Calculator extends Component {
  state = {
    result: "0",
    operator: null,
    opString: ""
  };
  handleClear = (e) => {
    e.preventDefault();
    this.setState({
      result: "0",
      opString: "",
      operator: null,
      isDirty: false,
      opString: ""
    });
  };
  handleSign = (e) => {
    e.preventDefault();
    this.setState((prevState) => {
      if (!prevState.result.length) {
        return null;
      }
      const endingOperation = endsInOperation(prevState.opString);
      let opString;
      let tempResult = prevState.result;
      if (endingOperation) {
        let tempOpString = prevState.opString.slice(0, -1);
        tempResult = eval(` -1 * ${tempOpString}`);
        opString = `${tempResult} ${endingOperation} `;
      } else {
        tempResult = eval(`-1 * ${prevState.opString}`);
        opString = eval(`-1 * ${prevState.opString}`);
      }
      return {
        result: `${tempResult}`,
        operator: endingOperation,
        isDirty: !!endingOperation,
        opString: `${opString}`
      };
    });
  };
  handleModulus = (e) => {
    e.preventDefault();
    this.setState((prevState) => {
      if (prevState.isDirty) {
        return null;
      }
      return {
        result: `${eval(`${prevState.opString} / 100`)}`,
        opString: `${eval(`${prevState.opString} / 100`)}`
      };
    });
  };

  handlePlus = (e) => {
    e.preventDefault();
    this.setState((prevState) => {
      // If they hit the plus sign again, lets bail on an update
      if (prevState.isDirty || !prevState.result.length) {
        return null;
      }
      return {
        result: `0`,
        operator: "+",
        isDirty: true,
        opString: `${prevState.opString || prevState.result} +`
      };
    });
  };

  handleDivide = (e) => {
    e.preventDefault();
    this.setState((prevState) => {
      if (prevState.isDirty || !prevState.result.length) {
        return null;
      }
      return {
        result: "0",
        operator: "/",
        isDirty: true,
        opString: `${prevState.opString || prevState.result} / `
      };
    });
  };

  handleMinus = (e) => {
    e.preventDefault();
    this.setState((prevState) => {
      if (prevState.isDirty || !prevState.result.length) {
        return null;
      }
      return {
        result: "0",
        operator: "-",
        isDirty: true,
        opString: `${prevState.opString || prevState.result} - `
      };
    });
  };

  handleMultiply = (e) => {
    e.preventDefault();
    this.setState((prevState) => {
      if (prevState.isDirty || !prevState.result.length) {
        return null;
      }
      return {
        result: "0",
        operator: "*",
        isDirty: true,
        opString: `${prevState.opString || prevState.result} * `
      };
    });
  };

  handlePeriod = (e) => {
    e.preventDefault();
    this.setState((prevState) => {
      if (prevState.isDirty) {
        return null;
      }
      return {
        result: `${prevState.result}.`,
        opString: `${prevState.opString}.`
      };
    });
  };

  handleEquals = (e) => {
    e.preventDefault();
    this.setState((prevState) => {
      if (prevState.isDirty) {
        return null;
      }
      let newVal = eval(prevState.opString);
      return {
        opString: `${newVal}`,
        isDirty: false,
        operator: null,
        result: `${newVal}`
      };
    });
  };
  handleSelectNumber = (e) => {
    e.preventDefault();
    const num = e.target.textContent;
    this.setState((prevState) => {
      const result =
        prevState.result === "0" ? num : `${prevState.result}${num}`;
      const opString = `${prevState.opString || ""}${num}`;
      return {
        operator: null,
        isDirty: false,
        opString,
        result
      };
    });
  };

  render() {
    return (
      <Grid>
        {/* <ResultRow>{this.state.result}</ResultRow> */}
        <UtilityButton onClick={this.handleClear}>AC</UtilityButton>
        <UtilityButton onClick={this.handleSign}>&#177;</UtilityButton>
        <UtilityButton onClick={this.handleModulus}>%</UtilityButton>
        <OperatorButton onClick={this.handleDivide}>&#247;</OperatorButton>
        <Button onClick={this.handleSelectNumber}>7</Button>
        <Button onClick={this.handleSelectNumber}>8</Button>
        <Button onClick={this.handleSelectNumber}>9</Button>
        <OperatorButton onClick={this.handleMultiply}>&times;</OperatorButton>
        <Button onClick={this.handleSelectNumber}>4</Button>
        <Button onClick={this.handleSelectNumber}>5</Button>
        <Button onClick={this.handleSelectNumber}>6</Button>
        <OperatorButton onClick={this.handleMinus}>&minus;</OperatorButton>
        <Button onClick={this.handleSelectNumber}>1</Button>
        <Button onClick={this.handleSelectNumber}>2</Button>
        <Button onClick={this.handleSelectNumber}>3</Button>
        <OperatorButton onClick={this.handlePlus}>&#43;</OperatorButton>
        <Span2Button onClick={this.handleSelectNumber}>0</Span2Button>
        <Button onClick={this.handlePeriod}>.</Button>
        {/* <OperatorButton onClick={this.handleEquals}>&#61;</OperatorButton> */}
      </Grid>
    );
  }
}
