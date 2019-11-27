import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TC from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TR from '@material-ui/core/TableRow';
import * as React from 'react';
import { useCallback, useState } from 'react';
import { File } from '../../../types';
import { setFileSelected } from '../../lib/action-creators';
import { getSizeStr, useAction } from '../../lib/utils';

type Props = {
  files: File[],
  magnetLink: string,
};

const FilesTable = ({ files, magnetLink }: Props) => {
  const setFileSelectedAction = useAction(setFileSelected);
  const [selectedFileName, setSelectedFileName] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [mousePos, setMousePos] = useState({
    x: 0,
    y: 0,
  });

  const selectedFile = files.find(file => file.name === selectedFileName);

  const flipFileSelected = useCallback(() => {
    setFileSelectedAction(magnetLink, selectedFile?.name, !selectedFile?.selected);
    setMenuOpen(false);
  }, [selectedFile]);

  const mouseClick = useCallback((e, fileName: string) => {
    setMousePos({
      x: e.pageX,
      y: e.pageY,
    });
    setMenuOpen(true);
    setSelectedFileName(fileName);
  }, []);

  return <div style={styles.container}>
    <Table size={'small'}>
      <TableHead>
        <TR style={{ display: 'flex' }}>
          <TC style={{ flex: 1 }}>
            Selected
          </TC>
          <TC style={{ flex: 9 }}>
            File Name
          </TC>
          <TC style={{ flex: 9 }}>
            Size
          </TC>
        </TR>
      </TableHead>
      <TableBody>
        {files.map(file => (
          <TR
            hover
            key={file.name}
            onContextMenu={(e) => mouseClick(e, file.name)}
            style={styles.fileContainer}
          >
            <TC style={{ flex: 1 }}>
              {String(file.selected)}
            </TC>
            <TC style={{ flex: 9 }}>
              {file.name}
            </TC>
            <TC style={{ flex: 9 }}>
              {getSizeStr(file.size)}
            </TC>
          </TR>
        ))}
      </TableBody>
    </Table>
    <Menu
      anchorReference="anchorPosition"
      anchorPosition={({
        left: mousePos.x,
        top: mousePos.y,
      })}
      onBackdropClick={() => setMenuOpen(false)}
      onContextMenu={() => setMenuOpen(false)}
      open={menuOpen}
    >
      <MenuItem>
        <div onClick={flipFileSelected}>
          {selectedFile?.selected
            ? 'Don\'t Download'
            : 'Download'}
        </div>
      </MenuItem>
    </Menu>
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
