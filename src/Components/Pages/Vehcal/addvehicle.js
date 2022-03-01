import React, { useEffect, useState } from "react";
import HOC from "../../../Common/Hoc";
import { Card, Grid, Button } from "@material-ui/core";
import Loder from "../../Loder/Loder";
import { getBaseUrl } from "../../utils";
import { blankValidator, showNotificationMsz } from "../../utils/Validation";
import axios from "axios";

    const AddVechile = (props) => {
    const [isloading, setisloading] = useState(false);
    const [StateCode, setStateCode] = useState("");
    const [CityCode, setCityCode] = useState();
    const [UniqueLetter, setUniqueLetter] = useState();
    const [UniqueNumber, setUniqueNumber] = useState();
    const [IncDate, setIncDate] = useState();
    const [RcDate, setRcDate] = useState();
    const [ModelDate, setModelDate] = useState();
    const [EmissionDate, setEmissionDate] = useState();
    const [IncImage, setIncImage] = useState();
    const [RcImage, setRcImage] = useState();
    const [ModelImage, setModelImage] = useState();
    const [EmissionImage,setEmissionImage]= useState();
    

    //error
    const [EditDiscount, setEditDiscount] = useState(false);
    const [EditExpiry, setEditExpiry] = useState(false);
    const token = localStorage.getItem("userToken");

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    //add Coupon
    const CreateVechile = () => {
        try {
          
           const fd = new FormData();
            fd.append("statecode", StateCode);
            fd.append("citycode", CityCode);
            fd.append("uniqueletter", UniqueLetter);
            fd.append("uniqueno", UniqueNumber);
            fd.append("incdate", IncDate);
            fd.append("rcdate", RcDate);
            fd.append("modeldate", ModelDate);
            fd.append("emissiondate", EmissionDate);
            fd.append("incimage", IncImage);
            fd.append("rcimage", RcImage);
            fd.append("modelimage", ModelImage);
            fd.append("emissionimage",EmissionImage);

            let url =getBaseUrl()+ "api/addvehical";
            setisloading(true);

            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };

            axios
                .post(url,fd, config)
                .then(
                    (res) => {
                        console.log("data Vechile:::", res);
                        setisloading(false);
                        props.history.push("/get/vehicle");
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
                                            <h5 className="text_filed_heading">Add Vehicle</h5>

                                            <Grid className="Component_main_grid">
                                                <Grid item md={12}>
                                                   

                                                    <div className="text_filed_heading">State Code</div>
                                                    <div className=" mt-1 mr-2">
                                                        <input
                                                            type="text"
                                                            className="form-control "
                                                            placeholder="Enter state Code"
                                                            autoComplete="off"
                                                            value={StateCode}
                                                            onChange={(e) => {
                                                                setStateCode(e.target.value);
                                                            }}
                                                        />
                                                       
                                                    </div>

                                                     <div className="text_filed_heading">City Code</div>
                                                    <div className=" mt-1 mr-2">
                                                        <input
                                                            type="text"
                                                            className="form-control "
                                                            placeholder="Enter City Code"
                                                            autoComplete="off"
                                                            value={CityCode}
                                                            onChange={(e) => {
                                                             setCityCode(e.target.value);
                                                            }}
                                                        />
                                                      
                                                      
                                                    </div>

                                                    <div className="text_filed_heading">Sr No.</div>
                                                    <div className=" mt-1 mr-2">
                                                        <input
                                                            type="text"
                                                            className="form-control "
                                                            placeholder="Enter UniqueLetter"
                                                            autoComplete="off"
                                                            value={UniqueLetter}
                                                            onChange={(e) => {
                                                                setUniqueLetter(e.target.value);
                                                            }}
                                                        />
                                                       
                                                    </div>
                                                     <div className="text_filed_heading">Unique Number</div>
                                                    <div className=" mt-1 mr-2">
                                                        <input
                                                            type="text"
                                                            className="form-control "
                                                            placeholder="Enter Unique Number"
                                                            autoComplete="off"
                                                            value={UniqueNumber}
                                                            onChange={(e) => {
                                                                setUniqueNumber(e.target.value);
                                                            }}
                                                        />
                                                       
                                                    </div> <div className="text_filed_heading">Inc Date</div>
                                                    <div className=" mt-1 mr-2">
                                                        <input
                                                            type="date"
                                                            className="form-control "
                                                            autoComplete="off"
                                                            value={IncDate}
                                                            onChange={(e) => {
                                                                setIncDate(e.target.value);
                                                            }}
                                                        />
                                                       
                                                    </div>

                                                     <div className="text_filed_heading">Rc Date</div>
                                                    <div className=" mt-1 mr-2">
                                                        <input
                                                            type="date"
                                                            className="form-control "
                                                            autoComplete="off"
                                                            value={RcDate}
                                                            onChange={(e) => {
                                                                setRcDate(e.target.value);
                                                            }}
                                                        />
                                                       
                                                    </div>
                                                     <div className="text_filed_heading">Model Date</div>
                                                    <div className=" mt-1 mr-2">
                                                        <input
                                                            type="date"
                                                            className="form-control "
                                                            autoComplete="off"
                                                            value={ModelDate}
                                                            onChange={(e) => {
                                                                setModelDate(e.target.value);
                                                            }}
                                                        />
                                                       
                                                    </div>
                                                    <div className="text_filed_heading">Model Date</div>
                                                    <div className=" mt-1 mr-2">
                                                        <input
                                                            type="date"
                                                            className="form-control "
                                                            autoComplete="off"
                                                            value={EmissionDate}
                                                            onChange={(e) => {
                                                                setEmissionDate(e.target.value);
                                                            }}
                                                        />
                                                       
                                                    </div>
                                                     
                                                     

                                                     <div className="text_filed_heading">Choose Inc Img</div>
                                                    <div className=" mt-1 mr-2">
                                                        <input
                                                            type="file"
                                                            className="form-control "
                                                            autoComplete="off"
                                                            onChange={(e) => {
                                                                setIncImage(e.target.files[0]);
                                                            }}
                                                        />
                                                       
                                                    </div>

                                                     <div className="text_filed_heading">Choose Rc Img</div>
                                                    <div className=" mt-1 mr-2">
                                                        <input
                                                            type="file"
                                                            className="form-control "
                                                            autoComplete="off"
                                                            onChange={(e) => {
                                                                setRcImage(e.target.files[0]);
                                                            }}
                                                        />
                                                       
                                                    </div>
                                                     <div className="text_filed_heading">Choose Model Img</div>
                                                    <div className=" mt-1 mr-2">
                                                        <input
                                                            type="file"
                                                            className="form-control "
                                                            autoComplete="off"
                                                            onChange={(e) => {
                                                                setModelImage(e.target.files[0]);
                                                            }}
                                                        />
                                                       
                                                    </div>
                                                     <div className="text_filed_heading">Choose Inc Img</div>
                                                    <div className=" mt-1 mr-2">
                                                        <input
                                                            type="file"
                                                            className="form-control "
                                                            autoComplete="off"
                                                            onChange={(e) => {
                                                                setEmissionImage(e.target.files[0]);
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
                                                onClick={CreateVechile}
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
            <Loder loading={isloading} />
                </>
            );
        };

export default HOC(AddVechile);
