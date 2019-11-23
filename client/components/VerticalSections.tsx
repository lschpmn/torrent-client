import Divider from '@material-ui/core/Divider';
import throttle from 'lodash/throttle';
import * as React from 'react';
import { useEffect, useState } from 'react';

type Props = {
  child1: React.ReactNode,
  child2: React.ReactNode,
};

const VerticalSections = ({ child1, child2 }: Props) => {
  const [mouseY, setTrackingY] = useMouseYState();
  console.log(mouseY);

  return <div style={styles.container}>
    <div style={styles.section}>{child1}</div>
    <Divider
      onMouseDown={() => setTrackingY(true)}
      style={{ cursor: 'ns-resize', height: '0.25rem' }}
    />
    <div style={styles.section}>{child2}</div>
  </div>;
};

const useMouseYState = () => {
  const [mouseY, setMouseY] = useState(null);
  const [isTracking, setIsTracking] = useState(null);

  useEffect(() => {
    if (isTracking) {
      const trackMouseUp = () => setIsTracking(false);
      const trackMouseMovement = throttle(e => setMouseY(e.clientY), 100);

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
