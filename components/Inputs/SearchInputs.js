import Image from 'next/image'
import React from 'react'
import SearchIcon from "../../assets/search.svg"

const SearchInputs = ({ handleUpdate }) => {
    return (
        <div className='searchBox relative'>
            <input placeholder='Cardiologie' onChange={(e) => handleUpdate(e.target.value)} className='w-full' />
            <div className='absolute right-4 top-4'>
                <Image src={SearchIcon} alt="Search" />
            </div>
        </div>
    )
}

export default SearchInputs
