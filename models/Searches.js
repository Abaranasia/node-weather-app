
const axios = require('axios').default;

class Searches {
    log = ['Barcelona', 'Valencia', 'Tegicigalpa', 'Madrid'];

    constructor() {
        // check if DB exists
    }

    async city (place = '') {


        try {
            
            const instance = axios.create ({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ place }.json`,
                params: {
                    //'types': 'place',
                    'access_token': 'pk.eyJ1IjoicmFua2lybGlhbiIsImEiOiJja3lydGRmajQwMnd6MnVuMXltOXY4eXBqIn0.ofNe1i41vgsh4mai1AlD1w',
                    //'limit': 5,
                },
            });
           // const resp = await instance.get();
            const token= process.env.MAPBOX_KEY;

            const resp= await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${ place }.json?types=place&access_token=${token}`);
            console.log(resp.data);
        } catch (error) {
            console.warn(error)
        }
        //http request

        return [];
    }


}

module.exports = Searches;