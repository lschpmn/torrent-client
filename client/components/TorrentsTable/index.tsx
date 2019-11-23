import Checkbox from '@material-ui/core/Checkbox';
import green from '@material-ui/core/colors/green';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';
import { useCallback, useState } from 'react';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { ReducerState } from '../../lib/types';
import TorrentItem from './TorrentItem';

type Props = {
  allSelected: boolean,
  selectAll: () => void,
  selected: { [i: string]: boolean },
  toggleSelected: (magnetLink: string) => void,
};

const TorrentsTable = ({ allSelected, selectAll, selected, toggleSelected }: Props) => {
  const [sort, setSort] = useState('added');
  const [sortAscending, setSortAscending] = useState(false);
  const torrents = useSelector((state: ReducerState) => state.torrents)
    .filter(torrent => !torrent.pending);

  const changeSort = useCallback(newSort => {
    if (newSort === sort) setSortAscending(!sortAscending);
    else setSort(newSort);
  }, [sort, sortAscending]);

  console.log(sort);
  return <div>
    <Paper style={styles.sectionTitle}>
      <div>
        <Checkbox
          checked={torrents.length > 0 && allSelected}
          onChange={selectAll}
          style={{ width: '2rem' }}
        />
      </div>
      <div style={{ ...styles.section, cursor: undefined }}>
        Name
      </div>
      <div onMouseDown={() => changeSort('size')} style={styles.section}>
        Size
        {sort === 'size' && (sortAscending
          ? <ExpandLess style={styles.expandIcon} />
          : <ExpandMore style={styles.expandIcon} />)
        }
      </div>
      <div onMouseDown={() => changeSort('added')} style={styles.section}>
        Added
        {sort === 'added' && (sortAscending
          ? <ExpandLess style={styles.expandIcon} />
          : <ExpandMore style={styles.expandIcon} />)
        }
      </div>
    </Paper>

    <List>
      {torrents
        .sort((a, b) => sortAscending ? a[sort] - b[sort] : b[sort] - a[sort])
        .map((torrent, i) => (
          <TorrentItem
            key={i}
            onPress={() => toggleSelected(torrent.magnetLink)}
            selected={!!selected[torrent.magnetLink]}
            style={styles.section}
            torrent={torrent}
          />
        ))
      }
    </List>
  </div>;
};

export default TorrentsTable;

const styles = {
  dialog: {
    width: '50rem',
  },
  expandIcon: {
    fontSize: '2rem',
  },
  section: {
    alignItems: 'center',
    display: 'flex',
    flex: 1,
    cursor: 'pointer',
  },
  sectionTitle: {
    borderRadius: 0,
    display: 'flex',
    flexDirection: 'row' as 'row',
    padding: '1rem 0',
  },
  toolbar: {
    backgroundColor: green.A400,
  },
};
