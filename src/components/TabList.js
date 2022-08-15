import React, {Component} from 'react';

export default class TabList extends Component{
  count(category){
    const { todos } =this.props
    if(category === '전체'){
      return todos.length
    }else if(category === '진행'){
      return todos.filter(todo => todo.done === false).length
    }else{
      return todos.filter(todo => todo.done === true).length
    }
  }

  render(){
    const { categoryInfo, onChangeCategory} = this.props
    return (
      <th
        id = {categoryInfo.id}
        className = {categoryInfo.open ? 'active' : ''}
        onClick = {() => onChangeCategory(categoryInfo.id) }>
        {categoryInfo.id} ({this.count(categoryInfo.id)})
      </th>
    );
  }
}