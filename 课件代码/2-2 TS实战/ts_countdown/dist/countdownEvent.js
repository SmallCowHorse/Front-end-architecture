"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fillZero = exports.Countdown = exports.CountdownEventName = void 0;
// eventemitter3 - on once emit off getEvent
const eventemitter3_1 = require("eventemitter3");
var CountdownEventName;
(function (CountdownEventName) {
    CountdownEventName["START"] = "start";
    CountdownEventName["STOP"] = "stop";
    CountdownEventName["RUNNING"] = "running";
})(CountdownEventName || (exports.CountdownEventName = CountdownEventName = {}));
var CountdownStatus;
(function (CountdownStatus) {
    CountdownStatus[CountdownStatus["running"] = 0] = "running";
    CountdownStatus[CountdownStatus["paused"] = 1] = "paused";
    CountdownStatus[CountdownStatus["stoped"] = 2] = "stoped";
})(CountdownStatus || (CountdownStatus = {}));
class Countdown extends eventemitter3_1.EventEmitter {
    constructor(endTime, step = 1e3) {
        super();
        this.status = CountdownStatus.stoped;
        this.endTime = endTime;
        this.step = step;
        this.remainTime = 0;
        this.start();
    }
    start() {
        this.emit(CountdownEventName.START);
        this.status = CountdownStatus.running;
        this.countdown();
    }
    stop() {
        this.emit(CountdownEventName.STOP);
        this.status = CountdownStatus.stoped;
    }
    countdown() {
        if (this.status !== CountdownStatus.running)
            return;
        this.remainTime = Math.max(this.endTime - Date.now(), 0);
        this.emit(CountdownEventName.RUNNING, this.calcRemainTimeData(this.remainTime));
        // 是否需要停止
        if (this.remainTime > 0) {
            setTimeout(() => this.countdown(), this.step);
        }
        else {
            this.stop();
        }
    }
    calcRemainTimeData(remainTime) {
        let time = remainTime;
        const count = Math.floor(time / 100);
        const seconds = Math.floor(time / (100 * 10));
        time = time % (100 * 10);
        const minutes = Math.floor(time / (100 * 10 * 60));
        time = time % (100 * 10 * 60);
        const hours = Math.floor(time / (100 * 10 * 60 * 60));
        time = time % (100 * 10 * 60 * 60);
        return {
            hours,
            minutes,
            seconds,
            count
        };
    }
}
exports.Countdown = Countdown;
function fillZero(num) {
    return `0${num}`.slice(-2);
}
exports.fillZero = fillZero;
