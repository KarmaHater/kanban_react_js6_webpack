import React from 'react';

export default class Note extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			editing: false
		};
	}
  render() {
  	const editing = this.state.editing;
    return (
	    <div>
	    	{editing ? this.renderEdit() : this.renderTask()}
	    </div>
		);
	}

  renderEdit() {
		return (
			<div>
				<input type="text"
					id={this.props.id}
					autoFocus={true}
					defaultValue={this.props.task}
					onBlur={ (e) => this.finishEdit(e) }
					onKeyPress={ (e) => this.checkEnter(e) }
				 />
			</div>
		);  	
  }

  renderTask() {
  	return (
			<div>
				<span onClick={ ()=> this.edit() } >{this.props.task}</span>
				{this.renderDelete(this.props.id)}
			</div>
  	);
  }

  renderDelete(id) {
  	return <button className="delete" onClick={this.props.onDelete.bind(null, id)}>x</button>;
  }

  edit() {
  	this.setState({
  		editing: true
  	});
  }

  checkEnter(e) {
  	if (e.key === "Enter") {
			this.finishEdit(e) 
  	};
  }

  finishEdit(e) {
  	this.props.onEdit(this.props.id, e.target.value);
  	this.setState({
  		editing: false 
  	});
  }
}