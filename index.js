require('dotenv').config();
require('colors');

const { 
    inquirerMenu,
    pause,
    readInput 
} = require("./helpers/inquirer");

const Searches = require('./models/searches');

const cityInfo = (city) => {
  console.log('\nInformation of the city\n'.green);
  console.log('City: ');
  console.log('Lat: ');
  console.log('Long: ');
  console.log('Temp: ');
  console.log('Min temp: ');
  console.log('Max temp: ');
};


const main = async () => {
    const searches = new Searches();

        let opt;

        do {
            opt = await inquirerMenu();

            switch (opt) {
                case 1: // Create tasks
                    const city = await readInput('City: ');
                    await searches.city(city);
                    cityInfo(city);
                    break;
                case 2: // List all tasks
                console.log("op2");
                    break;
                default:
                    break;
            };
            if (opt !== 0) await pause();
        } while (opt !== 0)
};


main();