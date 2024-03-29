import type { AppRouteModule } from '@/router/types';
import { LAYOUT } from '@/router/constant';
import { t } from '@/hooks/web/useI18n';

const dashboard: AppRouteModule = {
  path: '/goods',
  name: 'Goods',
  component: LAYOUT,
  redirect: '/goods/index',
  meta: {
    icon: 'simple-icons:about-dot-me',
    title: t('商品'),
  },
  children: [
    {
      path: 'index',
      name: 'GoodsPage',
      component: () => import('@/views/goods/goodsModal/index.vue'),
      meta: {
        title: t('商品购买'),
        icon: 'simple-icons:about-dot-me',
      },
    },
  ],
};

export default dashboard;
