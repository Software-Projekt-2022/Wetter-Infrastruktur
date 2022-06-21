const fetching = require('./fetching');
const evaluation = require('./evaluation');
var warnings=[];
var weatherData;
var histoData;
var airData;
var riverData;
var pollenData;
var allData = {};

/**
 * This function is called when the server starts up/resets. It fetches the data, sends it to the frontend and evaluates it.
 * @param {*} app 
 */
exports.startUp = async function(app) {
    weatherData=await fetching.fetchWeather();
    histoData=await fetching.fetchHistoricalWeather();
    airData=await fetching.fetchAir();
    riverData=await fetching.fetchRiver();
    pollenData=await fetching.fetchPollen();
    
    warnings.push(await evaluation.evaluateWeather(weatherData));
    warnings.push(await evaluation.evaluateAir(airData));
    warnings.push(await evaluation.evaluateRiver(riverData));
    warnings.push(await evaluation.evaluatePollen(pollenData));

    allData = {
        "weather": weatherData,
        "historicalWeather": histoData,
        "air": airData,
        "river": riverData,
        "pollen": pollenData,
        "warnings": warnings,
        "events": {
            "content": {
                "title": "Event 1",
                "description": "Event 1 description",
                "time_start": "2022-05-13T12:00:00.000Z",
                "time_end": "2022-05-13T14:00:00.000Z",
                "adress": "Event 1 adress",
            },
        }
    }

    app.get('/getAllData', async(req, res) => {
        res.send(allData)
    });
}

/**
 * This function is called to refresh the data. It fetches the data and sends it to the frontend.
 * @param {*} app 
 */
exports.refreshData = async function(app) {
    weatherData=await fetching.fetchWeather();
    histoData=await fetching.fetchHistoricalWeather();
    airData=await fetching.fetchAir();
    riverData=await fetching.fetchRiver();
    pollenData=await fetching.fetchPollen();

    allData = {
        "weather": weatherData,
        "historicalWeather": histoData,
        "air": airData,
        "river": riverData,
        "pollen": pollenData,
        "warnings": warnings,
        "events": {
            content: {
                "title": "Event 12",
                "description": "Event 1 description",
                "time_start": "2022-05-13T12:00:00.000Z",
                "time_end": "2022-05-13T14:00:00.000Z",
                "adress": "Event 1 adress",
            }
        }
    }

    app.get('/getAllData', async(req, res) => {
        res.send(allData)
    });
}