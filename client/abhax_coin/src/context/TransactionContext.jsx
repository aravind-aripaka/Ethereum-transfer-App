import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

import { contractABI, contractAddress } from '../utils/constants';

export const TransactionContext = React.createContext();

const { ethereum } = window;

const createEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress,contractABI, signer);

    console.log({
        provider,
        signer,
        transactionContract
    });
}

export const TransactionProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState("");
    const [formData, setFormData] = useState({addressTo: ' ', amount: ' ',keyword: '', message: ''});
    const [isLoading, setIsLoading] = useState(false);
    const [transactionCount,setTransactionCount] = useState(localStorage.getItem('transactionCount'));

    const handleChange = (e, name) => {
        setFormData((prevState) => ({ ...prevState, [name]: e.target.value}));
    };


    const checkIfWalletConnected = async () => {
        try {
            if(!ethereum) return alert('Wallet is not connected');

        const accounts = await ethereum.request({ method: 'eth_accounts'});
        
        if(accounts.length) {
            setCurrentAccount(accounts[0]);

            //getalltransactions
        }else{
            console.log('no accounts found');
        }
        } catch (error) {
            console.log(error);

            throw new Error("NO eth object")
        }
    };

    const connectWallet = async () => {
        try {
            if(!ethereum) return alert('ethereum account not connected');
            const accounts = await ethereum.request({method: 'eth_requestAccounts'});
            setCurrentAccount(accounts[0]);
        }
        catch(error) {
            console.error(error);

            throw new Error("No ethereum object");
        }
    };

    const sendTransaction = async () => {
        try {
        if(ethereum) {
        const { addressTo, amount, keyword, message } = formData;
        const transactionContract = createEthereumContract();
        const parsedAmount = ethers.utils.parseEther(amount);

        await ethereum.request({
            method: 'eth_sendTransaction',
            params: [{
                from: currentAccount,
                to: addressTo,
                gas: '0x5208', //21000 gwei
                value: parsedAmount._hex, //0.00001
            }]
        });

        const transactionHash = await transactionContract.addToBLockchain(addressTo,parsedAmount,message,keyword);

        setIsLoading(true);
        console.log(`Loading - ${transactionHash.hash}`);
        await transactionHash.wait();
        setIsLoading(true);
        console.log(`Success-${transactionHash.hash}`);

        const transactionCount = await transactionContract.getTransactionCount();
        setTransactionCount(transactionCount.toNumber());
        } else{
            console.log("no ethereum object");
        }
        } catch (error) {
            console.error(error);
            throw new Error("No ethereum object found")
        }
    };

    useEffect(() => {
        checkIfWalletConnected();
    }, [transactionCount]);

    return (
        <TransactionContext.Provider value={{ connectWallet,currentAccount, formData,setFormData, handleChange, sendTransaction }}>
            {children}
        </TransactionContext.Provider> 
    );
}