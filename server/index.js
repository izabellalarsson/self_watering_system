const five = require('johnny-five');
const request = require('request');
const dotenv = require('dotenv');
const board = new five.Board();
const server = require('http').createServer();
const io = require('socket.io')(server);

dotenv.config();

server.listen(4000);
let minValue = 30;
let maxValue = 70;
let number = 0;
let manualStartValue = null;

const sendSMS = () => {
  request.post(
    'https://api.46elks.com/a1/sms',
    {
      auth: {
        username: process.env.ELKS_USERNAME, // Specify your API username
        password: process.env.ELKS_PASSWORD // Specify your API password
      },
      form: {
        from: 'Plantan',
        to: process.env.SMS_NUMBER,
        message: 'I NEED WATER'
      }
    },
    (err, res, body) => {
      if (res.statusCode == 200) {
        console.log('Sent! The API responded:');
        console.log(JSON.parse(body));
      } else {
        console.log('Error:');
        console.log(body);
      }
    }
  );
};

// The board's pins will not be accessible until
// the board has reported that it is ready
board.on('ready', () => {
  console.log('Ready!');
  const pump = new five.Pin(3);
  const sensor = new five.Sensor({ pin: 'A0', type: 'analog' });
  let isWatering = false;
  let manualWatering = false;

  pump.low();
  let noWaterTimer = null;
  const handleNoWater = number => {
    return setTimeout(() => {
      if (manualWatering) {
        if (number < manualStartValue + 3) {
          sendSMS();
          pump.low();
        }
      } else {
        if (number < minValue + 3) {
          sendSMS();
          pump.low();
        }
      }
    }, 1000);
  };

  io.on('connection', socket => {
    socket.emit('defaultMinValue', minValue);
    socket.emit('defaultMaxValue', maxValue);
    socket.on('minValue', min => {
      minValue = min;
    });
    socket.on('maxValue', max => {
      maxValue = max;
    });
    socket.on('startWatering', () => {
      manualWatering = true;
      manualStartValue = number;
      pump.high();
      noWaterTimer = handleNoWater(number);
    });
    socket.on('stopWatering', () => {
      manualWatering = false;
      clearTimeout(noWaterTimer);
      pump.low();
    });
  });

  sensor.on('change', raw => {
    number = Math.floor((sensor.value / 1023) * 100);
    number = 100 - number;
    io.sockets.emit('percent', number);

    if (number <= minValue && !isWatering && !manualWatering) {
      isWatering = true;
      pump.high();

      clearTimeout(noWaterTimer);
      noWaterTimer = handleNoWater(number);
    }

    if (number >= maxValue && isWatering && !manualWatering) {
      isWatering = false;
      pump.low();
    }
  });
});
