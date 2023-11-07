import React from "react";
import {
    EmailShareButton,
    FacebookShareButton,
    InstapaperShareButton,
    LinkedinShareButton,
    MailruShareButton,
    RedditShareButton,
    TelegramShareButton,
    TumblrShareButton,
    TwitterShareButton,
    VKShareButton,
    WhatsappShareButton,
} from "react-share";

import {
    EmailIcon,
    FacebookIcon,
    InstapaperIcon,
    LinkedinIcon,
    MailruIcon,
    RedditIcon,
    TelegramIcon,
    TumblrIcon,
    TwitterIcon,
    VKIcon,
    WhatsappIcon,
} from "react-share";

export default function ShareComponent({ url }: { url?: string }) {
    return (
        <div>
            <div className="title text-center">
                <h1 className="text-xl font-medium mt-5 mb-5" >
                    Hemen Paylaş
                </h1>
            </div>
            <ul className="flex flex-1 gap-5 items-center flex-wrap justify-center" >
                <li>
                    <FacebookShareButton url={url as string}>
                        <FacebookIcon size={35} round />
                    </FacebookShareButton>
                </li>
                <li>
                    <TwitterShareButton url={url as string}>
                        <TwitterIcon size={35} round/>
                    </TwitterShareButton>
                </li>
                <li>
                    <InstapaperShareButton url={url as string}>
                        <InstapaperIcon size={35}round />
                    </InstapaperShareButton>
                </li>
                <li>
                    <LinkedinShareButton url={url as string}>
                        <LinkedinIcon size={35} round />
                    </LinkedinShareButton>
                </li>
                <li>
                    <RedditShareButton url={url as string}>
                        <RedditIcon size={35}round />
                    </RedditShareButton>
                </li>
                <li>
                    <TelegramShareButton url={url as string}>
                        <TelegramIcon size={35} round/>
                    </TelegramShareButton>
                </li>
                <li>
                    <WhatsappShareButton url={url as string}>
                        <WhatsappIcon size={35} round/>
                    </WhatsappShareButton>
                </li>
                <li>
                    <TumblrShareButton url={url as string}>
                        <TumblrIcon size={35} round/>
                    </TumblrShareButton>
                </li>
                <li>
                    <VKShareButton url={url as string}>
                        <VKIcon size={35} round/>
                    </VKShareButton>
                </li>
                <li>
                    <EmailShareButton url={url as string}>
                        <EmailIcon size={35} round/>
                    </EmailShareButton>
                </li>
                <li>
                    <MailruShareButton url={url as string}>
                        <MailruIcon size={35} round/>
                    </MailruShareButton>
                </li>
            </ul>
        </div>
    )
}