// ** Reactstrap Imports
// import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
// ** Icons Imports
// import { Slack, User, Settings, Database, Edit2, MoreVertical, FileText, Trash2, Archive } from 'react-feather'
import Avatar from "@components/avatar";

const url = import.meta.env.VITE_REACT_APP_BASE_URL;

const renderClient = (row) => {
  if (row.image.length) {
    return <img src={`${url}/deals/${row.image}`} width="32" height="32" />;
  } else {
    return (
      <Avatar
        initials
        className="me-1"
        color={row.avatarColor || "light-primary"}
        content={row.fullName || "John Doe"}
      />
    );
  }
};

export const columns = [
  {
    name: "Name",
    sortable: true,
    minWidth: "350px",
    sortField: "name",
    selector: (row) => row.value,
    cell: (row) => {
      // console.log(row);
      return (
        <div className="d-flex align-items-center">
          {/* {renderClient(row)} */}
          <div className="d-flex  flex-column">
            <div className="user_name text-truncate text-body ">
              <span className="fw-bolder ">{row.value}</span>
            </div>
            {/* <small className='text-truncate text-muted mb-0'>{row.category.value}</small> */}
          </div>
        </div>
      );
    },
  },
  {
    name: "Label",
    sortable: true,
    minWidth: "350px",
    sortField: "label",
    selector: (row) => row.label,
    cell: (row) => {
      // console.log(row);
      return (
        <div className="d-flex align-items-center">
          {/* {renderClient(row)} */}
          <div className="d-flex  flex-column">
            <div className="user_name text-truncate text-body ">
              <span className="fw-bolder ">{row.label}</span>
            </div>
            {/* <small className='text-truncate text-muted mb-0'>{row.category.value}</small> */}
          </div>
        </div>
      );
    },
  },
  
  // {
  //   name: 'Actions',
  //   minWidth: '100px',
  //   cell: row => (
  //     <div className='column-action'>
  //       <UncontrolledDropdown>
  //         <DropdownToggle tag='div' className='btn btn-sm'>
  //           <MoreVertical size={14} className='cursor-pointer' />
  //         </DropdownToggle>
  //         <DropdownMenu>
  //           <DropdownItem
  //             // tag={Link}
  //             className='w-100'
  //           // to={`/apps/user/view/${row.id}`}
  //           // onClick={() => store.dispatch(getUser(row.id))}
  //           >
  //             <FileText size={14} className='me-50' />
  //             <span className='align-middle'>Details</span>
  //           </DropdownItem>
  //           <DropdownItem tag='a' href='/' className='w-100'
  //             onClick={e => e.preventDefault()}
  //           >
  //             <Archive size={14} className='me-50' />
  //             <span className='align-middle'>Edit</span>
  //           </DropdownItem>
  //           <DropdownItem
  //             tag='a'
  //             href='/'
  //             className='w-100'
  //             onClick={e => {
  //               e.preventDefault()
  //               // store.dispatch(deleteUser(row.id))
  //               //console.log(row._id);
  //               handleDelete(row._id)
  //             }}
  //           >
  //             <Trash2 size={14} className='me-50' />
  //             <span className='align-middle'>Delete</span>
  //           </DropdownItem>
  //         </DropdownMenu>
  //       </UncontrolledDropdown>
  //     </div>
  //   )
  // }
];
