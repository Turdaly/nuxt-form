<template>
  <v-app class="t-bg-white t-p-2">
    <v-form ref="form" class="t-h-full t-flex t-items-center t-justify-center" @submit.prevent="submit">
      <div class="t-w-full t-flex t-flex-col t-bg-[#F3F6FC] t-rounded-lg t-p-6 t-mb-32 t-gap-4">
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
    </v-form>
  </v-app>
</template>

<script setup lang="ts">
const form = ref<any>();
const id = ref<string>('');
const fullName = ref<string>('');
const phone = ref<string>('+7');
const items = ref(['Физ.лицо', 'Юр.лицо']);
const clientType = ref<string>(items.value[0]);

const submit = async () => {
  try {
    await form.value.validate().then(async (v: { valid: boolean; errors: { id: string; errorMessages: string[] }[] }) => {
      if (v.valid) {
        const data = {
          Id: id.value,
          Date: new Date().toISOString(),
          Status: 'Online',
          ClientType: clientType.value,
          FullName: fullName.value,
          phone: phone.value,
        };
        const response = await useFetch(import.meta.env.VITE_SCRIPT_URL, {
          method: 'POST',
          body: data,
        });
        console.log(response);
      }
    });
  } catch (err) {
    console.log(err);
  }
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
