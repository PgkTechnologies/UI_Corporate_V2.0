import React, { useEffect } from "react";
// import PortalModal from "./../Portals/PortalModal";
import PortalModal from "../../src/Portals/PortalModal"
const $ = window.$;

const CustomModal = (props) => {
  useEffect(() => {
    if (props?.show) {
      $("#customModal").modal("show");
    } else {
      $("#customModal").modal("hide");
    }

    $(".modal-backdrop").remove();
  });

  return (
    props?.show && (
      <PortalModal>
      
        <div className="modal portalModalChildren" data-backdrop="static" data-keyboard="false" id={"customModal"} tabIndex={-1}>
          <div
            className={`modal-dialog modal-lg modal-dialog-centered`}
            role="document"
            style={{...props?.modalStyles}}
          >
            <div className="modal-content">{props?.children}</div>
          </div>
        </div>
      </PortalModal>
    )
  );
};

export default CustomModal;
