import Checkbox from '@material-ui/core/Checkbox';
import ListItem from '@material-ui/core/ListItem/ListItem';
import T from '@material-ui/core/Typography';
import * as React from 'react';
import { Torrent } from '../../../types';
import * as moment from 'moment';
import { getSizeStr } from '../../lib/utils';

type Props = {
  onPress?: () => void,
  selected: boolean,
  style?: React.CSSProperties,
  torrent: Torrent,
};

const TorrentItem = ({ onPress, selected, style, torrent }: Props) => (
  <ListItem button style={styles.container} divider onMouseDown={onPress}>
    <Checkbox
      checked={selected}
      style={styles.checkbox}
    />
    <T color="textPrimary" variant="body1" style={style}>{torrent.name}</T>
    <T color="textPrimary" variant="body1" style={style}>{getSizeStr(torrent.size)}</T>
    <T color="textPrimary" variant="body1" style={style}>{moment(torrent.added).fromNow()}</T>
  </ListItem>
);

export default TorrentItem;

const styles = {
  checkbox: {
    width: '2rem',
  },
  container: {
   padding: 0,
  },
};
