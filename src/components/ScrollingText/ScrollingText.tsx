import React, { useState, useEffect } from 'react';
import Ticker, { FinancialTicker, NewsTicker } from 'nice-react-ticker';
const ScrollingText = () => {
    return (
        <Ticker>
            <NewsTicker id="6" title="Авария на АНПЗ и МАЭК. Добыча нефти была приостановлена на четырех предприятиях в двух областях Казахстана" url="https://kaztag.kz/ru/news/dobycha-nefti-upala-na-21-posle-avariy-na-anpz-i-maek-na-zapade-kazakhstana" meta="11:10:20" />
        </Ticker>
    );
};

export default ScrollingText;
