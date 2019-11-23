import blue from '@material-ui/core/colors/blue';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

export const colors = {
  danger: red['500'],
  primary: green.A400,
  secondary: blue['500'],
};

export const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];

export function getSizeStr(size: number): string {
  let currentSize = size;
  let sizeLabel = 0;

  while (currentSize > 1024) {
    currentSize = currentSize / 1024;
    sizeLabel++;
  }

  currentSize = Math.round(currentSize * 100) / 100;
  return `${currentSize} ${sizes[sizeLabel]}`;
}

export const useAction = (action, deps?) => {
  const dispatch = useDispatch();

  return useCallback((...args) =>
    dispatch(action(...args)), deps ? [dispatch, ...deps] : [dispatch]);
};
