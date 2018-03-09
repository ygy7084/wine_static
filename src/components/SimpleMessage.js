import React from 'react';
import { ToastContainer, toast } from 'react-toastify';

const styles = {
  simpleMessage: {
    zIndex: '9999',
  },
};
const turnOnSimpleMessage = toast;
const SimpleMessage = function SimpleMessage() {
  return (
    <div>
      <ToastContainer
        style={styles.simpleMessage}
        position="top-center"
        type="default"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
      />
    </div>
  );
};

export { SimpleMessage, turnOnSimpleMessage };
