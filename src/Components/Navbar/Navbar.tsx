import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css'

const NavBar = () => {
  return ( 
    <nav className={styles.navbar}>
      <div className={styles.linkWrapper}>
        <NavLink className={({isActive}) => `${styles.navbarItem} ${isActive ? styles.active : ''}`} to='/about_project'> About Project </NavLink>
        <NavLink className={({isActive}) => `${styles.navbarItem} ${isActive ? styles.active : ''}`} to='/movies'> Movies </NavLink>
        <NavLink className={({isActive}) => `${styles.navbarItem} ${isActive ? styles.active : ''}`}to='/about_author'> About Author </NavLink>
      </div>
    </nav>
   );
}
 
export default NavBar;