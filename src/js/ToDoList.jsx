var React = require('react');
var update = require('react-addons-update');
var ToDoItem = require('./ToDoItem.jsx');

var ToDoList = React.createClass({
	_handleUpdateToDo: function(todo){
		console.log('updating todo...');
		var todos = update(this.props.todos, {
			[todo.index]: {
				$set: todo
			}
		});
		this.props.onToDosChange(todos);
	},
	_handleDeleteToDo: function(index){
		console.log('deleting todo...');
		var todos = update(this.props.todos, {
            $splice: [
                [index, 1]
            ]
        });
		this.props.onToDosChange(todos);
	},
	render: function(){

		var todos = this.props.todos.map(function(todo, i){
			return(
				<ToDoItem key={todo.id} index={i} id={todo.id} text={todo.text} handleUpdateToDo={this._handleUpdateToDo} handleDeleteToDo={this._handleDeleteToDo} />
			);
		}.bind(this));

		return(
			<ul className="todo-list">
				{todos}
			</ul>
		);
	}
});

ToDoList.propTypes = {
	todos: React.PropTypes.array
};

module.exports = ToDoList;