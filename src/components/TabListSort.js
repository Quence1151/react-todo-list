import React, {Component} from 'react';

export default class TabListSort extends Component{
  render(){
    const { howSort, onListSort} = this.props
    return (
      <th
        id = {howSort.id}
        className = {howSort.open ? 'active' : ''}
        onClick = {() => onListSort(howSort.id) }>
        {howSort.id}
      </th>
    );
  }
}