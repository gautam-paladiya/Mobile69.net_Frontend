import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from './index.module.scss'

function Navigation() {
  const router = useRouter();
  console.log(router.pathname);
  const handleClick = (index, name) => {
    // console.log(index)
    // this.setState({ activeIndex: index })
    // this.props.setCategory(name.toLowerCase())
    // this.props.history.replace(`/cat/${name.toLowerCase()}`)
  };

  return (
    <div className={styles.navigation}>
      <header className="d-flex flex-row justify-content-center mt-0 pt-0">
        <Link href="/ringtones-and-wallpapers">
          <span
            className={
              router.pathname === "/ringtones-and-wallpapers"
                ? clsx("btn btn-dark active",styles.tab)
                : clsx("btn btn-secondary",styles.tab)
            }
          >
            <h2 style={{ margin: 0, padding: 0 }}>All</h2>
          </span>
        </Link>
        <Link href="/wallpapers">
          <span
            className={
              router.pathname === "/wallpapers"
              ? clsx("btn btn-dark active",styles.tab)
              : clsx("btn btn-secondary",styles.tab)
            }
          >
            <h2>Wallpaper</h2>
          </span>
        </Link>
        <Link href="/ringtones">
          <span
            className={
              router.pathname === "/ringtones"
              ? clsx("btn btn-dark active",styles.tab)
              : clsx("btn btn-secondary",styles.tab)
            }
          >
            <h2>Ringtone</h2>
          </span>
        </Link>
      </header>
      <hr className="divider" />
    </div>
  );
}

export default Navigation;
