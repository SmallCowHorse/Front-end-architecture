"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const countdownEvent_1 = require("./countdownEvent");
const countdown = new countdownEvent_1.Countdown(Date.now() + 12 * 60 * 60 * 1000, 1000);
countdown.on(countdownEvent_1.CountdownEventName.RUNNING, remainTimeData => {
    const { hours, minutes, seconds, count } = remainTimeData;
    console.log([hours, minutes, seconds, count]
        .map(countdownEvent_1.fillZero)
        .join(':'));
});
// '10:23:11:05'
