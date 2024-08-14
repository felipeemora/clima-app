import { ReactNode } from "react"
import styles from './Alert.module.css';

type AlertProps = {
  children: ReactNode
}

export const Alert = ({children}: AlertProps) => {
  return (
    <div className={styles.alert}>{children}</div>
  )
}
