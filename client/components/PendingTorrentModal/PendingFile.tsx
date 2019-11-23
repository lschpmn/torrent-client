import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import * as React from 'react';
import { colors, getSizeStr } from '../../lib/utils';
import { File } from '../../../types';

type Props = {
  file: File,
};

const PendingFile = ({ file }: Props) => {
  const classes = useStyles({});

  return  <div style={styles.file}>
    <Checkbox
      classes={{
        checked: classes.checked,
      }}
      checked={file.selected}
      color={'default'}
      onChange={console.log}
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
