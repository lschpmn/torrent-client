import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { getDownloadDestination } from '../lib/action-creators';
import { ReducerState } from '../lib/types';
import { useAction } from '../lib/utils';

type Props = {
  onClose: () => void,
  open: boolean,
};

export const SettingsModal = ({ onClose, open }: Props) => {
  const getDownloadDestinationAction = useAction(getDownloadDestination);
  const downloadDestination = useSelector((state: ReducerState) => state.downloadDestination);

  return <Dialog
    fullWidth
    onClose={onClose}
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
      <Button color="secondary" onClick={onClose}>
        Close
      </Button>
    </DialogActions>
  </Dialog>
};

export default SettingsModal;
