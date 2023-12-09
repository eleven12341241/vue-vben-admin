import express, { Request, Response, Router } from 'express';

interface Goods {
  title: string;
  description: string;
  price: string;
  remain: string;
}

// Sample goods data
const goodsData: Goods[] = [
  {
    title: '商品A',
    description: '描述A',
    price: '100',
    remain: '100',
  },
  {
    title: '商品B',
    description: '描述B',
    price: '23',
    remain: '56',
  },
  {
    title: '商品C',
    description: '描述C',
    price: '53',
    remain: '8',
  },
  // ... add more goods as needed
];

// Define API routes
const router: Router = express.Router();

// Get all goods
router.get('/goods', (req: Request, res: Response) => {
  res.json(goodsData);
});

export default router;
