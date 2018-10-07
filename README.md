This is the template of Vampire Project

// TODO:

+ 移除 bulma，太大了 太菜了
+ 异步加载区块优化
  `@babel/plugin-syntax-dynamic-import` `@babel/plugin-transform-runtime` `@babel/runtime`
+ font-awesome 的 tree shaking

### Deployment

+ Download `git` for windows [(Link)](https://git-scm.com/downloads)
+ Install `npm` for your distribution [(Linux)](https://nodejs.org/en/download/package-manager) [(Windows)](https://nodejs.org/en/download/current/)
+ clone this project `git clone https://github.com/VampireRip/vampire-template.git`
+ cd and `npm install`
+ `npm run dev`, open browser and enjoy~

### Frameworks

+ [webpack](https://webpack.js.org/)
+ [Vue](https://vuejs.org/)
+ [Vuex](https://vuex.vuejs.org/)
+ [Vue Router](https://router.vuejs.org/)
+ [Bulma](https://bulma.io/)

### Why not webpack-merge?

It merges Function -> string... wasting my sometime to debug, I hate it.

### Why vcss?

vue-loader won't work with style-loader/url...

