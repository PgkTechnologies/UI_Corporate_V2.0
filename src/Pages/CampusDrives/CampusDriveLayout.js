import { useNavigate } from "react-router-dom";
import JobSmallTab from "./DefineJobs/DefineJobsSubDivisions/JobSmallTab";

const CampusDriveLayout = (props) => {

  const history = useNavigate();

  const getTabSection = () => {
    if (
      props?.tabs?.length &&
      props.tabs.some((item) => item.isActive === true)
    ) {
      let currentIndex = 0;
      props?.tabs.forEach((item, index) => {
        if (item.isActive) {
          currentIndex = index;
        }
      });

      if (props?.tabs[currentIndex].section) {
        return props?.tabs[currentIndex].section;
      }
    }
  };

  const navigateToHome = (campusDriveId, universityId) => {
    history("/jobs");
  };

  const navigateTo1 = (campusDriveId, universityId) => {
    history(
      "/jobs/" + campusDriveId + "/define-jobs/" + universityId
    );
  };

  const navigateTo2 = (campusDriveId, universityId) => {
    history(
      "/jobs/" +
      campusDriveId +
      "/communication/" +
      universityId
    );
  };

  const navigateTo3 = (campusDriveId, universityId) => {
    history(
      "/jobs/" +
      campusDriveId +
      "/interviews/" +
      universityId
    );
  };

  return <>

    <div className="jobs-layout-main">
      <div className="row home-title-steps-main">
        <div
          className="col-2 d-flex justify-content-center align-items-center"
          onClick={() => {
            navigateToHome();
          }}
        >
          <div className="home-main">Home </div>
        </div>
        <div className="col-10 title-steps-main">
          <div className="steper-main">
            <div
              className={
                props.round === "1" ? "step-card tab-select" : "step-card"
              }
              onClick={() => {
                navigateTo1(props.campusDriveId, props.universityId);
              }}
            >
              <div className="num-icon">1</div>
              <div className="step-name">Define Jobs</div>
            </div>
            <div
              className={
                props.round === "2" ? "step-card tab-select" : "step-card"
              }
              onClick={() => {
                navigateTo2(props.campusDriveId, props.universityId);
              }}
            >
              <div className="num-icon">2</div>
              <div className="step-name">Communication</div>
            </div>
            <div
              className={
                props.round === "3" ? "step-card tab-select" : "step-card"
              }
              onClick={() => {
                navigateTo3(props.campusDriveId, props.universityId);
              }}
            >
              <div className="num-icon">3</div>
              <div className="step-name">Campus interviews</div>
            </div>
          </div>
        </div>
      </div>
      <div className="row home-title-steps-main">
        <div className="col-2">
          {props.tabs.map((item, index) => (
            <JobSmallTab
              index={index}
              lable={item.label}
              icon={item.iconName}
              active={item.isActive}
              onTab={item.onClick}
            />
          ))}
        </div>
        <div className="col-10 content-main">
          {!props?.tabs.some((item) => item.isActive === true) ? (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ width: "100%", height: "100%" }}
            >
              <p
                className="text-center"
                style={{ fontSize: ".850rem", color: "#a1a1a1" }}
              >
                Select any option to preview the content here
              </p>
            </div>
          ) : undefined}
          {getTabSection()}
        </div>
      </div>
    </div>
  </>

}

export default CampusDriveLayout;