import React from 'react';
import CalculatorKey from './CalculatorKey';
import CalculatorDisplay from './CalculatorDisplay';
import './Cal.css';


const CalculatorOperations = {
    '/': (prevValue, nextValue) => prevValue / nextValue,
    '*': (prevValue, nextValue) => prevValue * nextValue,
    '+': (prevValue, nextValue) => prevValue + nextValue,
    '-': (prevValue, nextValue) => prevValue - nextValue,
    '=': (prevValue, nextValue) => nextValue
  }
class Calculator extends React.Component {
    state = {
      value: null,
      displayValue: '0',
      operator: null,
      waitingForOperand: false,
      scientific:false,
      style:{
        color:"#000",
        backgroundColor:"#fff"
      },
      keycolor:{
        backgroundColor:"#f0f0f0"
      }
    };
    
    clearAll() {
      this.setState({
        value: null,
        displayValue: '0',
        operator: null,
        waitingForOperand: false
      })
    }
  
    clearDisplay() {
      this.setState({
        displayValue: '0'
      })
    }
    
    clearLastChar() {
      const { displayValue } = this.state
      
      this.setState({
        displayValue: displayValue.substring(0, displayValue.length - 1) || '0'
      })
    }
    
    toggleSign() {
      const { displayValue } = this.state
      const newValue = parseFloat(displayValue) * -1
      
      this.setState({
        displayValue: String(newValue)
      })
    }

    inputRoot(){
        const {displayValue} = this.state;
        const newValue = Math.sqrt(displayValue);
        this.setState({
            displayValue:String(newValue)
        })
    }

    inputSquare(){
        const {displayValue} = this.state;
        
        this.setState({
            displayValue:String(displayValue*displayValue)
        })
    }

    inputPercent() {
      const { displayValue } = this.state
      const currentValue = parseFloat(displayValue)
      
      if (currentValue === 0)
        return
      
      const fixedDigits = displayValue.replace(/^-?\d*\.?/, '')
      const newValue = parseFloat(displayValue) / 100
      
      this.setState({
        displayValue: String(newValue.toFixed(fixedDigits.length + 2))
      })
    }
    
    inputDot() {
      const { displayValue } = this.state
      
      if (!(/\./).test(displayValue)) {
        this.setState({
          displayValue: displayValue + '.',
          waitingForOperand: false
        })
      }
    }
    
    inputDigit(digit) {
      const { displayValue, waitingForOperand } = this.state
      
      if (waitingForOperand) {
        this.setState({
          displayValue: String(digit),
          waitingForOperand: false
        })
      } else {
        this.setState({
          displayValue: displayValue === '0' ? String(digit) : displayValue + digit
        })
      }
    }
    
    performOperation(nextOperator) {    
      const { value, displayValue, operator } = this.state
      const inputValue = parseFloat(displayValue)
      
      if (value == null) {
        this.setState({
          value: inputValue
        })
      } else if (operator) {
        const currentValue = value || 0
        const newValue = CalculatorOperations[operator](currentValue, inputValue)
        
        this.setState({
          value: newValue,
          displayValue: String(newValue)
        })
      }
      
      this.setState({
        waitingForOperand: true,
        operator: nextOperator
      })
    }
    
    handleKeyDown = (event) => {
      let { key } = event
      
      if (key === 'Enter')
        key = '='
      
      if ((/\d/).test(key)) {
        event.preventDefault()
        this.inputDigit(parseInt(key, 10))
      } else if (key in CalculatorOperations) {
        event.preventDefault()
        this.performOperation(key)
      } else if (key === '.') {
        event.preventDefault()
        this.inputDot()
      } else if (key === '%') {
        event.preventDefault()
        this.inputPercent()
      } else if (key === 'Backspace') {
        event.preventDefault()
        this.clearLastChar()
      } else if (key === 'Clear') {
        event.preventDefault()
        
        if (this.state.displayValue !== '0') {
          this.clearDisplay()
        } else {
          this.clearAll()
        }
      }
    };
    handleThemeChange= (event)=>{
        this.setState({scientific:!this.state.scientific});
    }
    lightMode = ()=>{
      this.setState({keycolor:{
        backgroundColor:"#f0f0f0"
      }})
      this.setState({style:{
        color:"#000",
        backgroundColor:"#fff"
      }})
    }
    darkMode = () =>{
      this.setState({keycolor:{
        backgroundColor:"#666"
      }})
      this.setState({style:{
        color:"#fff",
        backgroundColor:"#000"
      }})
    }
    componentDidMount() {
      document.addEventListener('keydown', this.handleKeyDown)
    }
    
