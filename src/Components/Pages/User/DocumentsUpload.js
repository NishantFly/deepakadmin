import React, { useEffect, useState } from "react";
import HOC from "../../../Common/Hoc";
import { Card, Grid, Button } from "@material-ui/core";
import Loder from "../../Loder/Loder";
import { getBaseUrl } from "../../utils";
import { blankValidator, showNotificationMsz } from "../../utils/Validation";
import axios from "axios";

const DocumentsUpload = (props) => {
    const [isloading, setisloading] = useState(false);
    const [DocumentsImg, setDocumentsImg] = useState("");
    const [DateDcmnt, setDate] = useState("");
    const [Documentsemark, setDocumentsemark] = useState();
    const [DocumentsName, setDocumentsName] = useState();
    //error
    const [EditDiscount, setEditDiscount] = useState(false);
    const [EditExpiry, setEditExpiry] = useState(false);
    const token = localStorage.getItem("userToken");

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

  
    //add Coupon

    const UploadDoucuments = () => {
        try {
          

            let url = getBaseUrl() + "api/adddocument";
            setisloading(true);

         

           const fd = new FormData();
            fd.append("documentdate", DateDcmnt);
            fd.append("documentimage", DocumentsImg);
            fd.append("documentremark", Documentsemark);
            fd.append("documentname", DocumentsName);

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
                                            <h5 className="text_filed_heading">Upload Documents</h5>

                                            <Grid className="Component_main_grid">
                                                <Grid item md={12}>
                                                    <div className="text_filed_heading">Documents Upload</div>
                                                    <div className=" mt-1 mr-2">
                                                        <input
                                                            type="file"
                                                            className="form-control "
                                                            placeholder="Enter Name"
                                                            autoComplete="off"
                                                            onChange={(e) => {
                                                                setDocumentsImg(e.target.files[0]);
                                                            }}
                                                        />
                                                       
                                                    </div>

                                                    <div className="text_filed_heading">Documents Date</div>
                                                    <div className=" mt-1 mr-2">
                                                        <input
                                                            type="date"
                                                            className="form-control "
                                                            placeholder="Enter Email"
                                                            autoComplete="off"
                                                            value={DateDcmnt}
                                                            onChange={(e) => {
                                                                setEditExpiry(false);
                                                                setDate(e.target.value);
                                                            }}
                                                        />
                                                       
                                                    </div>

                                                     <div className="text_filed_heading">Documents E Mark</div>
                                                    <div className=" mt-1 mr-2">
                                                        <input
                                                            type="text"
                                                            className="form-control "
                                                            placeholder="Enter Postal E Mark"
                                                            autoComplete="off"
                                                            value={Documentsemark}
                                                            onChange={(e) => {
                                                                setDocumentsemark(e.target.value);
                                                            }}
                                                        />
                                                      
                                                      
                                                    </div>

                                                    <div className="text_filed_heading">Document Name</div>
                                                    <div className=" mt-1 mr-2">
                                                        <input
                                                            type="email"
                                                            className="form-control "
                                                            placeholder="Enter Document Name"
                                                            autoComplete="off"
                                                            value={DocumentsName}
                                                            onChange={(e) => {
                                                                setDocumentsName(e.target.value);
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
                                                onClick={UploadDoucuments}
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

export default HOC(DocumentsUpload);
