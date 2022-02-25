"use strict";(self.webpackChunkdocusaurus=self.webpackChunkdocusaurus||[]).push([[1521],{3905:function(e,t,n){n.d(t,{Zo:function(){return u},kt:function(){return h}});var a=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var l=a.createContext({}),p=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},u=function(e){var t=p(e.components);return a.createElement(l.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,r=e.originalType,l=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),m=p(n),h=i,d=m["".concat(l,".").concat(h)]||m[h]||c[h]||r;return n?a.createElement(d,o(o({ref:t},u),{},{components:n})):a.createElement(d,o({ref:t},u))}));function h(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var r=n.length,o=new Array(r);o[0]=m;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:i,o[1]=s;for(var p=2;p<r;p++)o[p]=n[p];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},8698:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return s},contentTitle:function(){return l},metadata:function(){return p},toc:function(){return u},default:function(){return m}});var a=n(7462),i=n(3366),r=(n(7294),n(3905)),o=["components"],s={sidebar_position:1,slug:"/migration"},l="Migration",p={unversionedId:"migration/migration",id:"migration/migration",title:"Migration",description:"This document is a work in progress. Your feedback is critical in identifying and, hopefully,",source:"@site/docs/migration/migration.md",sourceDirName:"migration",slug:"/migration",permalink:"/docs/migration",editUrl:"https://github.com/djipco/webmidi/edit/master/website/docs/migration/migration.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1,slug:"/migration"},sidebar:"tutorialSidebar",previous:{title:"TypeScript",permalink:"/docs/going-further/typescript"},next:{title:"Version 2.5.3",permalink:"/docs/archives/v2"}},u=[{value:"Highlights of the New Version",id:"highlights-of-the-new-version",children:[],level:2},{value:"Backwards Compatibility",id:"backwards-compatibility",children:[],level:2},{value:"Architecture Change",id:"architecture-change",children:[],level:2},{value:"Things to Watch Out For",id:"things-to-watch-out-for",children:[{value:"The <code>WebMidi.enable()</code> method now returns a promise",id:"the-webmidienable-method-now-returns-a-promise",children:[],level:3}],level:2}],c={toc:u};function m(e){var t=e.components,n=(0,i.Z)(e,o);return(0,r.kt)("wrapper",(0,a.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"migration"},"Migration"),(0,r.kt)("div",{className:"admonition admonition-caution alert alert--warning"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 16 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"}))),"caution")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},"This document is a work in progress. Your feedback is critical in identifying and, hopefully,\nmitigating migration pitfalls. \ud83d\ude4f\ud83c\udffb Please ",(0,r.kt)("strong",{parentName:"p"},"share your observations, suggestions and issues")," in the\n",(0,r.kt)("a",{parentName:"p",href:"https://github.com/djipco/webmidi/discussions/categories/migration"},(0,r.kt)("strong",{parentName:"a"},"Migration"))," section of the forum\nso they can benefit others! "))),(0,r.kt)("h2",{id:"highlights-of-the-new-version"},"Highlights of the New Version"),(0,r.kt)("p",null,"Version 3.x is a ",(0,r.kt)("strong",{parentName:"p"},"major")," update. It moves WEBMIDI.js from a smallish hobby project to a more\nserious long-term endeavour. Here are some key highlights:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Modern architecture with ",(0,r.kt)("strong",{parentName:"li"},"ESM")," (ECMAScript module), ",(0,r.kt)("strong",{parentName:"li"},"IIFE")," (Immediately Invoked Function\nExpression) and ",(0,r.kt)("strong",{parentName:"li"},"CJS")," (CommonJS) flavours"),(0,r.kt)("li",{parentName:"ul"},"Full ",(0,r.kt)("strong",{parentName:"li"},"Node.js")," support"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"TypeScript")," definitions files"),(0,r.kt)("li",{parentName:"ul"},"Various ",(0,r.kt)("strong",{parentName:"li"},"new objects"),":",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"../api/classes/InputChannel"},(0,r.kt)("inlineCode",{parentName:"a"},"InputChannel"))," and ",(0,r.kt)("a",{parentName:"li",href:"../api/classes/OutputChannel"},(0,r.kt)("inlineCode",{parentName:"a"},"OutputChannel")),"\nobjects to communicate with a single MIDI channel"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"../api/classes/Note"},(0,r.kt)("inlineCode",{parentName:"a"},"Note"))," object to store and pass around note information"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"../api/classes/Message"},(0,r.kt)("inlineCode",{parentName:"a"},"Message"))," object to better encapsulate MIDI messages"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"../api/classes/Forwarder"},(0,r.kt)("inlineCode",{parentName:"a"},"Forwarder"))," object to allow message forwarding from an input to an output"),(0,r.kt)("li",{parentName:"ul"},"and others..."))),(0,r.kt)("li",{parentName:"ul"},"More and better ",(0,r.kt)("strong",{parentName:"li"},"unit tests")," to prevent regression issues"),(0,r.kt)("li",{parentName:"ul"},"Support for ",(0,r.kt)("strong",{parentName:"li"},"promises")," where appropriate (such as\n",(0,r.kt)("a",{parentName:"li",href:"../api/classes/WebMidi#enable"},(0,r.kt)("inlineCode",{parentName:"a"},"WebMidi.enable()")),")"),(0,r.kt)("li",{parentName:"ul"},"More granular ",(0,r.kt)("strong",{parentName:"li"},"events"),". For example:",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"midiaccessgranted")," to know when a user clicked the MIDI authorization prompt"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"controlchange-controllerXXX")," to listen to a single type of control change message"),(0,r.kt)("li",{parentName:"ul"},"and various others..."))),(0,r.kt)("li",{parentName:"ul"},"Ability to query ",(0,r.kt)("strong",{parentName:"li"},"current note state")," (currently playing or not) with\n",(0,r.kt)("a",{parentName:"li",href:"../api/classes/InputChannel#getNoteState"},(0,r.kt)("inlineCode",{parentName:"a"},"InputChannel.getNoteState()")),"\nand ",(0,r.kt)("a",{parentName:"li",href:"../api/classes/InputChannel#notesState"},(0,r.kt)("inlineCode",{parentName:"a"},"InputChannel.notesState"))," array"),(0,r.kt)("li",{parentName:"ul"},"Ability to unplug and replug a device while ",(0,r.kt)("strong",{parentName:"li"},"retaining its state")),(0,r.kt)("li",{parentName:"ul"},"Better ",(0,r.kt)("strong",{parentName:"li"},"sysex")," (system exclusive) message support"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Octave transposition")," can be performed at the global, input/output or channel level"),(0,r.kt)("li",{parentName:"ul"},"and so much more!")),(0,r.kt)("h2",{id:"backwards-compatibility"},"Backwards Compatibility"),(0,r.kt)("p",null,"Backwards compatibility was a major concern while developing the new version. While every effort\nhas been made to ease the transition, the new version might break a few things, mostly in edge\ncases."),(0,r.kt)("p",null,"Whenever it was possible, we deprecated old practices instead of completely dropping support. This\nmeans that your code should continue to work but you may see warnings in the console about the new\nways to do things."),(0,r.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"info")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},"If you expected certain things to keep working after upgrade and they don't, please reach out in the\n",(0,r.kt)("a",{parentName:"p",href:"https://github.com/djipco/webmidi/discussions/categories/migration"},(0,r.kt)("strong",{parentName:"a"},"Migration"))," section of the\nforum so whe can assess if the behaviour is expected or not and troubleshoot from there."))),(0,r.kt)("h2",{id:"architecture-change"},"Architecture Change"),(0,r.kt)("p",null,"In v2, there was a top-level ",(0,r.kt)("inlineCode",{parentName:"p"},"WebMidi")," object that provided access to a list of inputs and outputs.\nMost of the activity happened at the ",(0,r.kt)("inlineCode",{parentName:"p"},"Input")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"Output")," level. This is where you would listen for\ninbound messages and send outbound messages."),(0,r.kt)("p",null,"For example, if you wanted to listen for a message on a single MIDI channel, you would have\nspecified it in the call to ",(0,r.kt)("inlineCode",{parentName:"p"},"addListener()")," in this manner:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-javascript"},'// In WebMidi.js version 2.5.x\nWebMidi.inputs[0].addListener("noteon", 7, someFunction);\n')),(0,r.kt)("p",null,"This would listen for ",(0,r.kt)("strong",{parentName:"p"},"noteon")," events on MIDI channel 7 of input 0. ",(0,r.kt)("strong",{parentName:"p"},"While this still works in\nv3"),", the preferred syntax would be: "),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-javascript"},'WebMidi.inputs[0].addListener("noteon", someFunction, {channels: [7]});\n')),(0,r.kt)("p",null,"You may think (rightly so!) that this syntax is more cumbersome. The reasoning is that, if you want\nto listen to events on a single channel, you should do so on the channel itself\n(the new ",(0,r.kt)("a",{parentName:"p",href:"../api/classes/InputChannel"},(0,r.kt)("inlineCode",{parentName:"a"},"InputChannel"))," object):"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-javascript"},'WebMidi.inputs[0].channels[7].addListener("noteon", someFunction);\n')),(0,r.kt)("p",null,"Here, ",(0,r.kt)("inlineCode",{parentName:"p"},"WebMidi.inputs[0].channels[7]")," refers to an\n",(0,r.kt)("a",{parentName:"p",href:"../api/classes/InputChannel"},(0,r.kt)("inlineCode",{parentName:"a"},"InputChannel"))," object that has, for the most part, the same methods\nas the ",(0,r.kt)("a",{parentName:"p",href:"../api/classes/Input"},(0,r.kt)("inlineCode",{parentName:"a"},"Input"))," object you were used to in v2.5.x."),(0,r.kt)("p",null,"So, the idea is to use the ",(0,r.kt)("a",{parentName:"p",href:"../api/classes/Input"},(0,r.kt)("inlineCode",{parentName:"a"},"Input"))," object if you need to listen to events on\nmore than one channel and to use the ",(0,r.kt)("a",{parentName:"p",href:"../api/classes/InputChannel"},(0,r.kt)("inlineCode",{parentName:"a"},"InputChannel"))," object to listen\nfor events dispatched by a single channel."),(0,r.kt)("p",null,"The exact same logic applies to the ",(0,r.kt)("a",{parentName:"p",href:"../api/classes/Output"},(0,r.kt)("inlineCode",{parentName:"a"},"Output"))," and\n",(0,r.kt)("a",{parentName:"p",href:"../api/classes/OutputChannel"},(0,r.kt)("inlineCode",{parentName:"a"},"OutputChannel"))," objects. For example, if you want to send a\n",(0,r.kt)("strong",{parentName:"p"},"controlchange")," message to all channels of an output, you can use:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-javascript"},'WebMidi.outputs[0].sendControlChange("resonance", 123);\n')),(0,r.kt)("p",null,"To send to multiple, but specific, channels, you can use:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-javascript"},'WebMidi.outputs[0].sendControlChange("resonance", 123, {channels: [1, 2, 3]});\n')),(0,r.kt)("p",null,"To send the message to a single channel (e.g. 7), you would use:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-javascript"},'WebMidi.outputs[0].channels[7].sendControlChange("resonance", 123);\n')),(0,r.kt)("p",null,"In the end, the idea is to target specifically what is appropriate. Therefore, a more idiomatic\nsnippet would be something like this:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-javascript"},'const output = WebMidi.getOutputByName("My Awesome Midi Device");\nconst synth = output.channels[10];\nsynth.playNote("A4");\n')),(0,r.kt)("p",null,"Having said all that, let me reiterate that ",(0,r.kt)("strong",{parentName:"p"},"the previous way of doing things will still work in\nv3"),". This will give you a chance to smoothly transition to the new version."),(0,r.kt)("p",null,"Let's recap. In v3, there is a top-level ",(0,r.kt)("a",{parentName:"p",href:"../api/classes/WebMidi"},(0,r.kt)("inlineCode",{parentName:"a"},"WebMidi"))," object which has both\nan ",(0,r.kt)("a",{parentName:"p",href:"../api/classes/WebMidi#inputs"},(0,r.kt)("inlineCode",{parentName:"a"},"inputs"))," and an ",(0,r.kt)("a",{parentName:"p",href:"../api/classes/WebMidi#outputs"},(0,r.kt)("inlineCode",{parentName:"a"},"outputs")),"\narray. These arrays contain, respectively, a list ",(0,r.kt)("a",{parentName:"p",href:"../api/classes/Input"},(0,r.kt)("inlineCode",{parentName:"a"},"Input"))," and\n",(0,r.kt)("a",{parentName:"p",href:"../api/classes/Output"},(0,r.kt)("inlineCode",{parentName:"a"},"Output"))," objects. The ",(0,r.kt)("a",{parentName:"p",href:"../api/classes/Input"},(0,r.kt)("inlineCode",{parentName:"a"},"Input"))," and\n",(0,r.kt)("a",{parentName:"p",href:"../api/classes/Output"},(0,r.kt)("inlineCode",{parentName:"a"},"Output")),"  objects have a ",(0,r.kt)("inlineCode",{parentName:"p"},"channels")," array that contains a list of\n",(0,r.kt)("a",{parentName:"p",href:"../api/classes/InputChannel"},(0,r.kt)("inlineCode",{parentName:"a"},"InputChannel"))," or ",(0,r.kt)("a",{parentName:"p",href:"../api/classes/OutputChannel"},(0,r.kt)("inlineCode",{parentName:"a"},"OutputChannel")),"\nobjects."),(0,r.kt)("h2",{id:"things-to-watch-out-for"},"Things to Watch Out For"),(0,r.kt)("h3",{id:"the-webmidienable-method-now-returns-a-promise"},"The ",(0,r.kt)("inlineCode",{parentName:"h3"},"WebMidi.enable()")," method now returns a promise"),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"You can still use a callback")," with ",(0,r.kt)("a",{parentName:"p",href:"../api/classes/WebMidi#enable"},(0,r.kt)("inlineCode",{parentName:"a"},"WebMidi.enable()"))," and it\nwill work just like before. However, you are now welcome to use the promise-based approach:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-javascript"},'WebMidi.enable().then(() => {\n  console.log("WebMidi.js has been enabled!");\n})\n')))}m.isMDXComponent=!0}}]);