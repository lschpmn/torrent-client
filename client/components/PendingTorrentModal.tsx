import * as React from 'react';
import { Torrent } from '../../types';
import Modal from '@material-ui/core/Modal';

type Props = {
  torrents: Torrent[],
};

export default class PendingTorrentModal extends React.Component<Props> {
  render() {
    return <Modal open={true}>
      <div style={styles.container}>
        <div style={styles.subContainer}>Info</div>

        <div style={styles.subContainer}>Files</div>
      </div>
    </Modal>;
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