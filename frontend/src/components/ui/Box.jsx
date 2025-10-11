import React from "react";

const Box = ({ label, onClick, className = '', IconComponent }) => {
    
    const baseClasses = `
        bg-white 
        hover:bg-zinc-200 
        text-sky-950 rounded-2xl 
        font-semibold 
        mt-2
        flex flex-col items-center justify-center 
        w-xs
        py-10
    `; 
    
    return (
        <div className="w-1/4 flex flex-col justify-center items-center mx-3">
            <button 
                onClick={onClick} 
                className={`${baseClasses} ${className}`}
            >
                {IconComponent && ( 
                    <IconComponent className="text-6xl text-sky-900 mb-4 mt-4"/>
                )}
                <span className="text-center">{label}</span> 
            </button>
        </div>
    );
};

export default Box;