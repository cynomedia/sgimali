import styles from './maintenance.module.css';

export default function MaintenancePage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Site en Maintenance</h1>
      <p className={styles.message}>
        Notre site est actuellement en maintenance pour des mises à jour importantes. 
      </p>
      <p className={styles.message}>
        Il sera à nouveau disponible à partir du <strong>5 janvier 2024</strong>.
      </p>
      <p className={styles.message}>Merci de votre compréhension !</p>
    </div>
  );
}
