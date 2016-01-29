var React = require('react');
var ReactDOM = require('react-dom');
var update = require('react-addons-update');
var ToDoList = require('./ToDoList.jsx');
var AddToDoButton = require('./AddToDoButton.jsx');

var App = React.createClass({
	getInitialState: function(){
		return {todos: []};
	},
	_handleToDosChange: function(todos){
		localStorage.setItem('todos', JSON.stringify(todos));
		this.setState({todos: todos});
	},
	componentDidMount: function(){
		var savedToDos = localStorage.getItem('todos');
		if(savedToDos) this.setState({todos: JSON.parse(savedToDos)});
	},
	render: function(){
		console.log('render');
		
		return(
			<div className="todo-app">
				<h1>ToDo List</h1>
				<ToDoList todos={this.state.todos} onToDosChange={this._handleToDosChange} />
				<AddToDoButton todos={this.state.todos} onToDosChange={this._handleToDosChange} />
			</div>
		);
	}
});

ReactDOM.render(
	<App />,
	document.getElementById('content')
);//