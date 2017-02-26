'use strict';

import React from 'react';
import AppBar from 'material-ui/AppBar';
import * as Colors from 'material-ui/styles/colors';
import { browserHistory } from 'react-router';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getRecords } from '../actions/doctors';

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getRecords();
    }

    render() {
        return (
            <AppBar
                title={'Записей ' + this.props.recordsLen}
            />
        )
    }
}

export default connect(
    state => ({ recordsLen: state.doctors.records.length }),
    dispatch => ({
        getRecords: bindActionCreators(getRecords, dispatch)
    })
)(Header)