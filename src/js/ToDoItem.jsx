var React = require('react');
var update = require('react-addons-update');

var ToDoItem = React.createClass({
	_handleUpdateToDo: function(e){
		var todo = update(this.props, {
             text: {$set: e.target.value}
		});
		this.props.handleUpdateToDo(todo);
	},
	_handleDeleteToDo: function(){
		this.props.handleDeleteToDo(this.props.index);
	},
	render: function(){
		return(
			<li>
				<input type="text" placeholder="Type something.." key={this.props.id} value={this.props.text} onChange={this._handleUpdateToDo} />					
				<button onClick={this._handleDeleteToDo}>x</button>
			</li>
		);
	}
});

ToDoItem.propTypes = {
	handleUpdateToDo: React.PropTypes.func,
	handleDeleteToDo: React.PropTypes.func,
	id: React.PropTypes.number,
	text: React.PropTypes.string
};

module.exports = ToDoItem;