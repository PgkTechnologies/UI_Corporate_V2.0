import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import routes from '../../routes';
import { Outlet} from 'react-router-dom';


const Layout = (props) => {
    const [status, setStatus] = useState(false);
    const apiStatus = useSelector(state => state.CorporateReducer.apiStatus);

    // useEffect(() => {
    //     if (apiStatus) {
    //         setStatus(true);
    //         // history('/register/authentication');
    //     }
    //     // return () => {
    //     //     dispatch(ResetRdrAction());
    //     // }
    // }, [apiStatus])

    // const getRoutes = (routes) => {
    //     return routes.map((route, i) => {
    //         return route.component ? (<Route path={route.path}
    //             key={i}
    //             exact={route.exact}
    //             strict={route.strict}
    //             name={route.name}
    //             render={props => <route.component {...props} />}
    //         />) : (null)
    //     });
    // }

    return (
        <>
           <p> hiiii layout</p>

        </>
    )
}

export default Layout;
