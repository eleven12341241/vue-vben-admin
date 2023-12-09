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
    return goodsData;
  };

  const addGoods = async (goods: GoodsType) => {
    const response: AxiosResponse<GoodsType> = await axios.post('/api/add_goods', goods);
    const goodsData: GoodsType = response.data;
    return goodsData;
  };

  return {
    getGoods,
    addGoods,
  };
}
