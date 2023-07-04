import styles from'./styles.module.scss'
import Links from './links';
import Socials from './socials';
import NewsLetter from './newsletter';
import Payment from './payment';
import Copyright from './copyright';

const Footer = ({country}) => {
  return (
    <div className={styles.footer}>
        <div className={styles.footer__container}>
            <Links /> 
            <Socials />  
            <NewsLetter />
            <Payment />
            <Copyright country={country}/>
        </div>
    </div>
  )
}

export default Footer