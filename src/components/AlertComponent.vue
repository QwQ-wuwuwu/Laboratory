<script lang="ts" setup>
const props = defineProps<{title:string; type:string; description:string}>()
</script>

<template>
    <div style="max-width: 500px">
      <el-alert
        :title="props.title"
        :type="props.type"
        :description="props.description"
        show-icon
      />
    </div>
</template>