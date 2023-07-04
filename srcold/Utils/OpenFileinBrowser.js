import { actionGetS3AttachmentRequest } from "../Store/Sagas/CommonSagaAction";
import { GetAttachment } from "./GetAttachment";

export const openFileInBrowser = (data, fileName) => {
  console.log(data, fileName, "FILES");
  if (data.length < 250) {
    GetAttachment(data);
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
};
