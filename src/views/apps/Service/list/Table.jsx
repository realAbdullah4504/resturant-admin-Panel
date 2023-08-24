// import React from "react"
// // ** React Imports
import { Fragment, useState, useEffect } from "react";

import axios from "axios";
import { ChevronDown, Edit, Trash } from "react-feather";
import ModalMain from "../../../../components/ModalMain";
import { FormDataSetting } from "../../../../formSettings";
import { Modal, ModalHeader } from "reactstrap";
const url = import.meta.env.VITE_REACT_APP_BASE_URL;
import CommonModal from "../../../../components/CommonModal";
// import DataTable from "react-data-table-component"
// import { columns } from "./columns"
//import { users } from '../../../../users'

// // ** Invoice List Sidebar

// // ** Table Columns
// import { columns } from './columns'

// // ** Store & Actions
// import { getAllData, getData } from '../store'
import { useDispatch, useSelector } from "react-redux";
import { getAllData } from "../store";
import { getCategoriesOptions } from "../../CategoryOptions/store";

// // ** Third Party Components
// import Select from 'react-select'
// import ReactPaginate from 'react-paginate'
import DataTable from "react-data-table-component";
import { columns } from "./columns";
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

const initialState = {
  categoryId: "",
  title: "",
  description: "",
  price: "",
  type: "",
  size: "",
  image: "",
  status: "",
};

