import { useState, useEffect } from "react";

interface ConditionProps {
    code: number;
    is_day: number; 
}

export function Condition({ code, is_day }: ConditionProps) {
    const iconPath = getIconPath(code, is_day);
    // const [translateX, setTranslateX] = useState(25)
    // const translateTimeMs = 5000

    // useEffect(() => {
    //     //Implementing the setInterval method
    //     const interval = setInterval(() => {
    //         setTranslateX(translateX * -1);
    //     }, translateTimeMs);
 
    //     //Clearing the interval
    //     return () => clearInterval(interval);
    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [translateX]);

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            
            transformOrigin: "center",
            transform: "scale(1.3,1.3)",
        }}>
            <img src={iconPath} style={{
                width: "500px",
                height: "500px",
                // transition: `all ${translateTimeMs}ms`,
                // transform: `translateX(${translateX}px)` 
            }} />
        </div>
    );
}

function getIconPath(code: number, isDay: number) {
    let iconFile = "./weather-icons/";
    console.log("zeus")
    switch (code) {
        case 1000: {
            iconFile += isDay === 1 ? "sunny.svg" : "clear_night.svg";
            break;
        }
        case 1003: {
            iconFile += isDay === 1 ? "partly_cloud_day.svg" : "partly_cloudy_night.svg"
            break;
        }
        case 1006: {
            iconFile += "cloudy.svg"
            break;
        }
        case 1009:
        case 1030:
        case 1135: {
            iconFile += "overcast_foggy.svg";
            break;
        }
        case 1063:
        case 1150:
        case 1153:
        case 1183: {
            iconFile += "showers.svg";
            break;
        }
        case 1066:
        case 1114:
        case 1117:
        case 1210:
        case 1213:
        case 1216:
        case 1219:
        case 1222:
        case 1225:
        case 1255:
        case 1258: {
            iconFile += "snowy.svg";
            break;
        }
        case 1069:
        case 1072:
        case 1168:
        case 1171:
        case 1204:
        case 1207:
        case 1237:
        case 1249:
        case 1252:
        case 1261:
        case 1264: {
            iconFile += "sleet_hail_icy.svg";
            break;
        }
        case 1087:
        case 1273:
        case 1276:
        case 1279:
        case 1282: {
            iconFile += "thunder.svg";
            break;
        }
        case 1186:
        case 1189:
        case 1192:
        case 1195:
        case 1198:
        case 1201:
        case 1240:
        case 1243:
        case 1246: {
            iconFile += "rain.svg";
            break;
        }
        default: { 
            break; 
        }
    }
    return iconFile;
}
