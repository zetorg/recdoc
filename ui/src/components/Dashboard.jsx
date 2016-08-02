'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Dashboard extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<div className="row">
				<div className='col-md-12 col-xs-12'>Список врачей</div>
			</div>
		);
	}
}

export default connect()(Dashboard)