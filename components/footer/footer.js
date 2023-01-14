import React from "react";
import FooterTop from "./footerTop";
import FooterBottom from "./footerBottom";

const Footer = () => {
    return (
        <>
            <section className={"py-[40px] bg-[#1C2126]"}>
                <div className={"mx-auto container "}>
                    <FooterTop />
                    <FooterBottom />
                </div>
            </section>
        </>
    )
}
export default Footer
