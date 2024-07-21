import { useEffect, useState } from "react";

interface OtherInfoProps {
    values: Array<number | string>;
    extra?: string;
    iconPath: string;
}

export function OtherInfo({ values, extra, iconPath }: OtherInfoProps) {
    const [text, setText] = useState<string | number>(values[0]);
    const [opacity, setOpacity] = useState(1);
    
    // Only add fading logic if extra information is defined
    useEffect(() => {
        if (values.length === 1) {
            return;
        }
        const interval = setInterval(() => {
            // fade out now and make text invisible
            setOpacity(0)

            // after one second and some extra, run the code to fade it back in
            setTimeout(() => {
                setText(t => {
                    let nextIndex = values.findIndex((value) => value === t) + 1;
                    if (nextIndex >= values.length) {
                        nextIndex = 0;
                    }
                    return values[nextIndex];
                });
                setOpacity(1);
            }, 1500);
        }, 6000);

        return () => clearInterval(interval);
    }, [])

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
        }}>
            <div style={{
                width: "144px",
                height: "144px",
                borderRadius: "50%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                border: "4px solid rgba(255, 255, 255, 0.4)"
            }}>
                <img
                    src={iconPath}
                    style={{
                        width: "64px",
                        height: "64px",
                        filter: "brightness(0%) invert(100%) opacity(0.4)",
                    }}
                />
                <p
                    style={{
                        color: "white",
                        fontSize: "36px",
                        fontWeight: "normal",
                        margin: 0,
                        transition: "all 1s",
                        opacity: 0.4 * opacity,
                        textAlign: "right",
                    }}
                >
                    {text}
                </p>
            </div>
            {extra && <p
                style={{
                    color: "white",
                    fontSize: "36px",
                    fontWeight: "normal",
                    margin: 0,
                    transition: "all 1s",
                    opacity: 0.4,
                    textAlign: "right",
                }}
            >
                {extra}
            </p>}
            {!extra && <div
                style={{
                    height: "36px",
                }}
            >
                {extra}
            </div>}
        </div>
    );
}