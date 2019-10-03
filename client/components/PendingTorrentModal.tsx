import * as React from 'react';
import { Torrent } from '../../types';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

type Props = {
  torrents: Torrent[],
};

export default class PendingTorrentModal extends React.Component<Props> {
  render() {
    return <Dialog fullWidth open={true}>
      <DialogContent>
        <div style={styles.container}>
          <div style={styles.subContainer}>Info</div>

          <div style={styles.subContainer}>Files</div>
        </div>
      </DialogContent>
    </Dialog>;
  }
}

const styles = {
  container: {
    display: 'flex',
  },
  subContainer: {
    flex: 1,
  },
};