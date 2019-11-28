import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TC from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TR from '@material-ui/core/TableRow';
import * as React from 'react';
import { useCallback, useMemo } from 'react';
import { Torrent } from '../../../types';
import { deleteTorrent, setFileSelected, startTorrent } from '../../lib/action-creators';
import { getSizeStr, useAction } from '../../lib/utils';

type Props = {
  torrent: Torrent,
};

const PendingTorrentModal = ({ torrent }: Props) => {
  const setFilesSelectedAction: typeof setFileSelected = useAction(setFileSelected);
  const classes = useStyles({});
  const deleteTorrentAction = useAction(() => deleteTorrent(torrent.magnetLink), [torrent.magnetLink]);
  const startTorrentAction = useAction(() => startTorrent(torrent.magnetLink), [torrent.magnetLink]);

  const isAllFilesSelected = useMemo(() => torrent.files.every(file => file.selected), [torrent.files]);
  const flipAllFilesSelected = useCallback(() => {
    torrent
      .files
      .filter(file => isAllFilesSelected ? file.selected : !file.selected)
      .forEach(file => setFilesSelectedAction(torrent.magnetLink, file.name, !isAllFilesSelected));
  }, [isAllFilesSelected, torrent.files]);

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
        <div style={{ display: 'flex' }}>
          <div style={{ flex: 1 }}>
            <h4>Name</h4>
            <div>{torrent.name}</div>
          </div>

          <div style={{ flex: 1 }}>
            <h4>Size</h4>
            <div>{getSizeStr(torrent.size)}</div>
          </div>
        </div>

        <h2 style={{ marginTop: '3rem' }}>Files</h2>

        <Table size="small">
          <TableHead>
            <TR>
              <TC padding="checkbox">
                <Checkbox
                  checked={isAllFilesSelected}
                  onChange={flipAllFilesSelected}
                />
              </TC>
              <TC>Size</TC>
              <TC>Name</TC>
            </TR>
          </TableHead>
          <TableBody>
            {torrent.files.map(file =>
              <TR key={file.name}>
                <TC padding="checkbox">
                  <Checkbox
                    checked={file.selected}
                    onChange={e => setFilesSelectedAction(torrent.magnetLink, file.name, e.target.checked)}
                  />
                </TC>
                <TC>{getSizeStr(file.size)}</TC>
                <TC>{file.name}</TC>
              </TR>
            )}
          </TableBody>
        </Table>

        <div style={{ flex: 1 }} />

        <div style={styles.buttonContainer}>
          <Button
            classes={{
              root: classes.buttonContain,
            }}
            onClick={deleteTorrentAction}
            style={styles.button}
            variant="contained"
          >
            Cancel
          </Button>
          <div style={{ width: '2rem' }} />
          <Button
            color="secondary"
            onClick={startTorrentAction}
            style={styles.button}
            variant="contained"
          >
            Add Torrent
          </Button>
        </div>
      </div>
    </DialogContent>
  </Dialog>;
};

export default PendingTorrentModal;

const useStyles = makeStyles((theme) => ({
  paper: {
    height: '80%',
  },
  buttonContain: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.common.white,
    '&:hover': {
      backgroundColor: theme.palette.error.dark,
    },
  },
}));

const styles = {
  button: {
    width: '10rem',
  } as React.CSSProperties,
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    margin: '2rem 0',
  } as React.CSSProperties,
  container: {
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
  } as React.CSSProperties,
};
