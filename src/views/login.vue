<template>
  <div class="login-container">
    <div class="login-left"></div>
    <div class="login-right">
      <div class="login-form">
        <div class="login-content-title">
          <img src="/vite.svg" class="logo" alt="" />
          <span class="title">LambLink-View</span>
        </div>
        <el-form ref="loginRef" :model="loginForm" class="login-content-form" :rules="loginRules">
          <el-form-item class="login-animation1" prop="username">
            <el-input v-model="loginForm.username" minlength="20" clearable link size="large" auto-complete="off"
              placeholder="账号">
              <template #prefix>
                <el-icon class="el-input__icon"><ele-User /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item class="login-animation2" prop="password">
            <el-input v-model="loginForm.password" minlength="20" type="password" show-password size="large"
              auto-complete="off" placeholder="密码" @keyup.enter="handleLogin">
              <template #prefix>
                <el-icon class="el-input__icon"><ele-Unlock /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item class="login-animation3" prop="code" v-if="captchaEnabled">
            <div style="display: flex;justify-content: space-between;"> 
              <el-input v-model="loginForm.code" size="large" auto-complete="off" placeholder="验证码" style="width: 63%"
                @keyup.enter="handleLogin">
                <template #prefix><el-icon class="el-input__icon"><ele-Position /></el-icon></template>
              </el-input>
              <div class="login-code" style="width: 33%;">
                <img :src="codeUrl" @click="getCode" class="login-code-img" />
              </div>
            </div>

          </el-form-item>
          <el-checkbox class="login-animation4" v-model="loginForm.rememberMe"
            style="margin: 0px 0px 25px 0px">记住密码</el-checkbox>
          <el-form-item style="width: 100%" class="login-animation5">
            <el-button :loading="loading" size="large" type="primary" style="width: 100%" @click.prevent="handleLogin">
              <span v-if="!loading">登 录</span>
              <span v-else>登 录 中...</span>
            </el-button>
            <div style="float: right" v-if="register">
              <router-link class="link-type" :to="'/register'">立即注册</router-link>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getCodeImg } from "@/api/login";
import Cookies from "js-cookie";
import { encrypt, decrypt } from "@/utils/jsencrypt";
import useUserStore from "@/store/modules/user";
const router = useRouter();
const userStore = useUserStore();
const { proxy } = getCurrentInstance();
const loginForm = ref({
  username: "",
  password: "",
  rememberMe: false,
  code: "",
  uuid: "",
});
const codeUrl = ref("");
const loading = ref(false);
// 注册开关
const register = ref(false);
const redirect = ref(undefined);
const loginRules = {
  username: [{ required: true, trigger: "blur", message: "请输入您的账号" }],
  password: [{ required: true, trigger: "blur", message: "请输入您的密码" }],
  code: [{ required: true, trigger: "change", message: "请输入验证码" }],
};
// 验证码开关
const captchaEnabled = ref(true);

function handleLogin() {
  proxy.$refs.loginRef.validate((valid) => {
    if (valid) {
      loading.value = true;
      // 勾选了需要记住密码设置在 cookie 中设置记住用户名和密码
      if (loginForm.value.rememberMe) {
        Cookies.set("username", loginForm.value.username, { expires: 30 });
        Cookies.set("password", encrypt(loginForm.value.password), {
          expires: 30,
        });
        Cookies.set("rememberMe", loginForm.value.rememberMe, { expires: 30 });
      } else {
        // 否则移除
        Cookies.remove("username");
        Cookies.remove("password");
        Cookies.remove("rememberMe");
      }
      // 调用action的登录方法
      userStore
        .login(loginForm.value)
        .then(() => {
          router.push({ path: redirect.value || "/" });
        })
        .catch(() => {
          loading.value = false;
          // 重新获取验证码
          if (captchaEnabled.value) {
            getCode();
          }
        });
    }
  });
}
function getCode() {
  getCodeImg().then((res) => {
    captchaEnabled.value =
      res.captchaEnabled === undefined ? true : res.captchaEnabled;
    if (captchaEnabled.value) {
      codeUrl.value = res.data.img;
      loginForm.value.uuid = res.data.uuid;
    }
  });
}

function getCookie() {
  const username = Cookies.get("username");
  const password = Cookies.get("password");
  const rememberMe = Cookies.get("rememberMe");
  loginForm.value = {
    username: username === undefined ? loginForm.value.username : username,
    password:
      password === undefined ? loginForm.value.password : decrypt(password),
    rememberMe: rememberMe === undefined ? false : Boolean(rememberMe),
  };
}

getCode();
getCookie();
</script>

<style lang='scss' scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background-color: #fff;
}

.login-animation3 {
  text-align: right;
}

.login-code {
  width: 33%;
  height: 40px;
  float: right;

  img {
    cursor: pointer;
    vertical-align: middle;
  }

  .login-code-img {
    height: 40px;
    width: 100%;

  }
}

.login-content-title {
  display: flex;
  align-items: center;
  font-family: "Avenir", "Helvetica Neue", "Arial", "Helvetica", "sans-serif";
  font-style: normal;
  font-weight: 600;
  font-size: 30px;
  line-height: 39px;
  letter-spacing: 0.02em;
  color: #000;
  white-space: nowrap;
  z-index: 5;
  margin-bottom: 20px;
  animation: logoAnimation 0.3s ease;

  .logo {
    width: 40.83px;
    height: 46px;
  }
}

.title {
  padding-left: 10px;
  font-family: "Avenir", "Helvetica" "Neue", "Arial", "Helvetica", "sans-serif";
  font-style: normal;
  font-weight: 600;
  font-size: 30px;
  line-height: 39px;
  letter-spacing: 0.02em;
  color: #000;
  white-space: nowrap;
}

.login-left {
  flex: 1;
  height: 100vh;
  background-image: url("../assets/images/login-background.jpg");
  background-size: 100% 100%;
}

.login-right {
  width: 480px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-form {
  border-radius: 6px;
  background: #ffffff;
  margin: 0 auto;
  height: 50%;
  width: 70%;
  padding-left: 5px;
  padding-right: 5px;

  .el-input {
    height: 40px;

    input {
      height: 40px;
    }
  }

  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 0px;
  }
}

.el-form-item--large {
  margin-bottom: 22px;
}

.login-content-form {
  @for $i from 1 through 5 {
    .login-animation#{$i} {
      opacity: 0;
      animation-name: error-num;
      animation-duration: 0.5s;
      animation-fill-mode: forwards;
      animation-delay: calc($i/10) + s;
    }
  }
}
</style>
