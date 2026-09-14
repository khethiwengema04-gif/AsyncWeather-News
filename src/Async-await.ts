// const weatherurl =
//     'https://api.open-meteo.com/v1/forecast?latitude=-29.8587&longitude=31.0218&current_weather=true';

// const newsUrl = 'https://dummyjson.com/posts?limit=3';



// const fetchWeatherAndNews = async () => {
//     console.log('Fetching Weather and News Data starting...');

//     try {
//         // Fetching Weather only
//         console.log('Fetching Weather response...');
//         const weatherResponse = await fetch(weatherurl);

//         if (!weatherResponse.ok) {
//             console.log("Error fetching weather data:", weatherResponse.statusText);
//         }

//         console.log("Unpacking weather data into Json...");
//         const weatherData = await weatherResponse.json();
//         console.log(weatherData);

//         // Fetching News only
//         console.log("Fetching news data...");
//         const newsResponse = await fetch(newsUrl);

//         if (!newsResponse.ok) {
//             console.log("Error fetching news data:", newsResponse.statusText);
//         }

//         console.log("Unpacking weather data into Json")
//         const newsData = await newsResponse.json()
//         console.log(newsData)

//         console.log("Weather and News fetched Successfully.")

//     } catch (error) {
//         console.error("Error Fetching data:", error)
//     }
//     console.log('Fetching Weather and News Data completed.');
// }
// fetchWeatherAndNews();