// ** Table Header
const CustomHeader = ({
  setDetail,
  setEdit,
  clickHandlerCancel,
  searchTerm,
  handleFilter,
  setFile,
  setPreview,
  setErrorMessage,
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
          <div className="d-flex align-items-center mb-sm-0 mb-1 me-1"></div>
          <div>
            <Button
              className="add-new-user"
              color="primary"
              onClick={() => {
                clickHandlerCancel();

                setEdit(false);
                setDetail(initialState);

                setPreview("");
                setFile({});
                setErrorMessage({});
              }}
            >
              Add New Menu
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

const ServiceList = () => {
  const dispatch = useDispatch();
  const deals = useSelector((state) => state.deals.deals);
  const categoryOptions = useSelector(
    (state) => state.categories.categoryOptions
  );
  const options = categoryOptions.map((option) => ({
    value: option.value,
    label: option.label,
  }));
  // console.log("categories", categoryOptions);

  const [searchTerm, setSearchTerm] = useState("");
  const [inputOpen, setInputOpen] = useState(false);
  const [detail, setDetail] = useState();
  const [edit, setEdit] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [file, setFile] = useState({});

  const [formModal, setFormModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState("");
  const [errorMessage, setErrorMessage] = useState([]);

  const clickHandlerCancel = () => {
    setFormModal(!formModal);
  };

  useEffect(() => {
    dispatch(getAllData());
    dispatch(getCategoriesOptions());

    console.log("dsdsd");
    //dispatch(getUsers({}));
    //   axios.get('https://ghani-soft.vercel.app/users').then(res=>console.log(res))
  }, [refresh]);

  // ** Function to toggle form open
  // const toggleInput = () => setInputOpen(!inputOpen)

  const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

  const handleChange = (name, value, type) => {
    //  console.log('name',name,'value',value);
    if (type !== "file") {
      const filteredData = {
        ...detail,
        [name]: value,
      };
      setErrorMessage({ ...errorMessage, [name]: "" });
      setDetail(filteredData);
    } else {
      setErrorMessage({ ...errorMessage, [name]: "" });
      setFile(value);
      setPreview(URL.createObjectURL(value));
    }

    //  console.log("detail", detail, "file", file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const category = detail.category;
    let id = "";
    if (detail?.categoryId?.value) {
      id =
        categoryOptions?.find(
          (item) => item?.value === detail?.categoryId?.value
        )._id || "";
    }

    // console.log(id)
    const formData = new FormData();
    formData.append("image", file);
    formData.append("categoryId", id);

    // console.log("detal", detail);

    for (const key in detail) {
      if (key !== "categoryId" && key !== "size" && key !== "type") {
        formData.append(key, detail[key]);
      } else if (key !== "categoryId") {
        formData.append(key, JSON.stringify(detail[key]));
        // }
      }
    }
    // console.log(formData);
    const image = edit === true ? preview : file.name || "";
    // console.log(file);
    const { isValid, error } = validation(
      { ...detail, image },
      FormDataSetting?.form
    );
    // console.log(error);
    setErrorMessage(error);

    if (isValid) {
      setIsLoading(true);
      try {
        let data = {};
        // if (edit === false) data = await axios.post(`${baseUrl}/deals`, detail)
        if (edit === false) {
          data = await axios.post(`${baseUrl}/deals`, formData);
          // console.log(data.data.filename);

          // data = await axios.post(`${baseUrl}/deals`, formData);
          // console.log({ ...detail, image: file });
        } else {
          const response = await axios.patch(
            `${baseUrl}/deals/${detail._id}`,
            formData
          );
          // console.log(response.data);

          setEdit(false);

          // data = await axios.patch(`${baseUrl}/deals/${detail._id}`, detail);
          // setEdit(false);
        }
        handleToast("success", "Successfully Submitted");
        setRefresh(!refresh);
        clickHandlerCancel();
        setIsLoading(false);
        // console.log("data", data);
      } catch (error) {
        console.error("error", error);
        handleToast("error", "Error While submitting");
        setIsLoading(false);
      }
    }
  };
  const handleDelete = async (id) => {
    setIsLoading(true);
    try {
      const deleteData = await axios.delete(`${baseUrl}/deals/${id}`);
      setRefresh(!refresh);
      setDeleteModal(!deleteModal);
      handleToast("success", "Successfully Deleted");
      setIsLoading(false);
      // console.log("delete", deleteData);
    } catch (error) {
      handleToast("success", "Error While Deleting");
      setIsLoading(false);
      // console.log("error", error);
    }
  };

  // ** Function in get data on search query change
  const handleFilter = (val) => {
    setSearchTerm(val);
    // console.log(val);

    //  const search=()=>{
    //   if (store.deals.length > 0) {
    //     if (searchTerm.trim() === "") {
    //       return(store.deals);
    //     } else {
    //       return store.deals.filter((deal) => {
    //         const dealValues = Object.values(deal).join(" ").toLowerCase();
    //         return dealValues.includes(searchTerm.toLowerCase());
    //       });
    //     }
    //  }
    //  console.log(search())
  };

  const dataToRender = () => {
    if (deals.length > 0) {
      if (searchTerm.trim() === "") {
        return deals;
      } else {
        return filteration(deals, searchTerm);
      }
    } else if (deals.length === 0) {
      return [];
    }
    console.log(deals);
  };

  const updatedColumns = [
    ...columns,

    {
      name: "Image",
      sortable: true,
      minWidth: "200px",
      sortField: "preview",
      selector: (row) => row.price,
      cell: (row) => (
        <div
          className="d-flex align-items-center permissions-actions "
          style={{ cursor: "pointer" }}
        >
          <h6
            onClick={() => {
              setOpen(!open);
              setPreview(row.image);
            }}
            color="primary"
          >
            Click to see Image
          </h6>
        </div>
      ),
    },
    {
      name: "Actions",
      cell: (row) => {
        return (
          <div className="d-flex align-items-center permissions-actions">
            <div
              className="button-container"
              onClick={() => {
                clickHandlerCancel();
                setDetail(row);
                // console.log(row);
                setEdit(true);
                setErrorMessage({});
                setPreview(`${url}/deals/${row.image}`);
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
            {/* </Button> */}
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
        {/* {inputOpen && */}
        <ModalMain
          // blurHandler={blurHandler}
          heading="Menu"
          isLoading={isLoading}
          clickHandlerSubmit={handleSubmit}
          clickHandlerCancel={clickHandlerCancel}
          formModal={formModal}
          buttonText={edit ? "Update" : "Submit"}
          buttonColour="primary"
          Component={
            <CommonModal
              changeHandler={handleChange}
              errorMessage={errorMessage}
              // blurHandler={blurHandler}
              value={detail}
              formSetting={FormDataSetting?.form}
              selectOptions={options}
              mainType="deals"
              // preview={edit ? `${url}/deals/${preview}` : preview}
              preview={preview}
            />
          }
          // buttonDisabled={!validation(detail, FormDataSetting?.form)}
          // buttonDisabled={false}
        />

        <ModalMain
          formModal={deleteModal}
          // heading="Delete"
          isLoading={isLoading}
          clickHandlerCancel={() => {
            setDeleteModal(!deleteModal);
          }}
          clickHandlerSubmit={() => handleDelete(deleteId)}
          buttonColour="danger"
          buttonText="Delete"
          Component={
            <p className="ms-2 " style={{ color: "red" }}>
              Are You Sure Want To Delete
            </p>
          }
        />

        <Modal
          isOpen={open}
          toggle={() => {
            setOpen(!open);
          }}
          className="modal-dialog-centered"
        >
          <ModalHeader
            toggle={() => {
              setOpen(!open);
            }}
          >
            Image
          </ModalHeader>
          <img src={`${url}/deals/${preview}`} />
        </Modal>

        <div className="react-dataTable">
          <DataTable
            noHeader
            subHeader
            // sortServer
            pagination
            responsive
            columns={updatedColumns}
            data={dataToRender()}
            className="react-dataTable"
            subHeaderComponent={
              <CustomHeader
                setDetail={setDetail}
                setEdit={setEdit}
                clickHandlerCancel={clickHandlerCancel}
                deals={deals}
                searchTerm={searchTerm}
                handleFilter={handleFilter}
                setFile={setFile}
                file={file}
                setErrorMessage={setErrorMessage}
                setPreview={setPreview}
              />
            }
          />
        </div>
      </Card>
    </Fragment>
  );
};
export default ServiceList;
