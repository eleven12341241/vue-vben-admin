<template>
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
        :class="{ 'selected-card': selectedGoodsCard === item.title }"
        @click="selectGoods(item)"
      >
        <p>价格：{{ item.price }} $</p>
        <p>余量：{{ item.remain }}</p>
      </a-card>
    </div>
  </Card>
  <Card title="已选商品：">
    <p>已选商品：{{ selectedGoodsCard }}</p>
  </Card>
</template>
<script lang="ts" setup>
  import { Card } from 'ant-design-vue';
  import { ref } from 'vue';
  import useGoods from '@/hooks/useGoods';

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

  const value = ref<string>('');
  const selectedCard = ref('');
  const selectCard = (item: GoodsType) => {
    selectedCard.value = item.title;
    selectedGoods.value = item.goods || [];
  };
  const selectedGoodsCard = ref('');
  const selectGoods = (item: Goods) => {
    selectedGoodsCard.value = item.title;
  };
  const { getGoods, addGoods } = useGoods();

  const onSearch = async (searchValue: string) => {
    console.log(searchValue);
    addGoods({
      title: searchValue,
      description: '商品描述',
    });
  };

  const GoodsTypes = ref<GoodsType[]>([]);
  const selectedGoods = ref<Goods[]>([]);
  getGoods().then((res) => {
    GoodsTypes.value.push(...res.data);
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
