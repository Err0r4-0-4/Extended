import React, { useState, useEffect } from "react";
import axios from "axios";
import web3 from "../ethereum/web3";
import { Redirect } from "react-router-dom";
import Creator from "../ethereum/Creator";
import HeaderCreater from "../Ui/HeaderCreater";
import styles from "./CreatorProfile.module.css";
import image from "../Image/social2.png";
import Agreement from "../Agreement/Agreement";
import Card2 from "../Ui/Card2";
import Spinner from "../Ui/Spinner";

const Creators = React.memo(() => {

  const [merch, setMerch] = useState("");
  const [creator, setCreator] = useState([]);
  const [agreements, setAgreements] = useState([]);
  const [showSpinner, setshowSpinner] = useState(false);
  const [eth, setEth] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");


  const buttonHandle = () => {
    <Redirect to="/create" />;
  };

  useEffect(async () => {
    const data = {
      id: localStorage.getItem("id"),
    };

    let config = {
      headers: {
        token: localStorage.getItem("token"),
      },
    };

    let eth = await axios.post(
      "http://localhost:3000/creator/creatorById",
      data,
      config
    );
    console.log(eth.data);
    setCreator(eth.data.creator);

    const cont = await axios.post(
      "http://localhost:3000/creator/getContracts",
      data,
      config
    );
    console.log(cont.data);
    setAgreements(cont.data.contracts);

    const ctr = Creator(eth.data.creator.contractAddress);

    const b = await ctr.methods.bal().call();
    setEth(b / 1000000000000000000);


  }, []);

  const onUploadHandler = async(event) => {

    const accounts = await web3.eth.getAccounts();

    const formData = new FormData();

    formData.append("file", event.target.files[0]);

    formData.append("title", title);

    formData.append("description", desc);

    let config = {
      headers: {
        token: localStorage.getItem("token"),
      },
    };
    setshowSpinner(true);
    axios
      .post("http://localhost:3000/creator/uploadContract", formData, config)
      .then((response) => {
        console.log(response);
        
        setshowSpinner(false);
      })
      .catch((e) => {
        setshowSpinner(false);
        // this.setState({loading:false})
        console.log(e);
      });

      setshowSpinner(true);

      try{
        const ctr = Creator(creator.contractAddress);
        await ctr.methods.addHash(event.target.files[0]).send({ from: accounts[0] });
        setshowSpinner(false);
      }catch(e){
        setshowSpinner(false);
        console.log(e);
      }
  };



  const transferHandler = async () => {
    const accounts = await web3.eth.getAccounts();

    const ctr = Creator(creator.contractAddress);

    const b = await ctr.methods.bal().call();
    console.log(b);

    await ctr.methods
      .transfer(creator.contractAddress)
      .send({ from: accounts[0] });
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
            <div className={styles.left}>Name</div>
            <div className={styles.right}>{creator.name}</div>
            <br />
            <div className={styles.left}>Description</div>
            <div className={styles.right}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged.
            </div>
            <br />

            <div className={styles.left}>Email</div>
            <div className={styles.right}>{creator.email}</div>
            <br />
          </Card2>
        </div>
        <div className={styles.row1}>
          <div className={styles.eth}>
            <Card2>
              <div>
                <div className={styles.left}>Account</div>

                <div className={styles.right}>{creator.contractAddress}</div>
              </div>
              <span className={styles.left}>ETH recieved</span>
              <span className={styles.right}>{eth}</span>

              <button className={styles.button} onClick={transferHandler}>Transfer</button>
            </Card2>
          </div>
          <div className={styles.Files}>
            <Card2>
              <input
                type="text"
                placeholder="Title"
                className={styles.feild}
                onChange={event => setTitle(event.target.value)}
              ></input>
              <input
                type="text"
                placeholder="Description"
                className={styles.feild}
                onChange={event => setDesc(event.target.value)}
              ></input>
              <input
                type="file"
                onChange={onUploadHandler}
                className={styles.buttonin}
              />
            </Card2>
          </div>

          <div className={styles.merchand}>
            <Card2>
              <button className={styles.button} onClick={buttonHandle}>
                My Merchandice
              </button>
            </Card2>
          </div>
        </div>
        <div className={styles.row3}>
          <Card2>
            <div>{agreementArray}</div>
          </Card2>
        </div>
      </div>
    </div>
  );
});

export default Creators;
