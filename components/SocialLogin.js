import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import GoogleLogin from 'react-google-login';
import { ErrorMessage, SuccessMessage } from '../Messages/messages';
import FacebookLogin from 'react-facebook-login';
import { Cookies } from 'react-cookie'
import Image from 'next/image';
import twitter from "../assets/twitter.svg"


const SocialLogin = () => {
    const router = useRouter();
    const cookies = new Cookies;

    const sendGoogleToken = (tokenId) => {
        axios
            .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/google-login`, {
                idToken: tokenId,
            })
            .then((res) => {
                if (res.statusText === "OK") {
                    cookies.set('user', res.data.user, { path: '/' });
                    cookies.set('token', res.data.token, { path: '/' });

                    SuccessMessage(res.data.successMessage);
                    router.push('/');
                    setTimeout(() => {
                        document.location.reload();
                    }, 2000);
                }
                else {
                    ErrorMessage(res.data.errorMessage);
                }
            })
            .catch((error) => {
                console.log("GOOGLE SIGNIN ERROR", error.response);
            });
    };

    const sendFacebookToken = (userID, accessToken) => {
        axios
            .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/facebook-login`, {
                userID,
                accessToken,
            })
            .then((res) => {
                if (res.statusText === "OK") {
                    cookies.set('user', res.data.user, { path: '/' });
                    cookies.set('token', res.data.token, { path: '/' });

                    SuccessMessage(res.data.successMessage);
                    router.push('/');
                    setTimeout(() => {
                        document.location.reload();
                    }, 2000);
                }
                else {
                    ErrorMessage(res.data.errorMessage);
                }
            })
            .catch((error) => {
                console.log("GOOGLE SIGNIN ERROR", error.response);
            });
    };

    const responseGoogle = (response) => {
        console.log(response)
        sendGoogleToken(response.tokenId);
    };

    const responseFacebook = (response) => {
        if (response && response.userID) {
            sendFacebookToken(response.userID, response.accessToken);
        }
    };
    return (
        <div className='social-logins mt-4'>
            <GoogleLogin
                clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
                buttonText={false}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                autoLoad={false}
                className="text-center googleBtn"
                cookiePolicy={"single_host_origin"}
            ></GoogleLogin>
            <br />
            <br />
            <FacebookLogin
                appId={process.env.NEXT_PUBLIC_FACEBOOK_APP_ID}
                autoLoad={false}
                textButton=""
                fields="name,email,picture"
                callback={responseFacebook}
                cssClass="my-facebook-button-class"
            ></FacebookLogin>

            <button className='w-[72px] ml-2 h-[72px] rounded-[50%] border border-[#C0C5CE] flex items-center justify-center'>
                <Image src={twitter} alt="Twitter" />
            </button>
        </div>
    )
}

export default SocialLogin
