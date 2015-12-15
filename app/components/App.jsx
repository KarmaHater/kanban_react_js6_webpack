// import AltContainer from 'alt-container';
import React from 'react';
import Notes from './Notes.jsx';
import NoteActions from '../actions/NoteActions.js';
import NoteStore from '../stores/NoteStore';
import AltContainer from 'alt-container';

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = NoteStore.getState();
	}

	componentDidMount() {
		console.log("cdm")
		NoteStore.listen( ()=> this.storeChange );
	}

	componentWillMount() {
		console.log("cwm")
		NoteStore.unlisten( ()=> this.storeChange );
	}

	storeChange() {
		console.log("store change")
		this.setState( state );
	}

	render() {
		const notes = this.state.notes
		return ( 
			<div>
				<button className="add-note" onClick={ () => this.addNote() } >+</button>
			    <AltContainer 
			    	stores={[NoteStore]}
	          inject={{
	            items: () => NoteStore.getState().notes
	          }}>
    				<Notes onEdit={this.editNote} onDelete={this.deleteNote} />
    			</AltContainer>

	    </div>
		); 
	}

	addNote() {
		console.log('app adding note')
		NoteActions.create({
			task: 'New Task'
		});
	}

	editNote(id, task) {
		console.log('app editing note' + ' ' + id + ' ' + task)
		NoteActions.update({ id, task });
 	}

	deleteNote(id) {
		console.log('app deleting note' + ' ' + id)
		NoteActions.delete(id);
	}

}

