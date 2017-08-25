import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { authSvc } from './AuthSvc'

export class CheckAuth extends Component {
    render(){
        let isauth = authSvc.isAuthed()
        return isauth ? (null) : (<Redirect to='/login'/>)
    }
}