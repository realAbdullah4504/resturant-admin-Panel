// ** Reactstrap Imports
// import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
// ** Icons Imports
// import { Slack, User, Settings, Database, Edit2, MoreVertical, FileText, Trash2, Archive } from 'react-feather'
import Avatar from "@components/avatar";

const url = import.meta.env.VITE_REACT_APP_BASE_URL;
import TooltipBasic from "../../../../components/TooltipBasic";

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
    name: "Title",
    sortable: true,
    minWidth: "150px",
    sortField: "title",
    selector: (row) => row.title,
    cell: (row) => {
      // console.log(row);
      return (
        <span className="text-capitalize">{row.title}</span>
      );
    },
  },
  {
    name: "Category",
    sortable: true,
    minWidth: "172px",
    height: "200px",
    sortField: "categoryId.value",
    selector: (row) => row.categoryId.value,
    cell: (row) => (
      <span className="text-capitalize">{row.categoryId.value}</span>
    ),
  },
  {
    name: "Description",
    sortable: true,
    minWidth: "250px",
    height: "200px",
    sortField: "description",
    selector: (row) => row.description,
    cell: (row) => (
    <TooltipBasic id={row._id} className="text-capitalize" children={row.description}></TooltipBasic>
    ),
  },
  {
    name: "Price",
    sortable: true,
    minWidth: "172px",
    sortField: "price",
    selector: (row) => row.price,
    cell: (row) => <span className="text-capitalize">{row.price}</span>,
  },
  {
    name: "size",
    sortable: true,
    minWidth: "172px",
    sortField: "size.value",
    selector: (row) => row.size.value,
    cell: (row) => <span className="text-capitalize">{row.size.value}</span>,
  },
  {
    name: "type",
    sortable: true,
    minWidth: "172px",
    sortField: "typevalue",
    selector: (row) => row.type.value,
    cell: (row) => <span className="text-capitalize">{row.type.value}</span>,
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
