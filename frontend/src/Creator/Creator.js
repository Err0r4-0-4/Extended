import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  GrFacebookOption,
  GrInstagram,
  GrTwitter,
  GrSnapchat,
  GrLocation,
} from "react-icons/gr";
import image from "../Image/social2.png";
import styles from "./Creator.module.css";
import Card from "../Ui/Card";
const Creators = React.memo((props) => {
  return (
    <Card>
      <img src={image} className={styles.image}></img>
      <div className={styles.text}>
        <div className={styles.location}>
          <GrLocation /> India
        </div>
        <div className={styles.name}>{props.name}</div>

        <div className={styles.dis}>Description</div>

        <ul className={styles.social}>
          <li className={styles.face}>
            <a href="#">
              <GrFacebookOption />
            </a>
          </li>
          <li className={styles.insta}>
            <a href="#">
              <GrInstagram />
            </a>
          </li>

          <li className={styles.twitter}>
            <a href="#">
              <GrTwitter />
            </a>
          </li>
          <li className={styles.snap}>
            <a href="#">
              <GrSnapchat />
            </a>
          </li>
        </ul>
        <div className={styles.link}>
          <Link to={"/" + props.id}>View creator</Link>
        </div>
      </div>
    </Card>
  );
});

export default Creators;
