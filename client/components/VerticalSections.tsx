import Divider from '@material-ui/core/Divider';
import throttle from 'lodash/throttle';
import * as React from 'react';
import { useEffect, useMemo, useState } from 'react';

type Props = {
  child1: React.ReactNode,
  child2: React.ReactNode,
};

const VerticalSections = ({ child1, child2 }: Props) => {
  const [mouseY, setTrackingY] = useMouseYState();
  const [elementBox, setElementBox]: [ClientRect, any] = useState(null);
  const [node, setNode] = useState(null);

  const percent = useMemo(() => {
    if (mouseY && elementBox) {
      let _percent = ((mouseY - elementBox.top) / elementBox.height * 100);
      _percent = Math.max(Math.min(_percent, 99), 1);
      return Math.round(_percent * 1000) / 1000;
    } else return 50;
  }, [mouseY, elementBox]);

  console.log(percent);

  useEffect(() => {
    if (node) {
      const getSizes = throttle(() => setElementBox(node.getBoundingClientRect()), 100);

      getSizes();
      window.addEventListener('resize', getSizes);
      return () => window.removeEventListener('resize', getSizes);
    }
  }, [node]);

  return <div style={styles.container} ref={setNode}>
    <div style={{ ...styles.section, flex: percent }}>{child1}</div>
    <Divider
      onMouseDown={() => setTrackingY(true)}
      style={{ cursor: 'ns-resize', height: '0.5rem' }}
    />
    <div style={{ ...styles.section, flex: 100 - percent }}>{child2}</div>
  </div>;
};

const useMouseYState = () => {
  const [mouseY, setMouseY] = useState(null);
  const [isTracking, setIsTracking] = useState(null);

  useEffect(() => {
    if (isTracking) {
      const trackMouseUp = () => setIsTracking(false);
      const trackMouseMovement = throttle(e => setMouseY(e.clientY), 15);

      document.addEventListener('mouseup', trackMouseUp);
      document.addEventListener('mousemove', trackMouseMovement);

      return () => {
        document.removeEventListener('mouseup', trackMouseUp);
        document.removeEventListener('mousemove', trackMouseMovement);
      }
    }
  }, [isTracking]);

  return [mouseY, setIsTracking];
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  } as React.CSSProperties,
  section: {
    flex: 1,
    overflow: 'auto',
  } as React.CSSProperties,
};

export default VerticalSections;
