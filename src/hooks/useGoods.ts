import axios, { AxiosResponse } from 'axios';

interface GoodsType {
  title: string;
  description: string;
  goods?: Goods[];
}
interface Goods {
  title: string;
  description: string;
  price: string;
  remain: string;
}

export default function useGoods() {
  const getGoods = async () => {
    const response: AxiosResponse<GoodsType[]> = await axios.get('/api/get_goods');
    const goodsData: GoodsType[] = response.data;
    console.log(goodsData);
    return goodsData;
  };

  return {
    getGoods,
  };
}
