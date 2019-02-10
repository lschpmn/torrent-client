import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import * as React from 'react';
import { connect } from 'react-redux';
import { queryDestinationPath } from '../lib/thunks';
import { ReducerState } from '../lib/types';

type Props = {
  downloadDestination?: string,
  onClose: () => void,
  open: boolean,
  queryDestinationPath: typeof queryDestinationPath,
};

export const SettingsModal = ({ downloadDestination, onClose, open, queryDestinationPath }: Props) =>
  <Dialog
    fullWidth
    onClose={onClose}
    open={open}
  >
    <DialogTitle>Settings</DialogTitle>
    <DialogContent style={{ display: 'flex', flexDirection: 'row' }}>
      <div style={{ flex: 1 }}>
        Download Location
      </div>
      <div style={{ flex: 1 }} onClick={queryDestinationPath}>
        {downloadDestination || 'Click to set download destination' }
      </div>
    </DialogContent>
    <DialogActions>
      <Button color="primary" onClick={onClose}>
        Close
      </Button>
    </DialogActions>
  </Dialog>;

export default connect(
  (state: ReducerState) => ({
    downloadDestination: state.downloadDestination,
  }),
  {
    queryDestinationPath,
  },
)(SettingsModal);