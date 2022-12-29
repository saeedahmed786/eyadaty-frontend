import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import illustration from "../assets/terms.svg"
import MainLayout from '../components/Layouts/MainLayout'
import RightIcon from '../icons/righticon'


const TermsAndConditions = () => {

    return (
        <MainLayout navbar>
            <div className='container px-5 mx-auto pb-24 pt-6'>
                <div className='flex justify-center align-middle text-center'>
                    <Image src={illustration} alt="illustration" className='w-full' />
                </div>
                <div className=''>
                    <div className='flex gap-2 items-center py-4'>
                        <span>Accueil</span> <RightIcon /> <Link className='text-[#0094DA]' href="/forgot-password">Politique de confidentialité</Link>
                    </div>
                    <div>
                        <h1 className='bigTitle'>Termes et conditions</h1>
                        <p className='my-5 normalPara'>
                            At Eyadaty, accessible from www.eyadaty.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by rosaliss and how we use it.
                            If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.
                            This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in rosaliss. This policy is not applicable to any information collected offline or via channels other than this website. Our Privacy Policy was created with the help of the Free Privacy Policy Generator.
                        </p>
                    </div>
                    <div>
                        <h2 className='subTitle'>Consent</h2>
                        <p className='my-5 normalPara'>
                            By using our website, you hereby consent to our Privacy Policy and agree to its terms.
                        </p>
                    </div>
                    <div>
                        <h2 className='subTitle'>Information we collect</h2>
                        <p className='my-5 normalPara'>
                            The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.
                        </p>
                        <p className='my-5 normalPara'>
                            If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.                        </p>
                        <p className='my-5 normalPara'>
                            When you register for an Account, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number.                        </p>
                    </div>
                    <div>
                        <h2 className='subTitle'>How we use your information</h2>
                        <p className='my-5 normalPara'>
                            We use the information we collect in various ways, including to:
                        </p>
                        <ul className='px-4' style={{ listStyle: "initial" }}>
                            <li className='my-3'>
                                Provide, operate, and maintain our website
                            </li>
                            <li className='my-3'>
                                Improve, personalize, and expand our website
                            </li>
                            <li className='my-3'>
                                Understand and analyze how you use our website
                            </li>
                            <li className='my-3'>
                                Develop new products, services, features, and functionality
                            </li>
                            <li className='my-3'>
                                Send you emails
                            </li>
                            <li className='my-3'>
                                Find and prevent fraud
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className='subTitle'>Log Files</h2>
                        <p className='my-5 normalPara'>
                            {"eyadaty follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information."}
                        </p>
                    </div>
                    <div>
                        <h2 className='subTitle'>Cookies and Web Beacons</h2>
                        <p className='my-5 normalPara'>
                            {"Like any other website, rosaliss uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information."}
                        </p>
                        <p className='my-5 normalPara'>
                            {"For more general information on cookies, please read the Cookies article on TermsFeed website."}
                        </p>
                    </div>
                    <div>
                        <h2 className='subTitle'>Google DoubleClick DART Cookie</h2>
                        <p className='my-5 normalPara'>
                            {"Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to www.website.com and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL – https://policies.google.com/technologies/ads"}
                        </p>
                    </div>
                    <div>
                        <h2 className='subTitle'>Our Advertising Partners</h2>
                        <p className='my-5 normalPara'>
                            {"Some of advertisers on our site may use cookies and web beacons. Our advertising partners are listed below. Each of our advertising partners has their own Privacy Policy for their policies on user data. For easier access, we hyperlinked to their Privacy Policies below."}
                        </p>
                        <ul className='px-4' style={{ listStyle: "initial" }}>
                            <li className='my-3'>
                                Google
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className='subTitle'>Advertising Partners Privacy Policies</h2>
                        <p className='my-5 normalPara'>
                            {"Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on rosaliss, which are sent directly to users' browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit."}
                        </p>
                        <p className='my-5 normalPara'>
                            {"Note that rosaliss has no access to or control over these cookies that are used by third-party advertisers."}
                        </p>
                    </div>
                    <div>
                        <h2 className='subTitle'>Third Party Privacy Policies</h2>
                        <p className='my-5 normalPara'>
                            {"rosaliss's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options."}
                        </p>
                        <p className='my-5 normalPara'>
                            {"You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers' respective websites."}
                        </p>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

export default TermsAndConditions
