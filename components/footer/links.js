import styles from './styles.module.scss';
import Link from 'next/link';
import Image from 'next/image';


const links = () => {
    const links = [
        {
          heading: "SHOPPAY",
          links: [
            {
              name: "About us",
              link: "",
            },
            {
              name: "Contact us",
              link: "",
            },
            {
              name: "Social Responsibility",
              link: "",
            },
            {
              name: "",
              link: "",
            },
          ],
        },
        {
          heading: "HELP & SUPPORT",
          links: [
            {
              name: "Shipping Info",
              link: "",
            },
            {
              name: "Returns",
              link: "",
            },
            {
              name: "How To Order",
              link: "",
            },
            {
              name: "How To Track",
              link: "",
            },
            {
              name: "Size Guide",
              link: "",
            },
          ],
        },
        {
          heading: "Customer service",
          links: [
            {
              name: "Customer service",
              link: "",
            },
            {
              name: "Terms and Conditions",
              link: "",
            },
            {
              name: "Consumers (Transactions)",
              link: "",
            },
            {
              name: "Take our feedback survey",
              link: "",
            },
          ],
        },
    ];
  return (
    <div className={styles.footer__links}>
      {links.map((link, i) => (
        <ul key={i}>
          {i === 0 ? (
            <Image src="/logo.png" alt="logo" width={100} height={50} style={{objectFit:"cover",objectPosition:'left',backgroundPosition:'center'}}  />
          ) : (
            <b>{link.heading}</b>
          )}
          {link.links.map((link,index) => (
            <li key={index}>
              <Link href={link.link}>{link.name}</Link>
            </li>
          ))}
        </ul>
      ))}
    </div>
  )
}

export default links;
