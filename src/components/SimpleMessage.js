import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const turnOnSimpleMessage = toast;
const SimpleMessage = function SimpleMessage() {
  return (
    <div>
      <ToastContainer
        position="top-center"
        type="default"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
      />
    </div>
  );
};

export { SimpleMessage, turnOnSimpleMessage };
