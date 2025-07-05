import React from 'react'
import { useSearchParams } from 'react-router-dom'

const Success = () => {
    const[search]=useSearchParams()
    const info=search.get("data")
    let decodedinfo=atob(info)
    console.log(decodedinfo)
    let newInfo=JSON.parse(decodedinfo)
    console.log(newInfo)
  return (
    <>
        <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 text-center px-4">
      <h1 className="text-4xl font-bold text-green-600 mb-4">Payment Successful</h1>

        
          <p className="text-lg text-gray-800 mb-2">Status: {newInfo.status}</p>
          <p className="text-lg text-gray-800 mb-2">Amount: Rs. {newInfo.total_amount}</p>
          <p className="text-lg text-gray-800 mb-2">Tansaction_code: {newInfo.transaction_code}</p>
          <p className="text-lg text-gray-800 mb-2">UUID: {newInfo.transaction_uuid}</p>
       
    </div>
    </>
  )
}

export default Success

