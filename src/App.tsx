import './App.css'
import { useGetWeatherData } from './hooks/useGetWeatherData';
import Temperature from './components/Temperature';
import { Condition } from './components/Condition';
import { OtherInfo } from './components/OtherInfo';

function App() {
  const { data } = useGetWeatherData();

  if (!data) {
    return <div>Loading...</div>
  }

  return (
    <div className={`${data && data.current.is_day ? "day" : "night"}`} style={{
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "Roboto",
      backgroundColor: data?.current.is_day ? "#3181e4" : "#2a2a42",
      transition: "all 1s"
    }}>
        <div style={{
          // this is truncating the extra height of the condition icon
          // backgroundColor: "black", // use this to see
          overflow: "clip",
        }}>
          <Condition code={data?.current.conditionCode ?? 1000} is_day={data?.current.is_day ?? 1}/>
        </div>
        <div style={{
          width: "50%",
        }}>
          <Temperature fahrenheit={data.current.temp_f} celcius={data.current.temp_c}/>
          <p style={{
            color: "white",
            opacity: 0.4,
            fontSize: "100px",
            fontWeight: "bold",
            margin: 0,
          }}>{data?.location.city}</p>
          <p style={{
            color: "white",
            opacity: 0.4,
            fontSize: "50px",
            fontWeight: "normal",
            margin: 0,
          }}>{data?.current.condition}</p>
        </div>
        <div
          style={{
            width: "30%",
            // height: "45%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            gap: "32px",
          }}
        >
          <OtherInfo values={[`${data.current.humidity}%`]} iconPath="./weather-icons/humidity2.svg"/>
          <OtherInfo values={[data.current.airQualityValue]} extra={data.current.airQualityBand} iconPath="./weather-icons/air_quality.svg"/>
        </div>
        <div
          style={{
            width: "30%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            gap: "32px",
          }}
        >
          <OtherInfo values={[data.current.uvBand, data.current.uvValue]} extra={data.current.uvMeaning} iconPath="./weather-icons/uv2.svg"/>
          <OtherInfo values={[`${data.forecast.daily_chance_of_rain}%`]} iconPath="./weather-icons/rain_chance2.svg"/>
        </div>
    </div>
  )
}

export default App
