import React, { useState, useEffect } from 'react';
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/20/solid'
import { TiWeatherCloudy, TiWeatherDownpour, TiWeatherNight, TiWeatherPartlySunny, TiWeatherShower, TiWeatherSnow, TiWeatherStormy, TiWeatherSunny, TiWeatherWindyCloudy, TiWeatherWindy } from 'react-icons/ti';
import { BsThermometerHalf, BsFillQuestionCircleFill } from 'react-icons/bs';
import { WiHumidity, WiStrongWind } from 'react-icons/wi';
import { RiTempHotLine, RiTempColdLine } from 'react-icons/ri';
import WeatherChart from './WeatherChart';


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Weather() {
  const [temp, setTemp] = useState('');
  const [wind, setWind] = useState('');
  const [humidity, setHumidity] = useState('');
  const [precipitation, setPrecipitation] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [sunrise, setSunrise] = useState('');
  const [sunset, setSunset] = useState('');
const [ condition, setCondition] = useState('');
const [ high, setHigh] = useState('');
const [ low, setLow] = useState('');
  let apiKey = '31b40bbc1dd3415db1783017232602';
  // use the temo and setTemp to create handleGetTemp



  // const handleGetTemp = async (e) => {
  //   try {
  //     const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=28449&days=1&aqi=no&alerts=no`);
  //     const data = await response.json();
  //     console.log(data);

  //     // Update the temp state using the setTemp function
  //     const temp = data.current.temp_f;
  //     console.log(temp);
  //     setTemp(temp);
  //   } catch (error) {
  //     console.error('Error fetching temp:', error);
  //   }
  // };

  // const handleGetWind = async (e) => {
  //   try {
  //     const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=28449&days=1&aqi=no&alerts=no`);
  //     const data = await response.json();
  //     console.log(data);
  //     const wind = data.current.wind_mph;

  //     console.log(wind);
  //     setWind(wind);
  //     console.log(wind);
  //   } catch (error) {
  //     console.error('Error fetching wind:', error);
  //   }
  // };

  // const handleGetHumidity = async (e) => {
  //   try {
  //     const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=28449&days=1&aqi=no&alerts=no`);
  //     const data = await response.json();
  //     console.log(data);
  //     const precipitation = data.current.precip_in;
  //     console.log(precipitation);
  //     setPrecipitation(precipitation);
  //     const humidity = data.current.humidity;
  //     console.log(humidity);
  //     setHumidity(humidity);
  //     const wind = data.current.wind_mph;
  //     console.log(wind);
  //     setWind(wind);
  //     console.log(wind);
  //     const temp = data.current.temp_f;
  //     console.log(temp);
  //     setTemp(temp);
  //   } catch (error) {
  //     console.error('Error fetching humidity:', error);
  //   }
  // };

  const handleGetWeather = async (e) => {
    try {
      const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=28449&days=1&aqi=no&alerts=no`);
      const data = await response.json();
      console.log(data);

      const humidity = data.current.humidity;
      console.log(humidity);
      setHumidity(humidity);
      const wind = data.current.wind_mph;
      console.log(wind);
      setWind(wind);
      console.log(wind);
      const temp = data.current.temp_f;
      console.log(temp);
      setTemp(temp);
      const sunrise = data.forecast.forecastday[0].astro.sunrise;
      console.log(sunrise);
      setSunrise(sunrise);
      const sunset = data.forecast.forecastday[0].astro.sunset;
      console.log(sunset);
      setSunset(sunset);
      const date = data.forecast.forecastday[0].date;
      console.log(date);
      setDate(date);
      const condition = data.current.condition.text;
      console.log(condition);
      setCondition(condition);
      const high = data.forecast.forecastday[0].day.maxtemp_f;
      console.log(high);
      setHigh(high);
      const low = data.forecast.forecastday[0].day.mintemp_f;
      console.log(low);
      setLow(low);
      // handleSendMessage(newMessage);
    } catch (error) {
      console.error('Error fetching precipitation:', error);
    }
  };

  // const stats = [
  //   {
  //     title: 'Temperature',
  //     nameIcon: BsFillQuestionCircleFill,
  //     stat: temp,
  //     icon: BsThermometerHalf,
  //     change: temp,
  //     changeType: temp,
  //     set: handleGetTemp,
  //   },
  //   {
  //     title: 'Wind',
  //     nameIcon: BsFillQuestionCircleFill,
  //     stat: wind,
  //     icon: TiWeatherWindy,
  //     change: 2.3,
  //     changeType: 'increase',
  //     set: handleGetWind,
  //   },
  //   {
  //     title: 'Humidity',
  //     nameIcon: BsFillQuestionCircleFill,
  //     stat: humidity,
  //     icon: TiWeatherCloudy,
  //     change: 2.8,
  //     changeType: 'decrease',
  //     set: handleGetHumidity,
  //   },
  //   {
  //     title: 'Precipitation',
  //     nameIcon: BsFillQuestionCircleFill,
  //     stat: precipitation,
  //     icon: TiWeatherDownpour,
  //     change: 2.8,
  //     changeType: 'decrease',
  //     set: handleGetPrecipitation,
  //   },
  // ]

  // const stats = [humidity, wind, temp, precipitation,date, sunrise, sunset, condition, high, low]

  const stats = [
    {
      title: 'Temperature',
      icon: BsThermometerHalf,
      getStat: handleGetWeather,
      stat: temp,
      units: ' °F',
    },
    {
      title: 'Wind',
      icon: TiWeatherWindy,
      getStat: handleGetWeather,
      stat: wind,
      units: ' mph',
    },
    {
      title: 'Humidity',
      icon: TiWeatherCloudy,
      getStat: handleGetWeather,
      stat: humidity,
      units: ' %',
    },
    {
      title: 'Date',
      icon: TiWeatherDownpour,
      getStat: handleGetWeather,
      stat: date,
      units: '',
    },
    {
      title: 'Sunrise',
      icon: TiWeatherDownpour,
      getStat: handleGetWeather,
      stat: sunrise,
      units: ' am',
    },
    {
      title: 'Precipitation',
      icon: TiWeatherDownpour,
      getStat: handleGetWeather,
      stat: precipitation,
      units: ' in',
    },
    {
      title: 'Sunset',
      icon: TiWeatherDownpour,
      getStat: handleGetWeather,
      stat: sunset,
      units: ' pm',
    },
    {
      title: 'Condition',
      icon: TiWeatherDownpour,
      getStat: handleGetWeather,
      stat: condition,
      units: '',
    },
    {
      title: 'High',
      icon: RiTempHotLine,
      getStat: handleGetWeather,
      stat: high,
      units: ' °F',
    },
    {
      title: 'Low',
      icon: RiTempColdLine,
      getStat: handleGetWeather,
      stat: low,
      units: ' °F',
    },
  ]

  return (
    <div className="flex flex-col items-center justify-between min-h-screen py-2">
    <h1 className="mt-6 text-2xl font-semibold text-center text-gray-500">Today's Weather</h1>

        <button onClick={handleGetWeather} className="flex px-4 py-2 font-bold text-white rounded-full bg-sky-500 hover:bg-sky-700">
          GET THE WEATHER
        </button>
      <dl className="grid grid-cols-1 gap-5 mt-5 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((item) => (
          <div
            key={item.id}
            className="relative p-3 px-4 overflow-hidden bg-white rounded-lg shadow lg:p-6 "
          >
            <dt>
              <div className="absolute p-3 rounded-md bg-sky-500">
                <item.icon className="w-6 h-6 text-white" aria-hidden="true" />
              </div>
              <div className="ml-16 text-sm font-medium text-gray-500 truncate ">
              <p className="text-2xl font-semibold text-gray-900 ">{item.title}:</p><p> {item.stat}{item.units}</p>
              </div>
            </dt>
            </div>
        ))}
              {/* <p className="text-2xl font-semibold text-gray-900 ">{item.humidity}</p>
              <p className="text-2xl font-semibold text-gray-900 ">{item.wind}</p>
              <p className="text-2xl font-semibold text-gray-900 ">{item.temp}</p>
              <p className="text-2xl font-semibold text-gray-900 ">{item.precipitation}</p>
              <p className="text-2xl font-semibold text-gray-900 ">{item.date}</p>
              <p className="text-2xl font-semibold text-gray-900 ">{item.sunrise}</p>
              <p className="text-2xl font-semibold text-gray-900 ">{item.sunset}</p>
              <p className="text-2xl font-semibold text-gray-900 ">{item.condition}</p>
              <p className="text-2xl font-semibold text-gray-900 ">{item.high}</p>
              <p className="text-2xl font-semibold text-gray-900 ">{item.low}</p>
              </div>
            </dt>
            <dd className="flex items-baseline pb-6 ml-16 sm:pb-7">

              <div className="absolute inset-x-0 bottom-0 px-4 py-4 bg-gray-900 shadow-2xl sm:px-6">
                <div className="text-sm">
                  <button onClick={item.set} className="font-medium text-indigo-600 hover:text-sky-500">

                    <div className="items-center w-6 h-6 mx-auto rounded-full shadow-lg bg-sky-500 shadow-fuchsia-500 hover:shadow-sky-500">
                      <item.nameIcon className="w-6 h-6 m-auto text-white rounded-full shadow-lg shadow-inner" aria-hidden="true" />
                    </div>


                  </button>
                </div>
              </div>
            </dd>
          </div>
        ))} */}
      </dl>
      <WeatherChart />
    </div>
  )
}



