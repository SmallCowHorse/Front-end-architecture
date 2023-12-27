import EventEmitter from "eventemitter3";

// 1. 事件触发
export enum CountdownEventName {
    START = 'start',
    STOP = 'stop',
    RUNNING = 'running'
}

// 1.1 统一接口
interface CountdownEventMap {
    [CountdownEventName.START]: [];
    [CountdownEventName.STOP]: [];
    [CountdownEventName.RUNNING]: [RemainTimeData];
}

// 1.2 刻度接口
export interface RemainTimeData {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    count: number;
}

// 2. 内部系统状态
enum CountdownStatus {
    running,
    paused,
    stoped
}

// 3. 核心主类实现
export class Countdown extends EventEmitter<CountdownEventName> {
    // 刻度细化关联 => 相对标志
    private static COUNT_IN_MILLSECOND: number = 1 * 100
    private static SECOND_IN_MILLSECOND: number = 10 * Countdown.COUNT_IN_MILLSECOND
    private static MINUTE_IN_MILLSECOND: number = 60 * Countdown.SECOND_IN_MILLSECOND
    private static HOUR_IN_MILLSECOND: number = 60 * Countdown.MINUTE_IN_MILLSECOND
    private static DAY_IN_MILLSECOND: number = 24 * Countdown.HOUR_IN_MILLSECOND

    private endTime: number
    private step: number
    private remainTime: number
    private status: CountdownStatus = CountdownStatus.stoped
    static timerId: number

    // 初始化
    constructor(endTime: number, step = 1e3) {
        super()

        this.endTime = endTime
        this.step = step
        this.remainTime = 0;

        if (Countdown.timerId) {
            clearTimeout(Countdown.timerId)
        }

        this.start()
    }

    // 开始
    start() {
        this.emit(CountdownEventName.START)
        this.status = CountdownStatus.running

        // 倒计时开始
        this.countdown()
    }
    // 停止
    stop() {
        this.emit(CountdownEventName.STOP)
        this.status = CountdownStatus.stoped
    }

    // 倒计时
    countdown() {
        if(this.status !== CountdownStatus.running) return

        this.remainTime = Math.max(this.endTime - Date.now(), 0)
        this.emit(
            CountdownEventName.RUNNING,
            // 处理当前倒计时
            this.parseRemainTime(this.remainTime)
        )

        if (this.remainTime > 0) {
            Countdown.timerId = window.setTimeout(() => this.countdown(), this.step)
        } else {
            this.stop()
        }
    }

    // 解析
    private parseRemainTime(remainTime: number): RemainTimeData {
        let time = remainTime

        const days = Math.floor(time / Countdown.DAY_IN_MILLSECOND)
        time = time % Countdown.DAY_IN_MILLSECOND

        const hours = Math.floor(time / Countdown.HOUR_IN_MILLSECOND)
        time = time % Countdown.HOUR_IN_MILLSECOND
        
        const minutes = Math.floor(time / Countdown.MINUTE_IN_MILLSECOND)
        time = time % Countdown.MINUTE_IN_MILLSECOND

        const seconds = Math.floor(time / Countdown.SECOND_IN_MILLSECOND)
        time = time % Countdown.SECOND_IN_MILLSECOND

        const count = Math.floor(time / Countdown.COUNT_IN_MILLSECOND)

        return {
            days,
            hours,
            minutes,
            seconds,
            count
        }
    }
}

export function fillZero(num: number) {
    return `0${num}`.slice(-2)
}