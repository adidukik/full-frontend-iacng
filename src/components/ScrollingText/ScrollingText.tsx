import React, { useState, useEffect } from 'react';
import Ticker, { FinancialTicker, NewsTicker } from 'nice-react-ticker';
import './ScrollingText.css'

const ScrollingText = () => {
    return (
        <div>
        <span className="title">ЧС и ЧП по отрасли</span>
        <div className="card d-flex align-items-center" >
        <marquee className="d-flex align-items-center">
            <span className="scrollingText">НКОК: 25.04.2023 снижение суточной добычи в связи с проведением внеплановых работ на морском комплексе</span>
        </marquee>
        </div>
        </div>
    );
};

export default ScrollingText;
