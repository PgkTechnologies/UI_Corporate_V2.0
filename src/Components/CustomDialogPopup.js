import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

function CustomDialogPopup(props) {
    const {
        isOpenDialog = false,
        dialogTitle = undefined,
        dialogDescription = undefined,
        isCancelBtnRequired = true,
        isConfirmBtnRequired = true,
        isCancelBtnDisabled = false,
        isConfirmBtnDisabled = false,
        cancelbtnText = 'Cancel',
        confirmbtnText = 'Confirm',
        closeDialogHandler = undefined,
        confirmDialogHandler = undefined,
        disableBackdropClick = false,
        dialogContent = undefined,
        maxWidth = 'md',
        rootStyles={},
        contentStyles={padding:'0px'}
    } = props;

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <div style={{overFlow:"hidden"}}>
            <Dialog
                fullScreen={fullScreen}
                open={isOpenDialog}
                onClose={closeDialogHandler}
                aria-labelledby="responsive-dialog-title"
                disableBackdropClick={disableBackdropClick ? disableBackdropClick : false}
                fullWidth={true}
                maxWidth={maxWidth}
                // style={{minWidth: '90%', maxWidth: '90%'}}
            >
                {dialogTitle && <DialogTitle id="responsive-dialog-title">{dialogTitle}</DialogTitle>}
                <DialogContent className={`${props?.contentClasses}`} dividers style={contentStyles}>
                    {dialogDescription && <DialogContentText>
                        {dialogDescription}
                    </DialogContentText>}
                    {dialogContent}
                </DialogContent>
                {(isCancelBtnRequired || isConfirmBtnRequired) && <DialogActions>
                    {isCancelBtnRequired && <Button autoFocus onClick={closeDialogHandler} disabled={isCancelBtnDisabled} color="primary">
                        {cancelbtnText}
                    </Button>}
                    {isConfirmBtnRequired && <Button onClick={confirmDialogHandler} disabled={isConfirmBtnDisabled} color="primary">
                        {confirmbtnText}
                    </Button>}
                </DialogActions>}
            </Dialog>
        </div>
    );
}

CustomDialogPopup.propTypes = {
    isOpenDialog: PropTypes.bool,
    dialogTitle: PropTypes.string,
    dialogDescription: PropTypes.string,
    isCancelBtnRequired: PropTypes.bool,
    isConfirmBtnRequired: PropTypes.bool,
    isCancelBtnDisabled: PropTypes.bool,
    isConfirmBtnDisabled: PropTypes.bool,
    cancelbtnText: PropTypes.string,
    confirmbtnText: PropTypes.string,
    closeDialogHandler: PropTypes.func,
    confirmDialogHandler: PropTypes.func,
    disableBackdropClick: PropTypes.bool,
    dialogContent: PropTypes.element,
    maxWidth: PropTypes.string
};

export default CustomDialogPopup;