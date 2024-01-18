<template>
  <template v-if="getShow">
    <LoginFormTitle class="enter-x" />
    <Form class="p-4 enter-x" :model="formData" :rules="getFormRules" ref="formRef">
      <FormItem name="account" class="enter-x">
        <Input
          size="large"
          v-model:value="formData.account"
          :placeholder="t('sys.login.userName')"
        />
      </FormItem>

      <FormItem name="mobile" class="enter-x">
        <Input size="large" v-model:value="formData.mobile" :placeholder="t('sys.login.mobile')" />
      </FormItem>
      <FormItem name="sms" class="enter-x">
        <CountdownInput
          size="large"
          v-model:value="formData.sms"
          :send-code-api="sendCodeApi"
          :placeholder="t('sys.login.smsCode')"
        />
      </FormItem>

      <FormItem class="enter-x">
        <Button type="primary" size="large" block @click="handleReset" :loading="loading">
          {{ t('common.resetText') }}
        </Button>
        <Button size="large" block class="mt-4" @click="handleBackLogin">
          {{ t('sys.login.backSignIn') }}
        </Button>
      </FormItem>
    </Form>
  </template>
</template>
<script lang="ts" setup>
  import { reactive, ref, computed, unref } from 'vue';
  import LoginFormTitle from './LoginFormTitle.vue';
  import { Form, Input, Button } from 'ant-design-vue';
  import { CountdownInput } from '@/components/CountDown';
  import { useI18n } from '@/hooks/web/useI18n';
  import { useLoginState, useFormRules, LoginStateEnum, useFormValid } from './useLogin';
  import message from 'ant-design-vue/es/message';
  import useUser from '@/hooks/useUser';

  const FormItem = Form.Item;
  const { t } = useI18n();
  const { handleBackLogin, getLoginState } = useLoginState();
  const { getFormRules } = useFormRules();

  const formRef = ref();
  const loading = ref(false);

  const formData = reactive({
    account: '',
    mobile: '',
    sms: '',
  });

  const { getCode, resetPassword } = useUser();
  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.RESET_PASSWORD);

  const { validForm } = useFormValid(formRef);

  const resetForm = () => {
    formData.account = '';
    formData.mobile = '';
    formData.sms = '';
  };

  async function handleReset() {
    const data = await validForm();
    console.log(data, '12344');
    // const form = unref(formRef);
    // if (!form) return;
    // await form.resetFields();
    if (!formData.account || !formData.mobile || !formData.sms) {
      message.error('请填写完整信息');
      return;
    }
    // 注册和重置密码要参考登录，点击按钮之前需要先验证表单
    resetPassword({
      username: formData.account,
      phone: formData.mobile,
      sms: formData.sms,
    })
      .then((res: any) => {
        if (res.success) {
          message.success('重置成功');
          resetForm();
          handleBackLogin();
        } else {
          message.error(res.message);
        }
      })
      .catch((err: any) => {
        message.error(err.message);
      });
  }

  const validatePhone = (value: string): boolean => {
    // You can customize this validation logic based on your requirements
    const phoneRegex = /^1[0-9]{10}$/; // Assuming a simple format of 11-digit phone numbers starting with '1'
    return phoneRegex.test(value);
  };

  const sendCodeApi = async () => {
    // 应该只检查手机号是否正确
    if (!validatePhone(formData.mobile)) {
      message.error('手机号格式不正确');
      return false;
    }
    const code: any = await getCode(formData.mobile);
    if (code.success) {
      return true;
    } else {
      return false;
    }
  };
</script>
