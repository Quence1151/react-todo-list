import React, { Component } from 'react';
import Todo from './components/Todo';
import AddTodoList from './components/AddTodoList';
import Tab from './components/Tab';
import Tablist from './components/TabList';
import './style/App.css'
import TabListSort from './components/TabListSort';

export default class App extends Component {

  state = {
    todos: [
      { id: 1, title: '작성', content: '포함 되어야 할 내용', done: true, important: 3 },
      { id: 2, title: '조회', content: '현황 카운트, 리스트 보기형식, 리스트 정렬방식', done: true, important: 3 },
      { id: 3, title: '수정', content: '제목, 내용, 상태, 중요도 변경 ', done: false, important: 3 },
      { id: 4, title: '삭제', content: '전체 삭제, 단건 삭제', done: false, important: 3 },
    ],
    categories: [
      { id: '전체', open: true },
      { id: '진행', open: false },
      { id: '완료', open: false },
    ],
    sorts: [
      { id: '기본', open: true },
      { id: '제목', open: false },
      { id: '중요도', open: false },
      //id는 유니크한 값으로 생성해서 따로 사용 -> index
    ],
  }

  // Todo 랜더링
  renderTodoList = (todos, categories, sorts) => {
    const [{ id: currentCategory }] = categories.filter(category => category.open === true);
    const [{ id: howSort }] = sorts.filter(sort => sort.open === true);
    let _todos = [...todos];
    if (currentCategory === '완료') {
      _todos = todos.filter(todo => todo.done === true);
    } else if (currentCategory === '진행') {
      _todos = todos.filter(todo => todo.done === false);
    } else {
      _todos = todos
    }
    if (howSort === '제목') {
      _todos.sort((a, b) => a.title.localeCompare(b.title))
    } else if (howSort === '중요도') {
      _todos.sort((a, b) => a.important - b.important)
    } else {
      _todos.sort((a, b) => a.id - b.id)
    }
    return _todos.map(todo => (
      <Todo
        key={todo.id}
        todo={todo}
        onRemoveTodo={this.removeTodo}
        onToggleDone={this.toggleDone}
        onUpdate={this.updateTodo}
      />
    ));
  };

  // ID 계산
  createId = () => {
    return Math.max(0, ...this.state.todos.map(todo => todo.id)) + 1;
  };

  // Todo 생성
  addTodo = newTodo => {
    if (newTodo.title === '' || newTodo.content === '') {
      alert('제목과 내용을 입력해 주세요.')
      return
    }
    this.setState({
      todos: [...this.state.todos, { id: this.createId(), title: newTodo.title, content: newTodo.content, done: false, important: newTodo.important }],
    }); //concat과 동일한 방식 -> 다시 자세히 찾아보자
  };

  //Todo 수정
  updateTodo = updateTodo => {
    this.setState({
      todos: [
        ...this.state.todos.map(todo => (todo.id === updateTodo.id ? { ...todo, title: updateTodo.title, content: updateTodo.content, important: updateTodo.important } : todo)),
      ],
    })
  };

  // Todo 삭제
  removeTodo = id => {
    this.setState({
      todos: [...this.state.todos.filter(todo => todo.id !== id)],
    });
  };

  // Todo 완료/미완료 체크 기능
  toggleDone = id => {
    this.setState({
      todos: [
        ...this.state.todos.map(todo => (todo.id === id ? { ...todo, done: !todo.done } : todo)),
      ],
    });
  };

  // 전체 완료 기능
  allDone = e => {
    this.setState({
      todos: [
        ...this.state.todos.map(todo => ({
          ...todo,
          done: e.target.checked,
        })),
      ],
    });
  };

  // 완료한 Todo 삭제기능
  clearDone = () => {
    this.setState({
      todos: [...this.state.todos.filter(todo => todo.done !== true)],
    });
  };

  // 전체 삭제
  clearAll = () => {
    this.setState({
      todos: []
    })
  }

  // 리스트 보기 기능(전체/진행/완료)
  changeCategory = id => {
    this.setState({
      categories: [
        ...this.state.categories.map(category =>
          category.id === id ? { ...category, open: true } : { ...category, open: false },
        ),
      ],
    });
  };

  // 리스트 정렬 기능(기본(id) / 제목 / 중요도)
  listSort = id => {
    this.setState({
      sorts: [
        ...this.state.sorts.map(sort =>
          sort.id === id ? { ...sort, open: true } : { ...sort, open: false }
        ),
      ],
    })
  }

  // 렌더 함수에서는 스테이트에 있는 값으로 표시만 해주는 것이 베스트 (새로운 객체생성X 대단위 작업 X)
  //스테이트에는 렌더에 필요한 변수만 관리

  render() {
    const { todos, categories, sorts } = this.state;
    return (
      <>
        <div className="container">
          <div className='title'>Todo - List</div>
          <div>
            <AddTodoList onCreate={this.addTodo} />
          </div>
          {/* 할일 카테고리 탭 영역 */}
          <Tab>
            {this.state.categories.map(category => (
              <Tablist
                key={category.id}
                categoryInfo={category}
                onChangeCategory={this.changeCategory}
                todos={todos}
              />
            ))}
          </Tab>
          <Tab>
            {this.state.sorts.map(sort => (
              <TabListSort
                key={sort.id}
                howSort={sort}
                onListSort={this.listSort}
                todos={todos}
              />
            ))}
          </Tab>
          <table className="todos">
            <thead>
              <tr>
                <th>완료</th>
                <th>제목</th>
                <th>내용</th>
                <th>중요도</th>
                <th>수정</th>
                <th>삭제</th>
              </tr>
            </thead>
            <tbody>
              {this.renderTodoList(todos, categories, sorts)}
            </tbody>
          </table>
          <footer className="footer">
            <div className="complete-all">
              <input
                className="custom-checkbox"
                type="checkbox"
                id="checked-all"
                onChange={this.allDone}
              />
              <label htmlFor="checked-all"> 전체 선택</label>
            </div>
            <div className="clear-completed">
              <button className="btn" onClick={this.clearDone}>
                Clear Done
              </button>
            </div>
            <div className="clear-all">
              <button className="btn" onClick={this.clearAll}>
                Clear All
              </button>
            </div>
          </footer>
        </div>
      </>
    );
  }
}