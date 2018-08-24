import * as React from 'react';
import { Torrent } from '../../types';
import Paper from '@material-ui/core/Paper/Paper';
import ListItem from '@material-ui/core/ListItem/ListItem';

type Props = {
  style?: React.CSSProperties,
  torrent: Torrent,
};

export default class TorrentItem extends React.Component<Props> {
  render() {
    const { style, torrent } = this.props;
    console.log(torrent);

    return (
      <ListItem button style={styles.container}>
        <Paper style={styles.paper}>
          <div style={style}>{torrent.name}</div>
          <div style={style}>{Math.round(torrent.size / 1024) + 'Kb'}</div>
        </Paper>
      </ListItem>
    );
  }
}

const styles = {
  container: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  paper: {
    borderRadius: 0,
    padding: '1rem',
    width: '100%',
  },
};