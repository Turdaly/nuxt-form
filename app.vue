<template>
  <main class="t-h-full bg-sky-100">
    <div class="flex flex-col h-screen w-screen items-center justify-center">
      <form @submit.prevent="submit" class="flex flex-col gap-6 w-1/3 bg-white px-16 py-16 rounded-lg">
        <v-text-field
          v-model="id"
          :counter="1"
          :error-messages="errors.id"
          clearable
          label="Введите ID"
          variant="underlined"
          bg-color="white"
          @blur="validateField('id')"
        ></v-text-field>
        <v-text-field
          v-model="name"
          :counter="10"
          :error-messages="errors.name"
          clearable
          label="ФИО"
          variant="underlined"
          bg-color="white"
          @blur="validateField('name')"
        ></v-text-field>

        <v-text-field
          v-model="phone"
          :counter="7"
          :error-messages="errors.phone"
          clearable
          label="Номер телефона"
          variant="underlined"
          bg-color="white"
          @blur="validateField('phone')"
        ></v-text-field>

        <v-select
          v-model="select"
          :items="items"
          :error-messages="errors.select"
          label="Тип клиента"
          bg-color="white"
          variant="underlined"
          @blur="validateField('select')"
        ></v-select>

        <div class="flex flex-col">
          <label for="date" class="mb-1 text-sm font-medium text-gray-900">Выберите дату:</label>
          <input
            type="date"
            id="date"
            v-model="date"
            class="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            :class="[errors.date ? 'border-red-700' : '']"
            @blur="validateField('date')"
          />
          <span v-if="errors.date" class="text-red-700 text-xs">{{ errors.date }}</span>
        </div>

        <v-btn class="" type="submit" color="blue">
          submit
        </v-btn>

        <v-btn @click="handleReset">
          clear
        </v-btn>
      </form>
    </div>
  </main>
</template>



<script lang="ts" setup>
import { ref } from 'vue';

const id = ref('');
const name = ref('');
const phone = ref('');
const select = ref('');
const date = ref('');
const items = ref(['Физ.лицо', 'Юр.лицо']);

const errors = ref({
  id: '',
  name: '',
  phone: '',
  select: '',
  date: ''
});

const validateField = (field: string) => {
  switch (field) {
    case 'id':
      if (id.value.length < 1 || !/^\d+$/.test(id.value)) {
        errors.value.id = 'ID должен состоять как минимум из 1 цифры.';
      } else {
        errors.value.id = '';
      }
      break;
    case 'name':
      if (name.value.length < 2) {
        errors.value.name = 'Имя должно содержать не менее 2 символов.';
      } else {
        errors.value.name = '';
      }
      break;
    case 'phone':
      if (phone.value.length < 7 || !/^\d+$/.test(phone.value)) {
        errors.value.phone = 'Номер телефона должен состоять как минимум из 7 цифр.';
      } else {
        errors.value.phone = '';
      }
      break;
    case 'select':
      if (!select.value) {
        errors.value.select = 'Выберите тип клиента.';
      } else {
        errors.value.select = '';
      }
      break;
    case 'date':
      if (!date.value) {
        errors.value.date = 'Пожалуйста, выберите дату.';
      } else {
        errors.value.date = '';
      }
      break;
  }
};

const validateForm = () => {
  validateField('id');
  validateField('name');
  validateField('phone');
  validateField('select');
  validateField('date');

  return !errors.value.id && !errors.value.name && !errors.value.phone && !errors.value.select && !errors.value.date;
};

const submit = () => {
  if (validateForm()) {
    alert(JSON.stringify({ id: id.value, name: name.value, phone: phone.value, select: select.value, date: date.value }, null, 2));
  } else {
    alert('Пожалуйста, исправьте ошибки в форме.');
  }
};

const handleReset = () => {
  id.value = '';
  name.value = '';
  phone.value = '';
  select.value = '';
  date.value = '';
  errors.value.id = '';
  errors.value.name = '';
  errors.value.phone = '';
  errors.value.select = '';
  errors.value.date = '';
};
</script>
