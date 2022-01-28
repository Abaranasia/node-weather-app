
const axios = require('axios').default;

class Searches {
    log = ['Barcelona', 'Valencia', 'Tegicigalpa', 'Madrid'];

    constructor() {
        // check if DB exists
    }

    async cities(place = '') {
        try {
            /*             const instance = axios.create({
                            baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
                            params: {
                                //'types': 'place',
                                'access_token': 'pk.eyJ1IjoicmFua2lybGlhbiIsImEiOiJja3lydGRmajQwMnd6MnVuMXltOXY4eXBqIn0.ofNe1i41vgsh4mai1AlD1w',
                                //'limit': 5,
                            },
                        }); */
            // const resp = await instance.get();
            const token = process.env.MAPBOX_KEY;

            const resp = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json?types=place&access_token=${token}`);
            //console.log(resp.data.features);
            return resp.data.features.map(place => ({
                id: place.id,
                name: place.place_name,
                long: place.center[0],
                lat: place.center[1],
            }));

        } catch (error) {
            console.warn(error);
            return [];
        }
    }

    get paramsWeather() {
        return {
            appid: process.env.OPERWEATHER_KEY,
            units: 'metric'
        }
    };

    //http request
    async weatherPlace(lat, lon) {
        try {
            const resp = await axios.get(`http://api.openweathermap.org/data/2.5/weather`, { params: { ...this.paramsWeather, lat, lon } });
            /*             const instance = axios.create({
                            baseURL: 'http://api.openweathermap.org/data/2.5/weather',
                            params: { ...this.paramsWeather, lat, lon }
                        });
                        console.log(instance); */
            //const resp = await instance.get();
            const { weather, main } = resp.data;
            return {
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp,
            }

        } catch (error) {
            console.warn(error);
            return [];
        }
    };

    addToLog(place = '') {
        // skip dups
        if (this.log.includes(place.toLocaleLowerCase())) {

        }
        this.log.unshift(place);

    }


}

module.exports = Searches;