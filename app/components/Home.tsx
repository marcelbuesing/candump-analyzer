import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';
import styles from './Home.css';

export default function Home(): JSX.Element {

  useEffect(() => {
    import('../../can-dbc-wasm/pkg/can_dbc_wasm').then((module) => {
    module.from_dbc("abc");
      // setPreview(module.parse(editorState))
    });
  }, []);

  return (
    <div className={styles.container} data-tid="container">
      <h2>Home</h2>
      <Link to={routes.COUNTER}>to Counter</Link>
    </div>
  );
}
