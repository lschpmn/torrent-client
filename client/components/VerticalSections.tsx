import * as React from 'react';

type Props = {
  child1: React.ReactNode,
  child2: React.ReactNode,
};

const VerticalSections = ({ child1, child2 }: Props) => {

  return <div style={styles.container}>
    <div style={styles.section}>{child1}</div>
    <div style={styles.section}>{child2}</div>
  </div>;
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
