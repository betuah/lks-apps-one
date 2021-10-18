<template>
  <v-app 
    style="
      background-image: url('https://live.staticflickr.com/65535/48632812233_bf31234318_6k.jpg');
      background-position: center;
      background-repeat: repeat;
      background-size: contain;
      height: 100vh;
      width: 100%;
    "
  >
    <v-main
      style="
        background: rgba(255, 255, 255, .8);
        backdrop-filter: blur(7px);
        height: 100vh;
        width: 100%;
      "
    >
        <Nuxt />
    </v-main>
  </v-app>
</template>