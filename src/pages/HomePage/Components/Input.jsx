import React, { useRef, useState, useEffect, useContext } from "react";
import Lebron from "../../../assets/lebron.png";
import {
  FilterIcon,
  GalleryIcon,
  GifIcon,
  EmojiIcon,
  CalendarIcon,
  BackIcon,
} from "../../../assets/Icons";
import { AppContext } from "../../../context/AppContext";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { ethers } from "ethers";
import { nft_abi, bytecode } from "../../../constants/constants";
import { create } from "ipfs-http-client";

function Input() {
  const [modalOpen, setModalOpen] = useState(false);
  const [NFTPrice, setNFTPrice] = useState("");
  const [postText, setPostText] = useState("");
  const [postImage, setPostImage] = useState([]);
  const [selectedFile, setSelectedFile] = useState([]);
  const [loading, setLoading] = useState(false);
  const { createPost, address } = useContext(AppContext);

  const auth = "Basic " + import.meta.env.VITE_BASE64;
  const client = create({
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https",
    apiPath: "/api/v0",
    headers: {
      authorization: auth,
    },
  });

  const filePickerRef = useRef();

  const handleImages = async (e) => {
    let arr = [];
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setSelectedFile((prevImages) => prevImages.concat(filesArray));

      Array.from(e.target.files).map((file) => URL.revokeObjectURL(file));

      for (let i = 0; i < e.target.files.length; i++) {
        let fileHash = await client.add(e.target.files[i]);
        arr.push(fileHash.path);
        setPostImage(arr);
        console.log(arr);
      }
    }
  };

  const createNft = async () => {
    let contractAddress = "";
    try {
      console.log(NFTPrice);
      if (NFTPrice.length > 0) {
        console.log("deploying contract");
        const provider = new ethers.providers.JsonRpcProvider(
          import.meta.env.VITE_RPC_URL
        );
        console.log(provider, "provider");
        const privatekey = import.meta.env.VITE_PRIVATE_KEY;
        const wallet = new ethers.Wallet(privatekey, provider);
        console.log(wallet, "wallet");
        const options = {
          gasLimit: 10000000,
          gasPrice: ethers.utils.parseUnits("100.0", "gwei"),
        };
        // Deploy the contract
        const factory = new ethers.ContractFactory(nft_abi, bytecode, wallet);
        const contract = await factory.deploy(
          ethers.utils.parseEther(NFTPrice),
          "ipfs://bafybeiabsq3t42senk5jnkd5pe5oqcebkvzusc4hl6a77jxsm7l6axfaye/55",
          address,

        );
        console.log(contract, "contract");

        contractAddress = await contract.deployed();
        console.log(contractAddress, "contractAddress");
        console.log(contractAddress.address);
        return contractAddress.address;
      }
      return contractAddress;
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
      setLoading(false);
      setPostText("");
      return contractAddress;
    }
  };

  const handlePost = async () => {
    try {
      setLoading(true);
      const postAddress = await createNft();
      console.log(postAddress);
      const post = await createPost(postText, postImage, postAddress);
      toast.success("Post created successfully");
      setLoading(false);

      setPostText("");
      setPostImage([]);
      setSelectedFile([]);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
      setLoading(false);

      setPostText("");
      setPostImage([]);
      setSelectedFile([]);
    }
  };

  return (
    <>
      <div className="flex w-full justify-between gap-[17px] bg-lilac px-[28px] py-[20px] rounded-[14px] border-none">
        <img src={Lebron} alt="" className="w-[44px] h-[44px] rounded-[14px]" />
        <div className="flex flex-col gap-[12px] flex-grow">
          <textarea
            type="text"
            placeholder="Write something here..."
            className="border-none bg-inherit focus:border-none resize-none h-12"
            onChange={(e) => setPostText(e.target.value)}
            value={postText}
          />
          {selectedFile.length > 0 && (
            <div className="relative">
              <div
                className="absolute w-8 h-8 bg-[#15181c] hover:bg-[#272c26] bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer"
                onClick={() => setSelectedFile(null)}
                cursor="pointer"
              >
                <GalleryIcon className="text-white h-5" />
              </div>
              <div className="flex width full">
                {selectedFile.map((file) => (
                  <img
                    key={file}
                    src={file}
                    alt=""
                    // change flex directton to row and add overflow-x-auto to parent div
                    className="w-[100px] h-[100px] rounded-[14px] object-cover mr-[10px] mb-[10px] cursor-pointer hover:opacity-80 transition-opacity duration-200 ease-in-out transform hover:scale-105 hover:z-10 hover:shadow-lg hover:ring-2 hover:ring-offset-2 hover:ring-offset-[#15181c] hover:ring-[#1da1f2] hover:ring-opacity-50 hover:ring-offset-opacity-50 "
                  />
                ))}
              </div>
            </div>
          )}
          {!loading && (
            <section className="flex gap-[13px]">
              <div className={iconStyle} onClick={() => setModalOpen(true)}>
                <FilterIcon />
              </div>
              <div
                className={iconStyle}
                onClick={() => filePickerRef.current.click()}
              >
                <input
                  type="file"
                  multiple
                  hidden
                  accept="image/*"
                  onChange={handleImages}
                  ref={filePickerRef}
                  cursor="pointer"
                />
                <label>
                  <GalleryIcon />
                </label>
              </div>
              <div className={iconStyle}>
                <GifIcon />
              </div>
              <div className={iconStyle}>
                <EmojiIcon />
              </div>
              <div className={iconStyle}>
                <CalendarIcon />
              </div>
            </section>
          )}
        </div>
        <div className="flex h-full items-end">
          <button
            className="bg-black px-[30px] py-[10px] rounded-[14px] font-semibold text-white"
            onClick={handlePost}
          >
            Post
          </button>
        </div>
      </div>
      {modalOpen ? (
        <div className="absolute w-screen h-screen backdrop-blur-[8px] left-0 top-0 z-10 flex justify-center items-center">
          <section className="w-[380px] h-[360px] bg-white z-20 rounded-[14px] flex flex-col">
            <div className="bg-lilac w-full rounded-t-[14px] px-[32px] py-[12px] flex items-center">
              <div
                onClick={() => setModalOpen(false)}
                className="cursor-pointer"
              >
                <BackIcon />
              </div>
              <p className="text-deepBlue w-full text-center">Upload an NFT</p>
            </div>
            <div className="flex-grow flex flex-col justify-center items-center">
              <p className="text-black text-[14px] font-normal">Set price</p>
              <input
                onChange={(e) => setNFTPrice(e.target.value)}
                type="text"
                placeholder="enter amount..."
                className="border-2 border-black rounded-[14px] w-[260px] h-[46px] bg-white text-black text-[14px] font-normal mb-[16px] text-center"
              />
              <button
                onClick={() => {
                  setModalOpen(false);
                  toast.success(`NFT price set to ${NFTPrice}`);
                }}
                className="bg-deepBlue px-[35px] h-[46px] text-white font-semibold text-[15px] rounded-[14px]"
              >
                Set
              </button>
            </div>
          </section>
        </div>
      ) : (
        <></>
      )}
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}
const iconStyle = `cursor-pointer`;

export default Input;
