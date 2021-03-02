import { Toaster } from 'react-hot-toast';
import React from 'react';
import  '../App.css'; 


export default function CustomToast() {
    return (<Toaster className="toast" toastOptions={{
        className: '',
        duration: 6000,
        style: {
            padding: '16px',
            fontSize: '2vmax',
            color: '#713200',
    },
    success: {
        duration: 2000,
        style: {
            background: 'rgba(43, 194, 53, 0.9)',
            color: '#ffffff',
        }
      },
    error: {
        duration: 2000,
        style: {
            background: 'rgba(237, 40, 40, 0.9)',
            color: '#ffffff',
            boxShadow: '0px 0px 10px 0px rgba(173, 61, 61, 0.3)',
            zIndex: 1,
        }
    },
    }} />)
}