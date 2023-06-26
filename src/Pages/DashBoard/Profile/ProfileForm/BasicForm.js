import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import PgkTextField from "../../../../Components/FormFields/PgkTextField";
import PgkSelectField from "../../../../Components/FormFields/PgkSelectField";
import { actionGetDependencyLookUpsSagaAction } from "../../../../Store/Actions/SagaActions/CommonSagaActions";
import Checkbox from '@material-ui/core/Checkbox';

const BasicForm = (props) => {
  const dispatch = useDispatch();
  const [corporateTypes, setCorporateTypes] = useState([]);
  const [corporateCategories, setCorporateCategories] = useState([]);
  const [corporateIndustries, setCorporateIndustries] = useState([]);
  const {gstn} = props?.profileInfo;

  localStorage.setItem('tpID', props?.profileData?.stakeholderID?.value);

  const onGetDependencyLookUpsResponse = (response) => {
    setCorporateTypes(
      response?.corporateType?.length
        ? response.corporateType.map((item) => {
          if (item?.corporateTypeCode) {
            return {
              value: item.corporateTypeCode,
              label: item.corporateTypeName,
            };
          }
        })
        : []
    );

    setCorporateCategories(
      response?.corporateCategory?.length
        ? response.corporateCategory.map((item) => {
          if (item?.categoryName) {
            return {
              value: item.categoryCode,
              label: item.categoryName,
            };
          }
        })
        : []
    );

    setCorporateIndustries(
      response?.corporateIndustry?.length
        ? response.corporateIndustry.map((item) => {
          if (item?.industryName) {
            return {
              value: item.industryCode,
              label: item.industryName,
            };
          }
        })
        : []
    );
  };

  useEffect(() => {
    dispatch(
      actionGetDependencyLookUpsSagaAction({
        apiPayloadRequest: [
          "corporateType",
          "corporateCategory",
          "corporateIndustry",
        ],
        callback: onGetDependencyLookUpsResponse,
      })
    );
  }, []);

  return (
    <div className="profile-box">
      <aside className="profile-side">
        <h3 className="profile-side-title">Basic</h3>
      </aside>
      <div className="profile-data">
        <div className="row">
          <div className="col-md">
            <div className="mb-20 d-flex">
              {props?.check && (
                <div style={{ width: '40px' }} />)}
              <PgkTextField
                name="stakeholderID"
                value={
                  props?.profileData?.stakeholderID?.value !== undefined
                    ? props?.profileData?.stakeholderID?.value
                    : ""
                }
                errorMessage={props?.profileData?.stakeholderID?.errorMessage}
                label={"Stakeholder ID"}
                disabled
                required={props?.profileData?.stakeholderID?.isRequired}
              />
            </div>
          </div>
          <div className="col-md">
            <div className="mb-20 d-flex">
              {props?.check && (
                <Checkbox size={'small'} color={'primary'} name={'CIN'} checked={props?.checkData?.CIN ? true : false} onChange={(e) => {
                  props?.handleCheckData(
                    e.target.name,
                    !props?.checkData?.CIN
                  );
                }} />)}
              <PgkTextField
                name="CIN"
                value={
                  props?.profileData?.CIN?.value !== undefined
                    ? props?.profileData?.CIN?.value
                    : ""
                }
                onChange={props?.onChange}
                label={"Organization Registration ID / CIN"}
                disabled={props?.disable !== undefined ? props?.disable : false}
                errorMessage={props?.profileData?.CIN?.errorMessage}
                required={props?.profileData?.CIN?.isRequired}
              />
            </div>
          </div>
          <div className="w-100"></div>
          <div className="col-md">
            <div className="mb-20 d-flex">
              {props?.check && (
                <Checkbox size={'small'} color={'primary'} name={'corporateType'} checked={props?.checkData?.corporateType ? true : false} onChange={(e) => {
                  props?.handleCheckData(
                    e.target.name,
                    !props?.checkData?.corporateType
                  );
                }} />)}
              <PgkSelectField
                name={"corporateType"}
                onChange={props?.onChange}
                disabled
                value={props?.profileData?.corporateType?.value ? props?.profileData?.corporateType?.value : ''}
                required={props?.profileData?.corporateType?.isRequired}
                options={corporateTypes}
                label={"Corporate Sector"}
              />
            </div>
          </div>
          <div className="col-md">
            <div className="mb-20 d-flex">
              {props?.check && (
                <Checkbox size={'small'} color={'primary'} name={'corporateCategory'} checked={props?.checkData?.corporateCategory ? true : false} onChange={(e) => {
                  props?.handleCheckData(
                    e.target.name,
                    !props?.checkData?.corporateCategory
                  );
                }} />)}
              <PgkSelectField
                name={"corporateCategory"}
                onChange={props?.onChange}
                disabled
                value={props?.profileData?.corporateCategory?.value ? props?.profileData?.corporateCategory?.value : ''}
                required={props?.profileData?.corporateCategory?.isRequired}
                options={corporateCategories}
                label={"Corporate Category"}
              />
            </div>
          </div>
          <div className="w-100"></div>
          <div className="col-md">
            <div className="mb-20 d-flex">
              {props?.check && (
                <Checkbox size={'small'} color={'primary'} name={'corporateIndustry'} checked={props?.checkData?.corporateIndustry ? true : false} onChange={(e) => {
                  props?.handleCheckData(
                    e.target.name,
                    !props?.checkData?.corporateIndustry
                  );
                }} />)}
              <PgkSelectField
                name={"corporateIndustry"}
                onChange={props?.onChange}
                disabled={props?.disable !== undefined ? props?.disable : false}
                value={props?.profileData?.corporateIndustry?.value ? props?.profileData?.corporateIndustry?.value : ''}
                options={corporateIndustries}
                label={"Industry Vertical"}
                required={props?.profileData?.corporateIndustry?.isRequired}
              />
            </div>
          </div>
          <div className="col-md">
            <div className="mb-20 d-flex">
              {props?.check && (
                <Checkbox size={'small'} color={'primary'} name={'yearOfEstablishment'} checked={props?.checkData?.yearOfEstablishment ? true : false} onChange={(e) => {
                  props?.handleCheckData(
                    e.target.name,
                    !props?.checkData?.yearOfEstablishment
                  );
                }} />)}
              <PgkTextField
                type={"number"}
                name="yearOfEstablishment"
                value={
                  props?.profileData?.yearOfEstablishment?.value !== undefined
                    ? parseInt(props?.profileData?.yearOfEstablishment?.value)
                    : ""
                }
                onChange={props?.onChange}
                errorMessage={
                  props?.profileData?.yearOfEstablishment?.errorMessage
                }
                label={"Year of Establishment"}
                disabled
                validations={["isNumeric", "minLength_4", "maxLength_4"]}
                required={props?.profileData?.yearOfEstablishment?.isRequired}
              />
            </div>
          </div>
          <div className="w-100"></div>
          <div className="col-md">
            <div className="mb-20 d-flex">
              <PgkTextField
                name="gstn"
                value={props?.profileInfo?.gstn ? props?.profileInfo?.gstn : ''}
                errorMessage={props?.profileData?.gstn?.errorMessage}
                label={"gstn"}
                disabled
                required={props?.profileData?.gstn?.isRequired}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicForm;
