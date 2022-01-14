import React, {useContext } from 'react';
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import { Loader } from './';
import { TransactionContext } from '../context/TransactionContext'

const companyCommonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[1.5px] border-violet-400 text-sm font-semibold text-black";

const Input = ({ placeholder, name, type, value, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={(e) => handleChange(e, name)}
    className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-black border-none text-sm white-glassmorphism"
  />
);

const Welcome = () => {
  const { connectWallet, currentAccount,formData,sendTransaction, handleChange,isLoading } = useContext(TransactionContext);
  
  const handleSubmit = (e) => {
    const { addressTo, amount, keyword, message } = formData;
    
    e.preventDefault();

    if(!addressTo || !amount || !keyword || !message) return;
  
    sendTransaction();
  }
return (
    <div className="flex w-full justify-center items-center">
      <div className="flex mf:flex flex-column items-start justify-between md:p-20 py-12 px-4">
        <div className="flex flex-1 justify-start items-left flex-col mf:mr-10">
          <h1 className="text-4xl sm:text-5xl text-sky-800 font-mono  py-1">
           " A3HAX coin on its way <br/> to the MOON" ~ <b>elon musk</b>
          </h1>
          <p className="text-left mt-5 text-pink-900 font-bold md:w-9/12 w-11/12 text-base ">
            Yeah he said it  !!! now it's your time to expand your portfolio 
          </p>
          {!currentAccount && (
          <button
              type="button"
              onClick={connectWallet}
              className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
            >
              <AiFillPlayCircle className="text-black mr-2" />
              <p className="text-black text-base font-semibold">
                Connect Wallet
              </p>
            </button>
          )}
          
          <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
            <div className={`rounded-tl-2xl ${companyCommonStyles}`}>
              Gaming NFT
            </div>
            <div className={companyCommonStyles}>Encryption</div>
            <div className={`sm:rounded-tr-2xl ${companyCommonStyles}`}>
              High security
            </div>
            <div className={`sm:rounded-bl-2xl ${companyCommonStyles}`}>
              Futuristic
            </div>
            <div className={companyCommonStyles}> A3HAX </div>
            <div className={`rounded-br-2xl ${companyCommonStyles}`}>
              Flexible
            </div>
          </div>
        </div>

        <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
          <div className="p-3 flex justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card .white-glassmorphism ">
          <div className="flex justify-between flex-col w-full h-full">
              <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                <div className="flex justify-between items-start">
                  <SiEthereum fontSize={21} color="black" />
                </div>  
                </div>
                <div className="justify-center" > TO THE MOON </div>
                <div>
                <p className="text-red-400 font-semibold text-sm">
                   Private key <br/>
                   <p className="text-yellow-400 font-light"> Address </p> 
                </p>
                <p className="text-rose-400 font-bold text-sm">
                  A3HAX_COIN
                </p>
                </div>
              </div>
              </div>
              <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
                <Input placeholder="Address To" name="addressTo" type="text" handleChange={handleChange} />
                <Input placeholder="Amount (ABHAX_COIN)" name="amount" type="text" handleChange={handleChange} />
                <Input placeholder="Keyword (GIF)" name="keyword" type="text" handleChange={handleChange} />
                <Input placeholder="Message" name="message" type="text" handleChange={handleChange} />
                <div className="h-[1px] w-full bg-gray-400 my-2" />
                {false? 
                <Loader/>
                  :(
                  <button
                   type="button"
                   onClick={handleSubmit}
                   className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
                  >
                    Send now
                  </button>
                  )}

                </div>
        </div>
      </div>
     </div>
  );
};


export default Welcome;