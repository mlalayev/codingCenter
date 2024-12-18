import AOS from 'aos';
import 'aos/dist/aos.css';
import './SectionSixth.css';
import '../../Common/Root.css';
import { FaKey } from "react-icons/fa";
import { PiBookLight } from "react-icons/pi";
import { IoPlayCircle } from "react-icons/io5";
import { useTranslation } from 'react-i18next';
import { IoSaveOutline } from "react-icons/io5";
import React, { useState, useEffect } from 'react';
import categories from '../../../../MainPage-SectionSixth.json';



function SectionSixth() {
    const { t, i18n } = useTranslation();
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);
    useEffect(() => {
        AOS.init({
            offset: 200,
            delay: '1s',
            duration: 3000,
            easing: 'ease',
            once: true
        });
    }, []);
    
    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };
    
    const renderIcon = (iconName, color) => {
        const IconComponent = {
            PiBookLight: PiBookLight,
            FaKey: FaKey,
            IoSaveOutline: IoSaveOutline
        }[iconName];
        
        return <IconComponent size={18} color={color} className='icons-section-sixth' />;
    };
    
    return (
        <div
        data-aos="fade-right"
            className='SixthSection'>
            <div>
                <div className="sectionsixth-text-holder">
                    <h1>{t('sectionsixth.textone')}</h1>
                    <p>{t('sectionsixth.texttwo')}</p>
                </div>

                <div className="sectionsixth-category-holder">
                    {categories.map(category => (
                        <div
                            key={category.id}
                            className={`category-holder bgcolorWhite display-flex ${selectedCategory?.id === category.id ? 'selected' : ''}`}
                            onClick={() => handleCategoryClick(category)}
                        >
                            {renderIcon(category.icon, category.color)}
                            <p className='category-holder-text-one'>{t(category.text)}</p>
                        </div>
                    ))}
                </div>
            </div>
            {selectedCategory && (
                <div className="selected-category-content">
                    <img src={selectedCategory.image} alt={t(selectedCategory.text)} className='sectionsixthimage' />
                    <button className="play-button" onClick={() => window.open(selectedCategory.videoUrl, '_blank')}>
                        <div className="play-icon-holder">
                            <IoPlayCircle size={30} className='play-icon' />
                        </div>
                    </button>
                </div>
            )}
        </div>
    );
}

export default SectionSixth;
