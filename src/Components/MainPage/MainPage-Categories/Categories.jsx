import './Categories.css';
import React, { useState, useEffect } from 'react';
import CategoriesData from '../../../../CategoriesData.json';
import { t } from 'i18next';

const Categories = ({ interval = 8000, language = 'en' }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [visibleCards, setVisibleCards] = useState(1);

    useEffect(() => {
        const updateVisibleCards = () => {
            if (window.innerWidth >= 1024) {
                setVisibleCards(4);
            } else if (window.innerWidth >= 600) {
                setVisibleCards(2);
            } else {
                setVisibleCards(1);
            }
        };

        updateVisibleCards();
        window.addEventListener('resize', updateVisibleCards);

        return () => window.removeEventListener('resize', updateVisibleCards);
    }, []);

    useEffect(() => {
        const autoSlide = setInterval(() => {
            handleNext();
        }, interval);

        return () => clearInterval(autoSlide);
    }, [interval, visibleCards]);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => {
            const newIndex = prevIndex + visibleCards;
            return newIndex >= CategoriesData.length ? 0 : newIndex;
        });
    };

    const handleDotClick = (index) => {
        setCurrentIndex(index * visibleCards);
    };

    return (
        <div className='category-slider-section'>
            <h1>{t('category.textone')}</h1>
            <h1>{t('category.texttwo')}</h1>
            <p style={{
                marginBottom:"40px"
            }}            
            >{t('category.textthree')}</p>
            <div
                className="category-card-container"
                style={{ transform: `translateX(-${(currentIndex / visibleCards) * 100}%)` }}
            >
                {CategoriesData.map((category, index) => (
                    <div
                        key={index}
                        className="category-card"
                        style={{ backgroundColor: category.bgColor, color: category.textColor }}
                    >
                        <img src={category.image} alt="category" className='categoryimage' />
                        <div className="category-text-holder">
                            <h1>{category.title[language]}</h1>
                            <p>{category.courses[language]}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="dots-categories">
                {Array.from({ length: Math.ceil(CategoriesData.length / visibleCards) }).map((_, index) => (
                    <span
                        key={index}
                        className={`dot-categories ${index === Math.floor(currentIndex / visibleCards) ? 'active' : ''}`}
                        onClick={() => handleDotClick(index)}
                    ></span>
                ))}
            </div>
        </div>
    );
};

export default Categories;