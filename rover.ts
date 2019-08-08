/**
* Makecode block for micro:bit EduFun Rover
*/

namespace SGBotic {
    export enum lineSenosr {
        left = 0x01,
        middle = 0x02,
        right = 0x03
    }
  
    export enum motor {
        left = 0x01,
        right = 0x02
    }
  
    // slow PWM frequency for slower speeds to improve torque
    function setPWM(speed: number): void
    {
        if (speed < 200)
            pins.analogSetPeriod(AnalogPin.P0, 60000);
        else if (speed < 300)
            pins.analogSetPeriod(AnalogPin.P0, 40000);
        else
            pins.analogSetPeriod(AnalogPin.P0, 30000);
    }
    
   //% subcategory=EduFun_Rover  color=#Cfa3FF 
   //% blockId=edufunRover-drive-motor block="drive|%index|motor at speed %speed"
    //% weight=85
    //% speed.min=-1023 speed.max=1023
    export function driveMotor(index: motor, speed: number): void {
        let speed0 = 0;
        let speed1 = 0;
        setPWM(Math.abs(speed));
        if (speed > 0)
        {
            speed0 = speed;
            speed1 = 0;
        }
        else
        {
            speed0 = 0;
            speed1 = 0 - speed;
        }
        
        if(index == motor.left)
        {
            pins.analogWritePin(AnalogPin.P13, speed0);
            pins.analogWritePin(AnalogPin.P14, speed1);
        }
        if(index == motor.right)
        {
            pins.analogWritePin(AnalogPin.P15, speed1);
            pins.analogWritePin(AnalogPin.P16, speed0);
        }
    }
    
    
   //% subcategory=EduFun_Rover  color=#Cfa3FF 
   //% blockId=edufunRover-stop-motor block="stop %index| motor"
    //% weight=80
    export function stopMotor(index: motor): void {
        if(index === motor.left)
        {
            pins.analogWritePin(AnalogPin.P13, 0);
            pins.analogWritePin(AnalogPin.P14, 0);
        }else
        {
            pins.analogWritePin(AnalogPin.P15, 0);
            pins.analogWritePin(AnalogPin.P16, 0);
        }
    }
    
    
   //% subcategory=EduFun_Rover  color=#Cfa3FF 
   //% blockId=edufunRover-stop-all block="stop All motors"
    //% weight=79
    //% blockGap=50
    export function MotorStopAll(): void {
        pins.analogWritePin(AnalogPin.P13, 0);
        pins.analogWritePin(AnalogPin.P14, 0);
        pins.analogWritePin(AnalogPin.P15, 0);
        pins.analogWritePin(AnalogPin.P16, 0);
       
    }
    
    
    /**
    * Read line following sensor
    */
    //% subcategory=EduFun_Rover  color=#Cfa3FF 
    //% blockId="edufunRover-line-sensor" block="line sensor pin %pin"
    //% weight=10 color=#Cfa3FF 
    //% pin.defl=DigitalPin.P8
    export function lineSensor(pin: DigitalPin): number {
        pins.setPull(pin, PinPullMode.PullUp);
        if(pins.digitalReadPin(pin) === 1)
        {
            return 0;
        }else{
            return 1;
        }
        //return pins.digitalReadPin(pin);
        
    }

    /**
    * Read ultrasonic sensor
    */
    //% subcategory=EduFun_Rover  color=#Cfa3FF 
    //% blockId="edufunRover-ultrasonic" block="ultrasonic (cm) trig %trig| echo %echo"
    //% weight=0 color=#Cfa3FF 
    //% trig.defl=DigitalPin.P6 echo.defl=DigitalPin.P7
    export function ultrasonic(trig: DigitalPin, echo: DigitalPin, maxCmDistance = 500): number {
        
        pins.setPull(trig, PinPullMode.PullNone);
        pins.digitalWritePin(trig, 0);
        control.waitMicros(2);
        pins.digitalWritePin(trig, 1);
        control.waitMicros(10);
        pins.digitalWritePin(trig, 0);        
        
        const d = pins.pulseIn(echo, PulseValue.High, maxCmDistance * 58);
       
        return Math.idiv(d, 58);
    }
    
}