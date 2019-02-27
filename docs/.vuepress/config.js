module.exports = {
  base: '/vueCredCard/',
  components: [
    // {file: './components/text.vue', name: 'text'}
  ],
  head: [
    ['link', {rel: 'icon', href: '/logo.png'}]
  ],
  title: 'VueCredCard',
  description: 'An awesome animated Credit Card form',

  themeConfig: {
    nav: [
      {text: 'Home', link: '/'},
      {text: 'Guide', link: '/guide'}
    ],
    sidebar: [
      {text: 'Home', link: '/'}
    ],
    repo: 'lkjimy/vuecredcard',
    repoLabel: 'Github',
    docsRepo: 'lkjimy/vuecredcard',
    docsDir: 'docs',
    docsBranch: 'gh-docs',
    editLinks: true,
    editLinkText: 'Help us improve this page!'
  }
}