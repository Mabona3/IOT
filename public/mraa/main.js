// requiring the library
const mraa = require('mraa');

console.log("mazen and atwa's team with mraa: ", mraa.getversion());

const high = 1;
const low = 0;
const level_sensor = new mraa.aio(0);
const motor = new mraa.pwm(3);
const led2 = new mraa.gpio(6);
const led3 = new mraa.gpio(9);

led2.dir(mraa.dir_out);
led3.dir(mraa.dir_out);

led2.write(low);
led3.write(low);

motor.enable(true);
motor.period_us(2000);

motor.write(high);

function writemotor() {
  const level = level_sensor.read();
  console.log(level);

  if (level > 900) {
    motor.write(low);
  } else {
    motor.write(low);
  }
}

setinterval(writemotor, 1000);
