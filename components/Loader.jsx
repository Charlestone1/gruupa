import React from 'react'
import { MoonLoader } from "react-spinners";

function Loader() {
  return (
    <span className="flex justify-center items-center">
        <MoonLoader color="white" size={14} />
    </span>
  )
}

export default Loader