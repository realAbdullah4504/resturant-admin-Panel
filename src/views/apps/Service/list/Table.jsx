// import React from "react"
// // ** React Imports
import { Fragment, useState, useEffect } from 'react'

import axios from 'axios'

// import DataTable from "react-data-table-component"
// import { columns } from "./columns"
//import { users } from '../../../../users'

// // ** Invoice List Sidebar

// // ** Table Columns
// import { columns } from './columns'


// // ** Store & Actions
// import { getAllData, getData } from '../store'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers, getAllData } from '../store'

// // ** Third Party Components
// import Select from 'react-select'
// import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component';
import { columns } from './columns';
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

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss"
import "@styles/react/libs/tables/react-dataTable-component.scss"



// ** Table Header
const CustomHeader = ({ store, toggleInput, searchTerm, handleFilter }) => {
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
              onClick={toggleInput}
            >
              Add New Service
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  )
}



const ServiceList = () => {
  const dispatch = useDispatch();
  const store = useSelector(state => state.services);
  const [searchTerm, setSearchTerm] = useState('')
  const [inputOpen, setInputOpen] = useState(false)
  const [detail,setDetail]=useState({})


  const baseUrl=import.meta.env.VITE_REACT_APP_BASE_URL;
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    const filteredData = {
      ...detail,
      [name]: value,
    };
    console.log(filteredData);
    setDetail(filteredData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post(`${baseUrl}/service`,detail);
      console.log("data", data);

    } catch (error) {
      console.log("error", error);
    }
    setDetail({
      name:'',
      description:'',
    })
  };


  // ** Function to toggle form open
  const toggleInput = () => setInputOpen(!inputOpen)


  useEffect(() => {
    dispatch(getAllData())
    //console.log(store);
    //dispatch(getUsers({}));
    //   axios.get('https://ghani-soft.vercel.app/users').then(res=>console.log(res))
  }, [])


  // ** Function in get data on search query change
  const handleFilter = val => {
    setSearchTerm(val)
    console.log(val);

  }

  const dataToRender = () => {
    //console.log(store.services.length)
    if (store.services.length > 0) {
      return store.services
    } else if (store.services.length === 0) {
      return []
    }
  }

  // console.log(store.users);
  return (
    //  <h1>hi iam service</h1>

    <Fragment>
      <Card className="overflow-hidden">


        {inputOpen &&
          <form
           onSubmit={handleSubmit}
          >
            <label>name:</label>
            <input
              className="input-text"
              type="text"
              name="name"
              value={detail.name}
              onChange={handleChange}
              required
            />
            <label>description:</label>
            <input
              className="input-text"
              type="description"
              name="description"
              value={detail.description}
              onChange={handleChange}
              required
            />
            <input
              className="input-btn"
              type="submit"
            // value="send message"
            />
          </form>}


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
                toggleInput={toggleInput}
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
}
export default ServiceList 
