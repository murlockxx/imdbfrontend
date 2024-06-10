import React from 'react';
import './UnderConstruction.css'; // Ensure this CSS file exists in your project

const UnderConstruction = () => {
    return (
        <div className="under-construction-container">
            <h1>We are working on it!</h1>
            <img src="/dalle.webp" alt="Under Construction" /> {/* Notice the path here */}
            <p>We're making some improvements.</p>
        </div>
    );
};

export default UnderConstruction;
