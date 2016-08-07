'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';

import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import { changeRecordFieldValue, clearRecord, saveRecord } from '../actions/doctors';

let IntlPolyfill = require('intl');
let DateTimeFormat = IntlPolyfill.DateTimeFormat;
require('intl/locale-data/jsonp/ru');

class DoctorRecord extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.clearRecord();
        this.props.changeRecordFieldValue('id', null, null, this.props.params.id);
    }

    render() {
        return(
            <div style={{marginLeft: 'auto', marginRight: 'auto', width: 300}}>
                <DatePicker
                    hintText="Дата приема"
                    key="field-date"
                    value={this.props.doctor.record.date ? new Date(this.props.doctor.record.date) : null}
                    autoOk={true}
                    minDate={new Date()}
                    locale="ru"
                    DateTimeFormat={DateTimeFormat}
                    formatDate={dateValue => {
                        let now = new Date(dateValue);
                        let m = now.getMonth();
                        m++;
                        let d = now.getDate();
                        let y = now.getFullYear();
                        return (d < 10 ? '0' : '') + d + '.' + (m < 10 ? '0' : '') + m + '.' + y;
                    }}
                    cancelLabel="Отмена"
                    onChange={this.props.changeRecordFieldValue.bind(this, 'date')}
                />
                <SelectField
                    key="field-time"
                    value={this.props.doctor.record.time_interval}
                    maxHeight={200}
                    hintText="Время приема"
                    disabled={this.props.doctor.record.date ? false : true}
                    onChange={this.props.changeRecordFieldValue.bind(this, 'time_interval')}
                >{this.props.doctor.dateTimeIntervals.map(interval => {
                    return (
                        <MenuItem value={interval.id} key={'time-interval-value' + interval.id} primaryText={interval.title} />
                    );
                })}
                </SelectField>
                <TextField
                    key="field-user"
                    value={this.props.doctor.record.user_title}
                    hintText="Ваше ФИО"
                    onChange={this.props.changeRecordFieldValue.bind(this, 'user_title')}
                />
                <TextField
                    key="field-phone"
                    value={this.props.doctor.record.user_phone}
                    hintText="Контактный телефон"
                    onChange={this.props.changeRecordFieldValue.bind(this, 'user_phone')}
                />
                <TextField
                    key="field-comment"
                    hintText="Комментарий"
                    multiLine={true}
                    value={this.props.doctor.record.comment}
                    rows={2}
                    rowsMax={5}
                    onChange={this.props.changeRecordFieldValue.bind(this, 'comment')}
                /><br />
                <RaisedButton label="Записаться" primary={true} onClick={() => this.props.saveRecord()} />
            </div>
        );
    }
}

export default connect(
    state => ({ doctor: state.doctors }),
    dispatch => ({
        clearRecord: bindActionCreators(clearRecord, dispatch),
        changeRecordFieldValue: bindActionCreators(changeRecordFieldValue, dispatch),
        saveRecord: bindActionCreators(saveRecord, dispatch)
    })
)(DoctorRecord)