// Write your code
class Board extends React.Component {
  constructor(props) {
      console.log('test');
    super(props);
  }

  render() {
    return (
      <h1>Hello, World!</h1>
    )
  }
}
class ToDo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {}
}
const domContainer = document.querySelector('#root');
const root = ReactDOM.createRoot(domContainer);
root.render(<Board />);
