import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';

function WeatherChart() {
  const [highs, setHighs] = useState([]);
  const [lows, setLows] = useState([]);
  const apiKey = '31b40bbc1dd3415db1783017232602';

  const handleGetWeatherData = async () => {
    try {
      const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=28449&days=1&aqi=no&alerts=no`);
      const data = await response.json();

      const hourlyData = data.forecast.forecastday[0].hour;

      // Extract the highs and lows for each hour
      const hourlyHighs = hourlyData.map((hour) => hour.temp_f);
      const hourlyLows = hourlyData.map((hour) => hour.feelslike_f);

      setHighs(hourlyHighs);
      setLows(hourlyLows);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  useEffect(() => {
    handleGetWeatherData();
  }, []);

  useEffect(() => {
    const chartData = {
      labels: Array.from(Array(24).keys()).map((hour) => `${hour}:00`),
      datasets: [
        {
          label: 'Highs',
          data: highs,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
        {
          label: 'Lows',
          data: lows,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
      ],
    };

    const chartOptions = {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };

    const ctx = document.getElementById('weather-chart').getContext('2d');
    const weatherChart = new Chart(ctx, {
      type: 'bar',
      data: chartData,
      options: chartOptions,
    });

    return () => {
      weatherChart.destroy();
    };
  }, [highs, lows]);

  return (
  <>
    <h1 className="mt-6 text-2xl font-semibold text-center text-gray-100">Highs and Lows</h1>
    <div
      className="flex flex-col items-center justify-center w-full h-full p-4 mt-10 space-y-4 bg-white border border-gray-200 rounded-md shadow-sm"
    >
      <h3 className="text-base font-semibold leading-6 text-gray-900">Last 24 hours</h3>
      <canvas id="weather-chart" />
    </div>
    </>

  );
}

export default WeatherChart;