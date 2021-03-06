import Checkbox from '@material-ui/core/Checkbox';
import ListItem from '@material-ui/core/ListItem/ListItem';
import T from '@material-ui/core/Typography';
import * as moment from 'moment';
import * as React from 'react';
import { Torrent } from '../../../types';
import { getSizeStr } from '../../lib/utils';
import DynamicSections from '../shared/DynamicSections';

type Props = {
  onPress?: () => void,
  selected: boolean,
  style?: React.CSSProperties,
  torrent: Torrent,
};

const TorrentItem = ({ onPress, selected, style, torrent }: Props) => (
  <ListItem button style={styles.container} divider onMouseDown={onPress}>
    <Checkbox
      size='small'
      checked={selected}
      style={styles.checkbox}
    />
    <DynamicSections id="torrents-table" listenOnly>
      <T color="textPrimary" variant="body1" style={style}>{torrent.name}</T>
      <T color="textPrimary" variant="body1" style={style}>{getSizeStr(torrent.size)}</T>
      <T color="textPrimary" variant="body1" style={style}>{moment(torrent.added).fromNow()}</T>
    </DynamicSections>
  </ListItem>
);

export default TorrentItem;

const styles = {
  checkbox: {
    padding: 4,
    width: '2rem',
  },
  container: {
   padding: 0,
  },
};
