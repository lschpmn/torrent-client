import * as React from 'react';
import { File } from '../../../types';

type Props = {
  files: File[],
};

const FilesTable = ({ files }: Props) => {
  return <div>
    {files.map(file => <div key={file.name}>{file.name}</div>)}
  </div>;
};

export default FilesTable;
