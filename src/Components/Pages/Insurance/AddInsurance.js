import React, { useEffect, useState } from "react";
import HOC from "../../../Common/Hoc";
import { Card, Grid, Button } from "@material-ui/core";
import Loder from "../../Loder/Loder";
import { getBaseUrl } from "../../utils";
import { blankValidator, showNotificationMsz } from "../../utils/Validation";
import axios from "axios";

    const AddInsurance = (props) => {
    const [isloading, setisloading] = useState(false);
    const [InsuranceDate, setInsuranceDate] = useState("");
    const [Insurancedocname, setInsurancedocname] = useState();
    const [InsuranceId, setInsuranceId] = useState();
    const [NewInsurance, setNewInsurance] = useState();
    const [Insuranceimage, setInsuranceImg] = useState("");

    //error
    const [EditDiscount, setEditDiscount] = useState(false);
    const [EditExpiry, setEditExpiry] = useState(false);
    const token = localStorage.getItem("userToken");

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    //add Coupon
    const CreateInsurance = () => {
        try {
          
           const fd = new FormData();
            fd.append("insurancedate", InsuranceDate);
            fd.append("insurancedocname", Insurancedocname);
            fd.append("insuranceid", InsuranceId);
            fd.append("newinsurance", NewInsurance);
            fd.append("insuranceimage", Insuranceimage);

            let url =getBaseUrl()+ "api/addinsurance";
            setisloading(true);

            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };

            axios
                .post(url,fd, config)
                .then(
                    (res) => {
                        console.log("data Category:::", res);
                        setisloading(false);
                        props.history.push("/home");
                        showNotificationMsz(res.data.message, "success");
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
                    showNotificationMsz(e, "danger");
                });
        } catch (error) { }
    };

    return (
        <>
            <div style={{ width: "100%" }}>
                <div className="home_padding">
                    <div className="content_padding">
                        <Grid className="Component_main_grid p-2 "></Grid>

                        <div>
                            <Card className=" mb-2 Card_shadow p-3">
                                <div className="card_admissiondetails_height">
                                    <div className="textfiled_margin">
                                        <div className="card_content_instition">
                                            <h5 className="text_filed_heading">Add Insurance</h5>

                                            <Grid className="Component_main_grid">
                                                <Grid item md={12}>
                                                    <div className="text_filed_heading">Choose Insurance Img</div>
                                                    <div className=" mt-1 mr-2">
                                                        <input
                                                            type="file"
                                                            className="form-control "
                                                            autoComplete="off"
                                                            onChange={(e) => {
                                                                setInsuranceImg(e.target.files[0]);
                                                            }}
                                                        />
                                                       
                                                    </div>

                                                    <div className="text_filed_heading">Insurance Date</div>
                                                    <div className=" mt-1 mr-2">
                                                        <input
                                                            type="date"
                                                            className="form-control "
                                                            placeholder="Enter Email"
                                                            autoComplete="off"
                                                            value={InsuranceDate}
                                                            onChange={(e) => {
                                                                setInsuranceDate(e.target.value);
                                                            }}
                                                        />
                                                       
                                                    </div>

                                                     <div className="text_filed_heading">Insurance Doc Name</div>
                                                    <div className=" mt-1 mr-2">
                                                        <input
                                                            type="text"
                                                            className="form-control "
                                                            placeholder="Enter Insurance Doc Name"
                                                            autoComplete="off"
                                                            value={Insurancedocname}
                                                            onChange={(e) => {
                                                                setInsurancedocname(e.target.value);
                                                            }}
                                                        />
                                                      
                                                      
                                                    </div>

                                                    <div className="text_filed_heading">Insurance Id</div>
                                                    <div className=" mt-1 mr-2">
                                                        <input
                                                            type="email"
                                                            className="form-control "
                                                            placeholder="Enter Insurance Id"
                                                            autoComplete="off"
                                                            value={InsuranceId}
                                                            onChange={(e) => {
                                                                setInsuranceId(e.target.value);
                                                            }}
                                                        />
                                                       
                                                    </div>

                                                      <div className="text_filed_heading">New Insurance</div>
                                                    <select
                                                        className="form-control mb-3"
                                                        value={NewInsurance}
                                                        onChange={(e) => {
                                                            setNewInsurance(e.target.value)
                                                        }}
                                                    >
                                                        <option value="">Select Insurance</option>
                                                        <option value="health">Health</option>
                                                        <option value="life">Life</option>
                                                        <option value="corporate">Corporate</option>
                                                        

                                                        
                                                    </select>{" "}



                                                </Grid>
                                            </Grid>
                                        </div>
                                        <div className="mt-2 pb-3 ">
                                            <Button
                                                variant="contained"
                                                className="button_formatting"
                                                onClick={CreateInsurance}
                                            >
                                                Add
                                            </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            );
        };

export default HOC(AddInsurance);
