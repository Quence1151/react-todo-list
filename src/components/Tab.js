import React, {Component} from 'react';
export default class Tab extends Component{
  render(){
    const { onChangeTab, children } = this.props
    return (
      <table className="nav" onClick={onChangeTab}>
        <tbody><tr>
        {children}
        </tr></tbody>
      </table>
    );
  }
}