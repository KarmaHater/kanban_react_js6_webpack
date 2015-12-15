import React from 'react';
import Note from './Note.jsx';

export default class Notes extends React.Component { 
	constructor(props) {
		super(props)
	}

	render() {
		const notes = this.props.items;
		return <ul className="notes">{ notes.map((note) => this.renderNote(note)) }</ul>;
  }

  renderNote(note) {
		return (
			<li className="note" key={note.id}>
	     	<Note task={note.task} onEdit={ this.props.onEdit } onDelete={this.props.onDelete} id={note.id}/>
	    </li>
		); 
	}
}

