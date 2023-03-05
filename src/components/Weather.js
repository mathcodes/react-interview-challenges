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

  // useEffect(() => {
  //   handleGetTemp();
  //   handleGetWind();
  //   handleGetHumidity();
  //   handleGetPrecipitation();
  // }, []);

  return (
    <div className="container mx-auto">
      <div className="flex flex-col items-center justify-center">
        <div className="weather page with tailwind style">
          <div className="weather card">
            <div className="weather card header">
              <div className="weather card header text">
                <h1 className="pt-10 text-4xl font-bold text-center text-white">Weather</h1>
              </div>
              <div className="weather facts">
                <div
                  className="p-2 m-1 text-orange-300 border rounded-md text-md bg-zinc-800 border-zinc-400 hover:border-orange-700" onClick={handleGetTemp}
                >
                  Temperature: {temp}
                </div>
              </div>
              <div className="weather facts">
                <div
                  className="p-2 m-1 text-orange-300 border rounded-md text-md bg-zinc-800 border-zinc-400 hover:border-orange-700" onClick={handleGetWind}
                >
                  Wind Speed: {wind}
                </div>
              </div>
              <div className="weather facts">
                <div
                  className="p-2 m-1 text-orange-300 border rounded-md text-md bg-zinc-800 border-zinc-400 hover:border-orange-700" onClick={handleGetHumidity}
                >
                  Humidity: {humidity}
                </div>
              </div>
              <div className="weather facts">
                <div
                  className="p-2 m-1 text-orange-300 border rounded-md text-md bg-zinc-800 border-zinc-400 hover:border-orange-700" onClick={handleGetPrecipitation}
                >
                  Precipitation: {precipitation}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
