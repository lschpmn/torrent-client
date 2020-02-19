import Divider from '@material-ui/core/Divider';
import makeStyles from '@material-ui/core/styles/makeStyles';
import throttle from 'lodash/throttle';
import debounce from 'lodash/debounce';
import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { setDividerPosition, setDividerPositionServer } from '../../lib/action-creators';
import { ReducerState } from '../../lib/types';
import { useAction } from '../../lib/utils';

const MIN_WIDTH = 4;

const initPercents = children => Array(children.length).fill(100 / children.length);

type Props = {
  children: React.ReactNode[],
  id: string,
  isVertical?: boolean,
  listenOnly?: boolean,
};

const DynamicSections = ({ children, id, isVertical, listenOnly }: Props) => {
  const setDividerPositionAction = useAction(setDividerPosition);
  const setDividerPositionServerAction = useCallback(debounce(useAction(setDividerPositionServer), 250), []);
  const savedPercents = useSelector((state: ReducerState) => state.dividerPositions[id]) as number[];
  const [isTracking, setIsTracking] = useState(false);
  const [node, setNode] = useState(null);
  const [percents, setPercents] = useState(savedPercents || initPercents(children));
  const [trackingIndex, setTrackingIndex] = useState(null);
  const elementBox = useElementBox(node);
  const mouse = useMouse(isTracking, setIsTracking, isVertical);
  const classes = useStyles({});

  // put back when finishing up component
  /*useEffect(() => {
    console.log(percents);
    const total = percents.reduce((tot, val) => tot + val, 0);
    console.log(`total: ${total}`);
  }, [percents]);*/

  useEffect(() => {
    if (isTracking && mouse) {
      let overallPercent = isVertical
        ? ((mouse - elementBox.top) / elementBox.height * 100)
        : ((mouse - elementBox.left) / elementBox.width * 100);
      overallPercent = Math.max(Math.min(overallPercent, 95), 5);
      overallPercent = Math.round(overallPercent * 1000) / 1000;

      const percent = overallPercent - percents.slice(0, trackingIndex).reduce((total, val) => total + val, 0);

      const newPercents = [...percents];
      const prePerc = newPercents[trackingIndex - 1] + percent;
      const curPerc = newPercents[trackingIndex] - percent;

      if (prePerc > MIN_WIDTH && curPerc > MIN_WIDTH) {
        newPercents[trackingIndex - 1] = prePerc;
        newPercents[trackingIndex] = curPerc;
      }

      setPercents(newPercents);
    }
  }, [isTracking, mouse, trackingIndex]);

  useEffect(() => {
    if (isTracking && percents) {
      setDividerPositionAction(id, percents);
      setDividerPositionServerAction(id, percents);
    }
  }, [percents]);

  useEffect(() => {
    if (!isTracking && savedPercents) setPercents(savedPercents);
  }, [savedPercents]);

  return <div className={classes.container} style={{ flexDirection: isVertical ? 'column' : 'row' }} ref={setNode}>
    {children.map((child, i) => (
      <div
        key={i}
        className={classes.item}
        style={{
          flex: percents[i],
          flexDirection: isVertical ? 'column' : 'row',
        }}
      >
        {i !== 0 && !listenOnly && (
          <Divider
            className={classes.divider}
            onMouseDown={() => {
              setIsTracking(true);
              setTrackingIndex(i);
            }}
            orientation={isVertical ? 'horizontal' : 'vertical'}
            style={{
              cursor: `${isVertical ? 'ns' : 'ew'}-resize`,
              height: isVertical ? 1 : 'inherit',
              width: isVertical ? 'inherit' : 1,
            }}
          />
        )}
        {child}
      </div>
    ))}
  </div>;
};

const useStyles = makeStyles({
  container: {
    display: 'flex',
    height: '100%',
    width: '100%',
  },
  divider: {
    borderRight: 'rgba(0,0,0,0) 0.5rem solid',
    backgroundClip: 'content-box',
    marginRight: '0.25rem',
  } as React.CSSProperties,
  item: {
    display: 'flex',
    overflow: 'auto',
    wordBreak: 'break-all',
  } as React.CSSProperties,
} as any);

const useElementBox = (node) => {
  const [elementBox, setElementBox] = useState(null as null | ClientRect);

  useEffect(() => {
    if (node) {
      const getSizes = throttle(() => setElementBox(node.getBoundingClientRect()), 50);

      getSizes();
      window.addEventListener('resize', getSizes);
      return () => window.removeEventListener('resize', getSizes);
    }
  }, [node]);

  return elementBox;
};

const useMouse = (isTracking, setIsTracking, isVertical): number => {
  const [mouse, setMouse] = useState(null);

  useEffect(() => {
    if (isTracking) {
      const trackMouseUp = () => setIsTracking(false);
      const trackMouseMovement = throttle(e => setMouse(isVertical ? e.clientY : e.clientX), 15);

      document.addEventListener('mouseup', trackMouseUp);
      document.addEventListener('mousemove', trackMouseMovement);

      return () => {
        document.removeEventListener('mouseup', trackMouseUp);
        document.removeEventListener('mousemove', trackMouseMovement);
      };
    } else {
      setMouse(null);
    }
  }, [isTracking]);

  return mouse;
};

export default DynamicSections;
