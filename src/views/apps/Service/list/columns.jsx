// ** Reactstrap Imports
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
// ** Icons Imports
import { Slack, User, Settings, Database, Edit2, MoreVertical, FileText, Trash2, Archive } from 'react-feather'


import axios from 'axios'
const baseUrl=import.meta.env.VITE_REACT_APP_BASE_URL;

const handleDelete=async (id)=>{
  const deleteData=await axios.delete(`${baseUrl}/service/${id}`)
  console.log('delete',deleteData);

}

export const columns = [
  {
    name: "Name",
    sortable: true,
    minWidth: "300px",
    sortField: "name",
    selector: (row) => row.name,
    cell: row => <span className='text-capitalize'>{row.name}</span>
  },
  {
    name: "Description",
    sortable: true,
    minWidth: "172px",
    sortField: "description",
    selector: (row) => row.description,
    cell: row => <span className='text-capitalize'>{row.description}</span>
  },
  {
    name: 'Actions',
    minWidth: '100px',
    cell: row => (
      <div className='column-action'>
        <UncontrolledDropdown>
          <DropdownToggle tag='div' className='btn btn-sm'>
            <MoreVertical size={14} className='cursor-pointer' />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem
              // tag={Link}
              className='w-100'
            // to={`/apps/user/view/${row.id}`}
            // onClick={() => store.dispatch(getUser(row.id))}
            >
              <FileText size={14} className='me-50' />
              <span className='align-middle'>Details</span>
            </DropdownItem>
            <DropdownItem tag='a' href='/' className='w-100'
              onClick={e => e.preventDefault()}
            >
              <Archive size={14} className='me-50' />
              <span className='align-middle'>Edit</span>
            </DropdownItem>
            <DropdownItem
              tag='a'
              href='/'
              className='w-100'
              onClick={e => {
                e.preventDefault()
                // store.dispatch(deleteUser(row.id))
                //console.log(row._id);
                handleDelete(row._id)
              }}
            >
              <Trash2 size={14} className='me-50' />
              <span className='align-middle'>Delete</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    )
  }
]
