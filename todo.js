// Write your code
class Board extends React.Component {
  constructor(props) {
    super(props);
    const todos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : []
    this.state = {
      todos: todos,
    };
    this.handleClick = this.handleClick.bind(this);
    console.log('Bord constructor');
  }

  handleClick() {
    const todos = this.state.todos
    const nextId = todos.length ? Math.max(this.state.todos.map((todo) => todo.id)) + 1 : 0
    const newTodo = {
      id: nextId,
      title: '',
      isDone: false,
      edit: true,
    }
    this.setState({todos: todos.concat(newTodo)});
  }

  render() {
    return (
      <div>
        <h1>ToDoアプリ</h1>
        <List todos={this.state.todos}></List>
        <button type="button" onClick={this.handleClick}>ToDoを追加</button>
      </div>
    )
  }
}

function List(props) {
  const listItems = props.todos.map((todo) => 
    <ToDo key={todo.id} todo={todo}></ToDo>
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
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
        <span onClick={this.handleClick}>
          {this.state.title}
        </span>
        <button type="button" >削除</button>
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
