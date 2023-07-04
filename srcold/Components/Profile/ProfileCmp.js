import React from "react";
import { TextField, Button } from "@material-ui/core";


const ProfileCmp = (props) => {

  const handleDownload = (path, fileName) => {
    if (path.includes(".pdf") || path.length <= 500) {
      props?.downloadPDF(path, (base64) => {
        const file = `data:application/pdf;base64,${base64}`;
        const downloadLink = document.createElement("a");
        downloadLink.href = file;
        downloadLink.download = fileName;
        downloadLink.click();
      });
    } else {
      //here by default path is base64
      const file = `data:application/pdf;base64,${path}`;
      const downloadLink = document.createElement("a");
      downloadLink.href = file;
      downloadLink.download = fileName;
      downloadLink.click();
    }
  };


  return (
    <div className="cmp-main">
      <p className="cmp-head">Profile</p>
      <div className="row">
        <div className="col-12">
          <TextField
            label="Website / Profile URL (if any)"
            type="text"
            name="attribute7"
            variant="filled"
            style={{ width: "100%", marginBottom: "15px" }}
            onChange={props?.onChange}
            value={
              props?.profileData?.attribute7?.value
                ? props?.profileData?.attribute7?.value
                : ""
            }
          />
        </div>
        <div className="col-12">
          <TextField
            label="Write in brief about you"
            type="text"
            multiline
            minRows={4}
            name="companyProfile"
            variant="filled"
            style={{ width: "100%", marginBottom: "15px" }}
            required={true}
            onChange={props?.onChange}
            value={
              props?.profileData?.companyProfile?.value
                ? props?.profileData?.companyProfile?.value
                : ''
            }
          />
        </div>
        <div className="col-2">
          
            <label htmlFor="accredationfile" className="file_label">
              Attach File
            </label>
            <p>{props?.fileSizeErr}</p>
            <div style={{display:'flex' }}>
            <div>
            <input
              type="file"
              onChange={props?.fileHandler}
              className="attach-inp"
              accept=".pdf"
              name="attachment"
              id="accredationfile"
              alt=""
              required
            />
          </div>
          <div>
            <p className="attach-inp_label"
              style={{ color: 'blue', cursor: 'pointer' }}
              onClick={() => {
                handleDownload(
                  props?.tempAttachment?.attachment,
                  props?.tempAttachment?.attachmentName
                );
              }}>
              {props?.tempAttachment?.attachmentName}
            </p>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCmp;
