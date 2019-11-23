import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { File } from '../../../types';
import { setFileSelected } from '../../lib/action-creators';
import { colors, getSizeStr, useAction } from '../../lib/utils';

type Props = {
  file: File,
  magnetLink: string,
};

const PendingFile = ({ file, magnetLink }: Props) => {
  const classes = useStyles({});
  const setSelected: typeof setFileSelected = useAction(setFileSelected);

  return  <div style={styles.file}>
    <Checkbox
      classes={{
        checked: classes.checked,
      }}
      checked={file.selected}
      color={'default'}
      onChange={e => setSelected(magnetLink, file.name, e.target.checked)}
    />
    <div>{getSizeStr(file.size)}&nbsp;&nbsp;</div>
    <div>{file.name}</div>
  </div>;
};

const useStyles = makeStyles({
  checked: {
    color: colors.secondary,
  },
});

const styles = {
  file: {
    alignItems: 'center',
    display: 'flex',
    margin: '1rem 0',
  } as React.CSSProperties,
};


export default PendingFile;
