<template>
  <el-dialog v-model="centerDialogVisible" title="Prompt" width="500" center>
    <span>
      {{ props.message }}
    </span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="close">Cancel</el-button>
        <el-button type="primary" @click="confirm">
          Confirm
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { ref, render, defineEmits } from 'vue'

const props = defineProps<{ message:string }>()
const centerDialogVisible = ref(true)
const emit = defineEmits(['confirm'])

const close = () => {
  render(null, document.body)
}
const confirm = () => {
  emit('confirm')
  render(null, document.body)
}
</script>
