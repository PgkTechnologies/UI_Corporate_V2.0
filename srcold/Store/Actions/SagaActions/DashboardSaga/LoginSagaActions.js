export const actionLoginRequestSaga = (request) => {
	return {
		type: 'LOGIN-REQUEST',
		payload: request
	};
};

export const actionLogoutRequestSaga = (request) => {
	return {
		type: 'LOGOUT-REQUEST',
		payload:request
	};
};

export const actionValidateReferralRequestSaga = (request) =>{
	return {
		type: 'VALIDATE-REFERRAL-CODE-REQUEST',
		payload: request
	};
}