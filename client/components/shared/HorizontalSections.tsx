import Divider from '@material-ui/core/Divider';
import makeStyles from '@material-ui/core/styles/makeStyles';
import throttle from 'lodash/throttle';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { setDividerPosition } from '../../lib/action-creators';
import { ReducerState } from '../../lib/types';
import { useAction } from '../../lib/utils';

const MIN_WIDTH = 4;

const initPercents = children => Array(children.length).fill(100 / children.length);

type Props = {
  children: React.ReactNode[],
  id: string,
  listenOnly?: boolean,
};

const HorizontalSections = ({ children, id, listenOnly }: Props) => {
  const setDividerPositionAction = useAction(setDividerPosition);
  const savedPercents = useSelector((state: ReducerState) => state.dividerPositions[id]) as number[];
  const [isTracking, setIsTracking] = useState(false);
  const [node, setNode] = useState(null);
  const [percents, setPercents] = useState(savedPercents || initPercents(children));
  const [trackingIndex, setTrackingIndex] = useState(null);
  const elementBox = useElementBox(node);
  const mouseX = useMouseX(isTracking, setIsTracking);
  const classes = useStyles({});

  useEffect(() => {
    console.log(percents);
    const total = percents.reduce((tot, val) => tot + val, 0);
    console.log(`total: ${total}`);
  }, [percents]);
  useEffect(() => console.log(elementBox), [elementBox]);

  useEffect(() => {
    if (isTracking && mouseX) {
      let overallPercent = ((mouseX - elementBox.left) / elementBox.width * 100);
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
  }, [isTracking, mouseX, trackingIndex]);

  useEffect(() => {
    if (isTracking && percents) setDividerPositionAction(id, percents);
  }, [percents]);

  useEffect(() => {
    if (!isTracking && savedPercents) setPercents(savedPercents);
  }, [savedPercents]);

  return <div className={classes.container} ref={setNode}>
    {children.map((child, i) =>
      <div key={i} className={classes.item} style={{ flex: percents[i] }}>
        {i !== 0 &&
          <Divider
            className={classes.divider}
            onMouseDown={() => {
              if (listenOnly) return;
              setIsTracking(true);
              setTrackingIndex(i);
            }}
            orientation="vertical"
            style={{ cursor: listenOnly ? 'inherit' : 'ew-resize' }}
          />
        }
        {child}
      </div>
    )}
  </div>;
};

const useStyles = makeStyles({
  container: {
    display: 'flex',
    width: '100%',
  },
  divider: {
    marginRight: '0.25rem',
    width: 3,
  } as React.CSSProperties,
  item: {
    display: 'flex',
    wordBreak: 'break-all',
  } as React.CSSProperties,
} as any);

const useElementBox = (node) => {
  const [elementBox, setElementBox] = useState(null as null | ClientRect);

  useEffect(() => {
    if (node) {
      const getSizes = throttle(() => setElementBox(node.getBoundingClientRect()), 100);

      getSizes();
      window.addEventListener('resize', getSizes);
      return () => window.removeEventListener('resize', getSizes);
    }
  }, [node]);

  return elementBox;
};

const useMouseX = (isTracking, setIsTracking): number => {
  const [mouseX, setMouseX] = useState(null);

  useEffect(() => {
    if (isTracking) {
      const trackMouseUp = () => setIsTracking(false);
      const trackMouseMovement = throttle(e => setMouseX(e.clientX), 15);

      document.addEventListener('mouseup', trackMouseUp);
      document.addEventListener('mousemove', trackMouseMovement);

      return () => {
        document.removeEventListener('mouseup', trackMouseUp);
        document.removeEventListener('mousemove', trackMouseMovement);
      }
    } else {
      setMouseX(null);
    }
  }, [isTracking]);

  return mouseX;
};

export default HorizontalSections
