"use strict";(self.webpackChunkdocusaurus=self.webpackChunkdocusaurus||[]).push([[844],{3905:(e,t,a)=>{a.d(t,{Zo:()=>m,kt:()=>c});var i=a(7294);function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function r(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,i)}return a}function o(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?r(Object(a),!0).forEach((function(t){n(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):r(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function s(e,t){if(null==e)return{};var a,i,n=function(e,t){if(null==e)return{};var a,i,n={},r=Object.keys(e);for(i=0;i<r.length;i++)a=r[i],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(i=0;i<r.length;i++)a=r[i],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var p=i.createContext({}),l=function(e){var t=i.useContext(p),a=t;return e&&(a="function"==typeof e?e(t):o(o({},t),e)),a},m=function(e){var t=l(e.components);return i.createElement(p.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},d=i.forwardRef((function(e,t){var a=e.components,n=e.mdxType,r=e.originalType,p=e.parentName,m=s(e,["components","mdxType","originalType","parentName"]),d=l(a),c=n,h=d["".concat(p,".").concat(c)]||d[c]||u[c]||r;return a?i.createElement(h,o(o({ref:t},m),{},{components:a})):i.createElement(h,o({ref:t},m))}));function c(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var r=a.length,o=new Array(r);o[0]=d;var s={};for(var p in t)hasOwnProperty.call(t,p)&&(s[p]=t[p]);s.originalType=e,s.mdxType="string"==typeof e?e:n,o[1]=s;for(var l=2;l<r;l++)o[l]=a[l];return i.createElement.apply(null,o)}return i.createElement.apply(null,a)}d.displayName="MDXCreateElement"},7062:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>p,contentTitle:()=>o,default:()=>u,frontMatter:()=>r,metadata:()=>s,toc:()=>l});var i=a(7462),n=(a(7294),a(3905));const r={sidebar_label:"Under Evaluation",sidebar_position:2},o="Potential Enhancements To Evaluate",s={unversionedId:"roadmap/under-evaluation",id:"roadmap/under-evaluation",title:"Potential Enhancements To Evaluate",description:"The analysis has not started yet. We will wait after the official launch of version 3. We do have a",source:"@site/docs/roadmap/under-evaluation.md",sourceDirName:"roadmap",slug:"/roadmap/under-evaluation",permalink:"/docs/roadmap/under-evaluation",draft:!1,editUrl:"https://github.com/djipco/webmidi/edit/master/website/docs/roadmap/under-evaluation.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_label:"Under Evaluation",sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"Version 3",permalink:"/docs/roadmap/v3"},next:{title:"Version 4",permalink:"/docs/roadmap/v4"}},p={},l=[{value:"Ideas &amp; Suggestions to Evaluate",id:"ideas--suggestions-to-evaluate",level:2},{value:"Enhancements Put On Hold For Now",id:"enhancements-put-on-hold-for-now",level:2}],m={toc:l};function u(e){let{components:t,...a}=e;return(0,n.kt)("wrapper",(0,i.Z)({},m,a,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"potential-enhancements-to-evaluate"},"Potential Enhancements To Evaluate"),(0,n.kt)("p",null,"The analysis has not started yet. We will wait after the official launch of version 3. We do have a\nlot of ideas and suggestions in store. Depending on whether these features break the API or not,\nthey may make it into version 3.x or be deployed in v4."),(0,n.kt)("admonition",{type:"info"},(0,n.kt)("p",{parentName:"admonition"},"If you have suggestions, please post them for discussion to the\n",(0,n.kt)("a",{parentName:"p",href:"https://github.com/djipco/webmidi/discussions/categories/feature-requests"},"Feature Request"),"\ncategory of our GitHub Discussions.")),(0,n.kt)("h2",{id:"ideas--suggestions-to-evaluate"},"Ideas & Suggestions to Evaluate"),(0,n.kt)("p",null,"If you feel any of these ideas should be given priority, plese explain why in the\n",(0,n.kt)("a",{parentName:"p",href:"https://github.com/djipco/webmidi/discussions/categories/feature-requests"},"Feature Request"),"\ncategory of our GitHub Discussions so I can properly triage them."),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"Add support for Web BLE MIDI (",(0,n.kt)("a",{parentName:"p",href:"https://github.com/skratchdot/ble-midi"},"browser implementation"),",\n",(0,n.kt)("a",{parentName:"p",href:"https://github.com/natcl/ble-midi"},"Node implementation"),")")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"Explore compatibility with WebMidiLink. Could we create an output that points to a WebMidiLinked\ndevice?")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"Could we allow ",(0,n.kt)("inlineCode",{parentName:"p"},"WebMidi.time")," to be reset? (see\n",(0,n.kt)("a",{parentName:"p",href:"https://github.com/djipco/webmidi/discussions/213"},"discussion #213"),")")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"Add throttling or delay option to ",(0,n.kt)("inlineCode",{parentName:"p"},"sendSysex")," (see discussion\n",(0,n.kt)("a",{parentName:"p",href:"https://github.com/djipco/webmidi/discussions/235"},"#235"),").")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"Calculate BPM from clock messages\n(",(0,n.kt)("a",{parentName:"p",href:"https://github.com/djipco/webmidi/discussions/177"},"Discussion #177"),")")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"Allow the first argument of ",(0,n.kt)("inlineCode",{parentName:"p"},"output.playNote( )")," to be \u20180:0\u2019 as \u2018A0\u2019, \u20187:3\u2019 as \u2018E:3\u2019 and so on.")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},'Add a "mute" option for inputs/outputs')),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"Include the ability to add MIDI event listeners at the WebMidi.js level\n(",(0,n.kt)("a",{parentName:"p",href:"https://github.com/djipco/webmidi/issues/138"},"Issue #138"),")")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"Emit events on ",(0,n.kt)("inlineCode",{parentName:"p"},"send()")," so outbound MIDI messages can be listened for\n(",(0,n.kt)("a",{parentName:"p",href:"https://github.com/djipco/webmidi/discussions/171"},"Discussion #171"),")")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"Add a ",(0,n.kt)("inlineCode",{parentName:"p"},"stopAllNotes()")," method")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"Calculate time values and make them directly available for ",(0,n.kt)("inlineCode",{parentName:"p"},"songposition")," and ",(0,n.kt)("inlineCode",{parentName:"p"},"timecode")," message")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"Make Istanbul (nyc) break down the coverage stats by test file.")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"Add the ability to send grouped messages for CC events (and potentially others)")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"Add expliocit support for\n",(0,n.kt)("a",{parentName:"p",href:"https://www.midi.org/midi-articles/midi-polyphonic-expression-mpe"},"MIDI Polyphonic Expressions"),".")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"Add explicit support for\n",(0,n.kt)("a",{parentName:"p",href:"https://www.midi.org/specifications-old/item/table-4-universal-system-exclusive-messages"},"Universal System Exclusive Messages")),(0,n.kt)("ul",{parentName:"li"},(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"This would include a ",(0,n.kt)("inlineCode",{parentName:"p"},"sendIdentityRequest()")," method to the output object (perhaps with a\n",(0,n.kt)("inlineCode",{parentName:"p"},"getIdentity()")," companion method that waits for the response) (",(0,n.kt)("a",{parentName:"p",href:"https://github.com/djipco/webmidi/issues/117"},"Issue #117"),")")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"This could also include the capability to query device for make/model (similar to\n",(0,n.kt)("a",{parentName:"p",href:"https://www.npmjs.com/package/jzz-midi-gear"},"jzz-midi-gear"),")")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"Implement show control protocol subset")))),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"Add ability to inject Jazz-Plugin code for browsers with no native Web MIDI API support.")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"Add the option to create sysex plugins for various devices\n",(0,n.kt)("a",{parentName:"p",href:"https://webmidijs.org/forum/discussion/comment/97#Comment_97"},"forum thread"))),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"Add\n",(0,n.kt)("a",{parentName:"p",href:"https://help.github.com/en/github/building-a-strong-community/about-issue-and-pull-request-templates"},"issue and PR templates"))),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"Add continuous integration tool")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"Add ability to read/write MIDI files")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"Solid timing, midi clock, sync, transport functionality")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"Helper functions that help to deal with sysex checksum from specific manufacturer (Roland,\nchecksum, etc.)")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"Add explicit support for Sample Dump Format (see discussion on\n",(0,n.kt)("a",{parentName:"p",href:"https://webmidijs.org/forum/discussion/30/has-there-been-any-work-on-sample-dump-standard"},"forum"),")")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"Allow third-party developers to develop modules that facilitate encoding and decoding of\ndevice-specific sysex messages (see ",(0,n.kt)("a",{parentName:"p",href:"https://webmidijs.org/forum/discussion/37/"},"forum discussion"),")")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"Add timing capabilities such as syncing with Tone.js or being able to schedule events using\nmusical notes.")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"Add the ability to export a MIDI file (perhaps with another lib such as\n",(0,n.kt)("a",{parentName:"p",href:"https://www.npmjs.com/package/midi-writer-js"},"MidiWriterJS")," or\n",(0,n.kt)("a",{parentName:"p",href:"https://jazz-soft.net/demo/WriteMidiFile.html"},"Jazz-Soft"))),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"SMF Support")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"Check if something specific needs to be done to support Electron\n(",(0,n.kt)("a",{parentName:"p",href:"https://www.electronjs.org/docs/api/session#sessetpermissionrequesthandlerhandler"},"this discussion"),").")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"Evaluate whether if would be worth it to switch from the ",(0,n.kt)("inlineCode",{parentName:"p"},"midi")," module to the ",(0,n.kt)("inlineCode",{parentName:"p"},"web-midi-test"),"\nmodule for unit tests (discussion ",(0,n.kt)("a",{parentName:"p",href:"https://github.com/djipco/webmidi/discussions/223"},"here"),")."))),(0,n.kt)("h2",{id:"enhancements-put-on-hold-for-now"},"Enhancements Put On Hold For Now"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"Consider usage of\n",(0,n.kt)("a",{parentName:"p",href:"https://github.com/tc39/proposal-pipeline-operator/blob/master/README.md#introduction"},"pipelining operator"),"\nfor patching webmidi function calls to a sequence\n")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"Consider using ",(0,n.kt)("a",{parentName:"p",href:"https://github.com/unbug/js-middleware"},"middleware")," approach for making the app\npluggable")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"Investigate the possibility to add a ",(0,n.kt)("inlineCode",{parentName:"p"},"Device")," object that would group inputs and outputs for a\nsingle device (see ",(0,n.kt)("a",{parentName:"p",href:"https://github.com/djipco/webmidi/discussions/280"},"discussion #280")," for\ndetails)")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("p",{parentName:"li"},"Piano roll"))))}u.isMDXComponent=!0}}]);