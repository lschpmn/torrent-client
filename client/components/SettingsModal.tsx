import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Settings from '@material-ui/icons/Settings';
import { useState } from 'react';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { getDownloadDestination } from '../lib/action-creators';
import { ReducerState } from '../lib/types';
import { useAction } from '../lib/utils';


export const SettingsModal = () => {
  const [open, setOpen] = useState(false);
  const classes = useStyles({});
  const getDownloadDestinationAction = useAction(getDownloadDestination);
  const downloadDestination = useSelector((state: ReducerState) => state.downloadDestination);

  return <div>
    <IconButton className={classes.white} onClick={() => setOpen(true)}>
      <Settings/>
    </IconButton>
    <Dialog
      fullWidth
      onClose={() => setOpen(false)}
      open={open}
    >
      <DialogTitle>Settings</DialogTitle>
      <DialogContent style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ flex: 1 }}>
          Download Location
        </div>
        <div style={{ flex: 1 }} onClick={() => getDownloadDestinationAction()}>
          {downloadDestination || 'Click to set download destination' }
        </div>
      </DialogContent>
      <DialogActions>
        <Button color="secondary" onClick={() => setOpen(false)}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  </div>
};

const useStyles = makeStyles(theme => ({
  white: {
    color: theme.palette.common.white,
  },
}));

export default SettingsModal;
