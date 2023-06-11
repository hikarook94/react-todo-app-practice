// Write your code
class Board extends React.Component {
  constructor(props) {
    super(props);
    const todos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : []
    this.state = {
      todos: todos,
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const todos = this.state.todos
    const todoIds = todos.map((todo) => todo.id)
    const nextId = todos.length ? Math.max(...todoIds) + 1 : 0
    const newTodo = {
      id: nextId,
      title: '',
      isDone: false,
      edit: true,
    }
    this.setState({todos: todos.concat(newTodo)});
  }
  handleDelete(event) {
    console.log('Board handleDelete', event.target);
    const newTodos = this.state.todos.filter(todo => todo.id !== 999)
    this.setState({todos: newTodos})
  }

  render() {
    return (
      <div>
        <h1>ToDoアプリ</h1>
        <TodoList todos={this.state.todos} onDelete={this.handleDelete}></TodoList>
        <button type="button" onClick={this.handleClick}>ToDoを追加</button>
      </div>
    )
  }
}

function TodoList(props) {
  const listItems = props.todos.map((todo) => 
    <ToDo key={todo.id} todo={todo} onDelete={props.onDelete}></ToDo>
  )
  return (
    <ul>{listItems}</ul>
  )
}

class ToDo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.todo.id,
      title: props.todo.title,
      edit: props.todo.edit,
      isDone: props.todo.isDone,
      onDelete: props.onDelete,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleChange(event) {
    this.setState({title: event.target.value})
  }
  handleSubmit() {
    this.setState({edit: false})
  }
  handleClick() {
    this.setState({edit: true})
  }
  handleCheck() {
    this.setState({isDone: !this.state.isDone})
  }
  handleDelete(todoId) {
    this.state.onDelete(todoId)
  }

  todoForm() {
    return (
      <form>
        <label>
          <input type="text" value={this.state.title} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" onClick={this.handleSubmit} />
      </form>
    )
  }
  todoTitle() {
    return (
      <div>
        <input type="checkbox" checked={this.state.isDone} onChange={this.handleCheck} />
        <span onClick={this.handleClick}>
          {this.state.title}
        </span>
        <button type="button" onClick={this.handleDelete}>削除</button>
      </div>
    )
  }

  render() {
    return (
      <li>{this.state.edit? this.todoForm() : this.todoTitle()}</li>
    );
  };
}

const domContainer = document.querySelector('#root');
const root = ReactDOM.createRoot(domContainer);
root.render(<Board />);
