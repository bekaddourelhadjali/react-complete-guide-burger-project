import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const withNavigation = (Component) => {
    return (props) => {
        const navigate = useNavigate();
        const [searchParams,setSearchParams] = useSearchParams();
        return (
            <Component {...props} navigate={navigate} searchParams={searchParams} setSearchParams={setSearchParams}/>
        );
    };
};

export default withNavigation;