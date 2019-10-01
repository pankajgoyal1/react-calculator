import React from 'react';
import PointTarget from 'react-point';
import './Cal.css';
class CalculatorKey extends React.Component {
    render() {
      const { onPress, className,visibility, ...props } = this.props
      
      return (
        <PointTarget onPoint={onPress}>
          <button className={`calculator-key ${className}`} visibility={visibility} {...props}/>
        </PointTarget>
      )
    }
}
export default CalculatorKey;