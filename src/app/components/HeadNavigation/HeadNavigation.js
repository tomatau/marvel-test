import { NavLink } from 'react-router-dom'
import styles from './HeadNavigation.module.scss'

export default class HeadNavigation extends React.Component {
  render() {
    const { ...props } = this.props
    return (
      <nav className={styles.nav} {...props}>
        <NavLink exact activeClassName={styles.active} to='/'>
          Home
        </NavLink>
      </nav>
    )
  }
}
