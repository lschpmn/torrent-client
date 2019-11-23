import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { Torrent } from '../../../types';
import { deleteTorrent, startTorrent } from '../../lib/action-creators';
import { colors, getSizeStr, useAction } from '../../lib/utils';
import PendingFile from './PendingFile';

type Props = {
  torrent: Torrent,
};

const PendingTorrentModal = ({ torrent }: Props) => {
  const classes = useStyles({});
  const deleteTorrentAction = useAction(() => deleteTorrent(torrent.magnetLink), [torrent.magnetLink]);
  const startTorrentAction = useAction(() => startTorrent(torrent.magnetLink), [torrent.magnetLink]);
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
            {torrent.files.map(file =>
              <PendingFile
                key={file.name}
                file={file}
                magnetLink={torrent.magnetLink}
              />,
            )}
          </div>
          <div style={{ flex: 1 }} />

          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}>
            <Button
              onClick={deleteTorrentAction}
              style={styles.cancelButton}
              variant="contained"
            >
              Cancel
            </Button>
            <div style={{ width: '2rem' }} />
            <Button
              onClick={startTorrentAction}
              style={styles.addButton}
              variant="contained"
            >
              Add Torrent
            </Button>
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
  addButton: {
    backgroundColor: colors.secondary,
    color: 'white',
    width: '10rem',
  } as React.CSSProperties,
  cancelButton: {
    backgroundColor: colors.danger,
    color: 'white',
    width: '10rem',
  } as React.CSSProperties,
  container: {
    display: 'flex',
    height: '100%',
  },
  fileContainer: {
    display: 'flex',
    flexDirection: 'column',
  } as React.CSSProperties,
  subContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  } as React.CSSProperties,
};
