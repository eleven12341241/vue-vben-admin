<template>
  <div v-if="getShow">
    <LoginFormTitle class="enter-x" />
    <Form class="p-4 enter-x" :model="formData" :rules="getFormRules" ref="formRef">
      <FormItem name="account" class="enter-x">
        <Input
          class="fix-auto-fill"
          size="large"
          v-model:value="formData.account"
          :placeholder="t('sys.login.userName')"
        />
      </FormItem>
      <FormItem name="mobile" class="enter-x">
        <Input
          size="large"
          v-model:value="formData.mobile"
          :placeholder="t('sys.login.mobile')"
          class="fix-auto-fill"
        />
      </FormItem>
      <FormItem name="sms" class="enter-x">
        <CountdownInput
          size="large"
          class="fix-auto-fill"
          v-model:value="formData.sms"
          :sendCodeApi="sendCodeApi"
          :placeholder="t('sys.login.smsCode')"
        />
      </FormItem>
      <FormItem name="password" class="enter-x">
        <StrengthMeter
          size="large"
          v-model:value="formData.password"
          :placeholder="t('sys.login.password')"
        />
      </FormItem>
      <FormItem name="confirmPassword" class="enter-x">
        <InputPassword
          size="large"
          visibilityToggle
          v-model:value="formData.confirmPassword"
          :placeholder="t('sys.login.confirmPassword')"
        />
      </FormItem>

      <FormItem class="enter-x" name="policy">
        <!-- No logic, you need to deal with it yourself -->
        <Checkbox v-model:checked="formData.policy" size="small">
          {{ t('sys.login.policy') }}
        </Checkbox>
      </FormItem>

      <Button
        type="primary"
        class="enter-x"
        size="large"
        block
        @click="handleRegister"
        :loading="loading"
      >
        {{ t('sys.login.registerButton') }}
      </Button>
      <Button size="large" block class="mt-4 enter-x" @click="handleBackLogin">
        {{ t('sys.login.backSignIn') }}
      </Button>
    </Form>
  </div>
</template>
<script lang="ts" setup>
  import { reactive, ref, unref, computed } from 'vue';
  import LoginFormTitle from './LoginFormTitle.vue';
  import { Form, Input, Button, Checkbox } from 'ant-design-vue';
  import { StrengthMeter } from '@/components/StrengthMeter';
  import { CountdownInput } from '@/components/CountDown';
  import { useI18n } from '@/hooks/web/useI18n';
  import { useLoginState, useFormRules, useFormValid, LoginStateEnum } from './useLogin';
  import useUser from '@/hooks/useUser';
  import message from '@/views/form-design/utils/message';

  const FormItem = Form.Item;
  const InputPassword = Input.Password;
  const { t } = useI18n();
  const { handleBackLogin, getLoginState } = useLoginState();

  const formRef = ref();
  const loading = ref(false);

  const formData = reactive({
    account: '',
    password: '',
    confirmPassword: '',
    mobile: '',
    sms: '',
    policy: false,
  });

  const { getFormRules } = useFormRules(formData);
  const { validForm } = useFormValid(formRef);

  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.REGISTER);

  const validatePhone = (value: string): boolean => {
    // You can customize this validation logic based on your requirements
    const phoneRegex = /^1[0-9]{10}$/; // Assuming a simple format of 11-digit phone numbers starting with '1'
    return phoneRegex.test(value);
  };

  const { register, getCode } = useUser();
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

  const resetFormData = () => {
    formData.account = '';
    formData.password = '';
    formData.confirmPassword = '';
    formData.mobile = '';
    formData.sms = '';
    formData.policy = false;
  };

  async function handleRegister() {
    loading.value = true;
    const data = await validForm();
    console.log(data);
    if (!data) return;
    // 将数据提交到后台
    register(data).then((res: any) => {
      if (res.data.code === 400) {
        message.error(res.data.message);
      } else {
        // alert(res.data.message);
        message.success('注册成功');
        resetFormData();
        handleBackLogin();
      }
      loading.value = false;
    });
  }
</script>
@/hooks/useUser
