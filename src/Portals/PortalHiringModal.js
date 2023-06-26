import { createPortal } from "react-dom";

const PortalHiringModal = (props) => {

    const element = document.getElementById('modal');
    return createPortal(props.children, element);
};

export default PortalHiringModal;