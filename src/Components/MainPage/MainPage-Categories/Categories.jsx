import AOS from 'aos';
import './Categories.css';
import 'aos/dist/aos.css';
import { t } from 'i18next';
import '../../Common/Root.css';
import React, { useState, useEffect } from 'react';
import CategoriesData from '../../../../CategoriesData.json';


const Categories = ({ interval = 8000, language = 'en' }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [visibleCards, setVisibleCards] = useState(1);

    useEffect(() => {
        AOS.init({
            offset: 200,
            delay: '1s',
            duration: 3000,
            easing: 'ease',
            once: true
        });
    }, []);

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
        <div
            data-aos="fade-right"
            className='category-slider-section' >
                
            <h1>{t('category.textone')}</h1>
            <h1>{t('category.texttwo')}</h1>
            <p style={{
                maxWidth: "400px",
                textAlign: "center",
                color: "gray",
                margin: "30px 0"
            }}
            >{t('category.textthree')}</p>
            <div
                className="category-card-container"
                style={{ transform: `translateX(-${(currentIndex / visibleCards) * 100}%)` }}
            >
                {CategoriesData.map((category, index) => (
                    <div
                        key={index}
                        data-aos="fade-right"
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
            <div
            style={{
                margin:"40px 0 0 0"
            }}
            className="dots-categories">
                {Array.from({ length: Math.ceil(CategoriesData.length / visibleCards) }).map((_, index) => (
                    <span
                        key={index}
                        className={`dot-categories ${index === Math.floor(currentIndex / visibleCards) ? 'active' : ''}`}
                        onClick={() => handleDotClick(index)}
                    ></span>
                ))}
            </div>
        </div >
    );
};

export default Categories;
