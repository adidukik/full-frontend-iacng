import React, { useState, useEffect } from 'react';
import Ticker, { FinancialTicker, NewsTicker } from 'nice-react-ticker';

const ScrollingText = () => {
    return (
        <Ticker>
            <NewsTicker id="6" title="Авария на АНПЗ и МАЭК. Добыча нефти была приостановлена на четырех предприятиях в двух областях Казахстана" url=" https://metro.co.uk/2020/02/22/blue-passports-issued-brits-first-time-decades-next-months-12281012/?ito=newsnow-feed" meta="11:10:20" />
        </Ticker>
    );
};

export default ScrollingText;
