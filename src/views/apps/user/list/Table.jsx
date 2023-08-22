// import React from "react"
// // ** React Imports
import { Fragment, useState, useEffect } from 'react'

import DataTable from "react-data-table-component"
import { columns } from "./columns"
//import { users } from '../../../../users'

// // ** Invoice List Sidebar
// import Sidebar from './Sidebar'

// // ** Table Columns
// import { columns } from './columns'


// // ** Store & Actions
// import { getAllData, getData } from '../store'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../store'

// // ** Third Party Components
// import Select from 'react-select'
// import ReactPaginate from 'react-paginate'
// import DataTable from 'react-data-table-component'
// import { ChevronDown, Share, Printer, FileText, File, Grid, Copy } from 'react-feather'

// // ** Utils
// import { selectThemeColors } from '@utils'

// ** Reactstrap Imports
import {
  Row,
  Col,
  Input,
  Card,
  Button,
} from 'reactstrap'
import axios from "axios"

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss"
import "@styles/react/libs/tables/react-dataTable-component.scss"



// ** Table Header
const CustomHeader = ({store,searchTerm,handleFilter}) => {
  return (
    <div className='invoice-list-table-header w-100 me-1 ms-50 mt-2 mb-75'>
      <Row>
        <Col xl='6' className='d-flex align-items-center p-0'>
          <div className='d-flex align-items-center w-100'>
            <label htmlFor='rows-per-page'>Show</label>
            <Input
              className='mx-50'
              type='select'
              //id='rows-per-page'
              //value={rowsPerPage}
              //onChange={handlePerPage}
              style={{ width: '5rem' }}
            >
              <option value='10'>10</option>
              <option value='25'>25</option>
              <option value='50'>50</option>
            </Input>
            <label htmlFor='rows-per-page'>Entries</label>
          </div>
        </Col>
        <Col
          xl='6'
          className='d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1'
        >
          <div className='d-flex align-items-center mb-sm-0 mb-1 me-1'>
            <label className='mb-0' htmlFor='search-invoice'>
              Search:
            </label>
            <Input
              id='search-invoice'
              className='ms-50 w-100'
              type='text'
             value={searchTerm}
            onChange={e => handleFilter(e.target.value)}
            />
          </div>
          <div>
            <Button className='add-new-user' color='primary'
            // onClick={toggleSidebar}
            >
              Add New User
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  )
}



const UsersList = () => {
  const dispatch = useDispatch();
  const store = useSelector(state => state.users);
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    dispatch(getAllData())
    console.log('hit');
    //dispatch(getUsers({}));
    //   axios.get('https://ghani-soft.vercel.app/users').then(res=>console.log(res))
  }, [])

  
 // ** Function in get data on search query change
 const handleFilter = val => {
  setSearchTerm(val)
  console.log(val);
  // dispatch(
  //   getData({
  //     sort,
  //     q: val,
  //     sortColumn,
  //     page: currentPage,
  //     perPage: rowsPerPage,
  //     role: currentRole.value,
  //     status: currentStatus.value,
  //     currentPlan: currentPlan.value
  //   })
  //)
}

  const dataToRender = () => {
    if (store.users.length > 0) {
      return store.users
    } else if (store.users.length === 0) {
      return []
    }
  }

  // console.log(store.users);
  return (
    // <h1>hi iam user</h1>


    <Fragment>
      <Card className="overflow-hidden">
        <div className="react-dataTable">
          <DataTable
            noHeader
            subHeader
            sortServer
            pagination
            responsive
            columns={columns}
            data={dataToRender()}
            className="react-dataTable"
            subHeaderComponent={
              <CustomHeader 
              store={store}
              searchTerm={searchTerm}
              handleFilter={handleFilter}

              
              />
            }
          />
        </div>
      </Card>
    </Fragment>
  )

  //   <Card className='overflow-hidden'>
  //         <div className='react-dataTable'>
  //           <DataTable
  //             noHeader
  //             subHeader
  //             sortServer
  //             pagination
  //             responsive
  //             paginationServer
  //             columns={columns}
  //             onSort={handleSort}
  //             sortIcon={<ChevronDown />}
  //             className='react-dataTable'
  //             paginationComponent={CustomPagination}
  //             data={dataToRender()}
  //             subHeaderComponent={
  //               <CustomHeader
  //                 store={store}
  //                 searchTerm={searchTerm}
  //                 rowsPerPage={rowsPerPage}
  //                 handleFilter={handleFilter}
  //                 handlePerPage={handlePerPage}
  //                 toggleSidebar={toggleSidebar}
  //               />
  //             }
  //           />
}
export default UsersList
