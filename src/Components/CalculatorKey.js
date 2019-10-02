import React from 'react';
import PointTarget from 'react-point';
import './Cal.css';
class CalculatorKey extends React.Component {
    render() {
      const { onPress, className,keycolor, ...props } = this.props
      
      return (
        <PointTarget onPoint={onPress}>
          <button className={`calculator-key ${className}`} style={keycolor} {...props}/>
        </PointTarget>
      )
    }
}
export default CalculatorKey;