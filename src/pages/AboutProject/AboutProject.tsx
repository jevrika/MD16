import styles from './AboutProject.module.css'

const AboutProject = () => {
  return (
    <div className={styles.wrapper}>
      <p className={styles.text}>This project has <b>3</b> sections -</p>
      <ul className={styles.list}>
        <li className={styles.listItem}>About the project</li>
        <li className={styles.listItem}>List of movies</li>
        <li className={styles.listItem}>About the author</li>
      </ul>
      <p className={styles.text}>Movies come from the database and you can delete them and add comments to them <br></br>
        Each movie has its own opening view and you can view more detailed information about the movie
      </p>

    </div>
  );
}

export default AboutProject;