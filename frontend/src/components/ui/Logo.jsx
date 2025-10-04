import React from "react";
import caemaLogo from '../../assets/logoCaema.png';

const Logo = () => {
    return (
        <div className="pt-20 mb-12 flex justify-center">
            <img src={caemaLogo} 
            alt="Logo CAEMA" 
            className="w-sm h-auto"
            />
        </div>
    );
};

export default Logo;