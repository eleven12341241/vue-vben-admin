<template>
  <div>
    <a-modal
      v-model:open="payModalVisible"
      title="支付"
      :footer="null"
      :maskClosable="false"
      @cancel="closePayModal"
    >
      <p>{{ payData.price }}￥</p>

      <a-image
        :width="200"
        src="http://8.140.253.70:9000/eleven/e6136c9782c50c8a747f4c68eaf3849.jpg"
      />
      <a-button @click="paySuccess">支付成功</a-button>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
  import { ref, watch } from 'vue';
  import useGoods from '@/hooks/useGoods';

  const props = defineProps(['open', 'payData']);
  const emit = defineEmits(['cancel', 'cancelAll']);

  const payModalVisible = ref(false);

  console.log('24124');
  console.log(props.payData, '1111');

  const closePayModal = () => {
    emit('cancel');
  };
  const closeAllModal = () => {
    emit('cancelAll');
  };

  const { payOrder } = useGoods();

  const paySuccess = () => {
    const data = {
      id: props.payData.id,
      order_state_id: 3,
      user_id: props.payData.user_id,
    };
    payOrder(data)
      .then((res) => {
        console.log(res);
        console.log('支付成功');
        closeAllModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  watch(
    () => props.open,
    (newValue) => {
      payModalVisible.value = newValue;
    },
  );
</script>

<style scoped>
  /* 在这里可以添加 modal 的样式 */
</style>
