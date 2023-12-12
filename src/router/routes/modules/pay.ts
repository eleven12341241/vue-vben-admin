import type { AppRouteModule } from '@/router/types';
import { LAYOUT } from '@/router/constant';
import { t } from '@/hooks/web/useI18n';

const dashboard: AppRouteModule = {
  path: '/pay',
  name: 'Pay',
  component: LAYOUT,
  redirect: '/pay/index',
  meta: {
    icon: 'simple-icons:about-dot-me',
    title: t('支付'),
  },
  children: [
    {
      path: 'index',
      name: 'PayPage',
      component: () => import('@/views/pay/index.vue'),
      meta: {
        title: t('支付'),
        icon: 'simple-icons:about-dot-me',
      },
    },
  ],
};

export default dashboard;
