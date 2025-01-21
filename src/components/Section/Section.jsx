import { useContext } from 'react';
import PropTypes from 'prop-types';
import { LevelContext } from '../../contexts/LevelContext';
import styles from './Section.module.css';

function Section({ children }) {
  const level = useContext(LevelContext);
  return (
    <section className={styles.section}>
      <LevelContext.Provider value={level + 1}>
        {children}
      </LevelContext.Provider>
    </section>
  );
}

Section.propTypes = {
  level: PropTypes.number,
  children: PropTypes.node,
};

export default Section;