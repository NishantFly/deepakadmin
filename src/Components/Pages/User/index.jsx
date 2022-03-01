import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import HOC from "../../../Common/Hoc";
import { Card, Grid, Button } from "@material-ui/core";
//pagination
import TablePagination from "@material-ui/core/TablePagination";
import Loder from "../../Loder/Loder";
import { getBaseUrl } from "../../utils";
import { blankValidator, showNotificationMsz } from "../../utils/Validation";
import axios from "axios";

//DIALOG BOX
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
} from "@material-ui/core";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function User(props) {
  const [isupdated, setisupdated] = useState(false);
  const [isloading, setisloading] = useState(false);
  const [userDataArray, setuserDataArray] = useState([]);
  const [EditDailogOpen, setEditDailogOpen] = useState("");
  const [EditcategoryName, setEditcategoryName] = useState(false);
  const [EditId, setEditId] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    window.scrollTo(0, 0);

    let url = getBaseUrl() + "api/getalluser";
     setisloading(true);

    let config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    axios
      .get(url,config)
      .then(
        (res) => {
          setisloading(false);
          setuserDataArray(res.data.getalluser);
           console.log("data userfefef:::", res.data.getalluser);

        },



        (error) => {
          setisloading(false);
          console.log("data response error:::", error);
        }
      )
      .catch((e) => {
        setisloading(false);
        console.log("data response error:::", e);
      });




  }, [isupdated]);

         ///delete
   const deleteUser = (row) => {
    let id = row._id;
    let url = getBaseUrl() + `deleteuserbyid/${id}`
    
  


    axios
      .delete(url)
      .then(
        (res) => {
          console.log("data response:::", res);
          setisupdated(!isupdated); 
        },

        (error) => {
          console.log("data response error:::", error);
          showNotificationMsz(error, "danger");
        }
      )
      .catch((e) => {
        console.log("data response error:::", e);
        showNotificationMsz(e, "danger");
      });
  };
 
  // for pagination hadler
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);

  const handleChangePage = (event, newPage) => {
    window.scrollTo(0, 0);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  

    const [titlename, settitlename] = useState("");
    const filterData = userDataArray.filter((event) => {
    return (
      event.username?.toLowerCase().indexOf(titlename.toLowerCase()) !== -1
    );
  });

  const classes = useStyles();

  return (
    <>
      <div className="home_padding">
        <div className="content_padding">
          <Grid className="Component_main_grid mb-3">
            <Grid item md={9}>
              <h3 className="mb-2">Users</h3>
               <button
                type="button"
                class="btn btn-info mr-4"
                onClick={() => props.history.push("/otp/send")}
              >
                <i class="fa fa-plus"></i> Add
              </button> 
              <button
                type="button"
                class="btn btn-info mr-4"
                onClick={() => props.history.push("/user/login")}
              >
                <i class="fa fa-plus"></i> Login
              </button> 
              <button
                type="button"
                class="btn btn-info mr-4"
                onClick={() => props.history.goBack()}
              >
                <i class="fa fa-arrow-left"></i>Go Back
              </button>
            </Grid>
            <Grid item md={3}>
              <div className="d-flex mt-3">
                <span className="p-2">
                  <i class="fa fa-search"></i>
                </span>
                <span>
                  <input
                    value={titlename}
                    onChange={(e) => {
                      settitlename(e.target.value);
                    }}
                    type="text"
                    class="form-control"
                    placeholder="Search by Name"
                  />
                </span>
              </div>
            </Grid>
          </Grid>

          <Card classname="main_card p-3">
            <TableContainer>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>

             
                  <TableCell>Name</TableCell>
                    <TableCell>Number</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Address</TableCell>
                    <TableCell>Altranet No.</TableCell>
                    <TableCell>Action</TableCell>
                 
                  
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0
                    ? filterData.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : filterData
                  ).map((row) => (
                    <TableRow key={row.userame}>

                      <TableCell>{row.username}</TableCell>
                      <TableCell>{row.number}</TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell>{row.postaladdress}</TableCell>
                      <TableCell>{row.alternativepno}</TableCell> 
                      <TableCell>
                        {/* <button
                          type="button"
                          class="btn btn-info mr-4"
                          onClick={() => UpdateCategoryData(row)}
                        >
                          <i class="fa fa-edit"></i>
                        </button> */}
                        <button
                          type="button"
                          class="btn btn-info"
                          onClick={() => deleteUser (row)}
                        >
                          <i class="fa fa-trash"></i>
                        </button>
                      </TableCell>
                      
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <TablePagination
                true
                rowsPerPageOptions={false}
                component="div"
                count={filterData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </TableContainer>
          </Card>

        
        </div>
      </div>
      <Loder loading={isloading} />
    </>
  );
}
export default HOC(User);
