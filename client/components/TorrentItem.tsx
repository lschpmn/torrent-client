import Checkbox from '@material-ui/core/Checkbox';
import ListItem from '@material-ui/core/ListItem/ListItem';
import * as React from 'react';
import { Torrent } from '../../types';
import * as moment from 'moment';
import { getSizeStr } from '../lib/utils';

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
          style={styles.checkbox}
        />
        <div style={style}>{torrent.name}</div>
        <div style={style}>{getSizeStr(torrent.size)}</div>
        <div style={style}>{moment(torrent.added).fromNow()}</div>
      </ListItem>
    );
  }
}

const styles = {
  checkbox: {
    width: '2rem',
  },
  container: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  paper: {
    borderRadius: 0,
    padding: '0.5rem',
    width: '100%',
  },
};
