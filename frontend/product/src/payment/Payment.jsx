import React from "react";
import { v4 as uuidv4 } from "uuid";
import CryptoJS from "crypto-js";
import { useLocation, useNavigate } from "react-router-dom";
import esewalogo from "../assest/e.png";

const Payment = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state?.totalAmount) {
    navigate("/cart");
    return null;
  }

  const transaction_uuid = uuidv4();
  const amount = state.totalAmount;
  const tax_amount = 0;
  const product_service_charge = 0;
  const product_delivery_charge = 0;
  const total_amount =
    amount + tax_amount + product_service_charge + product_delivery_charge;

  const message = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=EPAYTEST`;
  const hash = CryptoJS.HmacSHA256(message, "8gBm/:&EnhH.1/q");
  const hashInBase64 = CryptoJS.enc.Base64.stringify(hash);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-sm w-full text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Confirm Payment</h2>

        <p className="text-lg text-gray-700 mb-4">Total Amount</p>
        <p className="text-3xl font-semibold text-green-600 mb-6">Rs. {total_amount}</p>

        <form
          action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
          method="POST"
        >
          {/* Hidden required fields */}
          <input type="hidden" name="amount" value={amount} readOnly />
          <input type="hidden" name="tax_amount" value={tax_amount} readOnly />
          <input type="hidden" name="total_amount" value={total_amount} readOnly />
          <input type="hidden" name="transaction_uuid" value={transaction_uuid} readOnly />
          <input type="hidden" name="product_code" value="EPAYTEST" readOnly />
          <input type="hidden" name="product_service_charge" value={product_service_charge} readOnly />
          <input type="hidden" name="product_delivery_charge" value={product_delivery_charge} readOnly />
          <input type="hidden" name="success_url" value="http://localhost:5173/success" readOnly />
          <input type="hidden" name="failure_url" value="http://localhost:5173/failure" readOnly />
          <input type="hidden" name="signed_field_names" value="total_amount,transaction_uuid,product_code" readOnly />
          <input type="hidden" name="signature" value={hashInBase64} readOnly />

         <button type="submit"
        className="w-full flex items-center justify-center gap-3
     bg-white border border-green-600 hover:bg-green-100 text-green-600 py-3 rounded-md font-semibold transition duration-300 cursor-pointer">
            <img
              src={esewalogo}
              alt="eSewa"
              className="h-6 w-6 object-contain"
            />
            <span>Pay with eSewa</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payment;
