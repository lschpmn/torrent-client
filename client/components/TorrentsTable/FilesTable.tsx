import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import T from '@material-ui/core/Typography';
import * as React from 'react';
import { useCallback, useState } from 'react';
import { File } from '../../../types';
import { setFileSelected } from '../../lib/action-creators';
import { getSizeStr, useAction } from '../../lib/utils';
import DynamicSections from '../shared/DynamicSections';

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

  return <div>
    <Paper elevation={0} square>
      <div style={{ padding: '1rem' }}>
        <DynamicSections id="file-table-head">
          <T color="textPrimary" variant="subtitle2" style={{ flex: 1 }}>
            Selected
          </T>
          <T color="textPrimary" variant="subtitle2" style={{ flex: 8 }}>
            File Name
          </T>
          <T color="textPrimary" variant="subtitle2" style={{ flex: 8 }}>
            Size
          </T>
        </DynamicSections>
      </div>
      <Divider/>
    </Paper>
    <List style={{ paddingTop: 0 }}>
      {files.map(file => (
        <ListItem
          button
          divider
          key={file.name}
          onContextMenu={(e) => mouseClick(e, file.name)}
        >
          <DynamicSections id="file-table-head" listenOnly>
            <T color="textPrimary" variant="body2" style={{  flex: 1 }}>
              {String(file.selected)}
            </T>
            <T color="textPrimary" variant="body2" style={{ flex: 8 }}>
              {file.name}
            </T>
            <T color="textPrimary" variant="body2" style={{ flex: 8 }}>
              {getSizeStr(file.size)}
            </T>
          </DynamicSections>
        </ListItem>
      ))}
    </List>

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
