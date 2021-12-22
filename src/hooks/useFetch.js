import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { API } from "../api_service";

export function useFetch(props) {
  console.log(props);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState();
  const [token] = useCookies(["mr-token"]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setErr(null);
      const data = await API.getMovie(token["mr-token"]).catch((err) =>
        setErr(err)
      );
      setData(data);
      setLoading(false);
    }
    fetchData();
  }, [token, props]);
  return [data, loading, err];
}
