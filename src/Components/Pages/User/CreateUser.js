import React, { useEffect, useState } from "react";
import HOC from "../../../Common/Hoc";
import { Card, Grid, Button } from "@material-ui/core";
import Loder from "../../Loder/Loder";
import { getBaseUrl } from "../../utils";
import { blankValidator, showNotificationMsz } from "../../utils/Validation";
import axios from "axios";

const CreateUser = (props) => {
    const [isloading, setisloading] = useState(false);
    const [Name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [postaladdress, setPostaladdress] = useState();
    const [alternativepno, setAlternativepno] = useState();
    //error
    const [EditDiscount, setEditDiscount] = useState(false);
    const [EditExpiry, setEditExpiry] = useState(false);
    const token = localStorage.getItem("userToken");

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

  
    //add Coupon

    const addUser = () => {
        try {
          

            let url = getBaseUrl() + "api/adduser";
            setisloading(true);

           const temp ={
            username:Name,
            email:email,
            postaladdress:postaladdress,
            alternativepno:alternativepno

           }

            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };

            axios
                .post(url,temp, config)
                .then(
                    (res) => {
                        console.log("data Category:::", res);
                        setisloading(false);
                        props.history.push("/upload/documents");
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
                                            <h5 className="text_filed_heading">Add User</h5>

                                            <Grid className="Component_main_grid">
                                                <Grid item md={12}>
                                                    <div className="text_filed_heading">UserName</div>
                                                    <div className=" mt-1 mr-2">
                                                        <input
                                                            type="text"
                                                            className="form-control "
                                                            placeholder="Enter Name"
                                                            autoComplete="off"
                                                            value={Name}
                                                            onChange={(e) => {
                                                                setEditDiscount(false);
                                                                setName(e.target.value);
                                                            }}
                                                        />
                                                       
                                                    </div>

                                                    <div className="text_filed_heading">Email</div>
                                                    <div className=" mt-1 mr-2">
                                                        <input
                                                            type="email"
                                                            className="form-control "
                                                            placeholder="Enter Email"
                                                            autoComplete="off"
                                                            value={email}
                                                            onChange={(e) => {
                                                                setEditExpiry(false);
                                                                setEmail(e.target.value);
                                                            }}
                                                        />
                                                    </div>

                                                     <div className="text_filed_heading">Postal Address</div>
                                                    <div className=" mt-1 mr-2">
                                                        <input
                                                            type="email"
                                                            className="form-control "
                                                            placeholder="Enter Postal Address"
                                                            autoComplete="off"
                                                            value={postaladdress}
                                                            onChange={(e) => {
                                                                setPostaladdress(e.target.value);
                                                            }}
                                                        />
                                                    </div>

                                                    <div className="text_filed_heading">Alternativep No</div>
                                                    <div className=" mt-1 mr-2">
                                                        <input
                                                            type="email"
                                                            className="form-control "
                                                            placeholder="Enter Alternativep No"
                                                            autoComplete="off"
                                                            value={alternativepno}
                                                            onChange={(e) => {
                                                                setAlternativepno(e.target.value);
                                                            }}
                                                        />
                                                    </div>
                                                </Grid>
                                            </Grid>
                                        </div>
                                        <div className="mt-2 pb-3 ">
                                            <Button
                                                variant="contained"
                                                className="button_formatting"
                                                onClick={addUser}
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

export default HOC(CreateUser);
