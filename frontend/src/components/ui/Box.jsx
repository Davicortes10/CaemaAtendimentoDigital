import React from "react";

const Box = ({label, onclick}) => {
    const baseClasses = "bg-white hover:bg-zinc-200 text-sky-950 size-60 rounded-2xl text-1xl font-semibold mt-15 ml-5 mr-5 {className}" 
    return (
        <div className="flex flex-col justify-center items-center">
        <button onclick={onclick} className={baseClasses}>
            {label}
        </button>
        </div>
    );
};

export default Box;