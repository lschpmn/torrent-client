import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Toolbar from '@material-ui/core/Toolbar';
import Pause from '@material-ui/icons/Pause';
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
  const torrents = useSelector((state: ReducerState) => state.torrents);
  const [selected, setSelected] = useState({});
  const classes = useStyles({});

  const activeTorrents = torrents.filter(torrent => !torrent.pending);
  const pendingTorrents = torrents.filter(torrent => torrent.pending);
  const allSelected = activeTorrents.every(torrent => selected[torrent.magnetLink]);
  const greyOut = Object.values(selected).every(selected => !selected);

  const selectAll = useCallback(() => {
    const newSelected = activeTorrents
      .reduce((obj, torrent) => ({ ...obj, [torrent.magnetLink]: !allSelected }), {});
    setSelected(newSelected);
  }, [allSelected, activeTorrents]);

  const toggleSelected = useCallback((magnetLink: string) => {
    setSelected({ ...selected, [magnetLink]: !selected[magnetLink] });
  }, [selected]);

  return <div className={classes.container}>
    <div>
      <AppBar color="primary" position='static'>
        <Toolbar>
          <IconButton className={classes.white} disabled={greyOut} >
            <Pause/>
          </IconButton>
          <DeleteModal
            disabled={greyOut}
            torrents={activeTorrents.filter(torrent => selected[torrent.magnetLink])}
          />

          <div style={{ flex: 1 }}/>

          <AddTorrentModal/>
          <SettingsModal/>
        </Toolbar>
      </AppBar>
    </div>

    <TorrentsTable
      selected={selected}
      allSelected={allSelected}
      selectAll={selectAll}
      toggleSelected={toggleSelected}
      torrents={activeTorrents}
    />

    {!!pendingTorrents.length &&
      <PendingTorrentModal torrent={pendingTorrents[0]} />
    }
  </div>;
};

const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  white: {
    color: theme.palette.common.white,
  },
}));

export default hot(App);
