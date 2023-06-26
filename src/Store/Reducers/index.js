import { combineReducers } from "redux";
import CorporateReducer from "./CorporateReducer";
import DashboardReducer from "./DashboardReducer";
import HomeReducer from "./HomeReducer";

const AllReducers = combineReducers({
    HomeReducer: HomeReducer,
    CorporateReducer: CorporateReducer,
    DashboardReducer: DashboardReducer,
});

export default AllReducers;