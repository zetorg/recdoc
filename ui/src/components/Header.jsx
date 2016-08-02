'use strict';

import React from 'react';
import AppBar from 'material-ui/AppBar';
import * as Colors from 'material-ui/styles/colors';
import { browserHistory } from 'react-router';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <AppBar
                title="Запись к врачу"
            />
        )
    }
}

export default connect()(Header)