import styles from "./index.module.css";
import ReactDOM from "react-dom";
import React from "react";
import AndroidIcon from "../../assets/img/androidIcon.png";
import IosIcon from "../../assets/svg/ios.svg";
import BrowserIcon from "../../assets/img/browser.png";
import Screen from "../../assets/img/screen.png";
import Feature1 from "../../assets/img/feature1.png";
import Feature2 from "../../assets/img/feature2.png";
import Feature3 from "../../assets/img/feature3.png";
import Content1 from "../../assets/svg/content1.svg";
import Content2 from "../../assets/svg/content2.svg";
import Content3 from "../../assets/svg/content3.svg";
import Content4 from "../../assets/svg/content4.svg";
import Bar from "../../assets/svg/bars.svg";
import Close from "../../assets/svg/close.svg";
import clsx from "clsx";
import Link from "next/link";

export class IndexComponent extends React.Component {
  constructor(prop) {
    super(prop);
    this.state = {
      navigation: false,
    };
  }

  handleToggleNav = () => {
    console.log("toggle");
    var navDom = ReactDOM.findDOMNode(this.refs.navRef);
    navDom.classList.toggle(styles.collapse);
    this.setState({ navigation: !this.state.navigation });
  };

  handleNavAndrid = () => {};

  render() {
    return (
      <div className={clsx(styles.container)}>
        <header className={styles.header}>
          <nav className={styles.nav} ref="navRef">
            <h1 className={styles.brandName}>
              <strong>
                <a>Mobile69</a>
              </strong>
            </h1>
            <div className={styles.toggleCollapse}>
              <div
                className={styles.toggleIcons}
                onClick={() => this.handleToggleNav()}
              >
                <img
                  src={this.state.navigation ? Close : Bar}
                  className={styles.collapseLogo}
                />
              </div>
            </div>
            <div className={styles.navigation}>
              <ul className={styles.navItems}>
                <li className={styles.navLinks}>
                  <Link href="/ringtones-and-wallpapers">Browse Now</Link>
                </li>
                <li className={styles.navLinks}>
                  <a href="">Contact us</a>
                </li>
                <li className={clsx(styles.navLinks, styles.getApp)}>
                  <a href="">Get the App</a>
                </li>
              </ul>
            </div>
          </nav>

          {/* <div className="dividerSingle dividerHide" /> */}
          <div className={styles.banner}>
            <div className={clsx(styles.leftBanner)}>
              <h3 className={styles.bannerBrandName}>
                Mobile69, <br /> Everything You
              </h3>
              <p className={styles.introText}>
                Zedge is the # 1 phone personalization app in the world and
                helps you make sure your phone reflects you.
              </p>
              <p className={styles.introText}>
                Download free Mobile Ringones and HD Wallpapers forever
              </p>
              <div>
                <ul className={styles.navItems}>
                  <li
                    className={styles.navLinks}
                    onClick={() => this.handleNavAndrid()}
                  >
                    <a>
                      <img
                        src={AndroidIcon}
                        href="https://play.google.com/store/apps/details?id=com.mobile69"
                        className={styles.navLogo}
                      />
                    </a>
                  </li>
                  <li className={styles.navLinks}>
                    <a>
                      <img
                        src={IosIcon}
                        href="https://play.google.com/store/apps/details?id=com.mobile69"
                        className={styles.navLogo}
                      />
                    </a>
                  </li>
                  <li className={styles.navLinks}>
                    <Link href="/ringtones-and-wallpapers">
                      <img
                        src={BrowserIcon}
                        href="#"
                        className={styles.navLogo}
                      />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className={styles.rightBanner}>
              <img src={Screen} className={styles.screenLogo} />
            </div>
          </div>
        </header>
        <section className={styles.featureSection}>
          <div className={styles.feature}>
            <img className={styles.featureImage} src={Feature1} />
            <h3 className={styles.featureTitle}>30 million active users</h3>
            <p className={styles.featureDescription}>
              mobile69 has more than 436 million downloads
            </p>
          </div>
          <div className={styles.feature}>
            <img className={styles.featureImage} src={Feature2} />
            <h3 className={styles.featureTitle}>Free & Premium Content</h3>
            <p className={styles.featureDescription}>
              Millions of free pieces of content and featured content available
              now
            </p>
          </div>
          <div className={styles.feature}>
            <img className={styles.featureImage} src={Feature3} />
            <h3 className={styles.featureTitle}>Top tier content creators</h3>
            <p className={styles.featureDescription}>
              From some of the top musicians in the world to local artists, we
              have it all on mobile69
            </p>
          </div>
        </section>
        <section className={styles.contentSection}>
          <h3 className={styles.contentHeading}>
            Content for all tastes and styles
          </h3>
          <ul className={styles.contentItems}>
            <li>
              <Link href="/wallpapers">
                <div className={styles.contentList}>
                  <img src={Content1} />
                  <h3 className={styles.contentTitle}>Wallpaper</h3>
                </div>
              </Link>
            </li>
            <li>
              <Link href="/wallpapers">
                <div className={styles.contentList}>
                  <img src={Content2} />
                  <h3 className={styles.contentTitle}>Live Wallpaper</h3>
                </div>
              </Link>
            </li>
            <li>
              <Link href="/ringtones">
                <div className={styles.contentList}>
                  <img src={Content3} />
                  <h3 className={styles.contentTitle}>Videos</h3>
                </div>
              </Link>
            </li>
            <li>
              <Link href="/ringtones">
                <div className={styles.contentList}>
                  <img src={Content4} />
                  <h3 className={styles.contentTitle}>Ringtones</h3>
                </div>
              </Link>
            </li>
          </ul>
        </section>
        <footer className={styles.footer}>
          <div className={styles.footColumn}>
            <h5 className={styles.footColTitle}>Get Our App</h5>
            <ul>
              <li className={styles.footerLink}>
                <a href="#">Google Play</a>
              </li>
              <li className={styles.footerLink}>
                <a href="#">iOS</a>
              </li>
            </ul>
          </div>
          <div className={styles.footColumn}>
            <h5 className={styles.footColTitle}>Content</h5>
            <ul>
              <li className={styles.footerLink}>
                <Link href="/wallpapers">Wallpaper</Link>
              </li>
              <li className={styles.footerLink}>
                <Link href="/ringtones">Ringtones</Link>
              </li>
              <li className={styles.footerLink}>
                <Link href="/uploads">Uploads</Link>
              </li>
            </ul>
          </div>
          <div className={styles.footColumn}>
            <h5 className={styles.footColTitle}>Our Company</h5>
            <ul>
              <li className={styles.footerLink}>
                <Link href="#">Join Us</Link>
              </li>
              <li className={styles.footerLink}>
                <Link href="#">Contact Us</Link>
              </li>
            </ul>
          </div>
          <div className={styles.footColumn}>
            <h5 className={styles.footColTitle}>Social</h5>
            <ul>
              <li className={styles.footerLink}>
                <a href="#">Facebook</a>
              </li>
              <li className={styles.footerLink}>
                <a href="#">Instagram</a>
              </li>
              <li className={styles.footerLink}>
                <a href="#">Twitter</a>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    );
  }
}
