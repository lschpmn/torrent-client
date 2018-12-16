import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import * as React from 'react';
import { ipcRenderer } from 'electron';

type Props = {
  onClose: () => void,
  open: boolean,
};

type State = {
  path: null,
};

export default class SettingsModal extends React.Component<Props, State> {
  state = {
    path: null,
  };

  openExplorer = () => {
    ipcRenderer.once('explorer', (event, paths) => {
      console.log(paths);
      if (paths) this.setState({ path: paths[0] });
    });

    ipcRenderer.send('explorer');
  };

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
        <div style={{ flex: 1 }} onClick={this.openExplorer}>
          {this.state.path || 'Click to set download destination' }
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