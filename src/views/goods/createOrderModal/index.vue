<template>
  <div>
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
    <payModal
      :open="payModalVisible"
      :payData="payData"
      @cancel="closePayModal"
      @cancel-all="closeAllModal"
    />
  </div>
</template>

<script lang="ts" setup>
  import { ref, watch } from 'vue';
  import payModal from '../payModal/index.vue';

  const props = defineProps(['visible', 'orderData']);
  const emit = defineEmits(['ok', 'cancel']);
  console.log(props);
  const openModal = ref(false);

  const payModalVisible = ref(false);
  const payData = ref({});

  const handleOk = () => {
    payModalVisible.value = true;
    console.log(props.orderData);
    payData.value = props.orderData;
  };

  const closePayModal = () => {
    payModalVisible.value = false;
  };

  const closeAllModal = () => {
    payModalVisible.value = false;
    emit('cancel');
  };

  const handleCancel = () => {
    emit('cancel');
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
