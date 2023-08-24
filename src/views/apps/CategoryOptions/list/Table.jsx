// import React from "react"
// // ** React Imports
import { Fragment, useState, useEffect } from "react";

import axios from "axios";
import { ChevronDown, Edit, Trash } from "react-feather";
import ModalMain from "../../../../components/ModalMain";
import { FormDataSetting } from "../../../../formSettings";
import { Modal, ModalHeader } from "reactstrap";
const url = import.meta.env.VITE_REACT_APP_BASE_URL;
// import DataTable from "react-data-table-component"
import { columns } from "./columns";
//import { users } from '../../../../users'
import CommonModal from "../../../../components/CommonModal";

// // ** Invoice List Sidebar

// // ** Table Columns
// import { columns } from './columns'

// // ** Store & Actions
// import { getAllData, getData } from '../store'
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesOptions } from "../store";

// // ** Third Party Components
// import Select from 'react-select'
// import ReactPaginate from 'react-paginate'
import DataTable from "react-data-table-component";
// import { columns } from "./columns";
// import { ChevronDown, Share, Printer, FileText, File, Grid, Copy } from 'react-feather'

// // ** Utils
// import { selectThemeColors } from '@utils'

// ** Reactstrap Imports
import { Row, Col, Input, Card, Button } from "reactstrap";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import {
  filteration,
  handleToast,
  validation,
} from "../../../../utils/helpers";

// ** Table Header
const CustomHeader = ({
  setCategory,
  setEdit,
  clickHandlerCancel,
  searchTerm,
  handleFilter,
}) => {
  return (
    <div className="invoice-list-table-header w-100 me-1 ms-50 mt-2 mb-75">
      <Row>
        <Col xl="4" className="d-flex align-items-center p-0">
          <label className="mb-0" htmlFor="search-invoice">
            Search:
          </label>
          <Input
            id="search-invoice"
            className="ms-50 w-100"
            type="text"
            value={searchTerm}
            onChange={(e) => handleFilter(e.target.value)}
          />
        </Col>
        <Col
          xl="8"
          className="d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1"
        >
          <div className="d-flex align-items-center mb-sm-0 mb-1 me-1">
            <div>
              <Button
                className="add-new-user"
                color="primary"
                onClick={() => {
                  clickHandlerCancel();
                  setEdit(false);
                  setCategory({
                    value: "",
                    label: "",
                  });
                }}
              >
                Add New Category
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

const ServiceList = () => {
  const dispatch = useDispatch();
  const categoryOptions = useSelector(
    (state) => state.categories.categoryOptions
  );
  // const options = categoryOptions.map((option) => ({
  //   value: option.value,
  //   label: option.label,
  // }));
  // console.log("categories", categoryOptions);

  const [searchTerm, setSearchTerm] = useState("");
  const [inputOpen, setInputOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [file, setFile] = useState({});

  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  const [formModal, setFormModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState("");
  const [category, setCategory] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState([]);

  const clickHandlerCancel = () => {
    setFormModal(!formModal);
  };

  useEffect(() => {
    dispatch(getCategoriesOptions());

    console.log("hit");
  }, [refresh]);

  const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

  const handleChange = (name, value, type) => {
    // console.log("name", name, "value", value);
    const filteredData = {
      ...category,
      [name]: value,
    };
    setErrorMessage({ ...errorMessage, [name]: "" });
    setCategory(filteredData);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("edit", edit);

    const { isValid, error } = validation(category, FormDataSetting?.form);
    // console.log(error);
    setErrorMessage(error);

    if (isValid) {
      setIsLoading(true);
      try {
        let data = {};
        if (edit === false) {
          const data = await axios.post(`${baseUrl}/category`, category);
          // console.log(data.data.filename);
        } else {
          const response = await axios.patch(
            `${baseUrl}/category/${category._id}`,
            category
          );
          setEdit(false);
        }

        setRefresh(!refresh);
        clickHandlerCancel();
        handleToast("success", "Successfully Submitted");
        setIsLoading(false);
        // console.log("data", data);
      } catch (error) {
        // console.log("error", error);
        handleToast("error", "Error While Submitting");
        setIsLoading(false);
      }
    }
  };
  const handleDelete = async (id) => {
    setIsLoading(true);
    try {
      const deleteData = await axios.delete(`${baseUrl}/category/${id}`);
      setRefresh(!refresh);
      setDeleteModal(!deleteModal);
      handleToast("success", "Successfully Deleted");
      setIsLoading(false);
      // console.log("delete", deleteData);
    } catch (error) {
      handleToast("error", "Error While Deleting");
      setIsLoading(false);
      console.log("error", error);
    }
  };

  // ** Function in get data on search query change
  const handleFilter = (val) => {
    setSearchTerm(val);
    // console.log(val);
  };

  const dataToRender = () => {
    // console.log(store)
    if (categoryOptions.length > 0) {
      return filteration(categoryOptions, searchTerm);
    } else if (categoryOptions.length === 0) {
      return [];
    }
  };

  const updatedColumns = [
    ...columns,
    {
      name: "Actions",
      cell: (row) => {
        return (
          <div className="d-flex align-items-center permissions-actions">
            <div
              className="button-container"
              onClick={() => {
                clickHandlerCancel();
                setCategory(row);
                // console.log(row);
                setEdit(true);
              }}
            >
              <Edit
                style={{ stroke: "#7367f0", cursor: "pointer" }}
                className="font-medium-2"
              />
            </div>
            <div
              className="button-container"
              onClick={() => {
                setDeleteModal(!deleteModal);
                //handleDelete(row._id)
                setDeleteId(row._id);
              }}
            >
              <Trash
                style={{ stroke: "red", cursor: "pointer" }}
                className="font-medium-2"
              />
            </div>
          </div>
        );
      },
    },
  ];
  //  console.log(FormData);

  return (
    //  <h1>hi iam service</h1>

    <Fragment>
      <Card className="overflow-hidden">
        <ModalMain
          heading="Category"
          isLoading={isLoading}
          clickHandlerSubmit={handleSubmit}
          clickHandlerCancel={clickHandlerCancel}
          formModal={formModal}
          edit={edit}
          Component={
            <CommonModal
              mainType="options"
              changeHandler={handleChange}
              errorMessage={errorMessage}
              value={category}
              formSetting={FormDataSetting?.form}
            />
          }
        />
        <ModalMain
          formModal={deleteModal}
          msg="Are you Sure Want to Delete"
          clickHandlerCancel={() => {
            setDeleteModal(!deleteModal);
          }}
          clickHandlerSubmit={() => handleDelete(deleteId)}
          isLoading={isLoading}
          buttonColour="danger"
          buttonText="Delete"
          Component={
            <p className="ms-2" style={{ color: "red" }}>
              Are You Sure Want To Delete
            </p>
          }
        />

        {/* <h1>table</h1> */}
        <div className="react-dataTable">
          <DataTable
            noHeader
            subHeader
            sortServer
            pagination
            responsive
            columns={updatedColumns}
            data={dataToRender()}
            className="react-dataTable"
            subHeaderComponent={
              <CustomHeader
                setCategory={setCategory}
                setEdit={setEdit}
                clickHandlerCancel={clickHandlerCancel}
                categoryOptions={categoryOptions}
                searchTerm={searchTerm}
                handleFilter={handleFilter}
              />
            }
          />
        </div>
      </Card>
    </Fragment>
  );
};
export default ServiceList;
