import React from "react";
import { useTranslation } from "react-i18next";

const FooterBottom = () => {
    const { t } = useTranslation();

    return (
        <>
            <div className={"flex items-center justify-center"}>
                <span className={"text-light__gray__color text-sm"}>{t("Tous Les Droits Sont Réservés Pour Ce Site")} </span>
            </div>
        </>
    )
}
export default FooterBottom
