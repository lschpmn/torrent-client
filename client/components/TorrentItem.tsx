import Checkbox from '@material-ui/core/Checkbox';
import ListItem from '@material-ui/core/ListItem/ListItem';
import * as React from 'react';
import { Torrent } from '../../types';

type Props = {
  style?: React.CSSProperties,
  torrent: Torrent,
};

export default class TorrentItem extends React.Component<Props> {
  render() {
    const { style, torrent } = this.props;
    console.log(torrent);

    return (
      <ListItem button style={styles.container} divider>
        <Checkbox

        />
        <div style={style}>{torrent.name}</div>
        <div style={style}>{Math.round(torrent.size / 1024) + 'Kb'}</div>
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