(()=>{"use strict";var e={453:(e,t,i)=>{var o=i(751),n=i(641),a=i(33);const s={id:"app"};function p(e,t,i,p,l,r){const c=(0,n.g2)("router-link"),d=(0,n.g2)("router-view");return(0,n.uX)(),(0,n.CE)("div",s,[(0,n.Lk)("header",null,[(0,n.Lk)("nav",null,[((0,n.uX)(!0),(0,n.CE)(n.FK,null,(0,n.pI)(l.navItems,(e=>((0,n.uX)(),(0,n.Wv)(c,{key:e.path,to:e.path},{default:(0,n.k6)((()=>[(0,n.eW)((0,a.v_)(e.name),1)])),_:2},1032,["to"])))),128))])]),(0,n.Lk)("main",null,[(0,n.bF)(o.eB,{name:"fade",mode:"out-in"},{default:(0,n.k6)((()=>[(0,n.bF)(d)])),_:1})]),(0,n.Lk)("footer",null,[(0,n.Lk)("p",null,"© "+(0,a.v_)((new Date).getFullYear())+" "+(0,a.v_)(l.siteTitle)+". 保留所有权利。",1)])])}const l={siteTitle:"tobenot的作品集/墓志铭 庆祝2024年现实生日而设计",navItems:[{name:"首页",path:"/"},{name:"关于我",path:"/about"}],projects:[{id:2,title:"猎蝗人",image:i(148),description:"第三人称关卡制清版太空射击游戏。大二的作品，我与音乐师制作，外援建模。",link:"https://store.steampowered.com/app/3008350/"},{id:7,title:"文明史诗",image:i(93),description:"一款弹幕互动联机的AI图文文明发展演化游戏。",link:"https://play-live.bilibili.com/details/1729301917890"},{id:12,title:"不止于纸上的故事",image:i(280),description:"大模型跑团游戏，网页端。",link:"https://bb.tobenot.top/main/"},{id:11,title:"不止于纸上的故事：鸿律篇",image:i(366),description:"已经完成的作为礼物的小说，预备借助AI来动画化。",link:"https://www.bilibili.com/video/BV1gk2PY9E9C/"},{id:1,title:"作家之屋",image:i(814),description:"博客，【成为人类】事件的主要促进者。",link:"https://tobenot.top/"},{id:4,title:"夜酱：沉默杀手",image:i(965),description:"第三人称动作游戏，大一下的作品，我与音乐师制作，外援建模。",link:"https://store.steampowered.com/app/1494180/Night_Silent_Killer/"},{id:6,title:"挑战之旅",image:i(649),description:"毕设，ARPG+大模型AI游戏，单人制作。不推荐游玩。",link:"https://store.steampowered.com/app/2778690/Challengers_Odyssey/"},{id:14,title:"UE5大模型游戏插件",image:i(271),description:"毕设用的，其实啥游戏都可以用。后续有个大项目就还想用。",link:"https://github.com/tobenot/TobenotLLMGameplay"},{id:5,title:"心灵世界",image:i(911),description:"第一人称砍杀游戏，高考后寒假和大一上的作品。本来想做成代表作，结果效果并不好，很希望能重制。不推荐游玩。",link:"https://store.steampowered.com/app/1415580/Heart_World/"},{id:3,title:"极北之星",image:i(500),description:"处女作。2018年高二的作品，与几个同学们一起制作。全是策划。",link:"https://store.steampowered.com/app/843050/North_Stars/"},{id:8,title:"璀璨群星",image:i(142),description:"一款类群星弹幕互动游戏。拿了B站的最佳弹幕游戏第二名。目前不可玩。",link:"https://www.bilibili.com/video/BV1c5411D7Qb/"},{id:16,title:"智能荣光",image:i(639),description:"对战的弹幕互动游戏，因为觉得UE5那个水体插件很好看就做了。目前不可玩。",link:"https://www.bilibili.com/video/BV1o34y1h7Pu/"},{id:9,title:"舰队激斗",image:i(627),description:"一款召唤战舰对战的弹幕互动游戏。赚了4k和五个舰长。目前不可玩。",link:"https://www.bilibili.com/video/BV1k34y1e7Ew/"},{id:10,title:"操场·高楼·太空电梯",image:i(73),description:"小说。《不止于纸上的故事》中的一个短篇。",link:"https://www.bilibili.com/read/cv11529157/"},{id:13,title:"在线语音合成",image:i(640),description:"在线语音合成，基于微软Edge。",link:"https://tobenot.top/simple-tts-js/"},{id:15,title:"不止于纸上的故事：幻灭篇",image:i(563),description:"本来想做严肃游戏，讲高中学习方法和心界起源的，但是我还不如直接跟你讲。",link:"https://tobenot.top/Beyond-Books-Disillusionment/"}],about:{title:"关于我",content:"看这里不如看博客？",personalWorks:[{title:"2024年生日绘《回归》（致敬心灵杀手2）",image:i(65)}]}},r={name:"App",data(){return{navItems:l.navItems,siteTitle:l.siteTitle}},watch:{$route(e,t){document.title=this.getPageTitle(e)}},methods:{getPageTitle(e){const t=this.siteTitle;if("Home"===e.name)return t;if("Project"===e.name){const i=parseInt(e.params.id),o=l.projects.find((e=>e.id===i));return o?`${o.title} | ${t}`:t}return"About"===e.name?`关于我 | ${t}`:t}},mounted(){document.title=this.getPageTitle(this.$route)}};var c=i(262);const d=(0,c.A)(r,[["render",p]]),m=d;var u=i(220);const g={class:"home"},k={class:"site-title animate-fade-in-up"},v={class:"projects-grid"},b=["onClick"],h=["src","alt"],w={class:"project-info"};function A(e,t,i,o,s,p){return(0,n.uX)(),(0,n.CE)("div",g,[(0,n.Lk)("h1",k,(0,a.v_)(s.siteTitle),1),(0,n.Lk)("div",v,[((0,n.uX)(!0),(0,n.CE)(n.FK,null,(0,n.pI)(s.projects,((e,t)=>((0,n.uX)(),(0,n.CE)("div",{key:e.id,class:"project-card animate-fade-in-up",style:(0,a.Tr)({animationDelay:.1*t+"s"}),onClick:t=>p.goToProject(e.id)},[(0,n.Lk)("img",{src:e.image,alt:e.title},null,8,h),(0,n.Lk)("div",w,[(0,n.Lk)("h3",null,(0,a.v_)(e.title),1),(0,n.Lk)("p",null,(0,a.v_)(e.description),1)])],12,b)))),128))])])}const f={name:"Home",data(){return{siteTitle:l.siteTitle,projects:l.projects}},methods:{goToProject(e){this.$router.push({name:"Project",params:{id:e}})}}},j=(0,c.A)(f,[["render",A],["__scopeId","data-v-c71a4052"]]),L=j,E={key:0,class:"project"},y=["src","alt"],I={class:"project-details animate-fade-in-up",style:{"animation-delay":"0.2s"}},S=["href"];function D(e,t,i,o,s,p){return s.project?((0,n.uX)(),(0,n.CE)("div",E,[(0,n.Lk)("img",{src:s.project.image,alt:s.project.title,class:"project-image animate-fade-in-up"},null,8,y),(0,n.Lk)("div",I,[(0,n.Lk)("h2",null,(0,a.v_)(s.project.title),1),(0,n.Lk)("p",null,(0,a.v_)(s.project.description),1),(0,n.Lk)("a",{href:s.project.link,target:"_blank",rel:"noopener noreferrer",class:"project-link"},"查看项目",8,S)])])):(0,n.Q3)("",!0)}const T={name:"Project",data(){return{project:null}},created(){const e=parseInt(this.$route.params.id);this.project=l.projects.find((t=>t.id===e))}},x=(0,c.A)(T,[["render",D],["__scopeId","data-v-b2350c0e"]]),X=x,P={class:"about"},N={class:"animate-fade-in-up"},R={class:"about-content animate-fade-in-up",style:{"animation-delay":"0.2s"}},O={class:"personal-works"},Q=["src","alt"];function Y(e,t,i,o,s,p){return(0,n.uX)(),(0,n.CE)("div",P,[(0,n.Lk)("h2",N,(0,a.v_)(s.about.title),1),(0,n.Lk)("p",R,(0,a.v_)(s.about.content),1),t[0]||(t[0]=(0,n.Lk)("h3",{class:"animate-fade-in-up",style:{"animation-delay":"0.4s"}},"画廊",-1)),(0,n.Lk)("div",O,[((0,n.uX)(!0),(0,n.CE)(n.FK,null,(0,n.pI)(s.about.personalWorks,((e,t)=>((0,n.uX)(),(0,n.CE)("div",{key:e.title,class:"work animate-fade-in-up",style:(0,a.Tr)({animationDelay:.6+.1*t+"s"})},[(0,n.Lk)("img",{src:e.image,alt:e.title},null,8,Q),(0,n.Lk)("p",null,(0,a.v_)(e.title),1)],4)))),128))])])}const H={name:"About",data(){return{about:l.about}}},K=(0,c.A)(H,[["render",Y],["__scopeId","data-v-33cdc0fe"]]),M=K,B=[{path:"/",name:"Home",component:L},{path:"/project/:id",name:"Project",component:X},{path:"/about",name:"About",component:M}],G=(0,u.aE)({history:(0,u.LA)("/Epitaph/"),routes:B}),J=G;(0,o.Ef)(m).use(J).mount("#app")},142:(e,t,i)=>{e.exports=i.p+"img/BS.866045f6.png"},563:(e,t,i)=>{e.exports=i.p+"img/bbd.3baf8af3.png"},366:(e,t,i)=>{e.exports=i.p+"img/bbr_title.96130e29.png"},280:(e,t,i)=>{e.exports=i.p+"img/bbw.9960b616.png"},93:(e,t,i)=>{e.exports=i.p+"img/civ.e7ada4a4.png"},649:(e,t,i)=>{e.exports=i.p+"img/co_header.77ca4302.png"},271:(e,t,i)=>{e.exports=i.p+"img/co_plugin.21aa1d1d.png"},627:(e,t,i)=>{e.exports=i.p+"img/fb.81cb939c.png"},911:(e,t,i)=>{e.exports=i.p+"img/hw_header_schinese.560b298e.jpg"},639:(e,t,i)=>{e.exports=i.p+"img/ig.13b42bba.png"},148:(e,t,i)=>{e.exports=i.p+"img/lh_header_schinese.184c9196.jpg"},965:(e,t,i)=>{e.exports=i.p+"img/nbsk_header.76005b8a.jpg"},500:(e,t,i)=>{e.exports=i.p+"img/ns_header.f601a6ff.jpg"},73:e=>{e.exports="data:image/webp;base64,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"},65:(e,t,i)=>{e.exports=i.p+"img/return.15c7bee8.png"},814:(e,t,i)=>{e.exports=i.p+"img/teacat.3472d80f.webp"},640:(e,t,i)=>{e.exports=i.p+"img/tts.e7a3ac25.png"}},t={};function i(o){var n=t[o];if(void 0!==n)return n.exports;var a=t[o]={exports:{}};return e[o](a,a.exports,i),a.exports}i.m=e,(()=>{var e=[];i.O=(t,o,n,a)=>{if(!o){var s=1/0;for(c=0;c<e.length;c++){for(var[o,n,a]=e[c],p=!0,l=0;l<o.length;l++)(!1&a||s>=a)&&Object.keys(i.O).every((e=>i.O[e](o[l])))?o.splice(l--,1):(p=!1,a<s&&(s=a));if(p){e.splice(c--,1);var r=n();void 0!==r&&(t=r)}}return t}a=a||0;for(var c=e.length;c>0&&e[c-1][2]>a;c--)e[c]=e[c-1];e[c]=[o,n,a]}})(),(()=>{i.d=(e,t)=>{for(var o in t)i.o(t,o)&&!i.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})}})(),(()=>{i.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()})(),(()=>{i.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t)})(),(()=>{i.p="/Epitaph/"})(),(()=>{var e={524:0};i.O.j=t=>0===e[t];var t=(t,o)=>{var n,a,[s,p,l]=o,r=0;if(s.some((t=>0!==e[t]))){for(n in p)i.o(p,n)&&(i.m[n]=p[n]);if(l)var c=l(i)}for(t&&t(o);r<s.length;r++)a=s[r],i.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return i.O(c)},o=self["webpackChunk"]=self["webpackChunk"]||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))})();var o=i.O(void 0,[504],(()=>i(453)));o=i.O(o)})();
//# sourceMappingURL=app.754d8351.js.map