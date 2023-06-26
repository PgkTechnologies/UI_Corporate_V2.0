import * as actionType from "../Store/Actions/ActionTypes";
import { actionGetS3AttachmentRequest } from "../Store/Sagas/CommonSagaAction";
import { onGetFileInfo } from "./Utils";

export const GetAttachment = (data) => {
  return (dispatch) => {
    dispatch(
      actionGetS3AttachmentRequest({ path: data, callback: onGetFileInfo })
    );
  };
};
