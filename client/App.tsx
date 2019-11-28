import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Toolbar from '@material-ui/core/Toolbar';
import Add from '@material-ui/icons/Add';
import Delete from '@material-ui/icons/Delete';
import Pause from '@material-ui/icons/Pause';
import Settings from '@material-ui/icons/Settings';
import * as React from 'react';
import { useCallback, useState } from 'react';
import { hot } from 'react-hot-loader/root';
import { useSelector } from 'react-redux';
import AddTorrentModal from './components/AddTorrentModal';
import DeleteModal from './components/DeleteModal';
import PendingTorrentModal from './components/PendingTorrentModal';
import SettingsModal from './components/SettingsModal';
import TorrentsTable from './components/TorrentsTable';
import { ReducerState } from './lib/types';

const App = () => {
  const torrents = useSelector((state: ReducerState) => state.torrents).filter(torrent => !torrent.pending);
  const [selected, setSelected] = useState({});
  const [showAddTorrent, setShowAddTorrent] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const classes = useStyles({});

  const pendingTorrents = torrents.filter(torrent => torrent.pending);
  const allSelected = torrents.every(torrent => selected[torrent.magnetLink]);
  const greyOut = Object.values(selected).every(selected => !selected);

  const selectAll = useCallback(() => {
    setSelected(torrents.reduce((obj, torrent) => ({ ...obj, [torrent.magnetLink]: !allSelected }), {}));
  }, [allSelected, torrents]);
  const toggleAddTorrent = useCallback(() => setShowAddTorrent(!showAddTorrent), [showAddTorrent]);
  const toggleDelete = useCallback(() => setShowDelete(!showDelete), [showDelete]);
  const toggleSettings = useCallback(() => setShowSettings(!showSettings), [showSettings]);
  const toggleSelected = useCallback((magnetLink: string) => {
    setSelected({ ...selected, [magnetLink]: !selected[magnetLink] });
  }, [selected]);

  return <div className={classes.container}>
    <div>
      <AppBar position='static'>
        <Toolbar>
          <IconButton className={classes.white} disabled={greyOut} >
            <Pause/>
          </IconButton>
          <IconButton className={classes.deleteIcon} disabled={greyOut} onClick={toggleDelete}>
            <Delete/>
          </IconButton>

          <div style={{ flexGrow: 1 }}/>

          <IconButton className={classes.white} onMouseDown={toggleAddTorrent}>
            <Add/>
          </IconButton>
          <IconButton className={classes.white} onClick={toggleSettings}>
            <Settings/>
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>

    <TorrentsTable
      selected={selected}
      allSelected={allSelected}
      selectAll={selectAll}
      toggleSelected={toggleSelected}
      torrents={torrents}
    />

    <AddTorrentModal onClose={toggleAddTorrent} open={showAddTorrent}/>
    <DeleteModal
      open={showDelete}
      onClose={toggleDelete}
      torrents={torrents.filter(torrent => selected[torrent.magnetLink])}
    />
    <SettingsModal onClose={toggleSettings} open={showSettings}/>
    {!!pendingTorrents.length &&
      <PendingTorrentModal torrent={pendingTorrents[0]} />
    }
  </div>;
};

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  deleteIcon: {
    color: theme.palette.error.main,
  },
  white: {
    color: theme.palette.common.white,
  },
}));

export default hot(App);
