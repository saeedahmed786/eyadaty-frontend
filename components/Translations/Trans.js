import { Dropdown, Menu } from "antd";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { isAuthenticated } from "../Auth/auth";

export default function TransComp() {
    const { i18n } = useTranslation();
    const [language, setLanguage] = useState("fr");

    const changeLanguage = lng => {
        if (!isAuthenticated()) {
            i18n.changeLanguage(lng);
            setLanguage(lng)
            if (lng === "ar") {
                document.getElementsByTagName('html')[0].setAttribute("dir", "rtl");
                // document.getElementById("Direction").dir = "rtl"
            } else {
                // document.getElementById("Direction").dir = "ltr"
                document.getElementsByTagName('html')[0].setAttribute("dir", "ltr");
            }
        }
        if (isAuthenticated()?.findUser?.role === 1) {
            i18n.changeLanguage(lng);
            setLanguage(lng)
            if (lng === "ar") {
                document.getElementsByTagName('html')[0].setAttribute("dir", "rtl");
                // document.getElementById("Direction").dir = "rtl"
            } else {
                // document.getElementById("Direction").dir = "ltr"
                document.getElementsByTagName('html')[0].setAttribute("dir", "ltr");
            }
        }
    };

    const langMenu = (
        <Menu className='p-2 nav-menu'>
            <Menu.Item key={0}>
                <button className="btn" onClick={() => changeLanguage("fr")}>fr</button>
            </Menu.Item>
            <Menu.Item key={1}>
                <button className="btn" onClick={() => changeLanguage("ar")}>ar</button>
            </Menu.Item>
        </Menu>
    );

    return (
        <div className="Trans">
            <Dropdown overlay={langMenu}>
                <a onClick={(e) => e.preventDefault()}>
                    {language} <i className="fa-solid fa-globe"></i>
                </a>
            </Dropdown>
        </div>
    );
}
