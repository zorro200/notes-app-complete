import { Note } from './Note'
import { Table } from 'react-bootstrap'

export default function Notes ({ notes, toggleImportant }) {
  return (
    <Table>
      {
        notes.map(
          note => <Note key={note.id} note={note} toggleImportant={toggleImportant} />
        )
      }
    </Table>
  )
}
