import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css'

const navItems = [
  {
    label: 'About Project',
    path: '/about_project'
  },
  {
    label: 'Movies',
    path: '/movies'
  },
  {
    label: 'About Author ',
    path: '/about_author'
  }
]

const NavBar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.linkWrapper}>
        {navItems.map(({ path, label }) => (
          <NavLink key={path} to={path} className={({ isActive }) => `${styles.navbarItem} ${isActive ? styles.active : ''}`}>
            {label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

export default NavBar;