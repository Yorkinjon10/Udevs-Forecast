import React, { ReactDOM } from 'react';
import { useState, useEffect } from 'react';
import { fetchWeather } from './api/FetchWeatherApp';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import SearchIcon from '@material-ui/icons/Search';
import './styles.css';
const data = [
  {
    id: "region1",
    regionName: "Toshkent city",
    value: "tashkent"
  },
  {
    id: "region2",
    regionName: "Toshkent region",
    value: "tashkent"
  },
  {
    id: "region3",
    regionName: "Andijan region",
    value: "andijan"
  },
  {
    id: "region4",
    regionName: "Bukhara region",
    value: "bukhara"
  },
  {
    id: "region5",
    regionName: "Fergana region",
    value: "fergana"
  },
  {
    id: "region6",
    regionName: "Jizzakh region",
    value: "jizzakh"
  },
  {
    id: "region7",
    regionName: "Khorezm region",
    value: "khorazim"
  },
  {
    id: "region8",
    regionName: "Namangan region",
    value: "namangan"
  },
  {
    id: "region9",
    regionName: "Navoi region",
    value: "navoi"
  },
  {
    id: "region10",
    regionName: "Kashkadarya region",
    value: "Kashkadarya"
  },
  {
    id: "region11",
    regionName: "Samarkand region",
    value: "samarkand"
  },
  {
    id: "region12",
    regionName: "Karakalpakstan region",
    value: "Karakalpakstan"
  }
];
export const Interface = () => {
  const dateBuilder = (d) => {
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday',
      'Friday', 'Saturday'];
    let day = days[d.getDay()];
    let date = d.getDate();
    let time = d.getHours() + ":" + d.getMinutes() + "  ";
    return `${time} ${day} ${date}`
  }

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({
    name: "Tashkent",
    main: { temp: 33.3, humidity: 12 },
    wind: { speed: 3.84},
    weather: [
        {
          description: "Clear Sky"
        }
      ]
  });
  const search = async (el) => {
    console.log(el);
    const dataJS = await fetchWeather(el);
    console.log(dataJS);
    setWeather(dataJS);
  }

  console.log(weather.name);
  const tashkent = 'https://api.weatherapi.com/v1/history.json?key=cd3e0034748b47568e854945212808&q=Tashkent&dt=2021-28-08';
  const dayBackgroundImg = 'https://images.unsplash.com/photo-1592762943860-3da57d566f25?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80';
  const nightBackgroundImg = 'https://live.staticflickr.com/5630/22261018373_1a6a44068c_b.jpg';
  const beforeNightBackgroundImg = 'https://i2-prod.derbytelegraph.co.uk/incoming/article5366200.ece/ALTERNATES/s1200b/0_Hot-Air-Balloons-Flying-Over-Field-Against-Sky-During-Sunset.jpg';
  const [regions, setRegions] = useState(data);
  const [wordEntered, setWordEntered] = useState("");
  const getValuesOfInput = (event) => {
    const searchedWord = event.target.value;
    setWordEntered(searchedWord);
    
    let newRegions = regions.filter((item) => {
      return item.regionName.toLocaleLowerCase().includes(searchedWord) });
    const searchedWord2 = event.target.value;
    
    if (searchedWord2.length === "") {
      setRegions(data);
    } else {
      setRegions(newRegions);
    }
  }
 
  return (
    <article className="card-wrapper">
      <section className="card">
        <section className="left-side">
          <img className="left-side-img" src={dayBackgroundImg} alt="Sunny day" />          
          <p className="left-side-title">the.wheather</p>
          <section className="left-side-content">
            <p className="left-side-deg">{weather.main.temp}<span className="left-side-deg-circle"></span></p>
            <section className="left-side-time-and-city">
              <p className="left-side-country-name">{weather.name}</p>
              <p className="left-side-date">{dateBuilder(new Date())}</p>
            </section>
            <section className="left-side-circumstance">
              <span className="left-side-sun-icon-wrapper"><WbSunnyIcon className="left-side-sun-icon" /></span>
              <p>{weather.weather[0].description}</p>
            </section>
          </section>
        </section>

        <section className="right-side">
          <section className="right-side-right-content">
            <form>
              <input type="search" value={wordEntered} onChange={getValuesOfInput} name="search-location" id="search-location-id" placeholder=" Another location" maxLength="50" required/>
              <label htmlFor="search-location-id" className="right-side-search-icon-wrapper">
                  <SearchIcon className="right-side-search-icon" />
              </label>
            </form>
            <section>
              <ul className="right-side-regions-names">{
                regions.map((el) => {
                  return (
                  <section key={el.id}>
                    <li onClick={()=>search(el.value)} value={query}>{el.regionName}</li>
                  </section>
                  );
                })
              }</ul>
            </section>
              <hr className="right-side-divider"/>
            <section className="right-side-app-details">
              <h3 className="right-side-app-title">Weather Details</h3>
              <ul className="right-side-app-info-wrapper">
                <li className="right-side-app-info">Cloudy<span className="right-side-app-measure"></span></li>
                <li className="right-side-app-info">Humidity <span className="right-side-app-measure">{weather.main.humidity}%</span></li>
                <li className="right-side-app-info">Wind <span className="right-side-app-measure">{weather.wind.speed} km/h</span></li>
                <li className="right-side-app-info">Rain <span className="right-side-app-measure">0mm</span></li>
              </ul>
            </section>
          </section>
        </section>
      </section>
    </article>
  );
}