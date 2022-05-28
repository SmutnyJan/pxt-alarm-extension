# Alarm

## Namespace
```
alarm
```
## Popis
Toto rozšíření funguje jako alarm, který se spustí po zmačknutí tlačítka (nebo provedení jakéhokoli jiného vstupu). Alarm funguje cyklicky, což znamená, že pokud máme s dosahu microbity se správným programem (kódem), tak zapnutí alarmu pošle zprávu microbitům v okolím, že mají také spustit alarm (začít houkat). Tyto microbity to opět pošlou dál. Tímto způsobem se dá vytvořit takový „řetěz“. Alarm se poté dá i vypnout a to z jakéhokoli microbitu. Takže například na microbitu A zmáčkneme tlačítko. Microbit začne houkat a pošle microbitům v okolí zprávu, ať taky začnout houkat. Ty to opět pošlou dál. Zprávu dostane i microbit Z, na kterém zmáčkneme zase jiné tlačítko a tím alarm vypneme. Microbit Z tedy přestane houkat a pošle zprávu microbitům v okolí, aby taky přestaly houkat. Zpráva se nakonec dostane až k microbitu A, který původně alarm zapnul.
 
## Metody
### Při zapnutí alarmu
```
function onAlarm(action: () => void)
```
- Provede akci v moment, kdy je zapnutý alarm
- Parametry:
    - action (delegát)
- Bez návratové hodnoty

### Spusť alarm a pošli pokyn || %message
```
function turnOnAlarmAndBroadcast(message?: string): void
```
- Spustí alarm a pošle všem zařízením v okolí pokyn ke spuštění alarmu (blok se dá rozšířit o vlastní parametr)
- Parametry:
    - message (nullable string)
- Bez návratové hodnoty

### Vypni alarm a pošli pokyn || %message
```
function turnOffAlarmAndBroadcast(message?: string): void
```
- Vypne alarm a pošle všem zařízením v okolí pokyn k vypnutí alarmu (blok se dá rozšířit o vlastní parametr)
- Parametry:
    - message (nullable string)
- Bez návratové hodnoty

### Přijmout pokyn %message
```
function receiveBroadcast(message: string): boolean
```
- Přijme pokyn od jiného zařízení, vrací true/false podle toho, jestli je alarm vypnutý nebo zapnutý. Do parametrů se jednoduše přetáhnou argumenty z bloku „když je přijat text“
- Parametry:
    - name (text)
- Návratová hodnota: stav alarmu po přijetí pokynu (bool)

## Příklady

### Alarm s výchozí zprávou

#### Bloky
![Alarm s výchozí zprávou](https://github.com/microbit-cz/pxt-alarm-extension/blob/master/images/easyexample.png)
#### Kód
```
alarm.onAlarm(function () {
    music.playTone(262, music.beat(BeatFraction.Whole))
})
input.onButtonPressed(Button.A, function () {
    basic.showLeds(`
        . . # . .
        . # # # .
        . # # # .
        # # # # #
        . . # . .
        `)
    alarm.turnOnAlarmAndBroadcast()
})
radio.onReceivedString(function (receivedString) {
    vysledek = alarm.receiveBroadcast(receivedString)
    if (vysledek == true) {
        basic.showLeds(`
            . . # . .
            . # # # .
            . # # # .
            # # # # #
            . . # . .
            `)
    } else {
        basic.showLeds(`
            . . # . .
            . # # # .
            . # # # .
            # # # # #
            . . . . .
            `)
    }
})
input.onButtonPressed(Button.B, function () {
    basic.showLeds(`
        . . # . .
        . # # # .
        . # # # .
        # # # # #
        . . . . .
        `)
    alarm.turnOffAlarmAndBroadcast()
})
let vysledek = false
basic.showLeds(`
    . . # . .
    . # # # .
    . # # # .
    # # # # #
    . . . . .
    `)
radio.setGroup(1)
```
Demo  [https://github.com/microbit-cz/pxt-alarm-demo-easy](https://github.com/microbit-cz/pxt-alarm-demo-easy)

### Alarm s vlastní zprávou
#### Bloky
![Alarm s vlastní zprávou](https://github.com/microbit-cz/pxt-alarm-extension/blob/master/images/hardexample.png)

#### Kód
```
alarm.onAlarm(function () {
    music.playTone(262, music.beat(BeatFraction.Whole))
})
input.onButtonPressed(Button.A, function () {
    basic.showLeds(`
        . . # . .
        . # # # .
        . # # # .
        # # # # #
        . . # . .
        `)
    alarm.turnOnAlarmAndBroadcast(onText)
})
radio.onReceivedString(function (receivedString) {
    if (receivedString == onText) {
        basic.showLeds(`
            . . # . .
            . # # # .
            . # # # .
            # # # # #
            . . # . .
            `)
        alarm.turnOnAlarmAndBroadcast(onText)
    } else if (receivedString == offText) {
        basic.showLeds(`
            . . # . .
            . # # # .
            . # # # .
            # # # # #
            . . . . .
            `)
        alarm.turnOffAlarmAndBroadcast(offText)
    }
})
input.onButtonPressed(Button.B, function () {
    basic.showLeds(`
        . . # . .
        . # # # .
        . # # # .
        # # # # #
        . . . . .
        `)
    alarm.turnOffAlarmAndBroadcast(offText)
})
let offText = ""
let onText = ""
radio.setGroup(1)
onText = "alarm_on"
offText = "alarm_off"
basic.showLeds(`
    . . # . .
    . # # # .
    . # # # .
    # # # # #
    . . . . .
    `)
```

Demo  [https://github.com/microbit-cz/pxt-alarm-demo-hard](https://github.com/microbit-cz/pxt-alarm-demo-hard)

#### Metadata (slouží k vyhledávání, vykreslování)

* for PXT/microbit
<script src="https://makecode.com/gh-pages-embed.js"></script><script>makeCodeRender("{{ site.makecode.home_url }}", "{{ site.github.owner_name }}/{{ site.github.repository_name }}");</script>
