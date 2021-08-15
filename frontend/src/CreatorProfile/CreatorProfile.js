import React, { useState, useEffect } from "react";
import axios from "axios";
import HeaderCreater from "../Ui/HeaderCreater";
import styles from "./CreatorProfile.module.css";
import image from "../Image/social2.png";
import EachPage from "../Ui/EachPage";
import Agreement from "../Agreement/Agreement";
import Card2 from "../Ui/Card2";
import Spinner from "../Ui/Spinner";
const Creators = React.memo(() => {
  const [creator, setCreator] = useState([]);
  const [agreements, setAgreements] = useState([]);
  const [showSpinner, setshowSpinner] = useState(false);
  useEffect(async () => {
    const data = {
      id: localStorage.getItem("id"),
    };

    let config = {
      headers: {
        token: localStorage.getItem("token"),
      },
    };

    let res = await axios.post(
      "http://localhost:3000/creator/creatorById",
      data,
      config
    );
    // console.log(res.data);
    setCreator(res.data.creator);

    res = await axios.post(
      "http://localhost:3000/creator/getContracts",
      data,
      config
    );
    console.log(res.data);
    setAgreements(res.data.contracts);

    // const ctr = Creator(res.data.creator.contractAddress)

    // const b = await ctr.methods.bal().call();
    // console.log(b);
  }, []);

  const onUploadHandler = (event) => {
    // this.setState({loading:true})

    const formData = new FormData();

    formData.append("file", event.target.files[0]);

    formData.append("title", "aaaaaaaaaaa");

    formData.append("description", "bbbbbbbb");

    let config = {
      headers: {
        token: localStorage.getItem("token"),
      },
    };
    setshowSpinner(true);
    axios
      .post("http://localhost:3000/creator/uploadContract", formData, config)
      .then((response) => {
        // this.setState({loading:false})
        console.log(response);
        setshowSpinner(false);
      })
      .catch((e) => {
        setshowSpinner(false);
        // this.setState({loading:false})
        console.log(e);
      });
  };

  let agreementArray = (
    <div>
      {agreements.map((agreement) => (
        <Agreement
          key={agreement._id}
          title={agreement.title}
          desc={agreement.description}
          url={agreement.fileUrl}
          hash={agreement.hash}
        />
      ))}
    </div>
  );

  return (
    <div>
      <HeaderCreater />
      {showSpinner ? <Spinner /> : ""}
      <div className={styles.page}>
        <div className={styles.row2}>
          <Card2>
            <img src={image} className={styles.image}></img>
            <div>Name</div>
            <div>{creator.name}</div>
            <div>description</div>
            <div>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged.
            </div>

            <div>Email</div>
            <div>{creator.email}</div>
          </Card2>
        </div>
        <div className={styles.row1}>
          <div className={styles.eth}>
            <Card2>
              <div>Account address</div>
              <div>{creator.contractAddress}</div>
              <div>ETh recieved</div>
              <div>1</div>
              <button className={styles.button}>Transfer</button>
            </Card2>
          </div>
          <div className={styles.Files}>
            <Card2>
              <input type="text" placeholder="title"></input>
              <input type="text" placeholder="description"></input>
              <input
                type="file"
                onChange={onUploadHandler}
                className={styles.buttonin}
              />
            </Card2>
          </div>

          <div className={styles.merchand}>
            <Card2></Card2>
          </div>
        </div>
        <div className={styles.row3}>
          <Card2>
            <div>A</div>
          </Card2>
        </div>
      </div>
    </div>
  );
});

export default Creators;
