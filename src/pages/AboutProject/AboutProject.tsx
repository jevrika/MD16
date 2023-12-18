import styles from './AboutProject.module.css'

const AboutProject = () => {
  return (
    <div className={styles.wrapper}>
      <p className={styles.text}>This project has <b>3</b> sections -</p>
      <ul className={styles.list}>
        <li className={styles.listItem}> <a className={styles.aItems} href='http://localhost:5174/about_project'>About the project </a></li>
        <li className={styles.listItem}> <a className={styles.aItems} href='http://localhost:5174/movies'> List of movies</a></li>
        <li className={styles.listItem}> <a className={styles.aItems} href='http://localhost:5174/about_author'> About the author</a></li>
      </ul>
      <p className={styles.text}>Movies come from the database and you can delete them and add comments to them <br></br>
        Each movie has its own opening view and you can view more detailed information about the movie<br></br>
        All tanstack query hooks are in their own isolated files
      </p>

    </div>
  );
}

export default AboutProject;