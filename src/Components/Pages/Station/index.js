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

function Station(props) {
  const [isupdated, setisupdated] = useState(false);
  const [isloading, setisloading] = useState(false);
  const [StationDataArry, setStationDataArry] = useState([]);
  const [EditDailogOpen, setEditDailogOpen] = useState("");
  const [EditcategoryName, setEditcategoryName] = useState(false);
  const [EditId, setEditId] = useState("");
  const token = localStorage.getItem("userToken");
  useEffect(() => {
    window.scrollTo(0, 0);

     const config = {
                headers: { Authorization: `Bearer ${token}` }
            };

    let url =  "http://localhost:2999/api/getallstation/byadmin";
    setisloading(true);
    axios
      .get(url,config)
      .then(
        (res) => {
          console.log("data viewstation:::", res);
          setisloading(false);
          setStationDataArry(res.data.getallstationadmin);
          showNotificationMsz(res.data.msg, "success");
        },

        (error) => {
          setisloading(false);
          console.log("data response error:::", error);
          showNotificationMsz(error, "danger");

        }
      )
      .catch((e) => {
        setisloading(false);
        console.log("data response error:::", e);
      });
  }, [isupdated]);

  // for pagination hadler
  const [rowsPerPage, setRowsPerPage] = React.useState(3);
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
  const filterData = StationDataArry.filter((event) => {
    return (
      event.number.toLowerCase().indexOf(titlename.toLowerCase()) !== -1
    );
  });

  const classes = useStyles();

  return (
    <>
      <div className="home_padding">    
        <div className="content_padding">
          <Grid className="Component_main_grid mb-3">
            <Grid item md={9}>
              <h3 className="mb-2">Station</h3>
              <button
                type="button"
                class="btn btn-info mr-4"
                onClick={() => props.history.push("/add/vehicle")}
              >
                <i class="fa fa-plus"></i> Create
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

                    
                    

                    <TableCell>Estimate Quote</TableCell>
                    <TableCell>ODO Km</TableCell>
                    <TableCell>Estimedeldt</TableCell>
                    <TableCell>Fuel level</TableCell>
                    <TableCell>Notes</TableCell>
                    <TableCell>Number</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>vehicle no.</TableCell>
                 
                 
                   
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
                    <TableRow key={row.name}>

                      
                      <TableCell>{row.Estimatequote}</TableCell>
                      <TableCell>{row.ODOkms}</TableCell>
                      <TableCell>{row.estimedeldt}</TableCell>
                      <TableCell>{row.fuellevel}</TableCell>
                      <TableCell>{row.notes}</TableCell>
                      <TableCell>{row.number}</TableCell>
                      <TableCell>{row.type}</TableCell>
                      <TableCell>{row.vehicalnumber?.statecode + row.vehicalnumber?.citycode + row.vehicalnumber?.uniqueletter +row.vehicalnumber?.uniqueno  }</TableCell>
                      
                      

                    
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
export default HOC(Station);
