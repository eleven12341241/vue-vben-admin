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

interface Order {
  price: number;
  user_id: number;
  goods_id: number;
  create_by: string;
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

  const addOrder = async (order: Order) => {
    const response: AxiosResponse<Order> = await axios.post('/api/add_order', order);
    const orderData: Order = response.data;
    return orderData;
  };

  return {
    getGoods,
    addGoods,
    addOrder,
  };
}
