import React from 'react';
import { useState } from 'react';
import "./calendar.css"
const Calendar = () => {
    const currentDate = new Date();
    const [year, setYear] = useState(currentDate.getFullYear())
    const [month, setMonth] = useState(currentDate.getMonth())
    const handleDecreaseMonth = () => {
        if (month <= 0) {
            setMonth(11);
            setYear(year - 1)
        }
        else {
            setMonth(month - 1);
        }
    }
    const handleIncreaseMonth = () => {
        if (month >= 11) {
            setMonth(0);
            setYear(year + 1)
        }
        else {
            setMonth(month + 1)
        }
    }
    const showDate = () => {
        var xhtml = [];
        const date = new Date(year, month + 1, 0);
        const prevDate = new Date(year, month, 0);
        const lastDayInLastMonth = prevDate.getDay();
        const daysInLastMonth = prevDate.getDate()
        const daysInMonth = date.getDate();
        for (var i = lastDayInLastMonth - 1; i >= 0; i--) {
            xhtml.push(
                <div className="calendar-card old-day" key={i + 32} >
                    <div className="calendar-day ">
                        {daysInLastMonth - i}
                    </div>
                </div>
            )
        }
        for (var i = 1; i <= daysInMonth; i++) {
            xhtml.push(
                <div className="calendar-card " key={i}>
                    <div className="calendar-day">
                        {i}
                    </div>
                </div>
            )
        }
        return (<div className="calendar-board">
            {xhtml}
        </div>)
    }
    return (
        <div className="calendar-board">
            <div className="calendar-title">
                <button
                    className="button is-success is-inline-block"
                    onClick={handleDecreaseMonth}
                ><ion-icon className="f-15" name="caret-back-outline"></ion-icon></button>
                <div className="calendar-month-year">
                    <span>Month: {month + 1}</span>
                    <span>Year: {year}</span>
                </div>

                <button
                    className="button is-success is-inline-block"
                    onClick={handleIncreaseMonth}
                ><ion-icon className="f-15" name="caret-forward-outline"></ion-icon></button>
            </div>
            <div className="calendar-button">


            </div>
            <div className="calendar-date">
                <div className="has-text-centered is-inline-block">
                    Mon
                </div>
                <div className="has-text-centered is-inline-block">
                    Tue
                </div>
                <div className="has-text-centered is-inline-block">
                    Web
                </div>
                <div className="has-text-centered is-inline-block">
                    Thu
                </div>
                <div className="has-text-centered is-inline-block">
                    Fri
                </div>
                <div className="has-text-centered is-inline-block">
                    Sat
                </div>
                <div className="has-text-centered is-inline-block">
                    <h4>Sun</h4>
                </div>

            </div>
            {showDate()}
        </div>
    );
}

export default Calendar;
