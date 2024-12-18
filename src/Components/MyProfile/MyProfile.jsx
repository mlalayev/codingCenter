import './MyProfile.css';
import React from 'react';
import '../Common/Root.css';
import Sidebar from './Sidebar/Sidebar.jsx';
import { useTranslation } from "react-i18next";
import Dashboard from './DashBoard/DashBoard.jsx';
import PagesHeaderProps from '../Pages/AboutUs/Onesection/PagesHeaderProps.jsx';

const MyProfile = () => {
  const { t, i18n } = useTranslation();
  return (
    <>
    <PagesHeaderProps title = {t('header.myprofile')} />
    <div className="app-myprofile">
      <Sidebar />
      <Dashboard />
    </div>
    </>
  );
};

export default MyProfile;
