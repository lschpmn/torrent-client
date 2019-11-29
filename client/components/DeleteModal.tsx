import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import makeStyles from '@material-ui/core/styles/makeStyles';
import T from '@material-ui/core/Typography';
import Delete from '@material-ui/icons/Delete';
import * as React from 'react';
import { useCallback, useState } from 'react';
import { Torrent } from '../../types';
import { deleteTorrent } from '../lib/action-creators';
import { useAction } from '../lib/utils';

type Props = {
  disabled: boolean,
  torrents?: Torrent[],
};

const DeleteModal = ({ disabled, torrents }: Props) => {
  const [open, setOpen] = useState(false);
  const deleteTorrentAction = useAction(deleteTorrent);
  const classes = useStyles({});

  const onDelete = useCallback(() => {
    torrents.forEach(torrent => deleteTorrentAction(torrent.magnetLink));
  }, [torrents]);

  if (!torrents) return null;
  return <div>
    <IconButton className={classes.error} disabled={disabled} onClick={() => setOpen(true)}>
      <Delete/>
    </IconButton>
    <Dialog
      fullWidth
      onClose={() => setOpen(false)}
      open={open}
    >
      <DialogTitle>
        Delete
      </DialogTitle>
      <DialogContent>
        {torrents.map(torrent =>
          <DialogContentText key={torrent.magnetLink} style={styles.item}>
            {torrent.name}
          </DialogContentText>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onDelete}><T color="error" variant="inherit">Delete Torrent</T></Button>
        <Button onClick={onDelete}><T color="error" variant="inherit">Delete Torrent and Data</T></Button>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
      </DialogActions>
    </Dialog>
  </div>;
};

const useStyles = makeStyles(theme => ({
  error: {
    color: theme.palette.error.main,
  },
}));

const styles = {
  item: {
    color: 'black',
    margin: '1rem 1rem 1rem 0',
  },
};

export default DeleteModal;