    componentWillUnmount() {
      document.removeEventListener('keydown', this.handleKeyDown)
    }
    
    render() {
      const { displayValue,backcolor,keybackcolor,keycolor,style } = this.state
      
      const clearDisplay = displayValue !== '0'
      const clearText = clearDisplay ? 'C' : 'AC'
      
      return (
        <div className="calculator" style={{"padding":"50px",...style}}>
          <button className="changemode" onClick={this.handleThemeChange}>
              Scientific
          </button>
          <button className="changemode" onClick={this.lightMode}>
              Light Mode
          </button>
          <button className="changemode" onClick={this.darkMode}>
              Dark Mode
          </button>
          
          <CalculatorDisplay value={displayValue} />
          <div className="calculator-keypad" style={style} >
            <div className="input-keys" >
              <div className="function-keys">
                <CalculatorKey className="key-clear" keycolor={keycolor} onPress={() => clearDisplay ? this.clearDisplay() : this.clearAll()}>{clearText}</CalculatorKey>
                <CalculatorKey className="key-percent" keycolor={keycolor} onPress={() => this.inputPercent()}>%</CalculatorKey>
              </div>
              {
                this.state.scientific 
                ? 
                <div className="toggle-keys" >
                  <CalculatorKey className="key-sign"  keycolor={keycolor} onPress={() => this.toggleSign()}>±</CalculatorKey>
                  <CalculatorKey className="key-root"  keycolor={keycolor} onPress={() => this.inputRoot()}>Root</CalculatorKey>
                  <CalculatorKey className="key-square" keycolor={keycolor} onPress={() => this.inputSquare()}>Square</CalculatorKey>
                </div>
                :<div />
              }
              
              <div className="digit-keys" >
                <CalculatorKey className="key-0" keycolor={keycolor} onPress={() => this.inputDigit(0)}>0</CalculatorKey>
                <CalculatorKey className="key-dot" keycolor={keycolor} onPress={() => this.inputDot()}>●</CalculatorKey>
                <CalculatorKey className="key-1" keycolor={keycolor} onPress={() => this.inputDigit(1)}>1</CalculatorKey>
                <CalculatorKey className="key-2" keycolor={keycolor} onPress={() => this.inputDigit(2)}>2</CalculatorKey>
                <CalculatorKey className="key-3" keycolor={keycolor} onPress={() => this.inputDigit(3)}>3</CalculatorKey>
                <CalculatorKey className="key-4" keycolor={keycolor} onPress={() => this.inputDigit(4)}>4</CalculatorKey>
                <CalculatorKey className="key-5" keycolor={keycolor} onPress={() => this.inputDigit(5)}>5</CalculatorKey>
                <CalculatorKey className="key-6" keycolor={keycolor} onPress={() => this.inputDigit(6)}>6</CalculatorKey>
                <CalculatorKey className="key-7" keycolor={keycolor} onPress={() => this.inputDigit(7)}>7</CalculatorKey>
                <CalculatorKey className="key-8" keycolor={keycolor} onPress={() => this.inputDigit(8)}>8</CalculatorKey>
                <CalculatorKey className="key-9" keycolor={keycolor} onPress={() => this.inputDigit(9)}>9</CalculatorKey>
              </div>
            </div>
            <div className="operator-keys" style={style} >
              <CalculatorKey className="key-divide" keycolor={keycolor} onPress={() => this.performOperation('/')}>÷</CalculatorKey>
              <CalculatorKey className="key-multiply" keycolor={keycolor} onPress={() => this.performOperation('*')}>×</CalculatorKey>
              <CalculatorKey className="key-subtract" keycolor={keycolor} onPress={() => this.performOperation('-')}>−</CalculatorKey>
              <CalculatorKey className="key-add" keycolor={keycolor} onPress={() => this.performOperation('+')}>+</CalculatorKey>
              <CalculatorKey className="key-equals" keycolor={keycolor} onPress={() => this.performOperation('=')}>=</CalculatorKey>
            </div>
          </div>
        </div>
      )
    }
  }
  export default Calculator;