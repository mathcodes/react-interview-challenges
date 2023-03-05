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
      // reference the temp from state and define it at data.current.temp_f;
      temp = data.current.temp_f;
      console.log(temp);
      setTemp(temp);
      // handleSendMessage(newMessage);
    } catch (error) {
      console.error('Error fetching temp:', error);
    }
  };




  const handleGetWind = async (e) => {
    try {
      const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=28449&days=1&aqi=no&alerts=no`);
      const data = await response.json();
      console.log(data);
      wind = data.current.wind_mph;
      console.log(wind);
      setWind(wind);
      // handleSendMessage(newMessage);
    } catch (error) {
      console.error('Error fetching wind:', error);
    }
  };

  const handleGetHumidity = async (e) => {
    try {
      const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=28449&days=1&aqi=no&alerts=no`);
      const data = await response.json();
      console.log(data);
      humidity = data.current.humidity;
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
      precipitation = data.current.precip_in;
      console.log(precipitation);
      setPrecipitation(precipitation);
      // handleSendMessage(newMessage);
    } catch (error) {
      console.error('Error fetching precipitation:', error);
    }
  };

  useEffect(() => {
    handleGetTemp();
    handleGetWind();
    handleGetHumidity();
    handleGetPrecipitation();
  }, []);




  // return a page wit container and lots of tailwind styling including all animations available:

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
                <h1>Temperature</h1>
                {temp}
              </div>
              <div className="weather facts">
                <h1>Wind</h1>
                {wind}
              </div>
              <div className="weather facts">
                <h1>Humidity</h1>
                {humidity}
              </div>
              <div className="weather facts">
                <h1>Precipitation</h1>
                {precipitation}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
