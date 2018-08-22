import * as React from 'react';
import { Paper } from '@material-ui/core';
import { Torrent } from '../../types';

type Props = {
  torrent: Torrent,
};

export default class TorrentItem extends React.Component<Props> {
  render() {
    const { torrent } = this.props;
    console.log(torrent);

    return <Paper style={styles.container}>
      {torrent.name}
    </Paper>;
  }
}

const styles = {
  container: {
    margin: '0.75rem',
    padding: '1rem',
  },
};