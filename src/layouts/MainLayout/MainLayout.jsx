import { Outlet } from 'react-router';
import Sidebar from '../../components/Sidebar/Sidebar';
import styles from './MainLayout.module.css';

function MainLayout(){
  function handleCreateNote(){
    console.log("Create note");
  }

  return (
    <div className={styles.container}>
      <Sidebar handleCreateNote={handleCreateNote} />
      <Outlet />
    </div>
  )
}

export default MainLayout;

