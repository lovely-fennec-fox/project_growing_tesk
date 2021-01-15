import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

function getModalStyle() {
  const top = 50;
  const left = 55;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    minHeight: 400,
    backgroundColor: 'white',
    border: '2px solid #b3e5fc',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    maxHeight: '70vh',
  },
}));

const BasicModal = ({ children, open, setOpen }) => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        disableBackdropClick={true}
      >
        <div style={modalStyle} className={classes.paper}>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <img
              src="/icon/close.png"
              style={{ width: '20px', height: '20px' }}
              onClick={handleClose}
              alt="close icon"
            />
          </div>
          {children}
        </div>
      </Modal>
    </div>
  );
};

export default BasicModal;
