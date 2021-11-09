<template>
  <div class="relative flex login-container">
    <div class="flex flex-col items-center justify-center flex-1 space-y-10">
      <div class="flex items-center">
        <img src="/resource/img/logo.png" class="logo" />
        <span class="ml-5 text-2xl text-white">{{ $t('app.name') }}</span>
      </div>
      <img alt="Vben Admin" src="/src/assets/svg/login-box-bg.svg" class="items-center block w-1/3" />
      <div class="text-2xl text-white">{{ $t('app.description') }}</div>
    </div>
    <div class="flex flex-col items-center justify-center flex-1 space-y-10">
      <div class="w-full text-2xl text-center">{{ $t("login.title") }}</div>
      <n-form
        class="w-1/2"
        :label-width="0"
        :model="formModel"
        :rules="rules"
        ref="formRef"
        label-placement="left"
        @keypress.enter.stop="submit"
      >
        <n-form-item path="username">
          <n-input
            clearable
            v-model:value="formModel.username"
            :placeholder="$t('placeholder.username')"
          >
            <template #prefix>
              <n-icon>
                <PersonSharp />
              </n-icon>
            </template>
          </n-input>
        </n-form-item>
        <n-form-item path="password">
          <n-input
            clearable
            v-model:value="formModel.password"
            :placeholder="$t('placeholder.username')"
            type="password"
            show-password-on="mousedown"
          >
            <template #prefix>
              <n-icon>
                <LockClosed />
              </n-icon>
            </template>
          </n-input>
        </n-form-item>
      </n-form>

      <n-button
        class="w-1/2 py-5"
        type="info"
        @click="submit"
        attr-type="button"
      >{{ $t("login.button") }}</n-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { PersonSharp, LockClosed } from '@vicons/ionicons5'
import { useUserStore } from '@/store/modules/user'
import { useI18n } from 'vue-i18n'
import { ILoginParams } from '@/types/user'

export default defineComponent({
  components: { PersonSharp, LockClosed },
  setup() {
    const { t } = useI18n()
    const userStrore = useUserStore()
    const router = useRouter()
    const formRef = ref()
    const formModel = reactive<ILoginParams>({
      username: '',
      password: ''
    })
    const submit = () => {
      formRef.value.validate((errors) => {
        if (!errors) {
          userStrore.login(formModel)
            .then(() => {
              router.push('/home')
            })
        }
      })
    }
    return {
      submit,
      formRef,
      formModel,
      rules: {
        username: {
          required: true,
          message: t('placeholder.username'),
          trigger: ['input', 'blur']
        },
        password: {
          required: true,
          message: t('placeholder.password'),
          trigger: ['input', 'blur']
        }
      }
    }
  }
})
</script>

<style lang="less" scoped>
.login-container {
  width: 100vw;
  height: 100vh;
  &::after {
    z-index: -1;
    content: "";
    width: 50%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background-image: url("/src/assets/svg/login-bg.svg");
    background-position: 100%;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .logo {
    width: 48px;
  }
  :deep(input) {
    // caret-color: red; // 光标的颜色
    &:-webkit-autofill {
      box-shadow: 0 0 0 1000px white inset !important; // 自动填充的背景颜色
      -webkit-text-fill-color: black !important; // 自动填充的文字颜色
      + .n-input__placeholder {
        display: none;
      }
    }
  }
}
</style>