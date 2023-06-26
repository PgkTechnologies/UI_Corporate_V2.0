import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import routes from '../../routes';
import { useSelector } from 'react-redux';
import { useIdleTimer } from 'react-idle-timer';
import { useNavigate } from "react-router";
import { useDispatch } from 'react-redux';
import { actionLogoutRequestSaga } from '../../Store/Actions/SagaActions/DashboardSaga/LoginSagaActions';
import { Outlet} from 'react-router-dom';
import {useAuth} from "../../utils/Auth"
import Header from '../Common/Header/Header';
import BodySideBar from '../Common/BodySidebar/BodySideBar';

const DashboardLayout = () => {
    const apiStatus = useSelector(state => state.DashboardReducer.apiStatus);
    const dispatch = useDispatch();
    const history = useNavigate();
    const auth = useAuth();

    const handleOnIdle = event => {
        dispatch(actionLogoutRequestSaga());
        history('/');
    }

    const handleOnActive = event => {
        //console.log('user is active', event)
        //console.log('time remaining', getRemainingTime())
    }

    const handleOnAction = event => {
        // console.log('user did something', event)
    }

    const { getRemainingTime, getLastActiveTime } = useIdleTimer({
        timeout: 1000 * 60 * 15,
        onIdle: handleOnIdle,
        onActive: handleOnActive,
        onAction: handleOnAction,
        debounce: 500
    });

    const logout = () => {
        dispatch(actionLogoutRequestSaga());
        history("/");
        auth.logOut();
        localStorage.clear();
        localStorage.setItem("email", "");
        localStorage.setItem("type", "");
        localStorage.setItem("auth_token", "");
      };

      useEffect(() => {
        const tokenView = localStorage.getItem("AUTH");
        //console.log(tokenView, "TOKENNNNNNNNNNNNNNNNNNN");
        const authentication = tokenView;
        if (authentication) {
          auth.logIn(authentication);
        }
      }, []);

    return (
     <div className='App'>
        <Header logout={logout} /> 
        <BodySideBar/>
     </div>
    )
}

export default DashboardLayout;
