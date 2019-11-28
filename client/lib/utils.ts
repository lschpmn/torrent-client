import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

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

export const useAction = <T extends Function>(action: T, deps?): T => {
  const dispatch = useDispatch();

  return useCallback((...args) =>
    dispatch(action(...args)), deps ? [dispatch, ...deps] : [dispatch]) as any;
};
