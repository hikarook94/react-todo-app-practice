class Board extends React.Component {
  constructor(props) {
    super(props);
    const todos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
    this.state = {
      todos: todos,
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  saveTodos() {
    localStorage.setItem('todos', JSON.stringify(this.state.todos));
  }

  handleClick() {
    const todos = this.state.todos;
    const todoIds = todos.map((todo) => todo.id);
    const nextId = todos.length ? Math.max(...todoIds) + 1 : 0;
    const newTodo = {
      id: nextId,
      title: '',
      isEditing: true,
      isDone: false,
    };
    this.setState({ todos: todos.concat(newTodo) });
  }
  handleDelete(removeId) {
    const newTodos = this.state.todos.filter((todo) => todo.id !== removeId);
    this.setState({ todos: newTodos }, this.saveTodos);
  }
  handleUpdate(updatedTodo) {
    const newTodos = this.state.todos.map((todo) =>
      todo.id === updatedTodo.id ? updatedTodo : todo
    );
    this.setState({ todos: newTodos }, this.saveTodos);
  }

  render() {
    return (
      <div>
        <h1>ToDoアプリ</h1>
        <TodoList
          todos={this.state.todos}
          onDelete={this.handleDelete}
          onUpdate={this.handleUpdate}
        ></TodoList>
        <button type="button" onClick={this.handleClick}>
          ToDoを追加
        </button>
      </div>
    );
  }
}

function TodoList(props) {
  const listItems = props.todos.map((todo) => (
    <Todo key={todo.id} todo={todo} onDelete={props.onDelete} onUpdate={props.onUpdate}></Todo>
  ));
  return <ul className="todo-list">{listItems}</ul>;
}

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.todo.title,
      isEditing: props.todo.isEditing,
      isDone: props.todo.isDone,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
  }

  handleChange(event) {
    this.setState({ title: event.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();
    this.setState({ isEditing: false });
    this.updateTodo({ isEditing: false });
  }
  handleClick() {
    this.setState({ isEditing: true });
    this.updateTodo({ isEditing: false });
  }
  handleCheck() {
    this.setState({ isDone: !this.state.isDone });
    this.updateTodo({ isDone: !this.state.isDone });
  }
  handleDelete() {
    this.props.onDelete(this.props.todo.id);
  }
  updateTodo(updatedValue) {
    const newTodo = { ...this.state, ...updatedValue, id: this.props.todo.id };
    this.props.onUpdate(newTodo);
  }

  todoForm() {
    return (
      <form className="add-todo-form">
        <label>
          <input
            type="text"
            value={this.state.title}
            onChange={this.handleChange}
            className="add-todo-input"
          />
        </label>
        <input type="submit" value="追加" onClick={this.handleSubmit} className="add-todo-btn" />
      </form>
    );
  }
  todoTitle() {
    return (
      <div>
        <input
          type="checkbox"
          checked={this.state.isDone}
          onChange={this.handleCheck}
          className="checkbox"
        />
        <span onClick={this.handleClick} className={`task ${this.state.isDone ? 'completed' : ''}`}>
          {this.state.title}
        </span>
        <button type="button" onClick={this.handleDelete} className="delete-btn">
          削除
        </button>
      </div>
    );
  }

  render() {
    return (
      <li className="todo-item">{this.state.isEditing ? this.todoForm() : this.todoTitle()}</li>
    );
  }
}

const domContainer = document.querySelector('#root');
const root = ReactDOM.createRoot(domContainer);
root.render(<Board />);
