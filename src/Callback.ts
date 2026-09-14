import https from 'https'


type WeatherData = {
    current_weather: {
        temperature: number
        windspeed: number
        humidity:number
    }
}

type NewsPost = {
    id: number
    title: string
    body: string
}

type NewsData = {
    posts: NewsPost[]
}

function fetchData(url: string, callback: (error: Error | null, data?: string) => void): void {
    https.get(url, (response) => {
        let rawData = ''
        response.on('data', (chunk) => { rawData += chunk })
        response.on('end', () => { callback(null, rawData) })
        response.on('error', (error) => { callback(new Error(error.message)) })
    }).on('error', (error) => { callback(new Error(error.message)) })
}

function fetchWeather(callback: (error: Error | null, weather?: WeatherData) => void): void {
    const url = 'https://api.open-meteo.com/v1/forecast?latitude=-29.86&longitude=31.02&current_weather=true'
    fetchData(url, (error, data) => {
        if (error) { callback(error); return }
        callback(null, JSON.parse(data!) as WeatherData)
    })
}

function fetchNews(callback: (error: Error | null, news?: NewsData) => void): void {
    const url = 'https://dummyjson.com/posts?limit=5'
    fetchData(url, (error, data) => {
        if (error) { callback(error); return }
        callback(null, JSON.parse(data!) as NewsData)
    })
}

fetchWeather((error, weather) => {
    if (error) { console.error('Weather error:', error.message); return }
    const w = weather!.current_weather
    console.log('Temperature:', w.temperature, '°C')
    console.log('Wind Speed:', w.windspeed, 'km/h')

    fetchNews((error, news) => {
        if (error) { console.error('News error:', error.message); return }
        news!.posts.forEach((post, i) => {
            console.log(`${i + 1}. ${post.title}`)
        })
    })
})