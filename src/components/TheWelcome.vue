<script setup>
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'

import { reactive, h } from "vue"

const IcomMap = {
  DocumentationIcon,
  ToolingIcon,
  EcosystemIcon,
  CommunityIcon,
  SupportIcon
}

const WelcomeList = reactive([
  {
    heading: '',
    icon: '',
    content: `

    `
  },
  {
    heading: '',
    icon: '',
    content: `
      `
  },
  {
    heading: '',
    icon: '',
    content: `

    `
  },
  {
    heading: '',
    icon: '',
    content: `
    `
  },
  {
    heading: '',
    icon: '',
    content: `

    `
  }
])
let data = [{
  heading: 'Documentation',
  icon: 'DocumentationIcon',
  content: `
      Vue’s
      <a href="https://vuejs.org/" target="_blank" rel="noopener">official documentation</a>
      provides you with all information you need to get started.
    `
},
{
  heading: 'Tooling',
  icon: 'ToolingIcon',
  content: `
    This project is served and bundled with
    <a href="https://vitejs.dev/guide/features.html" target="_blank" rel="noopener">Vite</a>. The
    recommended IDE setup is
    <a href="https://code.visualstudio.com/" target="_blank" rel="noopener">VSCode</a> +
    <a href="https://github.com/johnsoncodehk/volar" target="_blank" rel="noopener">Volar</a>. If
    you need to test your components and web pages, check out
    <a href="https://www.cypress.io/" target="_blank" rel="noopener">Cypress</a> and
    <a href="https://on.cypress.io/component" target="_blank">Cypress Component Testing</a>.

    <br />

    More instructions are available in <code>README.md</code>.
      `
},
{
  heading: 'Ecosystem',
  icon: 'EcosystemIcon',
  content: `
    Get official tools and libraries for your project:
    <a href="https://pinia.vuejs.org/" target="_blank" rel="noopener">Pinia</a>,
    <a href="https://router.vuejs.org/" target="_blank" rel="noopener">Vue Router</a>,
    <a href="https://test-utils.vuejs.org/" target="_blank" rel="noopener">Vue Test Utils</a>, and
    <a href="https://github.com/vuejs/devtools" target="_blank" rel="noopener">Vue Dev Tools</a>. If
    you need more resources, we suggest paying
    <a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">Awesome Vue</a>
    a visit.

    `
},
{
  heading: 'Community',
  icon: 'CommunityIcon',
  content: `
    Got stuck? Ask your question on
    <a href="https://chat.vuejs.org" target="_blank" rel="noopener">Vue Land</a>, our official
    Discord server, or
    <a href="https://stackoverflow.com/questions/tagged/vue.js" target="_blank" rel="noopener">StackOverflow</a>. You
    should also subscribe to
    <a href="https://news.vuejs.org" target="_blank" rel="noopener">our mailing list</a> and follow
    the official
    <a href="https://twitter.com/vuejs" target="_blank" rel="noopener">@vuejs</a>
    twitter account for latest news in the Vue world.
    
    `
},
{
  heading: 'Support Vue',
  icon: 'SupportIcon',
  content: `
    As an independent project, Vue relies on community backing for its sustainability. You can help
    us by
    <a href="https://vuejs.org/sponsor/" target="_blank" rel="noopener">becoming a sponsor</a>.
    `
}]

for (let i = 1; i <= 5; i++) {
  let time = i * 1000
  setTimeout(() => {
    WelcomeList[i - 1] = data[i - 1]
  }, time)
}

</script>

<template>
  <WelcomeItem v-sk.deep v-for="item in WelcomeList">
    <template #icon>
      {{ item.icon }}
    </template>

    <template #heading>
      {{ item.heading }}
    </template>

    <div style="min-width: 600px;">
      <div v-html="item.content"></div>
    </div>
  </WelcomeItem>
</template>
