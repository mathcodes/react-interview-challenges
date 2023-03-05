import React, { useState, useEffect } from 'react';

export default function Weather() {
  const [temp, setTemp] = useState('');
  const [wind, setWind] = useState('');
  const [humidity, setHumidity] = useState('');
  const [precipitation, setPrecipitation] = useState('');
  let apiKey = '31b40bbc1dd3415db1783017232602';
  // use the temo and setTemp to create handleGetTemp
  const handleGetTemp = async (e) => {
    try {
      const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=28449&days=1&aqi=no&alerts=no`);
      const data = await response.json();
      console.log(data);

      // Update the temp state using the setTemp function
      const temp = data.current.temp_f;
      console.log(temp);
      setTemp(temp);
    } catch (error) {
      console.error('Error fetching temp:', error);
    }
  };

  const handleGetWind = async (e) => {
    try {
      const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=28449&days=1&aqi=no&alerts=no`);
      const data = await response.json();
      console.log(data);
      const wind = data.current.wind_mph;

      console.log(wind);
      setWind(wind);
      console.log(wind);
    } catch (error) {
      console.error('Error fetching wind:', error);
    }
  };

  const handleGetHumidity = async (e) => {
    try {
      const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=28449&days=1&aqi=no&alerts=no`);
      const data = await response.json();
      console.log(data);
      const humidity = data.current.humidity;
      console.log(humidity);
      setHumidity(humidity);
      // handleSendMessage(newMessage);
    } catch (error) {
      console.error('Error fetching humidity:', error);
    }
  };

  const handleGetPrecipitation = async (e) => {
    try {
      const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=28449&days=1&aqi=no&alerts=no`);
      const data = await response.json();
      console.log(data);
      const precipitation = data.current.precip_in;
      console.log(precipitation);
      setPrecipitation(precipitation);
      // handleSendMessage(newMessage);
    } catch (error) {
      console.error('Error fetching precipitation:', error);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex flex-col items-center justify-center">

        <div className="weather card">
          <div className="weather card header text">
            <h1 className="pt-10 text-4xl font-bold text-center text-white">Weather</h1>
          </div>
          <div className="grid justify-between grid-cols-2 gap-3 my-auto mt-6 lg:grid-cols-4 card header">
            {/* Temperature */}
            <div className="grid w-full m-6 ">
              <div className="grid justify-between h-24 gap-2 p-6 m-1 border text-violet-400 text-md bg-zinc-800 border-zinc-400 hover:border-violet-600"
                onClick={handleGetTemp}
              >
                Temperature:
                <div
                  className="w-12 h-8 my-auto text-blue-400 border rounded-md text-md bg-zinc-800 border-zinc-400 hover:border-violet-600"
                  onClick={handleGetTemp}
                >
                  {temp}
                </div>
              </div>
            </div>
            {/* Wind Speed */}
            <div className="grid w-full m-6">
              <div className="flex justify-between p-2 m-1 my-auto border text-violet-400 text-md bg-zinc-800 border-zinc-400 hover:border-violet-600"
                onClick={handleGetWind}
              >
                Wind Speed:
                <div
                  className="p-2 m-1 text-blue-400 border rounded-md text-md bg-zinc-800 border-zinc-400 hover:border-violet-600"
                  onClick={handleGetPrecipitation}
                >
                  {wind}
                </div>
              </div>
            </div>
            {/* Humidity */}
            <div className="grid w-full m-6">
              <div className="flex justify-between p-2 m-1 my-auto border text-violet-400 text-md bg-zinc-800 border-zinc-400 hover:border-violet-600"
                onClick={handleGetHumidity}
              >
                Humidity:
                <div
                  className="p-2 m-1 text-blue-400 border rounded-md text-md bg-zinc-800 border-zinc-400 hover:border-violet-600"
                  onClick={handleGetPrecipitation}
                >
                  {humidity}
                </div>
              </div>
            </div>
            {/* Precipitation */}
            <div className="grid w-full mx-6">
              <div className="flex justify-between p-2 m-1 my-auto border text-violet-400 text-md bg-zinc-800 border-zinc-400 hover:border-violet-600"
                onClick={handleGetPrecipitation}
              >
                Precipitation:
                <div
                  className="p-2 m-1 text-blue-400 border rounded-md text-md bg-zinc-800 border-zinc-400 hover:border-violet-600"
                  onClick={handleGetPrecipitation}
                >
                  {precipitation}
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>

    </div>

  );
}


