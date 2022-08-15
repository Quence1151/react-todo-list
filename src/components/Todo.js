import React,{Component} from 'react';

export default class Todo extends Component {
  state = {
    editable:false,
    id: this.props.todo.id,
    title:this.props.todo.title, 
    content: this.props.todo.content, 
    important:this.props.todo.important,
  }

  toggleEdit = (e) => {
    e.preventDefault();
    this.setState({
      editable : !this.state.editable
    })
  }
  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    })
  };
  handleOnClick = (e) => {
    e.preventDefault();
    this.props.onUpdate(this.state);
    this.setState({
      editable: false
    })    
  }

  render(){
    const { todo: { id, title, content, done, important }, onRemoveTodo, onToggleDone} = this.props
    if(this.state.editable){
      return (
        <tr id={id} className="todo-item">
          <th>
            <input        
              className="custom-checkbox"
              type="checkbox"
              id={'ck-myId' + id}
              checked={done ? true : false}
              onChange={() => onToggleDone(id)}
            />
          </th>
          <th>
            <input
              className="todoTitle"
              name="title"
              value={this.state.title}
              placeholder="제목을 입력하세요."
              onChange={this.handleChange}
            />        
            </th>
            <th>
              <input
                className="todoContent"
                name="content"
                value={this.state.content}
                placeholder="내용을 입력하세요."
                onChange={this.handleChange}
              />
            </th>
            <th>
              <select className="important" name="important" value={this.state.important} onChange={this.handleChange}>
                <option value="1">하</option>
                <option value="2">중</option>
                <option value="3">상</option>
              </select>
            </th>
          <th><button className="update-todo" onClick={this.handleOnClick}>수정</button></th>  
          <th><button className="remove-todo" onClick={() => onRemoveTodo(id)}>삭제</button></th>
        </tr> 
      );
      }else{
        return(
          <tr id={id} className="todo-item">
            <th>
              <input        
                className="custom-checkbox"
                type="checkbox"
                id={'ck-myId' + id}
                checked={done ? true : false}
                onChange={() => onToggleDone(id)}
              />
            </th>
            <th>{title}</th>
            <th>{content}</th>
            <th>{important}</th>
            <th><button className="update-todo" onClick={this.toggleEdit}>수정</button></th> 
            <th><button className="remove-todo" onClick={() => onRemoveTodo(id)}>삭제</button></th>
          </tr>
        );
      }
    } 
}