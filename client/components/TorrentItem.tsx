import Checkbox from '@material-ui/core/Checkbox';
import ListItem from '@material-ui/core/ListItem/ListItem';
import * as React from 'react';
import { Torrent } from '../../types';

type Props = {
  onPress?: () => void,
  selected: boolean,
  style?: React.CSSProperties,
  torrent: Torrent,
};

export default class TorrentItem extends React.Component<Props> {
  render() {
    const { onPress, selected, style, torrent } = this.props;

    return (
      <ListItem button style={styles.container} divider onMouseDown={onPress}>
        <Checkbox
          checked={selected}
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