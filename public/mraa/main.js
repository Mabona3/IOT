// Requiring the Library
const mraa = require('mraa');

console.log("Mazen and Atwa's Team with mraa: ", mraa.getVersion());

const HIGH = 1;
const LOW = 0;
const level_sensor = new mraa.Aio(0);
const motor = new mraa.Pwm(3);
const led2 = new mraa.Gpio(6);
const led3 = new mraa.Gpio(9);

led2.dir(mraa.DIR_OUT);
led3.dir(mraa.DIR_OUT);

led2.write(LOW);
led3.write(LOW);

motor.enable(true);
motor.period_us(2000);

motor.write(HIGH);

function writeMotor() {
  const level = level_sensor.read();
  console.log(level);

  if (level > 900) {
    motor.write(LOW);
  } else {
    motor.write(LOW);
  }
}

setInterval(writeMotor, 1000);
