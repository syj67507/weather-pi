import { useEffect, useState } from "react";

export interface TemperatureProps {
    fahrenheit: number;
    celcius: number;
}

export default function Temperature({ fahrenheit, celcius }: TemperatureProps) {
    const [unit, setUnit] = useState("F");
    const [opacity, setOpacity] = useState(1);
    const [valueToShow, setValueToShow] = useState(fahrenheit);

    useEffect(() => {
        const interval = setInterval(() => {
            // fade out
            setOpacity(0);

            // after some time, we want to change the text and fade back in
            setTimeout(() => {
               setUnit(unit => unit === "F" ? "C" : "F");
               setValueToShow(value => value === fahrenheit ? celcius : fahrenheit);
               setOpacity(1);
            }, 1500);

        }, 12000);

        return () => clearInterval(interval);
    }, [])

    return (
            <h1 style={{
                margin: 0,
                fontSize: "256px",
                color: "white",
                opacity: 0.75 * opacity,
                transition: "all 1s"
            }}>{Math.round(valueToShow)}°{unit}</h1>
    )
}