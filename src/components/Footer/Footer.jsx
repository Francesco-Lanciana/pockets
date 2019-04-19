import React from "react";
import { Link } from "gatsby";

import FacebookIcon from "@images/facebook-f-brands.svg";
import InstagramIcon from "@images/instagram-brands.svg";
import PinterestIcon from "@images/pinterest-brands.svg";
import TwitterIcon from "@images/twitter-brands.svg";

import "./Footer.scss";

const Footer = () => (
    <footer className="footer">
        <div className="content-container">
            <section className="links-container about-links">
                <h4 className="category-label">About us</h4>
                <ul>
                    <li>
                        <Link to="/about">Pockets: The Story</Link>
                    </li>
                    <li>
                        <Link to="/blog">Our Blog</Link>
                    </li>
                    <li>
                        <Link to="/about/careers">Careers</Link>
                    </li>
                    <li>
                        <Link to="/about/terms-and-conditions">Terms and conditions</Link>
                    </li>
                    <li>
                        <Link to="/about/privacy-policy">Privacy policy</Link>
                    </li>
                </ul>
            </section>

            <section className="links-container help-links">
                <h4 className="category-label">Help and Support</h4>
                <ul>
                    <li>
                        <Link to="/about/shipping">Shipping</Link>
                    </li>
                    <li>
                        <Link to="/about/returns">Returns</Link>
                    </li>
                    <li>
                        <Link to="/about/contact-us">Contact Us</Link>
                    </li>
                </ul>
            </section>

            <section className="links-container follow-links">
                <h4 className="category-label">Follow us</h4>
                <ul>
                    <li>
                        <div className="logo-container">
                            <InstagramIcon />
                        </div>
                        <a href="https://www.instagram.com/pocketsfashion/">Instagram</a>
                    </li>
                    <li>
                        <div className="logo-container facebook">
                            <FacebookIcon />
                        </div>
                        <a href="https://www.facebook.com/pocketsfashion">Facebook</a>
                    </li>
                    <li>
                        <div className="logo-container">
                            <TwitterIcon />
                        </div>
                        <a href="https://twitter.com/pocketsfashion">Twitter</a>
                    </li>
                    <li>
                        <div className="logo-container">
                            <PinterestIcon />
                        </div>
                        <a>Pinterest</a>
                    </li>
                </ul>
            </section>
        </div>
    </footer>
);

export default Footer;
