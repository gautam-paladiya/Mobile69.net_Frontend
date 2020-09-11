import Link from "next/link";
import { useState } from "react";
// import SliderComponent from "../slider";
import SliderComponent from "../slider";
import Router from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { setSerachTermAction } from "../../redux/entities/entityAction";
import { wrapper } from "../../redux/store";
import $ from "jquery";
import Head from "next/head";

function Header(props) {
  const [toggle, setToggle] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const { entity } = useSelector((state) => state);
  // console.log('header ', entity)

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      searchTermHandle();
    }
  };

  const searchTermHandle = () => {
    $("#input").blur();
    if (searchTerm.trim()) {
      dispatch(setSerachTermAction(searchTerm));
      Router.push("/find/[search]", `/find/${searchTerm}`);
    } else {
      Router.replace(`/`);
    }
  };

  const handleInputChange = (e) => {
    console.log(e.target.value);
    setSearchTerm(e.target.value);
  };

  return (
    <div className="header ">
      <Head>
        {/* <script
          async
          src='https://www.googletagmanager.com/gtag/js?id=UA-147336177-2'
        ></script>
        <script>
          window.dataLayer = window.dataLayer || []; function gtag()
          console.log('window',window)
          {window.dataLayer.push(arguments)}
          gtag('js', new Date()); gtag('config', 'UA-147336177-2');
        </script> */}
      </Head>
      <div className="header-parent flex-column flex-md-row">
        <div className="col-md-3 logo menu">
          <Link href="/" replace>
            <img
              src="/img/logo.png"
              width={160}
              height={75}
              alt={process.env.NAME_SPACE}
            />
          </Link>
        </div>
        <div className="col-md-6 col-11 menu">
          <div className="input-group md-form sm-form form-sm form-1 pl-0">
            <input
              id="input"
              className="form-control my-0 py-1"
              type="text"
              placeholder="Search Wallpaper and Ringtones"
              aria-label="Search"
              onKeyPress={handleKeyPress}
              onChange={handleInputChange}
              value={searchTerm}
              style={{ fontSize: 18 }}
            />
            <div className="input-group-prepend">
              <span
                className="input-group-text purple lighten-3"
                id="basic-text1"
              >
                <img
                  src="/svg/search.svg"
                  alt={`${process.env.NAME_SPACE} Search for Wallpapers and Ringtones`}
                  width={25}
                  height={23}
                  onClick={searchTermHandle}
                />
              </span>
            </div>
          </div>
        </div>
        <div className="col-md-3 drawer menu">
          <img
            alt="menu"
            src="/svg/bars.svg"
            width={30}
            height={30}
            onClick={() => setToggle(!toggle)}
          />
        </div>
      </div>
      <hr className="divider" />
      {toggle && <SliderComponent toggleSlider={() => setToggle(false)} />}
    </div>
  );
}

export default wrapper.withRedux(Header);
