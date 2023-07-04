import React from 'react';
import { Route, Routes } from 'react-router-dom';
// import RegisterSidebar from '../Common/RegisterSidebar';
import routes from '../../routes';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

// import Register from '../../Pages/Forms/Corporate/Register/Register';
// import CorporateSecondary from '../../Pages/Forms/Corporate/Register/CorporateSecondary';

const RegisterLayout = (props) => {

    const apiStatus = useSelector(state => state.CorporateReducer.apiStatus);

    const dispatch = useDispatch();

    // const getRoutes = (routes) => {
    //     return routes.map((route, i) => {
    //         if (route.role === 'corporateReg') {
    //             return route.component ? (<Route path={route.path}
    //                 key={i}
    //                 exact={route.exact}
    //                 strict={route.strict}
    //                 name={route.name}
    //                 render={props => <route.component {...props} />}
    //             />) : (null)
    //         }
    //     });
    // }

    const type = 'Corporate';
    const mode = localStorage.getItem('rzp_device_id');


    return (
        <>
            <section className="login">
                <Outlet />
            </section>
        </>
    )
}

export default RegisterLayout
