<template>
  <div>
    <Card title="商品搜索" v-bind="$attrs">
      <a-space direction="vertical">
        <a-input-search
          style="width: 200px"
          v-model:value="value"
          placeholder="输入商品名称搜索"
          enter-button
          @search="onSearch"
        />
      </a-space>
    </Card>
    <Card title="商品分类" v-bind="$attrs">
      <div class="goods-list">
        <a-card
          v-for="item in GoodsTypes"
          :key="item.title"
          :title="item.title"
          style="width: 300px"
          :class="{ 'selected-card': selectedCard === item.title }"
          @click="selectCard(item)"
        >
          <p>{{ item.description }}</p>
        </a-card>
      </div>
    </Card>
    <Card title="选择商品">
      <div class="goods-list">
        <a-card
          v-for="item in selectedGoods"
          :key="item.title"
          :title="item.title"
          style="width: 300px"
          :class="{ 'selected-card': selectedGoodsCard === item }"
          @click="selectGoods(item)"
        >
          <p>价格：{{ item.price }} $</p>
          <p>余量：{{ item.remain }}</p>
        </a-card>
      </div>
    </Card>
    <Card title="已选商品：">
      <p>已选商品：</p>
      {{ selectedGoodsCard?.title }}
      {{ selectedGoodsCard?.price }} 元
    </Card>
    <Card title="联系方式">
      <a-form style="width: 300px" :model="formState" name="basic" autocomplete="off">
        <a-form-item label="联系方式" :rules="[{ required: true, message: '请输入联系方式' }]">
          <a-input v-model:value="formState.phone" />
        </a-form-item>

        <a-form-item>
          <a-button type="primary" @click="createOrder">提交订单</a-button>
        </a-form-item>
      </a-form>
    </Card>
    <createOrderModal
      :visible="orderModalVisible"
      :orderData="orderData"
      @ok="handleModalOk"
      @cancel="handleModalCancel"
    />
  </div>
  <div>
    <video
      ref="myVideo"
      src="http://vjs.zencdn.net/v/oceans.mp4"
      @timeupdate="handleTimeUpdate"
      controls
    >
      <!-- 视频源等其他属性 -->
    </video>
    <p> 当前时间 {{ currentTime }}</p>
  </div>
</template>
<script lang="ts" setup>
  import { Card } from 'ant-design-vue';
  import { ref, reactive, onMounted } from 'vue';
  import useGoods from '@/hooks/useGoods';
  import message from '../..//form-design/utils/message';
  import createOrderModal from '../createOrderModal/index.vue';

  interface GoodsType {
    title: string;
    description: string;
    goods?: Goods[];
  }
  interface Goods {
    id: number;
    title: string;
    description: string;
    price: number;
    remain: string;
  }

  const value = ref<string>('');
  const selectedCard = ref('');
  const selectCard = (item: GoodsType) => {
    selectedCard.value = item.title;
    selectedGoods.value = item.goods || [];
  };
  const selectedGoodsCard = ref<Goods>();
  const selectGoods = (item: Goods) => {
    selectedGoodsCard.value = item;
  };
  const { getGoods, addGoods, addOrder } = useGoods();

  const onSearch = async (searchValue: string) => {
    console.log(searchValue);
    addGoods({
      title: searchValue,
      description: '商品描述',
    });
  };

  const GoodsTypes = ref<GoodsType[]>([]);
  const selectedGoods = ref<Goods[]>([]);
  getGoods().then((res: any) => {
    GoodsTypes.value.push(...res.data);
  });

  interface FormState {
    phone: string;
  }

  const formState = reactive<FormState>({
    phone: '',
  });

  const orderModalVisible = ref<boolean>(false);
  const orderData = ref({});

  const createOrder = () => {
    if (!selectedGoodsCard.value) {
      message.error('请选择商品');
      return;
    }
    if (!formState.phone) {
      message.error('请输入联系方式');
      return;
    }
    const orderForm = {
      price: selectedGoodsCard.value.price,
      phone: formState.phone,
      goods_name: selectedGoodsCard.value.title,
      user_id: 1,
      goods_id: selectedGoodsCard.value.id,
      create_by: 'xiaoming',
    };

    addOrder(orderForm).then((res: any) => {
      if (res.success) {
        console.log('res.data');
        console.log(res.data);
        orderData.value = res.data;
        orderModalVisible.value = true;
      }
    });
  };

  const handleModalOk = () => {
    closeModal();
  };

  const handleModalCancel = () => {
    closeModal();
  };

  const closeModal = () => {
    orderModalVisible.value = false;
    orderData.value = {};
  };

  const currentTime = ref(0);
  const myVideo = ref(null);

  const handleTimeUpdate = () => {
    if (myVideo.value) {
      currentTime.value = myVideo.value.currentTime;
    }
  };

  onMounted(() => {
    myVideo.value.addEventListener('timeupdate', handleTimeUpdate);
  });
</script>
<style scoped>
  .goods-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    gap: 20px;
  }

  .selected-card {
    border: 2px solid blue; /* 选中样式，可以根据需要修改 */
  }
</style>
