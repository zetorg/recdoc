'use strict';

import React from 'react';
import { isFunction } from 'lodash';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RefreshIndicator from 'material-ui/RefreshIndicator';

import Header from './Header.jsx';

class Application extends React.Component {

    constructor(props) {
        super(props);
    }

    getChildContext() {
        return { muiTheme: getMuiTheme() };
    }

    render() {

        return (
            <div>
                <Header />
                <div style={{position: 'absolute', left: '50%', marginLeft: '-25px', marginTop: 100, width: 50, indexZ: 1000}}>
                    <RefreshIndicator
                        size={40}
                        left={10}
                        top={10}
                        status={this.props.app.progress > 0 ? 'loading' : 'hide'}
                        style={{display: 'inline-block', position: 'relative'}}
                    />
                </div>
                <div className="container">
                    {this.props.children && React.cloneElement(this.props.children)}
                </div>
            </div>
        );
    }
}

Application.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired
};

export default connect(
    state => ({
        app: state.app
    })
)(Application)