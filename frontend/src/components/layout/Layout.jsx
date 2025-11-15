import React, {useState, useEffect, useRef} from 'react';

// Este componente aplica o fundo e o layout principal
const Layout = ({ children }) => {
    const contentRef = useRef(null);
    const [scale, setScale] = useState(1);

    const BASE_WIDTH = 1920;

    // Cores de fundo caema
    const backgroundClass = "[background-image:linear-gradient(to_bottom,#014888_84%,#0F70CE_100%)]";
    
    const calculateScale = () => {
        const currentWidth = window.innerWidth;
        // Limita a escala para que ela não ultrapasse 1 (sem zoom in desnecessário)
        const newScale = Math.min(1, currentWidth / BASE_WIDTH); 
        setScale(newScale);
    };

    useEffect(() => {
        calculateScale();
        window.addEventListener('resize', calculateScale);
        return () => window.removeEventListener('resize', calculateScale);
    }, []);
    return (
        <div className={`h-screen overflow-hidden flex flex-col items-center w-full ${backgroundClass}`}>
            <div
                ref={contentRef}
                className="w-full h-full flex flex-col items-center justify-start pt-10"
                style={{
                    transform: `scale(${scale})`,
                    transformOrigin: 'top center', // Centraliza a escala a partir do topo
                    width: `${BASE_WIDTH}px`, // Largura de referência fixa
                    height: '100%', 
                    flexShrink: 0
                }}
            >
    
            {children}
            </div>
        </div>
    );
};

export default Layout;