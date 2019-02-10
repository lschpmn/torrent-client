import Checkbox from '@material-ui/core/Checkbox';
import ListItem from '@material-ui/core/ListItem/ListItem';
import * as React from 'react';
import { Torrent } from '../../types';
import * as moment from 'moment';

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
        <div style={style}>{getSizeStr(torrent.size)}</div>
        <div style={style}>{moment(torrent.added).fromNow()}</div>
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

const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
function getSizeStr(size: number): string {
  let currentSize = size;
  let sizeLabel = 0;

  while (currentSize > 1024) {
    currentSize = currentSize / 1024;
    sizeLabel++;
  }

  currentSize = Math.round(currentSize * 100) / 100;
  return `${currentSize} ${sizes[sizeLabel]}`;
}