import styles from './styles.module.scss';
import Ad from './Ad';
import Top from './top';
import Search from './search';


export default function header({country}){
    
    return (
        <header className={styles.header}>
            <Ad />
            <Top country={country} />
            <Search />
        </header>
    )
}
