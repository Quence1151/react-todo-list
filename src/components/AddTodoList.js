import React, {Component} from "react";
export default class AddTodoList extends Component {
  state ={
    title:'',
    content:'',
    important:'1',
  }

  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onCreate(this.state);
    this.setState({
      title:'',
      content:'',
      important:'1',
    })
    e.target.reset()
  }

  render(){
    return (
      <form className="input-todo" onSubmit={this.handleSubmit}>
        <table className="input-table">
          <tbody><tr>
          <th>
            <input
              className="todoTitle"
              name="title"
              placeholder="제목을 입력하세요."
              onChange={this.handleChange}
            />        
          </th>
          <th>
            <input
              className="todoContent"
              name="content"
              placeholder="내용을 입력하세요."
              onChange={this.handleChange}
            />
          </th>
          <th>
            <select className="important" name="important" onChange={this.handleChange}>
              <option value="1">하</option>
              <option value="2">중</option>
              <option value="3">상</option>
            </select>
          </th>
          <th>
            <button className="create-button" type="submit">등록</button>
          </th>
          </tr></tbody>
        </table>
      </form>
    );
  }
}