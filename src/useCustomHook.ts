import { useQuery } from "react-query";
import axios from "axios";

export function useCustomHook() {
  const { data } = useQuery("customHook", async () => {
    const rs = await axios.get("https://fakestoreapi.com/products/1");
    console.log("rs", rs);
    return rs.data;
  });
  return data;
}
