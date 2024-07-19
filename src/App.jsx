import React, { useState, useEffect } from "react";
import axios from 'axios';

const App = () => {
  const [input,setInput] = useState('')
  const[weatherData, setWeatherData] = useState()
  const [submitted,setSubmitted] = useState(false)

  const API_KEY = 'b97cbdaea1933eb583979a03e56d4682'
  
  const BASE_URL =` https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${API_KEY}`
  // https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}  

  useEffect(() => {
    fetchData()
  }, [])
  

  const fetchData = async () => {
    try {
      const fetch = await axios.get(BASE_URL)
      console.log(fetch.data);
      setWeatherData(fetch.data)
      setSubmitted(true)
    } catch (error) {
      console.log('Error Fetching Data: ',error);
      
    }
  }
  const formatTime = (time) => {
    const date = new Date(time*1000)
    const options = {
      hour: 'numeric',
      minute: 'numeric'
    };
    return date.toLocaleTimeString([],options)
  }
  return (
    <div
      className="max-w-md mx-auto mt-8 rounded-lg overflow-clip shadow-2xl bg-gray-400
     px-4 py-4 hover:shadow-white"
    >
      {/* Search Box */}

      <div className="flex items-center bg-white border-b border-gray-200 p-2  shadow-black shadow-2xl rounded-3xl">
        <input
          type="text"
          className="flex-1 text-center font-semibold font-sans appearance-none bg-transparent border-none w-full text-black mr-3 py-2 px-2 leading-light focus:outline-none"
          placeholder="Enter City Name"
          onChange={(e)=>setInput(e.target.value)}
        />
        <button className="bg-blue-500 hover:bg-blue-950 text-white font-bold py-2 px-4 rounded-3xl " onClick={()=>fetchData()}>
          Submit
        </button>
      </div>

      {/* Weather Details Card */}
      {weatherData && (
      <div className="p-4">
        <div className="text-black  font-sans font-semibold text-xl mb-2 text-center">
          Weather Details
        </div>

        <div className="border border-gray-300 p-4 rounded-lg bg-white shadow-2xl shadow-black">
          <p className="mb-4 font-normal  font-sans">
            <p className="font-bold">Coordinates:</p> Latitude: {weatherData?.coord?.lat},
            Longitude: {weatherData?.coord?.lon}
          </p>
          <p className="mb-2 font-normal  font-sans">
            <span className="font-bold">Temperature:</span> {Math.round(weatherData?.main?.temp-273)}°C
          </p>
          <p className="mb-2 font-normal  font-sans">
            <span className="font-bold">Pressure:</span> {weatherData?.main?.pressure} Pa
          </p>
          <p className="mb-2 font-normal  font-sans">
            <span className="font-bold">Humidity:</span> {weatherData?.main?.humidity} %
          </p>

          <div className="flex justify-center">
            <p className="mb-2 font-normal  font-sans">
              <span className="font-bold">Wind Speed:</span> {weatherData?.wind?.speed}km/h
            </p>
            <p className="mb-2 font-normal  font-sans">
              <span className="font-bold">Sunrise:</span> {formatTime(weatherData?.sys?.sunrise)}
            </p>
            <p className="mb-2 font-normal  font-sans">
              <span className="font-bold">Sunset:</span> {formatTime(weatherData?.sys?.sunset)}
            </p>
          </div>
        </div>
      </div>
      )}
    </div>
  );
};

export default App