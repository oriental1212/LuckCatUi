<script setup></script>

<template>
    <transition
        enter-active-class="animate__animated animate__fadeIn animate__faster"
        leave-active-class="animate__animated animate__fadeOut"
    >
        <router-view></router-view>
    </transition>
</template>

<style scoped></style>
