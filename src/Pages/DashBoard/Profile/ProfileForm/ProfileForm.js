import React from "react";
import PgkTextField from "../../../../Components/FormFields/PgkTextField";
import Checkbox from "@material-ui/core/Checkbox";

const ProfileForm = (props) => {

  const openFileInBrowser = (data, fileName) => {
    if (data.length < 250) {
      props.getAttach(data);
    } else {
      var objbuilder = "";
      objbuilder +=
        '<object width="100%" height="100%" data = "data:application/pdf;base64,';
      objbuilder += data;
      objbuilder += '" type="application/pdf" class="internal">';
      objbuilder += '<embed src="data:application/pdf;base64,';
      objbuilder += data;
      objbuilder += '" type="application/pdf"  />';
      objbuilder += "</object>";
      var windo = window.open("#", "_blank");
      windo.document.write(
        "<html><title>" +
          fileName +
          '</title><body style="margin-top: 0px; margin - left: 0px; margin - right: 0px; margin - bottom: 0px; ">'
      );
      windo.document.write(objbuilder);
      windo.document.write("</body></html>");
    }
    props.setPath(props.certificateDetails.attachment);
  };
  const handleDownload = (path, fileName) => {
    if (path.includes(".pdf") || path.length <= 500) {
      props.downloadPDF(path, (base64) => {
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
    <div className="profile-box">
      <aside className="profile-side">
        <h3 className="profile-side-title">Profile</h3>
      </aside>
      <div className="profile-data">
        <div className="row">
          <div className="col-md-12">
            <div className="mb-20 w-full">
              <PgkTextField
                name="attribute7"
                value={
                  props?.profileData?.attribute7?.value
                    ? props?.profileData?.attribute7?.value
                    : props?.profileData?.attribute7
                }
                label={"Website/Company Link (If Any)"}
                required={props?.profileData?.attribute7?.isRequired}
                disabled={props?.disable !== undefined ? props?.disable : false}
                errorMessage={props?.profileData?.attribute7?.errorMessage}
                onChange={props?.onChange}
              />
            </div>
          </div>
          <div className="col-md">
            <div
              className={
                "d-flex justify-content-center align-items-start w-full"
              }
            >
              {props?.check && (
                <Checkbox
                  disableRipple
                  size={"small"}
                  style={{ marginLeft: "-40px" }}
                  color={"primary"}
                  name={"companyProfile"}
                  checked={props?.checkData?.companyProfile ? true : false}
                  onChange={(e) => {
                    props?.handleCheckData(
                      e.target.name,
                      !props?.checkData?.companyProfile
                    );
                  }}
                />
              )}
              <div className="mb-20 w-full">
                <PgkTextField
                  name="companyProfile"
                  value={
                    props?.profileData?.companyProfile?.value
                      ? props?.profileData?.companyProfile?.value
                      : props?.profileData?.companyProfile
                  }
                  label={"Write in brief about the company"}
                  required={props?.profileData?.companyProfile?.isRequired}
                  disabled={
                    props?.disable !== undefined ? props?.disable : false
                  }
                  errorMessage={
                    props?.profileData?.companyProfile?.errorMessage
                  }
                  onChange={props?.onChange}
                  multiline={true}
                  minRows={6}
                />
              </div>
            </div>
            <div
              className="row d-flex justify-content-end align-items-center"
              style={{ margin: 0, padding: 0 }}
            >
              <div
                className={`col-md-${
                  props?.tempAttachment?.attachment ? "11" : "12"
                }`}
                style={{ margin: 0, padding: 0 }}
              >
                <div className="d-attach">
                  {props?.tempAttachment?.attachmentName ? (
                    <div
                      className={
                        "d-flex justify-content-between align-items-center"
                      }
                      style={{ width: "84%" }}
                    >
                      <p
                        className="float-left"
                        style={{
                          padding: "8px",
                          fontSize: ".800rem",
                          flex: "1",
                        }}
                      >
                        {props?.tempAttachment?.attachmentName}
                      </p>
                    </div>
                  ) : null}
                  <input
                    type="file"
                    onChange={props?.fileHandler}
                    className="d-inp d-none"
                    name="attachment"
                    accept=".pdf"
                    disabled={props?.disable ? true : false}
                    id="attachment"
                  />
                  <label
                    htmlFor="attachment"
                    className="d-label"
                    style={{ backgroundColor: "#253AA3" }}
                  >
                    {" "}
                    <i className="fas fa-paperclip mr-2"></i> Attachment
                  </label>
                  {/* <i className="fas fa-download mr-2"></i> Download */}
                </div>
              </div>

              {props?.tempAttachment?.attachment && (
                <div className="col-md-1" style={{ margin: 0, padding: 0 }}>
                  <div className="d-attach" style={{ cursor: "pointer" }}>
                    {props?.tempAttachment?.attachment?.trim() !== "" ? (
                      <div
                        onClick={() => {
                          handleDownload(
                            props?.tempAttachment?.attachment,
                            props?.tempAttachment?.attachmentName
                          );
                        }}
                        style={{
                          textDecoration: "none",
                          outline: "none",
                          width: "100%",
                          cursor: "pointer",
                        }}
                        // download
                      >
                        {" "}
                        <label
                          style={{
                            backgroundColor: "#253AA3",
                            width: "100%",
                            height: "100%",
                            paddingTop: "10px",
                            color: "white",
                            textAlign: "center",
                            cursor: "pointer",
                          }}
                        >
                          <i className="fas fa-download mr-2"></i>
                        </label>
                      </div>
                    ) : null}
                  </div>
                </div>
              )}
            </div>
            {props?.tempAttachment?.attachmentError ? (
              <p
                style={{
                  color: "red",
                  fontSize: ".800rem",
                  marginTop: "-15px",
                }}
              >
                {props?.tempAttachment?.attachmentError}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
