'use strict';

import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';

import { getDoctors } from '../actions/doctors';

class Dashboard extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.getDoctors();
	}

	render() {
		return(
			<div className="row">
				{this.props.doctors.map(doctor => {
					return (
						<div className='col-md-6 col-xs-12'>
							<Card>
								<CardHeader
									title={doctor.title}
									subtitle="Subtitle"
									actAsExpander={true}
								/>
							</Card>
						</div>
					);
				})}
			</div>
		);
	}
}

export default connect(
	state => ({ doctors: state.doctors.list }),
	dispatch => ({
		getDoctors: bindActionCreators(getDoctors, dispatch)
	})
)(Dashboard)