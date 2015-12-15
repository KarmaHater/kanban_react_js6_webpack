import uuid from 'node-uuid';
import alt from '../libs/alt';
import NoteActions from '../actions/NoteActions';
require('array.prototype.findindex');

class NoteStore { 
	constructor() {
		this.bindActions(NoteActions);
	  this.notes = [
        {
          id: uuid.v4(),
          task: 'Learn Webpack'
        },
        {
          id: uuid.v4(),
          task: 'Learn React'
        },
        {
          id: uuid.v4(),
          task: 'Do laundry'
        }
      ];
  }

  create(note) {
  	console.log("store creating note")

  	const notes = this.notes;
  	note.id = uuid.v4();
  	this.setState({
	  	notes: notes.concat(note)
  	});
  }

  update({id, task}) {
  	console.log("store updating note" + ' ' + id + ' ' + task)
  	let notes = this.notes;
  	const noteIndex = this.findNote(id);

  	if (noteIndex < 0) return;

  	notes[noteIndex].task = task;
  	this.setState({notes});
	} 

	delete(id) {
  	console.log("store deleting note" + ' ' + id)

		const notes = this.notes;
		const noteIndex = this.findNote(id);
		if (noteIndex < 0) return;
		this.setState({
			notes: notes.slice(0, noteIndex).concat(notes.slice(noteIndex + 1))
		})
	} 

	findNote(id) {
		console.log('finding note' + ' ' + id)
		const notes = this.notes
		const noteIndex = notes.findIndex((note) => note.id === id);
		if (noteIndex < 0) {
			console.warn('Failed to find note', notes, id);
		};
		return noteIndex
	}
}

export default alt.createStore(NoteStore, 'NoteStore');
