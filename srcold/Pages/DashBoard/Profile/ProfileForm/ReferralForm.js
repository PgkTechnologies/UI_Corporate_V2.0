import React from "react";
import PgkTextField from "../../../../Components/FormFields/PgkTextField";

const ReferralForm = (props) => {
  return (
    <div className="profile-box">
      <aside className="profile-side">
        <h3 className="profile-side-title">Referral Code</h3>
      </aside>
      <div className="profile-data">
        <div className="row">
          <div className="col-md-6">
            <div className="mb-20 d-flex align-items-start">
              <PgkTextField
                type={"text"}
                name="yearOfEstablishment"
                value={props?.profileData?.referralcode}
                onChange={props?.onChange}
                errorMessage={''}
                label={"Your Referral Code"}
                disabled
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralForm;
