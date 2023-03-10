import React from 'react'

export default function SearchChips(props) {
  return (
    <div>
      <span className="px-[12px] py-[8px] rounded-[8px] text-[#0094DA] bg-[#F5F8FB] font-[500] gap-[12px] flex align-center flex-wrap w-max cursor-pointer active:bg-gray-300 transition duration-300 ease">
        <p className=' text-[#65737E] text-[12px] font-[500]'>
          {props.chiptitle}
        </p>
        <button className="bg-transparent hover focus:outline-none w-[8px]">
          <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times"
            className="w-[8px] ml-0 " role="img" xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 352 512">
            <path fill="currentColor"
              d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z">
            </path>
          </svg>
        </button>
      </span>
    </div>
  )
}
