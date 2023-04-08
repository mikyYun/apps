import {useState, useEffect } from "react";
import axios from "axios";
// import dotenv from "react-native-dotenv";
// const RAPID_API_KEY = dotenv.RAPID_API_KEY;

const useFetch = (endpoint, query) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const options = {
    method: 'GET',
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    headers: {
      'X-RapidAPI-Key': "b56e4d7313msh8e202b401338f0ap1809cbjsnb59fb7b91052",
      'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
    },
    params: {...query},
  };
  
  const fetchData = async() => {
    setIsLoading(true);

    try {
      const response = await axios.request(options);

      setData(response.data.data);
      setIsLoading(false);
    } catch (err){
      setError(err);
      alert("Error while getting data");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  }
  return {data, isLoading, error, refetch};

}

export default useFetch;