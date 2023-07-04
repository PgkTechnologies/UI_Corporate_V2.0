import { Checkbox, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux/es";
import { useNavigate } from "react-router-dom";

const ContactPersonnelCmp = (props) => {

    const history = useNavigate();
    const [showTermsAndConditions, setShowTermsAndConditions] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
    const [valueRadio, setValueRadio] = useState(null);
    const [smShow, setSmShow] = useState(false);
    const [disable, setDisable] = useState(false);
    const [checked, setChecked] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const isMatch = (value) => {
        if (props?.contactPersonnel?.password !== value) {
            return "Password does not match";
        }
    };

    const canBeSubmitted = () => {
        return checked ? setIsDisabled(true) : setIsDisabled(false);
    };

    const onCheckboxClick = () => {
        setChecked(!checked);
        return canBeSubmitted();
    };

    const handlerChange = (event) => {
        setValueRadio(event.target.value);
        if (event.target.value === "true" || event.target.value === true) {
            props?.setContactPersonnel((prev) => ({
                ...prev,
                gstn: "",
            }));
            setDisable(false);
        }

        if (event.target.value === "false" || event.target.value === false) {
            props?.setContactPersonnel((prev) => ({
                ...prev,
                gstn: "",
            }));
            setDisable(true);
        }
        // } else {
        //   if (paymentData.gstn) {
        //     setpaymentData((prev) => ({
        //       ...prev,
        //       gstn: paymentData.gstn,
        //     }));
        //   } else {
        //     setpaymentData((prev) => ({
        //       ...prev,
        //       gstn: localStorage.getItem("GST"),
        //     }));
        //   }

    };


    return (
        <>
        <form onSubmit={props?.handleSubmit} className="d-flex justify-content-center align-items-center" style={{ flexDirection: 'column' }}>
            <div className="row cmp-register-main">
                <div className="cmp-register-head mt-2 mb-3" style={{ fontWeight: 'bold' }}>Primary Contact</div>


                <div className="col-4">
                    <FormControl
                        variant="filled"
                        style={{ width: "100%", marginBottom: "15px" }}>
                        <TextField
                            name="primaryContactFirstName"
                            type='text'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            style={{ width: "100%" }}
                            variant="filled"
                            label={'First Name'}
                            onChange={props?.handleChange}
                            value={props?.contactPersonnel?.primaryContactFirstName}
                            required={true}
                        />
                    </FormControl>
                </div>




                <div className="col-4">
                    <FormControl
                        variant="filled"
                        style={{ width: "100%", marginBottom: "15px" }}>
                        <TextField
                            name="primaryContactMiddleName"
                            type='text'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            style={{ width: "100%" }}
                            variant="filled"
                            label={'Middle Name'}
                            onChange={props?.handleChange}
                            value={props?.contactPersonnel?.primaryContactMiddleName}

                        />
                    </FormControl>
                </div>



                <div className="col-4">
                    <FormControl
                        variant="filled"
                        style={{ width: "100%", marginBottom: "15px" }}>
                        <TextField
                            name="primaryContactLastName"
                            type='text'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            style={{ width: "100%" }}
                            variant="filled"
                            label={'Last Name'}
                            onChange={props?.handleChange}
                            value={props?.contactPersonnel?.primaryContactLastName}
                            required={true}
                        />
                    </FormControl>
                </div>


                <div className="col-4">
                    <FormControl
                        variant="filled"
                        style={{ width: "100%", marginBottom: "15px" }}>
                        <TextField
                            name="primaryContactDesignation"
                            type='text'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            style={{ width: "100%" }}
                            variant="filled"
                            label={'Designation'}
                            onChange={props?.handleChange}
                            value={props?.contactPersonnel?.primaryContactDesignation}
                            required={true}
                        />
                    </FormControl>
                </div>

                <div className="col-4">
                    <FormControl
                        variant="filled"
                        style={{ width: "100%", marginBottom: "15px" }}>
                        <TextField
                            name="primaryContactPhone"
                            type='number'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            style={{ width: "100%" }}
                            variant="filled"
                            label={'Phone Number'}
                            onChange={props?.handleChange}
                            value={props?.contactPersonnel?.primaryContactPhone
                            }
                            required={true}
                            error={props?.errors?.primaryContactPhone}
                        />
                    </FormControl>
                </div>

                <div className="col-4">
                    <FormControl
                        variant="filled"
                        style={{ width: "100%", marginBottom: "15px" }}>
                        <TextField
                            name="primaryContactEmail"
                            type='text'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            style={{ width: "100%" }}
                            variant="filled"
                            label={'Email'}
                            onChange={props?.handleChange}
                            value={props?.contactPersonnel?.primaryContactEmail}
                            required={true}
                            error={props?.errors?.primaryContactEmail}
                        />
                    </FormControl>
                </div>

            </div>
            <div className="row cmp-register-main">
                <div className="cmp-register-head mt-2 mb-3" style={{ fontWeight: 'bold' }}>Secondary Contact</div>


                <div className="col-4">
                    <FormControl
                        variant="filled"
                        style={{ width: "100%", marginBottom: "15px" }}>
                        <TextField
                            name="secondaryContactFirstName"
                            type='text'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            style={{ width: "100%" }}
                            variant="filled"
                            label={'First Name'}
                            onChange={props?.handleChange}
                            value={props?.contactPersonnel?.secondaryContactFirstName}
                           
                        />
                    </FormControl>
                </div>




                <div className="col-4">
                    <FormControl
                        variant="filled"
                        style={{ width: "100%", marginBottom: "15px" }}>
                        <TextField
                            name="secondaryContactMiddleName"
                            type='text'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            style={{ width: "100%" }}
                            variant="filled"
                            label={'Middle Name'}
                            onChange={props?.handleChange}
                            value={props?.contactPersonnel?.secondaryContactMiddleName}

                        />
                    </FormControl>
                </div>



                <div className="col-4">
                    <FormControl
                        variant="filled"
                        style={{ width: "100%", marginBottom: "15px" }}>
                        <TextField
                            name="secondaryContactLastName"
                            type='text'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            style={{ width: "100%" }}
                            variant="filled"
                            label={'Last Name'}
                            onChange={props?.handleChange}
                            value={props?.contactPersonnel?.secondaryContactLastName}
                           
                        />
                    </FormControl>
                </div>


                <div className="col-4">
                    <FormControl
                        variant="filled"
                        style={{ width: "100%", marginBottom: "15px" }}>
                        <TextField
                            name="secondaryContactDesignation"
                            type='text'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            style={{ width: "100%" }}
                            variant="filled"
                            label={'Designation'}
                            onChange={props?.handleChange}
                            value={props?.contactPersonnel?.secondaryContactDesignation}
                            
                        />
                    </FormControl>
                </div>

                <div className="col-4">
                    <FormControl
                        variant="filled"
                        style={{ width: "100%", marginBottom: "15px" }}>
                        <TextField
                            name="secondaryContactPhone"
                            type='number'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            style={{ width: "100%" }}
                            variant="filled"
                            label={'Phone Number'}
                            onChange={props?.handleChange}
                            value={props?.contactPersonnel?.secondaryContactPhone}
                           
                            error={props?.errors?.secondaryContactPhone}
                        />
                    </FormControl>
                </div>

                <div className="col-4">
                    <FormControl
                        variant="filled"
                        style={{ width: "100%", marginBottom: "15px" }}>
                        <TextField
                            name="secondaryContactEmail"
                            type='text'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            style={{ width: "100%" }}
                            variant="filled"
                            label={'Email'}
                            onChange={props?.handleChange}
                            value={props?.contactPersonnel?.secondaryContactEmail}
                           
                            error={props?.errors?.secondaryContactEmail}
                        />
                    </FormControl>
                </div>

            </div>

            <div className="row cmp-register-main">
                <div className="cmp-register-head mt-2 mb-3" style={{ fontWeight: 'bold' }}>GSTN</div>
                <div className="col-4">

                    <FormControl component="fieldset">
                        <FormLabel component="legend">
                            Have a GSTN (Goods and Services Tax Number) ? *
                        </FormLabel>
                        <RadioGroup row aria-label="position" name="gstn" onChange={handlerChange} value={valueRadio} >

                            <FormControlLabel
                                value="true"
                                control={<Radio color="primary" />}
                                label="Yes"

                            />
                            <FormControlLabel
                                value="false"
                                control={<Radio color="primary" />}
                                label="No"

                            />
                        </RadioGroup>
                    </FormControl>
                </div>


                <div >
                    <FormControl
                        variant="filled"
                        style={{ width: "100%", marginBottom: "15px" }}>
                        <TextField
                            name="gstn"
                            type='text'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            style={{ width: "100%" }}
                            variant="filled"
                            label={'GSTN'}
                            onChange={props?.handleChange}
                            value={props?.contactPersonnel?.gstn}
                            required={true}
                            disabled={disable}
                            error={props?.errors?.gstn}
                        />
                    </FormControl>
                </div>

            </div>



            <div className="row cmp-register-main">
                <div className="cmp-register-head mt-2 mb-3" style={{ fontWeight: 'bold' }}>Password</div>

                <div className="col-4" >
                    <FormControl
                        variant="filled"
                        style={{ width: "100%", marginBottom: "15px" }}>
                        <TextField
                            name="password"
                            type='password'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            style={{ width: "100%" }}
                            variant="filled"
                            label={'Password (min 8)'}
                            onChange={props?.handleChange}
                            value={props?.contactPersonnel?.password}
                            required={true}
                            error={props?.errors?.password}
                        />
                    </FormControl>
                </div>

                <div className="col-4" >
                    <FormControl
                        variant="filled"
                        style={{ width: "100%", marginBottom: "15px" }}>
                        <TextField
                            name="repeatPassword"
                            type='password'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            style={{ width: "100%" }}
                            variant="filled"
                            label={'Repeat the password'}
                            onChange={props?.handleChange}
                            value={props?.repeatPassword}
                            required={true}
                            error={props?.errors?.repeatPassword}
                        />
                    </FormControl>
                </div>

            </div>

            <div className="row-container row">
                <div className="row-container" >
                    <Checkbox
                        // checked={universityPrimaryData.attribute6 || ""}
                        onClick={onCheckboxClick}
                        name="isTermsAndConditionsChecked"
                        // onChange={() =>
                        //     props?.handleChange()
                        // }
                        required
                    />
                    <div style={{marginTop:'10px'}}>
                    <p>I hereby accept the
                    <span onClick={()=>{handleShow(true)}} style={{ color: "blue", cursor: "pointer",fontWeight:'bold' }}> Terms and Conditions </span>  of C2Hire</p></div>
                </div>
            </div>

            <div style={{ width: '100%' }}>
                <div style={{ float: 'left' }}>
                    <button className="btn" type="button" onClick={() => {
                        history("/register/CorporateSecondary");
                    }}>
                        Back
                    </button>
                </div>
                <div style={{ float: 'right' }}>
                    <button
                        className="btn"
                        type="submit"
                        disabled={isDisabled}
                    >
                        Next
                    </button>
                </div>
            </div>

        </form>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Terms and Conditions</Modal.Title>
        </Modal.Header>
        <Modal.Body className="terms-body">
          <p
            className="sub-title"
            style={{ fontWeight: "bold", margin: "0", padding: "0" }}
          >
            1. Terms
          </p>
          <p>
            By accessing this web site, you are agreeing to be bound by these
            web site Terms and Conditions of Use, all applicable laws and
            regulations, and agree that you are responsible for compliance with
            any applicable local laws. If you do not agree with any of these
            terms, you are prohibited from using or accessing this site. The
            materials contained in this web site are protected by applicable
            copyright and trade mark law.
          </p>
          <p
            className="sub-title"
            style={{ fontWeight: "bold", margin: "0", padding: "0" }}
          >
            2. Use License
          </p>
          <p>
            Permission is granted to temporarily download one copy of the
            materials (information or software) on C2Hire’s web site for
            personal, non-commercial transitory viewing only. This is the grant
            of a license, not a transfer of title, and under this license you
            may not:
            <p style={{ marginLeft: "5px", marginTop: "10px" }}>
              1. Modify or copy the materials.
            </p>
            <p style={{ marginLeft: "5px" }}>
              2. Use the materials for any commercial purpose, or for any public
              display (commercial or non-commercial).
            </p>
            <p style={{ marginLeft: "5px" }}>
              3. Attempt to decompile or reverse engineer any software contained
              on C2Hire.
            </p>
            <p style={{ marginLeft: "5px" }}>
              4. Remove any copyright or other proprietary notations from the
              materials or
            </p>
            <p style={{ marginLeft: "5px" }}>
              5. Transfer the materials to another person or “mirror” the
              materials on any other server.
            </p>
            This license shall automatically terminate if you violate any of
            these restrictions and may be terminated by C2Hire at any time. Upon
            terminating your viewing of these materials or upon the termination
            of this license, you must destroy any downloaded materials in your
            possession whether in electronic or printed format.
          </p>
          <p
            className="sub-title"
            style={{ fontWeight: "bold", margin: "0", padding: "0" }}
          >
            3. Disclaimer
          </p>
          <p>
            The materials on C2Hire’s web site are provided “as is”. C2Hire
            makes no warranties, expressed or implied, and hereby disclaims and
            negates all other warranties, including without limitation, implied
            warranties or conditions of merchantability, fitness for a
            particular purpose, or non-infringement of intellectual property or
            other violation of rights. Further, C2Hire does not warrant or make
            any representations concerning the accuracy, likely results, or
            reliability of the use of the materials on its Internet web site or
            otherwise relating to such materials or on any sites linked to this
            site.{" "}
          </p>
          <p
            className="sub-title"
            style={{ fontWeight: "bold", margin: "0", padding: "0" }}
          >
            4. Limitations
          </p>
          <p>
            In no event shall C2Hire or its suppliers be liable for any damages
            (including, without limitation, damages for loss of data or profit,
            or due to business interruption,) arising out of the use or
            inability to use the materials on C2Hire’s Internet site, even if
            C2Hire or a C2Hire's authorized representative has been notified
            orally or in writing of the possibility of such damage. Because some
            jurisdictions do not allow limitations on implied warranties, or
            limitations of liability for consequential or incidental damages,
            these limitations may not apply to you.{" "}
          </p>
          <p
            className="sub-title"
            style={{ fontWeight: "bold", margin: "0", padding: "0" }}
          >
            5. Revisions and Errata
          </p>
          <p>
            The materials appearing on C2Hire’s web site could include
            technical, typographical, or photographic errors. C2Hire does not
            warrant that any of the materials on its web site are accurate,
            complete, or current. C2Hire may make changes to the materials
            contained on its web site at any time without notice. C2Hire does
            not, however, make any commitment to update the materials.{" "}
          </p>
          <p
            className="sub-title"
            style={{ fontWeight: "bold", margin: "0", padding: "0" }}
          >
            6. Links
          </p>
          <p>
            C2Hire has not reviewed all of the sites linked to its Internet web
            site and is not responsible for the contents of any such linked
            site. The inclusion of any link does not imply endorsement by C2Hire
            of the site. Use of any such linked web site is at the user’s own
            risk.{" "}
          </p>
          <p
            className="sub-title"
            style={{ fontWeight: "bold", margin: "0", padding: "0" }}
          >
            7. Site Terms of Use Modifications
          </p>
          <p>
            C2Hire may revise these terms of use for its web site at any time
            without notice. By using this web site you are agreeing to be bound
            by the then current version of these Terms and Conditions of Use.{" "}
          </p>
          <p
            className="sub-title"
            style={{ fontWeight: "bold", margin: "0", padding: "0" }}
          >
            8. Site Visit data
          </p>
          <p>
            C2HIRE.Website does not automatically capture any specific personal
            information from you, (like name, phone number or e-mail address),
            that allows us to identify you individually.
          </p>

          <p
            className="sub-title"
            style={{ fontWeight: "bold", margin: "0", padding: "0" }}
          >
            9. Collection of Personal Information
          </p>
          <p>
            CIf you are asked for any other Personal Information including
            Aadhar, it will only be used for the purpose of marketplace on this
            website. If at any time you believe the principles referred to in
            this privacy statement have not been followed, or have any other
            comments on these principles, please notify us by sending email to
            contact@c2hire.com.
          </p>
          <p>
            <strong>Note:</strong> The use of the term "Personal Information" in
            this privacy statement refers to any information from which your
            identity is apparent or can be reasonably ascertained.{" "}
          </p>

          <p
            className="sub-title"
            style={{ fontWeight: "bold", margin: "0", padding: "0" }}
          >
            10. Use Of Personal Data
          </p>
          <p>
            We will use your Personal Data, to:
            <br />
            1.Understand and strive to meet your needs and preferences in using
            our Services
            <br />
            2.Develop new and enhance existing service and product offerings
            <br />
            3.Manage and develop our business and operations
            <br />
            4.Carry out any actions for which we have received your consent
            <br />
            5.Prevent and investigate fraudulent or other criminal activity
            <br />
            6.To address service requests and resolve user questions and
            <br />
            7.Meet legal and regulatory requirements.
            <br /> We also reserve the right to use aggregated Personal Data to
            understand how our users use our Services, provided that those data
            cannot identify any individual.
            <br /> We also use third-party web analytics tools that help us
            understand how users engage with our website. These third-parties
            may use first-party cookies to track user interactions to collect
            information about how users use our website. This information is
            used to compile reports and to help us improve our website. The
            reports disclose website trends without identifying individual
            visitors. You can opt-out of such third-party analytic tools without
            affecting how you visit our site. For more information on
            opting-out, please contact contact@c2hire.com
          </p>

          <p
            className="sub-title"
            style={{ fontWeight: "bold", margin: "0", padding: "0" }}
          >
            11. Reasonable Security Practices
          </p>
          <p>
            Reasonable security measures such as administrative, technical,
            operational and physical controls have been implemented to ensure
            the security of personal information, if collected.
          </p>

          <p
            className="sub-title"
            style={{ fontWeight: "bold", margin: "0", padding: "0" }}
          >
            12. Disclaimer of warranties
          </p>
          <p>
            You understand that we cannot and do not guarantee or warrant that
            files available for downloading from the internet or the Website
            will be free of viruses or other destructive code. You are
            responsible for implementing sufficient procedures and checkpoints
            to satisfy your particular requirements for anti-virus protection
            and accuracy of data input and output, and for maintaining a means
            external to our site for any reconstruction of any lost data. TO THE
            FULLEST EXTENT PROVIDED BY LAW, WE WILL NOT BE LIABLE FOR ANY LOSS
            OR DAMAGE CAUSED BY A DISTRIBUTED DENIAL-OF-SERVICE ATTACK, VIRUSES,
            OR OTHER TECHNOLOGICALLY HARMFUL MATERIAL THAT MAY INFECT YOUR
            COMPUTER EQUIPMENT, COMPUTER PROGRAMS, DATA, OR OTHER PROPRIETARY
            MATERIAL DUE TO YOUR USE OF THE WEBSITE OR ANY SERVICES OR ITEMS
            OBTAINED THROUGH THE WEBSITE OR TO YOUR DOWNLOADING OF ANY MATERIAL
            POSTED ON IT, OR ON ANY WEBSITE LINKED TO IT.
          </p>
          <br />
          <p>
            YOUR USE OF THE WEBSITE, ITS CONTENT, AND ANY SERVICES OR ITEMS
            OBTAINED THROUGH THE WEBSITE IS AT YOUR OWN RISK. THE WEBSITE, ITS
            CONTENT, AND ANY SERVICES OR ITEMS OBTAINED THROUGH THE WEBSITE ARE
            PROVIDED ON AN “AS IS” AND “AS AVAILABLE” BASIS, WITHOUT ANY
            WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. NEITHER THE
            COMPANY NOR ANY PERSON ASSOCIATED WITH THE COMPANY MAKES ANY
            WARRANTY OR REPRESENTATION WITH RESPECT TO THE COMPLETENESS,
            SECURITY, RELIABILITY, QUALITY, ACCURACY, OR AVAILABILITY OF THE
            WEBSITE. WITHOUT LIMITING THE FOREGOING, NEITHER THE COMPANY NOR
            ANYONE ASSOCIATED WITH THE COMPANY REPRESENTS OR WARRANTS THAT THE
            WEBSITE, ITS CONTENT, OR ANY SERVICES OR ITEMS OBTAINED THROUGH THE
            WEBSITE WILL BE ACCURATE, RELIABLE, ERROR-FREE, OR UNINTERRUPTED,
            THAT DEFECTS WILL BE CORRECTED, THAT OUR SITE OR THE SERVER THAT
            MAKES IT AVAILABLE ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS,
            OR THAT THE WEBSITE OR ANY SERVICES OR ITEMS OBTAINED THROUGH THE
            WEBSITE WILL OTHERWISE MEET YOUR NEEDS OR EXPECTATIONS.
          </p>
          <br />
          <p>
            {" "}
            TO THE FULLEST EXTENT PROVIDED BY LAW, THE COMPANY HEREBY DISCLAIMS
            ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, STATUTORY,
            OR OTHERWISE, INCLUDING BUT NOT LIMITED TO ANY WARRANTIES OF
            MERCHANTABILITY, NON-INFRINGEMENT, AND FITNESS FOR PARTICULAR
            PURPOSE. THE FOREGOING DOES NOT AFFECT ANY WARRANTIES THAT CANNOT BE
            EXCLUDED OR LIMITED UNDER APPLICABLE LAW.
          </p>
          <p
            className="sub-title"
            style={{ fontWeight: "bold", margin: "0", padding: "0" }}
          >
            13. Limitation on liability
          </p>
          <p>
            TO THE FULLEST EXTENT PROVIDED BY LAW, IN NO EVENT WILL THE COMPANY,
            ITS AFFILIATES, OR THEIR LICENSORS, SERVICE PROVIDERS, EMPLOYEES,
            AGENTS, OFFICERS, OR DIRECTORS BE LIABLE FOR DAMAGES OF ANY KIND,
            UNDER ANY LEGAL THEORY, ARISING OUT OF OR IN CONNECTION WITH YOUR
            USE, OR INABILITY TO USE, THE WEBSITE, ANY WEBSITES LINKED TO IT,
            ANY CONTENT ON THE WEBSITE OR SUCH OTHER WEBSITES, INCLUDING ANY
            DIRECT, INDIRECT, SPECIAL, INCIDENTAL, CONSEQUENTIAL, OR PUNITIVE
            DAMAGES, INCLUDING BUT NOT LIMITED TO, PERSONAL INJURY, PAIN AND
            SUFFERING, EMOTIONAL DISTRESS, LOSS OF REVENUE, LOSS OF PROFITS,
            LOSS OF BUSINESS OR ANTICIPATED SAVINGS, LOSS OF USE, LOSS OF
            GOODWILL, LOSS OF DATA, AND WHETHER CAUSED BY TORT (INCLUDING
            NEGLIGENCE), BREACH OF CONTRACT, OR OTHERWISE, EVEN IF FORESEEABLE.
            THE FOREGOING DOES NOT AFFECT ANY LIABILITY THAT CANNOT BE EXCLUDED
            OR LIMITED UNDER APPLICABLE LAW.
          </p>

          <p
            className="sub-title"
            style={{ fontWeight: "bold", margin: "0", padding: "0" }}
          >
            14. Governing Law
          </p>
          <p>
            Any claim relating to C2Hire's web site shall be governed by the
            laws of the State of India without regard to its conflict of law
            provisions. General Terms and Conditions applicable to Use of a Web
            Site.{" "}
          </p>

          <p>
            Contact us:{" "}
            <span style={{ color: "#0291ff" }}>contact@c2hire.com</span>
            <p>
              This website is operated by PGK Technologies Private Limited (for
              its product C2Hire.), Plot no 33, Jayabheri Enclave Phase-2
              Gachibowli, Hyderabad. 500032, INDIA.
            </p>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={handleClose}
            style={{ color: "white" }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>

    
        

        </>
    )
}

export default ContactPersonnelCmp;
