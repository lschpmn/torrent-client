import Checkbox from '@material-ui/core/Checkbox';
import green from '@material-ui/core/colors/green';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import * as React from 'react';
import { useCallback, useMemo, useState } from 'react';
import { Torrent } from '../../../types';
import VerticalSections from '../VerticalSections';
import TorrentItem from './TorrentItem';

type Props = {
  allSelected: boolean,
  selectAll: () => void,
  selected: { [i: string]: boolean },
  toggleSelected: (magnetLink: string) => void,
  torrents: Torrent[],
};

const TorrentsTable = ({ allSelected, selectAll, selected, toggleSelected, torrents }: Props) => {
  const [sort, setSort] = useState('added');
  const [sortAscending, setSortAscending] = useState(false);

  const changeSort = useCallback(newSort => {
    if (newSort === sort) setSortAscending(!sortAscending);
    else setSort(newSort);
  }, [sort, sortAscending]);

  const sortedTorrents = useMemo(() => torrents.sort((a, b) =>
    sort === 'name'
      ? sortAscending
        ? a[sort].localeCompare(b[sort])
        : b[sort].localeCompare(a[sort])
      : sortAscending
        ? a[sort] - b[sort]
        : b[sort] - a[sort]),
    [sort, sortAscending, torrents]);

  return <div style={styles.container}>
    <Paper style={styles.sectionTitle}>
      <div>
        <Checkbox
          checked={torrents.length > 0 && allSelected}
          onChange={selectAll}
          style={{ width: '2rem' }}
        />
      </div>
      <div onMouseDown={() => changeSort('name')} style={styles.section}>
        Name
        {sort === 'name' && <SortIcon ascending={sortAscending} />}
      </div>
      <div onMouseDown={() => changeSort('size')} style={styles.section}>
        Size
        {sort === 'size' && <SortIcon ascending={sortAscending} />}
      </div>
      <div onMouseDown={() => changeSort('added')} style={styles.section}>
        Added
        {sort === 'added' && <SortIcon ascending={sortAscending} />}
      </div>
    </Paper>

    <VerticalSections
      child1={
        <List>
          {sortedTorrents
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
      }
      child2={
        <div>Info Tabs go here</div>
      }
      id="main-table"
    />
  </div>;
};

type SortIconProps = {
  ascending: boolean,
};

const SortIcon = ({ ascending }: SortIconProps) => ascending
  ? <ExpandLess style={styles.expandIcon}/>
  : <ExpandMore style={styles.expandIcon}/>;

export default TorrentsTable;

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  } as React.CSSProperties,
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
