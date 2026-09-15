import https from 'http'

type WeatherData ={
 current_weather: { temperature:number; windspeed:number; weathercode:number}
}
type NewsPost = {id:number; title:string; body:string}
type NewsData ={posts: NewsPost[] }

//The core promise worker

function fetchData(url: string) : Promise<string>{
    return new Promise((resolve, reject) => {
        https.get(url,(response) =>{
            let rawData =''
            response.on('data',(chunk) => {rawData += chunk })
            response.on('end',() => resolve(rawData))
            response.on('error',(err) =>reject(new Error(err.message)))
        }).on('error', (err) =>reject(new Error(err.message)))
    })
}

function fetchWeather(): Promise<WeatherData> {
    const url =  'https://api.open-meteo.com/v1/forecast?latitude=-29.86&longitude=31.02&current_weather=true'
    return fetchData(url).then((data) => JSON.parse(data) as WeatherData)
}

function fetchNews(): Promise<NewsData> {
     const url = 'https://dummyjson.com/posts?limit=2'
     return fetchData(url).then((data) => JSON.parse(data) as NewsData)
}
//in this function ,it a timeout promise used in a race and automatically reject after 2000 miliseconds
function createTimeout(ms: number): Promise<never> {
    return new Promise((_,reject) =>
    setTimeout(() =>reject(new Error(`Operation timed out after ${ms}ms`)),ms)
)
}

//this is the PROMISE CHAINING 
//it runs the weather check first,finishes it, then runs the news check

console.log('[Chain] Starting sequential execution...')
fetchWeather()
.then((weather)=>{
    const w = weather.current_weather
    console.log(`[Chain Result] Weather:${w.temperature}°C, Wind: ${w.windspeed}km/h`)
    //returning this promise passes it cleanly down to the next .then()
    return fetchNews()
})
.then((news) =>{
    console.log('[Chain Result] Top Headlines:')
    news.posts.forEach((post, i) => console.log(` ${i + 1}. ${post.title}`))
    //moving to the next demonstration once the chain finishes
    runPromiseAllDemo()
})
.catch((error)=> {
    console.error('[Chain Error] Something failed in the chain:', error.message)
})

//PROMISE ALL
function runPromiseAllDemo() {
    console.log('\n[Promise.all] Starting simultaneous execution...')

    Promise.all([fetchWeather(), fetchNews()])
    .then(([fetchWeather, news])=> {
        console.log(`[Promise.all Result] Finished both! Temp is ${fetchWeather.current_weather.temperature}°C
            and downloaded ${news.posts.length} articles.`)
            //moving to the final demonstration
            runPromiseRaceDemo()
    })
    .catch((error) => {
        console.error('[Promise.all Error] One of the requests failed completely:', error.message)
    })
}

// //PROMISE RACE
// function runPromiseRaceDemo{
//     console.log('\n[Promise.race] Racing weather request against a 2-second timeout window...')
//     Promise.race([fetchWeather(), createTimeout(2000)])
//     .then((weather) => {
//         console.log(`[Promise.race Result] Success! Weather arrived before timeout: ${weather.current_weather.temperature}°C`)
//     })
//     .catch((error) => {
//         console.error('[Promise.race Result] Race finished with a failure:',error.message)
//     })

// }