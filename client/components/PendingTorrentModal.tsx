import { makeStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { Torrent } from '../../types';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { colors, getSizeStr } from '../lib/utils';
import Checkbox from '@material-ui/core/Checkbox';

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
            {torrent.files.map(file => <div key={file.name} style={styles.file}>
              <Checkbox
                classes={{
                  checked: classes.checked,
                }}
                color={'default'}
                value={true}
              />
              <div>{getSizeStr(file.size)}&nbsp;&nbsp;</div>
              <div>{file.name}</div>
            </div>)}
          </div>

        </div>
      </div>
    </DialogContent>
  </Dialog>;
};

export default PendingTorrentModal;

const useStyles = makeStyles({
  checked: {
    color: colors.secondary,
  },
  paper: {
    height: '80%',
  },
});

const styles = {
  container: {
    display: 'flex',
  },
  file: {
    alignItems: 'center',
    display: 'flex',
    margin: '1rem 0',
  } as React.CSSProperties,
  fileContainer: {
    display: 'flex',
    flexDirection: 'column',
  } as React.CSSProperties,
  subContainer: {
    flex: 1,
  },
};
