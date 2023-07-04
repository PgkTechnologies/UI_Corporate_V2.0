// Redux Saga: Root Saga
import { all } from 'redux-saga/effects';
import LoginWatcherSaga from './LoginWatcherSaga';
import CorporateProfileWatcherSaga from './CorporateProfileWatcherSaga';
import CommonWatcherSaga from './CommonWatcherSaga';
import HiringWatcherSaga from './HiringWatcherSaga';
import JobsWatcherSaga from './JobsWatcherSaga';
import OtherInformationWatcherSaga from './OtherInformationWatcherSaga';
import SubscriptionWatcherSaga from './SubscriptionWatcherSaga';
import DashboardWatcherSaga from './DashboardWatcherSaga';
import NotificationsWatcherSaga from './NotificationsWatcherSaga';
import PublishHistoryWatcherSaga from './PublishHistoryWatcherSaga';
import SupportWatcherSaga from './SupportWatcherSaga';
import AnalyticsWatcherSaga from './AnalyticsWatcherSaga';
import TransactionHistoryWatcherSaga from './TransactionHistoryWatcherSaga';
import CampusDriveWatcherSaga from './CampusDriveWatcherSaga';
import DefineJobsWatcherSaga from './CampusDriveWorkflowWatchers/DefineJobsWatcherSaga';
import CommunicationWatcherSaga from './CampusDriveWorkflowWatchers/CommunicationWatcherSaga';
import CampusInterviewWatcherSaga from './CampusDriveWorkflowWatchers/CampusInterviewWatcherSaga';
import ForgotPasswordWatcherSaga from "../Sagas/ForgotPasswordWatcherSaga";
import OffCampusDriveWatcherSaga from './OffCampusDriveWatcherSaga';

export function* webportalAppRootSaga() {
	yield all([
		LoginWatcherSaga(),
		CorporateProfileWatcherSaga(),
		CommonWatcherSaga(),
		HiringWatcherSaga(),
		JobsWatcherSaga(),
		OtherInformationWatcherSaga(),
		SubscriptionWatcherSaga(),
		DashboardWatcherSaga(),
		NotificationsWatcherSaga(),
		PublishHistoryWatcherSaga(),
		SupportWatcherSaga(),
		AnalyticsWatcherSaga(),
		TransactionHistoryWatcherSaga(),
		CampusDriveWatcherSaga(),
		DefineJobsWatcherSaga(),
		CommunicationWatcherSaga(),
		ForgotPasswordWatcherSaga(),
		CampusInterviewWatcherSaga(),
		OffCampusDriveWatcherSaga()
	]);
}
