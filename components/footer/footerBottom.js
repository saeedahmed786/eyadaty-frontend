import React from "react";
import { useTranslation } from "react-i18next";

const FooterBottom = () => {
    const { t } = useTranslation();

    return (
        <>
            <div className={"flex items-center justify-center"}>
                <span className={"text-[#A7ADBA]  text-[12px] font-[400]"}>{t("Tous Les Droits Sont Réservés Pour Ce Site")} </span>
            </div>
        </>
    )
}
export default FooterBottom
