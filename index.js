require('dotenv').config();
require('colors');

const { 
    inquirerMenu,
    pause,
    readInput,
    listPlaces
} = require("./helpers/inquirer");

const Searches = require('./models/searches');

const cityInfo = (city) => {
  console.log('\nInformation of the city\n'.green);
    console.log('City: '.yellow + city.name);
    console.log('Lat: '.yellow + city.lat);
    console.log('Long: '.yellow + city.long);
};

const weatherInfo = (weather) => {
    console.log('Description: '.yellow + weather.desc);
    console.log('Temp: '.yellow + weather.temp);
    console.log('Min temp: '.yellow + weather.min);
    console.log('Max temp: '.yellow + weather.max);
};


const main = async () => {
    const searches = new Searches();

        let opt;

        do {
            opt = await inquirerMenu();

            switch (opt) {
                case 1: // Create tasks
                    const city = await readInput('City: ');

                    // List results
                    const cities = await searches.cities(city);

                    // Select place details
                    const idPlace = await listPlaces(cities);
                    if (idPlace === '0') continue;

                    const selPlace = cities.find(place => place.id === idPlace);
                    searches.addToLog(selPlace.name); // Adds the found place to log array

                    cityInfo(selPlace);
                    const weather = await searches.weatherPlace(selPlace.lat, selPlace.long);
                    weatherInfo(weather);
                    break;
                case 2: // List all tasks

                    searches.capitalizedLog.forEach((place, i) => {
                        const idx = `${i + 1}. `.green;
                        console.log(`${idx} ${place}`);
                    })
                default:
                    break;
            };
            if (opt !== 0) await pause();
        } while (opt !== 0)
};


main();