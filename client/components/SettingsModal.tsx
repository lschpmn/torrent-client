import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import * as React from 'react';

type Props = {
  onClose: () => void,
  open: boolean,
};

export default class SettingsModal extends React.Component<Props> {
  render() {
    return <Dialog
      fullWidth
      onClose={() => console.log('close')}
      open={this.props.open}
    >
      <DialogTitle>Settings</DialogTitle>
      <DialogContent style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ flex: 1 }}>
          Download Location
        </div>
        <div style={{ flex: 1 }}>
          D:/Torrents
        </div>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={this.props.onClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>;
  }
}