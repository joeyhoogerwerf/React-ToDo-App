var React = require('react');
var update = require('react-addons-update');

var AddToDoButton = React.createClass({
	_createToDo: function(){
		console.log('ATDB: create todo...');
		//var savedToDos = JSON.parse(localStorage.getItem('todos'));
		//if(!savedToDos) savedToDos = [];

		var todos = update(this.props.todos, {
			$push: [
				{id: Date.now(), text: ''}
			]
		});

		this.props.onToDosChange(todos);



		//savedToDos.push({id: Date.now(), text: ''});
		//localStorage.setItem('todos', JSON.stringify(todos));
		//this.setState({todos: todos});
	},
	render: function(){
		return(
			<button onClick={this._createToDo}>Add ToDo</button>
		);
	}
});

AddToDoButton.propTypes = {
	todos: React.PropTypes.array
};

module.exports = AddToDoButton;