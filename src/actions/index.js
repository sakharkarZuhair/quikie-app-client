import * as api from "../api/index";
import axios from "axios";

export const getListData = async (setListData) => {
  try {
    const { data } = await api.listData();
    //   console.log(data);
    setListData(data?.crypto);
  } catch (error) {
    console.log(error);
  }
};

export const getRateData = async (setRateData) => {
  try {
    const { data } = await api.liveData();
    setRateData(data);
  } catch (error) {
    console.log(error);
  }
};

export const getSavedData = async (setSavedData) => {
  try {
    let { data } = await axios.get(
      "https://crypto-server-node.herokuapp.com/crypto/getData"
    );
    setSavedData(data);
  } catch (error) {}
};

export const saveData = async (formData, getSavedData) => {
  try {
    const { data } = await axios.post(
      "https://crypto-server-node.herokuapp.com/crypto/createData",
      formData
    );
    getSavedData();
    // console.log(formData);
  } catch (error) {
    console.log(error);
  }
};

export const removeData = async (id, navigate) => {
  try {
    await axios.delete(
      `https://crypto-server-node.herokuapp.com/crypto/delete/${id}`
    );
    navigate("/savedData");
  } catch (error) {
    console.log(error);
  }
};
