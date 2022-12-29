import React from 'react'
import Footer from '../footer/footer'
import Navbar from '../navbar'
import TopNavbar from '../topNavbar'

const MainLayout = (props) => {

    return (
        <>
            {
                props.navbar ?
                    <div>
                        <TopNavbar />
                        <Navbar />
                        <div>
                            {props.children}
                        </div>
                        <Footer />
                    </div>
                    :
                    props.children
            }
        </>
    )
}

export default MainLayout
