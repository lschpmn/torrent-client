import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TC from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TR from '@material-ui/core/TableRow';
import * as React from 'react';
import { File } from '../../../types';
import { getSizeStr } from '../../lib/utils';

type Props = {
  files: File[],
};

const FilesTable = ({ files }: Props) => {
  return <div style={styles.container}>
    <Table>
      <TableHead>
        <TR style={{ display: 'flex' }}>
          <TC style={{ flex: 1 }}>
            Selected
          </TC>
          <TC style={{ flex: 1 }}>
            File Name
          </TC>
          <TC style={{ flex: 1 }}>
            Size
          </TC>
        </TR>
      </TableHead>
      <TableBody>
        {files.map(file => (
          <TR hover key={file.name} style={styles.fileContainer}>
            <TC style={{ flex: 1 }}>
              {String(file.selected)}
            </TC>
            <TC style={{ flex: 1 }}>
              {file.name}
            </TC>
            <TC style={{ flex: 1 }}>
              {getSizeStr(file.size)}
            </TC>
          </TR>
        ))}
      </TableBody>
    </Table>
  </div>;
};

export default FilesTable;

const styles = {
  container: {
  },
  fileContainer: {
    cursor: 'pointer',
    display: 'flex',
  } as React.CSSProperties,
};
