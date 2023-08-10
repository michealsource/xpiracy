import React, { useState } from 'react'
import BounceLoader from "react-spinners/BounceLoader";

export default function Loader() {
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#ffffff");
    const override = {
        display: "block",
        margin: "0 auto",
        borderColor: "red",
    };

    return (
        <div style={{ 
            zIndex: 999,
            position: 'fixed',
            top: 0,
            bottom: 0,
            height: '100%',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'rgba(0, 0, 0, 0.1)'
         }}>
            <BounceLoader
                color={color}
                loading={loading}
                cssOverride={override}
                size={150}
                aria-label="Loading"
                data-testid="loader"
            />
        </div>
    )
}
