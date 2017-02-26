'use strict';

import React from 'react';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';

class Records extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="row">
                <List>
                    <Subheader>Записей {this.props.records.length}</Subheader>
                    {this.props.records.map(record => {
                        return (
                            <ListItem
                                primaryText={record.user_title}
                            />
                        );
                    })}

                </List>
            </div>
        );
    }
}

export default connect(
    state => ({ records: state.doctors.records })
)(Records)