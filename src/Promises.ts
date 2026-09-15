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