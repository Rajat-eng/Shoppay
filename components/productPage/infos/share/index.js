import styles from "./styles.module.scss";
import {
  FacebookShareButton,
  FacebookMessengerShareButton,
  EmailShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  RedditShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

import {
  EmailIcon,
  FacebookIcon,
  FacebookMessengerIcon,
  LinkedinIcon,
  PinterestIcon,
  RedditIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";

export default function Share() {
  return (
    <div className={styles.share}>
      <FacebookShareButton >
        <FacebookIcon size={38} />
      </FacebookShareButton>
      <FacebookMessengerShareButton >
        <FacebookMessengerIcon size={38} />
      </FacebookMessengerShareButton>
      <TwitterShareButton >
        <TwitterIcon size={38} />
      </TwitterShareButton>
      <LinkedinShareButton >
        <LinkedinIcon size={38} />
      </LinkedinShareButton>
      <RedditShareButton >
        <RedditIcon size={38} />
      </RedditShareButton>
      <TelegramShareButton >
        <TelegramIcon size={38} />
      </TelegramShareButton>
      <WhatsappShareButton >
        <WhatsappIcon size={38} />
      </WhatsappShareButton>
      <PinterestShareButton >
        <PinterestIcon size={38} />
      </PinterestShareButton>
      <EmailShareButton >
        <EmailIcon size={38} />
      </EmailShareButton>
    </div>
  );
}
