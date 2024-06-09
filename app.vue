<template>
  <v-app class="t-bg-white t-p-2">
    <v-form ref="form" class="t-h-full t-flex t-items-center t-justify-center" @submit.prevent="submit">
      <v-fade-transition leave-absolute>
        <div v-if="loading === false" class="t-w-full t-flex t-flex-col t-bg-[#F3F6FC] t-rounded-lg t-p-6 t-mb-32 t-gap-4">
          <v-text-field
            v-model.trim="id"
            v-maska="masks.numbers"
            :rules="[rules.required]"
            clearable
            label="Введите ID"
            variant="outlined"
            bg-color="white"
            :base-color="styles.blueDark"
            :color="styles.blueDark"
          />
          <v-text-field
            v-model.trim="fullName"
            :rules="[rules.required, rules.cyrillic]"
            clearable
            label="ФИО"
            variant="outlined"
            bg-color="white"
            :base-color="styles.blueDark"
            :color="styles.blueDark"
          />
          <v-text-field
            v-model.trim="phone"
            v-maska="masks.phone"
            :rules="[rules.required, rules.phone]"
            clearable
            label="Номер телефона"
            variant="outlined"
            bg-color="white"
            :base-color="styles.blueDark"
            :color="styles.blueDark"
          />
          <v-select v-model="clientType" :items="items" label="Тип клиента" variant="outlined" bg-color="white" :base-color="styles.blueDark" :color="styles.blueDark" />
          <v-btn type="submit" text="Отправить" :elevation="0" :color="styles.blueDark" size="x-large" />
        </div>
      </v-fade-transition>
      <v-fade-transition leave-absolute>
        <v-progress-circular v-if="loading === true" indeterminate :size="70" :width="7" :color="styles.blueDark" />
      </v-fade-transition>
      <v-fade-transition leave-absolute>
        <div v-if="loading === null" class="t-w-full t-flex t-flex-col t-items-center t-justify-center t-mb-32 t-gap-4">
          <p class="t-w-full t-flex t-flex-col t-items-center t-gap-3 t-bg-[#F3F6FC] t-rounded-lg t-p-6 t-text-xl t-text-center t-font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" width="4em" height="4em" viewBox="0 0 1024 1024">
              <path
                fill="#53a653"
                d="M512 64a448 448 0 1 1 0 896a448 448 0 0 1 0-896m-55.808 536.384l-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.27 38.27 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336z"
              />
            </svg>
            Данные сохранены успешно
          </p>
          <span class="t-underline t-underline-offset-2" :class="[styles.blueDarkText]" @click="resetForm">Вернуться к форме</span>
        </div>
      </v-fade-transition>
    </v-form>
  </v-app>
</template>

<script setup lang="ts">
const form = ref<any>();
const id = ref<string>('');
const fullName = ref<string>('');
const phone = ref<string>('+7');
const loading = ref<boolean | null>(false);
const items = ref(['Физ.лицо', 'Юр.лицо']);
const clientType = ref<string>(items.value[0]);

const submit = async () => {
  try {
    await form.value.validate().then(async (v: { valid: boolean; errors: { id: string; errorMessages: string[] }[] }) => {
      if (v.valid) {
        loading.value = true;
        const data = {
          Id: `@${id.value}`,
          Date: new Date().toLocaleString('ru'),
          Status: 'Online',
          ClientType: clientType.value,
          FullName: fullName.value,
          Phone: phone.value,
        };
        await useFetch(import.meta.env.VITE_SCRIPT_URL, {
          method: 'POST',
          body: getFormData(data),
        });
        loading.value = null;
      }
    });
  } catch (err) {
    console.log(err);
    loading.value = false;
  }
};

const resetForm = () => {
  id.value = '';
  phone.value = '';
  clientType.value = items.value[0];
  fullName.value = '';
  loading.value = false;
};
</script>

<style>
html {
  overflow: hidden;
}

.v-btn__content {
  text-transform: capitalize !important;
  color: white !important;
}
</style>
