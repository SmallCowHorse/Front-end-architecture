import { CountdownEventName } from "./countdownEvent"
import { Countdown, fillZero, } from "./countdownEvent"

const countdown = new Countdown(Date.now() + 60 * 60 * 1000, 1000)

countdown.on(
    // 倒计时实时监听的和打印
    CountdownEventName.RUNNING,
    remainTimeData => {
        const {
            hours,
            minutes,
            seconds,
            count
        } = remainTimeData

        console.log(
            [hours, minutes, seconds, count]
                .map(fillZero)
                .join(':')
        )

        // '10:23:11:15' => '10:23:05:06'
    }
)
