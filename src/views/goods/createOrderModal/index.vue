<template>
  <a-modal
    v-model:open="openModal"
    title="订单详情"
    @ok="handleOk"
    @cancel="handleCancel"
    okText="提交订单"
  >
    <!-- 在这里添加订单详情的内容 -->
    <p>订单号：{{ orderData.id }}</p>
    <p>商品名称：{{ orderData.goods_name }}</p>
    <p>价格：{{ orderData.price }} 元</p>
    <p>联系方式：{{ orderData.phone }}</p>
  </a-modal>
</template>

<script lang="ts" setup>
  import { ref, watch } from 'vue';

  const props = defineProps(['visible', 'orderData']);
  console.log(props);
  const openModal = ref(false);

  const handleOk = () => {
    const newPageUrl = '/pay/index';
    window.open(newPageUrl, '_blank');
  };

  const handleCancel = () => {
    openModal.value = false;
  };

  watch(
    () => props.visible,
    (newValue) => {
      openModal.value = newValue;
    },
  );
</script>

<style scoped>
  /* 在这里可以添加 modal 的样式 */
</style>
