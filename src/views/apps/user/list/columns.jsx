import { Form, FormGroup, Label, Input } from 'reactstrap'

export const columns = [
  {
    name: "User",
    // sortable: true,
    minWidth: "300px",
    sortField: "name",
    selector: (row) => row.name,
    cell: row => <span className='text-capitalize'>{row.name}</span>
  },
  {
    name: "Email",
    // sortable: true,
    minWidth: "172px",
    sortField: "email",
    selector: (row) => row.email,
    cell: row => <span className='text-capitalize'>{row.email}</span>
  },
  {
    name: "Message",
    minWidth: "138px",
    // sortable: true,
    sortField: "message",
    selector: (row) => row.message,
    cell: row => <span className='text-capitalize'>{row.message}</span>
  },
  {
    name: 'Status',
    minWidth: '100px',
    cell: row => (
    <FormGroup switch>
      <Input
        type="switch"
        checked={row.status}
         onClick={() => {
          console.log(row.status) 
          //setState(!row.status);
         }}
      />
    </FormGroup>
     )
  }
]
