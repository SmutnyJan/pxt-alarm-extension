//% weight=100 color=#d1242c icon="\uf0f3" block="Alarm"
namespace alarm {
    let alarm = false
    let methodLock = false

    /**
    * Provede akci v moment, kdy je zapnutý alarm
    * @action Příkazy, které se provedou při moc zapnutí alarmu
    */
    //% block="Při zapnutí alarmu"
    export function onAlarm(action: () => void) {
        const eventID = 111 + Math.randomRange(0, 100);

        control.onEvent(eventID, 0, function () {
            control.inBackground(() => {
                methodLock = true
                action()
                methodLock = false
            })
        })

        control.inBackground(() => {
            while (true) {
                if (alarm) {
                    action()
                }
                basic.pause(20)
            }
        })
    }



    /**
    * Spustí alarm a pošle všem zařízením v okolí pokyn ke spuštění alarmu
    * @message Pokyn
    */
    //% block="Spusť alarm a pošli pokyn || %message"

    export function turnOnAlarmAndBroadcast(message?: string): void {
        if (message == null) {
            message = "alarm_on"
        }
        if (alarm == false) {
            radio.sendString(message)
        }
        alarm = true
    }

    /**
    * Vypne alarm a pošle všem zařízením v okolí pokyn k vypnutí alarmu
    * @message Pokyn
    */
    //% block="Vypni alarm a pošli pokyn || %message"

    export function turnOffAlarmAndBroadcast(message?: string): void {
        if (message == null) {
            message = "alarm_off"
        }
        if (alarm == true) {
            radio.sendString(message)
        }
        alarm = false
    }


    /**
    * Přijme pokyn od jiného zařízení, vrací true/false podle toho, jestli je alarm vypnutý nebo zapnutý
    * @message Pokyn
    */
    //% block="Přijmout pokyn %message"

    export function receiveBroadcast(message: string): boolean {
        if (message == "alarm_on") {
            turnOnAlarmAndBroadcast("alarm_on")
        } else if (message == "alarm_off") {
            turnOffAlarmAndBroadcast("alarm_off")
        }
        return alarm
    }
}