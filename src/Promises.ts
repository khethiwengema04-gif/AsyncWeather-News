import https from 'http'

type WeatherData ={
 current_weather: { temparature:number; windspeed:number; weathercode:number}
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

function fetchWeather(): Promise<NewsData> {
    const url =  'https://api.open-meteo.com/v1/forecast?latitude=-29.86&longitude=31.02&current_weather=true'
    return fetchData(url).then((data) => JSON.parse(data) as NewsData)
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