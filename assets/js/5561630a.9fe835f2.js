"use strict";(self.webpackChunkdocusaurus=self.webpackChunkdocusaurus||[]).push([[555],{3905:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>c});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=a.createContext({}),p=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},d=function(e){var t=p(e.components);return a.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,l=e.originalType,s=e.parentName,d=i(e,["components","mdxType","originalType","parentName"]),m=p(n),c=r,k=m["".concat(s,".").concat(c)]||m[c]||u[c]||l;return n?a.createElement(k,o(o({ref:t},d),{},{components:n})):a.createElement(k,o({ref:t},d))}));function c(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=n.length,o=new Array(l);o[0]=m;var i={};for(var s in t)hasOwnProperty.call(t,s)&&(i[s]=t[s]);i.originalType=e,i.mdxType="string"==typeof e?e:r,o[1]=i;for(var p=2;p<l;p++)o[p]=n[p];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},3326:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>o,default:()=>u,frontMatter:()=>l,metadata:()=>i,toc:()=>p});var a=n(7462),r=(n(7294),n(3905));const l={},o="Forwarder",i={unversionedId:"classes/Forwarder",id:"classes/Forwarder",title:"Forwarder",description:"The Forwarder class allows the forwarding of MIDI messages to predetermined outputs. When you",source:"@site/api/classes/Forwarder.md",sourceDirName:"classes",slug:"/classes/Forwarder",permalink:"/api/classes/Forwarder",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"EventEmitter",permalink:"/api/classes/EventEmitter"},next:{title:"Input",permalink:"/api/classes/Input"}},s={},p=[{value:"<code>Constructor</code>",id:"constructor",level:3},{value:"Properties",id:"properties",level:2},{value:"<code>.channels</code>",id:"channels",level:3},{value:"<code>.destinations</code>",id:"destinations",level:3},{value:"<code>.suspended</code>",id:"suspended",level:3},{value:"<code>.types</code>",id:"types",level:3},{value:"Methods",id:"methods",level:2},{value:"<code>.forward(...)</code>",id:"forward",level:3}],d={toc:p};function u(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"forwarder"},"Forwarder"),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"Forwarder")," class allows the forwarding of MIDI messages to predetermined outputs. When you\ncall its ",(0,r.kt)("a",{parentName:"p",href:"#forward"},(0,r.kt)("inlineCode",{parentName:"a"},"forward()"))," method, it will send the specified ",(0,r.kt)("a",{parentName:"p",href:"Message"},(0,r.kt)("inlineCode",{parentName:"a"},"Message"))," object\nto all the outputs listed in its ",(0,r.kt)("a",{parentName:"p",href:"#destinations"},(0,r.kt)("inlineCode",{parentName:"a"},"destinations"))," property."),(0,r.kt)("p",null,"If specific channels or message types have been defined in the ",(0,r.kt)("a",{parentName:"p",href:"#channels"},(0,r.kt)("inlineCode",{parentName:"a"},"channels"))," or\n",(0,r.kt)("a",{parentName:"p",href:"#types"},(0,r.kt)("inlineCode",{parentName:"a"},"types"))," properties, only messages matching the channels/types will be forwarded."),(0,r.kt)("p",null,"While it can be manually instantiated, you are more likely to come across a ",(0,r.kt)("inlineCode",{parentName:"p"},"Forwarder")," object as\nthe return value of the ",(0,r.kt)("a",{parentName:"p",href:"Input#addForwarder"},(0,r.kt)("inlineCode",{parentName:"a"},"Input.addForwarder()"))," method."),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Since"),": 3.0.0"),(0,r.kt)("h3",{id:"constructor"},(0,r.kt)("inlineCode",{parentName:"h3"},"Constructor")),(0,r.kt)("p",null,"Creates a ",(0,r.kt)("inlineCode",{parentName:"p"},"Forwarder")," object."),(0,r.kt)("p",null,"  ",(0,r.kt)("strong",{parentName:"p"},"Parameters")),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},(0,r.kt)("inlineCode",{parentName:"p"},"new Forwarder([destinations], [options])"))),(0,r.kt)("div",{class:"parameter-table-container"},(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,r.kt)("th",{parentName:"tr",align:null},"Type"),(0,r.kt)("th",{parentName:"tr",align:null},"Default"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"[",(0,r.kt)("strong",{parentName:"td"},(0,r.kt)("inlineCode",{parentName:"strong"},"destinations")),"]"),(0,r.kt)("td",{parentName:"tr",align:null},"Output",(0,r.kt)("br",null),"Array.","<","Output",">",(0,r.kt)("br",null)),(0,r.kt)("td",{parentName:"tr",align:null},"[","]"),(0,r.kt)("td",{parentName:"tr",align:null},"An ",(0,r.kt)("a",{parentName:"td",href:"Output"},(0,r.kt)("inlineCode",{parentName:"a"},"Output"))," object, or an array of such objects, to forward the message to.")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"[",(0,r.kt)("strong",{parentName:"td"},(0,r.kt)("inlineCode",{parentName:"strong"},"options")),"]"),(0,r.kt)("td",{parentName:"tr",align:null},"object",(0,r.kt)("br",null)),(0,r.kt)("td",{parentName:"tr",align:null},"{}"),(0,r.kt)("td",{parentName:"tr",align:null})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"[",(0,r.kt)("strong",{parentName:"td"},(0,r.kt)("inlineCode",{parentName:"strong"},"options.types")),"]"),(0,r.kt)("td",{parentName:"tr",align:null},"string",(0,r.kt)("br",null),"Array.","<","string",">",(0,r.kt)("br",null)),(0,r.kt)("td",{parentName:"tr",align:null},"(all messages)"),(0,r.kt)("td",{parentName:"tr",align:null},"A MIDI message type or an array of such types (",(0,r.kt)("inlineCode",{parentName:"td"},'"noteon"'),", ",(0,r.kt)("inlineCode",{parentName:"td"},'"controlchange"'),", etc.), that the specified message must match in order to be forwarded. If this option is not specified, all types of messages will be forwarded. Valid messages are the ones found in either ",(0,r.kt)("a",{parentName:"td",href:"Enumerations#SYSTEM_MESSAGES"},(0,r.kt)("inlineCode",{parentName:"a"},"SYSTEM_MESSAGES"))," or ",(0,r.kt)("a",{parentName:"td",href:"Enumerations#CHANNEL_MESSAGES"},(0,r.kt)("inlineCode",{parentName:"a"},"CHANNEL_MESSAGES")),".")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"[",(0,r.kt)("strong",{parentName:"td"},(0,r.kt)("inlineCode",{parentName:"strong"},"options.channels")),"]"),(0,r.kt)("td",{parentName:"tr",align:null},"number",(0,r.kt)("br",null),"Array.","<","number",">",(0,r.kt)("br",null)),(0,r.kt)("td",{parentName:"tr",align:null},"[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]"),(0,r.kt)("td",{parentName:"tr",align:null},"A MIDI channel number or an array of channel numbers that the message must match in order to be forwarded. By default all MIDI channels are included (",(0,r.kt)("inlineCode",{parentName:"td"},"1")," to ",(0,r.kt)("inlineCode",{parentName:"td"},"16"),")."))))),(0,r.kt)("hr",null),(0,r.kt)("h2",{id:"properties"},"Properties"),(0,r.kt)("h3",{id:"channels"},(0,r.kt)("inlineCode",{parentName:"h3"},".channels")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Type"),": Array.","<","number",">",(0,r.kt)("br",null)),(0,r.kt)("p",null,"An array of MIDI channel numbers that the message must match in order to be forwarded. By\ndefault, this array includes all MIDI channels (",(0,r.kt)("inlineCode",{parentName:"p"},"1")," to ",(0,r.kt)("inlineCode",{parentName:"p"},"16"),")."),(0,r.kt)("h3",{id:"destinations"},(0,r.kt)("inlineCode",{parentName:"h3"},".destinations")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Type"),": Array.","<","Output",">",(0,r.kt)("br",null)),(0,r.kt)("p",null,"An array of ",(0,r.kt)("a",{parentName:"p",href:"Output"},(0,r.kt)("inlineCode",{parentName:"a"},"Output"))," objects to forward the message to."),(0,r.kt)("h3",{id:"suspended"},(0,r.kt)("inlineCode",{parentName:"h3"},".suspended")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Type"),": boolean",(0,r.kt)("br",null)),(0,r.kt)("p",null,"Indicates whether message forwarding is currently suspended or not in this forwarder."),(0,r.kt)("h3",{id:"types"},(0,r.kt)("inlineCode",{parentName:"h3"},".types")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Type"),": Array.","<","string",">",(0,r.kt)("br",null)),(0,r.kt)("p",null,"An array of message types (",(0,r.kt)("inlineCode",{parentName:"p"},'"noteon"'),", ",(0,r.kt)("inlineCode",{parentName:"p"},'"controlchange"'),", etc.) that must be matched in order\nfor messages to be forwarded. By default, this array includes all\n",(0,r.kt)("a",{parentName:"p",href:"Enumerations#SYSTEM_MESSAGES"},(0,r.kt)("inlineCode",{parentName:"a"},"Enumerations.SYSTEM_MESSAGES"))," and\n",(0,r.kt)("a",{parentName:"p",href:"Enumerations#CHANNEL_MESSAGES"},(0,r.kt)("inlineCode",{parentName:"a"},"Enumerations.CHANNEL_MESSAGES")),"."),(0,r.kt)("hr",null),(0,r.kt)("h2",{id:"methods"},"Methods"),(0,r.kt)("h3",{id:"forward"},(0,r.kt)("inlineCode",{parentName:"h3"},".forward(...)")),(0,r.kt)("p",null,"Sends the specified message to the forwarder's destination(s) if it matches the specified\ntype(s) and channel(s)."),(0,r.kt)("p",null,"  ",(0,r.kt)("strong",{parentName:"p"},"Parameters")),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"Signature: ",(0,r.kt)("inlineCode",{parentName:"p"},"forward(message)"))),(0,r.kt)("div",{class:"parameter-table-container"},(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,r.kt)("th",{parentName:"tr",align:null},"Type(s)"),(0,r.kt)("th",{parentName:"tr",align:null},"Default"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("strong",{parentName:"td"},(0,r.kt)("inlineCode",{parentName:"strong"},"message"))),(0,r.kt)("td",{parentName:"tr",align:null},"Message",(0,r.kt)("br",null)),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"The ",(0,r.kt)("a",{parentName:"td",href:"Message"},(0,r.kt)("inlineCode",{parentName:"a"},"Message"))," object to forward."))))))}u.isMDXComponent=!0}}]);