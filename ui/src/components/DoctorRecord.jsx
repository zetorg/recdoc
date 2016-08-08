'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';

import Dialog from 'material-ui/Dialog';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import { changeRecordFieldValue, clearRecord, saveRecord,
    closeModalSaveRecord, getBusyDates } from '../actions/doctors';

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
        this.props.getBusyDates(this.props.params.id);
    }

    validateForm()
    {
        let validateFields = ['date', 'time_interval', 'user_title', 'user_phone'];
        for (let i = 0; i < validateFields.length; i++)
        {
            if ( !this.props.doctor.record[validateFields[i]])
            {
                this.refs['field-' + validateFields[i]].focus();
                return false;
            }
        }

        return true;
    }

    formateDate(date) {
        let now = new Date(date);
        let m = now.getMonth();
        m++;
        let d = now.getDate();
        let y = now.getFullYear();

        return y + '-' + (m < 10 ? '0' : '') + m + '-' + (d < 10 ? '0' : '') + d;
    }

    render() {
        return(
            <div style={{marginLeft: 'auto', marginRight: 'auto', width: 300}}>
                <DatePicker
                    hintText="Дата приема"
                    ref="field-date"
                    key="field-date"
                    value={this.props.doctor.record.date ? new Date(this.props.doctor.record.date) : null}
                    autoOk={true}
                    minDate={new Date()}
                    locale="ru"
                    errorText={this.props.doctor.record.date ? null : 'Обязательное поле'}
                    DateTimeFormat={DateTimeFormat}
                    formatDate={dateValue => this.formateDate(dateValue)}
                    cancelLabel="Отмена"
                    shouldDisableDate={date => {
                        let result = false;
                        if (this.props.doctor.busyDates.indexOf(this.formateDate(date)) >= 0) {
                            result = true;
                        }
                        return result;
                    }}
                    onChange={this.props.changeRecordFieldValue.bind(this, 'date')}
                />
                <SelectField
                    ref="field-time_interval"
                    key="field-time"
                    value={this.props.doctor.record.time_interval}
                    maxHeight={200}
                    hintText="Время приема"
                    errorText={this.props.doctor.record.time_interval ? null : 'Обязательное поле'}
                    disabled={this.props.doctor.record.date ? false : true}
                    onChange={this.props.changeRecordFieldValue.bind(this, 'time_interval')}
                >{this.props.doctor.dateTimeIntervals.map(interval => {
                    return (
                        <MenuItem value={interval.id} key={'time-interval-value' + interval.id} primaryText={interval.title} />
                    );
                })}
                </SelectField>
                <TextField
                    ref="field-user_title"
                    key="field-user"
                    value={this.props.doctor.record.user_title}
                    hintText="Ваше ФИО"
                    errorText={this.props.doctor.record.user_title ? null : 'Обязательное поле'}
                    onChange={this.props.changeRecordFieldValue.bind(this, 'user_title')}
                />
                <TextField
                    ref="field-user_phone"
                    key="field-phone"
                    value={this.props.doctor.record.user_phone}
                    hintText="Контактный телефон"
                    errorText={this.props.doctor.record.user_phone ? null : 'Обязательное поле'}
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
                <RaisedButton
                    label="Записаться"
                    primary={true}
                    onClick={() => {
                        if ( this.validateForm() ) {
                            this.props.saveRecord();
                        }
                    }} />
                <Dialog
                    title="Запись добавлена"
                    actions={<RaisedButton label="Ок" onTouchTap={() => {
                            this.props.closeModalSaveRecord();
                            if (this.props.doctor.modalSaveRecord.success) {
                                browserHistory.push('/');
                            }
                        }
                    } />}
                    modal={true}
                    open={this.props.doctor.modalSaveRecord.open}
                >
                    {this.props.doctor.modalSaveRecord.msg}
                </Dialog>
            </div>
        );
    }
}

export default connect(
    state => ({ doctor: state.doctors }),
    dispatch => ({
        clearRecord: bindActionCreators(clearRecord, dispatch),
        changeRecordFieldValue: bindActionCreators(changeRecordFieldValue, dispatch),
        saveRecord: bindActionCreators(saveRecord, dispatch),
        closeModalSaveRecord: bindActionCreators(closeModalSaveRecord, dispatch),
        getBusyDates: bindActionCreators(getBusyDates, dispatch)
    })
)(DoctorRecord)