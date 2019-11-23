import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { Torrent } from '../../../types';
import { getSizeStr } from '../../lib/utils';
import PendingFile from './PendingFile';

type Props = {
  torrents: Torrent[],
};

const PendingTorrentModal = ({ torrents }: Props) => {
  const classes = useStyles({});
  const torrent = torrents[0];
  console.log(torrent);

  return <Dialog
    classes={{
      paper: classes.paper,
    }}
    fullWidth
    maxWidth="md"
    open={true}
  >
    <DialogContent>
      <div style={styles.container}>
        <div style={styles.subContainer}>
          <h2>Info</h2>

          <h4>Name</h4>
          <div>{torrent.name}</div>

          <h4>Size</h4>
          <div>{getSizeStr(torrent.size)}</div>
        </div>

        <div style={styles.subContainer}>
          <h2>Files</h2>

          <div style={styles.fileContainer}>
            {torrent.files.map(file => <PendingFile key={file.name} file={file} />)}
          </div>

        </div>
      </div>
    </DialogContent>
  </Dialog>;
};

export default PendingTorrentModal;

const useStyles = makeStyles({
  paper: {
    height: '80%',
  },
});

const styles = {
  container: {
    display: 'flex',
  },
  fileContainer: {
    display: 'flex',
    flexDirection: 'column',
  } as React.CSSProperties,
  subContainer: {
    flex: 1,
  },
};
