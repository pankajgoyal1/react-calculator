import React from 'react';
import './Cal.css';

export default class CalculatorDisplay extends React.Component {
    render() {
      const { value,color, ...props } = this.props
      
      const language = navigator.language || 'en-US'
      let formattedValue = parseFloat(value).toLocaleString(language, {
        useGrouping: true,
        maximumFractionDigits: 6
      })
      
      // Add back missing .0 in e.g. 12.0
      const match = value.match(/\.\d*?(0*)$/)
      
      if (match)
        formattedValue += (/[1-9]/).test(match[0]) ? match[1] : match[0]
      
      return (
        <div {...props} className="calculator-display">
          <div style={{"height":"100px","width":"320px","backgroundColor":"grey","margin":"0 auto"}}>{formattedValue}</div>
        </div>
      )
    }
  };