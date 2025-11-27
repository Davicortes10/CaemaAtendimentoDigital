import React from 'react';

const Button = ({ label, onClick, className = '', IconComponent, type = 'button' }) => {
    const baseClasses = `
        bg-lime-400 hover:bg-lime-600 text-sky-900
        rounded-2xl font-semibold
        py-3 px-4 text-4xl
        w-full
        h-24
        flex items-center justify-center gap-2
    `;

    return (
        <div className="w-full">
                    <button type={type} onClick={onClick} className={`${baseClasses} ${className}`}>
                {IconComponent && <IconComponent className="text-xl" />}
                {label}
            </button>
        </div>
    );
};

export default Button;