import React from 'react';
import classes from './SideDrawer.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../../Navigation/NavigationItems/NavigationItems';
import Aux from '../../../hoc/Auxx/Auxx';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {
    let attachedClasses= [classes.SideDrawer, classes.Close];
    if(props.open){
        attachedClasses= [classes.SideDrawer, classes.Open];
    }

    return  (
    <Aux>
        <Backdrop show={props.open} clicked={props.closed} />
        <div className={attachedClasses.join(" ")}>
            <div className={classes.Logo}>
                <Logo />
            </div>
            <nav ><NavigationItems /></nav>
        </div>
        
    </Aux> 
    )
    };

export default sideDrawer;