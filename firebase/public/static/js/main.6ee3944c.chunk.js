(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{291:function(e,t,a){e.exports=a.p+"static/media/kiwi.a0352b91.png"},292:function(e,t,a){e.exports=a.p+"static/media/komodo.93a84db4.png"},293:function(e,t,a){e.exports=a.p+"static/media/trex.6e57b2ee.png"},303:function(e,t,a){e.exports=a(744)},307:function(e,t,a){},424:function(e,t,a){},482:function(e,t){},488:function(e,t){},489:function(e,t){},742:function(e,t,a){},744:function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),r=a(66),l=a(13),o=a.n(l),s=(a(307),a(38)),c=a(39),m=a(41),p=a(40),u=a(42),h=a(67),d=a(33),f=a(302),g=a.n(f),v=a(28),b=a(278),w=a.n(b),S=a(288),E=a.n(S),k=a(289),y=a.n(k),x=a(290),O=a.n(x),j=a(81),C=a.n(j),T=a(31),N=a.n(T),z=a(287),M=a.n(z),P=a(182),I=a.n(P),W=a(283),D=a.n(W),L=a(183),U=a.n(L),B=a(285),H=a.n(B),R=a(286),A=a.n(R),F=a(281),_=a.n(F),Y=a(279),G=a.n(Y),V=a(282),J=a.n(V),q=[{text:"Home",icon:i.a.createElement(G.a,null),link:"/",divider:!0},{text:"Ulam Spirals",icon:i.a.createElement(_.a,null),link:"/primeulam"},{text:"UT Tower Bot",icon:i.a.createElement(J.a,null),link:"/uttower"}];var K=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(m.a)(this,Object(p.a)(t).call(this,e))).state={open:!1},a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"componentWillUpdate",value:function(e,t){this.state.open!==e.opened&&this.setState({open:e.opened})}},{key:"toggle",value:function(e){var t=this;return function(){return t.setState({open:e})}}},{key:"render",value:function(){var e=this.props.classes,t=i.a.createElement("div",{className:e.list},i.a.createElement(I.a,null,q.map(function(e){var t=e.divider?i.a.createElement(D.a,null):null;return i.a.createElement(r.b,{to:e.link,key:e.text},i.a.createElement(U.a,{button:!0},i.a.createElement(H.a,null,e.icon),i.a.createElement(A.a,{primary:e.text})),t)})));return i.a.createElement("div",null,i.a.createElement(M.a,{open:this.state.open,onClose:this.toggle(!1)},i.a.createElement("div",{tabIndex:0,role:"button",onClick:this.toggle(!1),onKeyDown:this.toggle(!1)},t)))}}]),t}(i.a.Component),$=Object(d.withStyles)({list:{minWidth:"calc(10ch + 10vw)",maxWidth:"calc(20ch + 10vw)"}})(K),Q=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(m.a)(this,Object(p.a)(t).call(this,e))).openDrawer=a.openDrawer.bind(Object(v.a)(Object(v.a)(a))),a.state={drawerOpen:!1,shouldShow:null},a.lastScroll=null,a.handleScroll=w.a.throttle(a.handleScroll.bind(Object(v.a)(Object(v.a)(a))),100),a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){window.addEventListener("scroll",this.handleScroll,{passive:!0})}},{key:"componentWillUnmount",value:function(){window.removeEventListener("scroll",this.handleScroll)}},{key:"handleScroll",value:function(e){var t=window.scrollY;if(t!==this.lastScroll){var a=null!==this.lastScroll?t<this.lastScroll:null;a!==this.state.shouldShow&&this.setState(function(e,t){return{drawerOpen:!1,shouldShow:a}}),this.lastScroll=t}}},{key:"openDrawer",value:function(){this.setState({drawerOpen:!0})}},{key:"render",value:function(){var e=this.props.classes,t="".concat(e.bar," ").concat(null===this.state.shouldShow?"":this.state.shouldShow?e.show:e.hide);return i.a.createElement(E.a,{position:"static",color:"primary",className:t},i.a.createElement(y.a,null,i.a.createElement(C.a,{className:e.menuButton,"aria-label":"Open drawer",onClick:this.openDrawer},i.a.createElement(O.a,null)),i.a.createElement(r.b,{to:"/",style:{textDecoration:"none"}},i.a.createElement(N.a,{variant:"h5"},"reatret.net"))),i.a.createElement($,{opened:this.state.drawerOpen}))}}]),t}(n.Component),X=Object(d.withStyles)(function(e){return{menuButton:{marginLeft:-12,marginRight:20},bar:{marginBottom:"0vw",position:"sticky",top:0},show:{transform:"translateY(0)",transition:"transform ".concat(.4,"s")},hide:{transform:"translateY(-110%)",transition:"transform ".concat(.4,"s")}}})(Q),Z=a(291),ee=a.n(Z),te=a(292),ae=a.n(te),ne=a(293),ie=a.n(ne),re=a(126),le=a.n(re),oe=a(127),se=a.n(oe),ce=a(298),me=a.n(ce),pe=a(128),ue=a.n(pe),he=a(184),de=a.n(he),fe=a(296),ge=a.n(fe),ve=a(297),be=a.n(ve),we=a(294),Se=a.n(we),Ee=a(295),ke=a.n(Ee),ye=(a(424),[{name:"Gitlab",link:"https://gitlab.com/danielloera",icon:i.a.createElement(Se.a,{fontSize:"large"})},{name:"Resume",link:"https://docs.google.com/document/d/18sWdFkdfeEGWD7KpvNJ7I25CUm_n0n1hrINJsOv3VzA",icon:i.a.createElement(ke.a,{fontSize:"large"})}]),xe=[ee.a,ae.a,ie.a],Oe=0,je=1;function Ce(e,t,a,n,r){return i.a.createElement(le.a,{anchorOrigin:{vertical:e,horizontal:t},open:n,autoHideDuration:3e3,onClose:r,ContentProps:{"aria-describedby":"message-id"},message:i.a.createElement("span",{id:"message-id"},a)})}function Te(e,t){return[i.a.createElement(C.a,{key:"".concat(e,"1"),"aria-label":"".concat(e," Slower"),onClick:t(je)},i.a.createElement(ge.a,null)),i.a.createElement(N.a,{key:"".concat(e,"2")},e),i.a.createElement(C.a,{key:"".concat(e,"3"),"aria-label":"".concat(e," Faster"),onClick:t(Oe)},i.a.createElement(be.a,null))]}var Ne=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(m.a)(this,Object(p.a)(t).call(this,e))).defaultSpin=3,a.defaultSwap=3e3,a.state={imgIdx:Math.trunc(Math.random()*xe.length),spinSpeed:a.defaultSpin,swapSpeed:a.defaultSwap,swapSnack:!1,spinSnack:!1,swapMsg:"",spinMsg:""},a.imgTick=a.imgTick.bind(Object(v.a)(Object(v.a)(a))),a.spin=a.spin.bind(Object(v.a)(Object(v.a)(a))),a.swap=a.swap.bind(Object(v.a)(Object(v.a)(a))),a.reset=a.reset.bind(Object(v.a)(Object(v.a)(a))),a.swapTimer=setInterval(a.imgTick,a.state.swapSpeed),a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"componentWillUnmount",value:function(){clearInterval(this.swapTimer)}},{key:"imgTick",value:function(){if(null!=this.state){var e=this.state.imgIdx+1;e===xe.length&&(e=0),this.setState({imgIdx:e})}}},{key:"reset",value:function(){var e=this;clearInterval(this.swapTimer),this.setState({spinSpeed:this.defaultSpin,swapSpeed:this.defaultSwap,spinMsg:"Spinning and swapping every ".concat(this.defaultSpin,"s"),spinSnack:!0},function(t){e.swapTimer=setInterval(e.imgTick,e.defaultSwap)})}},{key:"spin",value:function(e){var t=this;return function(){var a=t.state.spinSpeed,n=null;n=e===Oe?a/2:2*a,t.setState({spinSpeed:n,spinMsg:"Spinning every ".concat(n,"s"),spinSnack:!0})}}},{key:"swap",value:function(e){var t=this;return function(){var a=t.state.swapSpeed,n=null;n=e===Oe?a/2:2*a,clearInterval(t.swapTimer),t.setState({swapSpeed:n,swapMsg:"Swapping every ".concat(n/1e3,"s"),swapSnack:!0},function(e){t.swapTimer=setInterval(t.imgTick,n)})}}},{key:"render",value:function(){var e=this,t=this.props.classes,a=this.state,n=a.imgIdx,r=a.spinSpeed,l=a.swapMsg,o=a.spinMsg,s=a.spinSnack,c=a.swapSnack,m=xe[n],p={animation:"App-logo-spin infinite ".concat(r,"s linear"),cursor:"pointer"};return i.a.createElement("div",{className:"Home"},Ce("bottom","left",o,s,function(){e.setState({spinSnack:!1})}),Ce("bottom","right",l,c,function(){e.setState({swapSnack:!1})}),i.a.createElement("img",{src:m,className:"Spinning-Image",alt:"logo",style:p}),i.a.createElement(se.a,{className:t.card,elevation:5},i.a.createElement(ue.a,null,i.a.createElement(N.a,{component:"p"},"Hi, I'm Daniel. I love making things.",i.a.createElement("br",null),"You can see some of them on this site or linked below.",i.a.createElement("br",null),"Have fun ",i.a.createElement("i",null,"spinning"),".")),i.a.createElement(me.a,{style:{justifyContent:"center"}},Te("Spin",this.spin),i.a.createElement(de.a,{size:"small",variant:"contained",color:"secondary",onClick:this.reset},"Reset"),Te("Swap",this.swap))),i.a.createElement("div",{className:t.bottomLinks},ye.map(function(e){return i.a.createElement("span",{key:e.name,style:{display:"inline-block"}},i.a.createElement("a",{href:e.link},i.a.createElement(C.a,{"aria-label":e.name},e.icon),i.a.createElement("div",null,i.a.createElement(N.a,null,e.name))))})))}}]),t}(n.Component),ze=Object(d.withStyles)({card:{minWidth:"30vh",maxWidth:"90vw",padding:".5em"},bottomLinks:{marginTop:"2vh"}})(Ne),Me=a(190),Pe=a(68),Ie=a(188),We=a.n(Ie),De=a(186),Le=a.n(De),Ue=a(130),Be=a.n(Ue),He=a(187),Re=a.n(He),Ae=a(185),Fe=a.n(Ae),_e=a(192),Ye=a(191),Ge=a.n(Ye),Ve=(a(740),_e.a.createSliderWithTooltip(_e.a)),Je=.8,qe="Rendering...",Ke=0;function $e(e){var t=Math.ceil((Math.sqrt(e)-1)/2),a=2*t+1,n=Math.pow(a,2);return e>=n-(a-=1)?{x:t-(n-e),y:t}:e>=(n-=a)-a?{x:-t,y:t-(n-e)}:e>=(n-=a)-a?{x:n-e-t,y:-t}:{x:t,y:n-e-a-t}}var Qe=[{name:"Grid\xa0Size\xa0(NxN)",id:"primeSize",min:5,max:1001},{name:"Shape\xa0Size",id:"shapeSize",min:1,max:100},{name:"Starting\xa0Number",id:"start",min:1,max:500}];var Xe=function(e){function t(e){var a;Object(s.a)(this,t),a=Object(m.a)(this,Object(p.a)(t).call(this,e));var n=Math.trunc(Math.min(window.innerWidth,window.innerHeight)*Je);return a.board=null,a.prevPrimes=null,a.backgroundRect=null,a.maxPrimeSize=101,a.maxStart=1,a.state={spiral:null,bgColor:"white",color:"black",shape:Ke,shapeSize:5,start:1,stageSize:n,primeSize:101,primes:null,notify:!1,msg:""},a.handleSlider=a.handleSlider.bind(Object(v.a)(Object(v.a)(a))),a.makeSpiral=a.makeSpiral.bind(Object(v.a)(Object(v.a)(a))),a.layer=null,a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"notify",value:function(e,t){this.setState({msg:e,notify:!0},t)}},{key:"componentDidMount",value:function(){var e=this.state,t=e.primeSize,a=e.start;this.updatePrimes(Math.pow(t+a,2))}},{key:"componentDidUpdate",value:function(e,t){var a=this,n=this.state,i=n.primeSize,r=n.start,l=n.shapeSize;if(i!==t.primeSize)if(this.maxPrimeSize<i){this.maxPrimeSize=i;var o=Math.pow(i+r,2);this.updatePrimes(o)}else this.notify(qe,this.makeSpiral);if(r&&r!==t.start){var s=Math.pow(this.maxPrimeSize+r,2);Math.pow(this.maxPrimeSize+this.maxStart,2)<s?(this.maxStart=r,this.updatePrimes(s)):this.notify(qe,function(e){a.makeSpiral(!1,!0)})}l!==t.shapeSize&&this.notify(qe,this.makeSpiral)}},{key:"updatePrimes",value:function(e){var t=this,a=Fe.a.spawn(function(e,t){t({ps:function(e,t){var a=null,n=0;if(t&&t.length<e){a=t;var i=t.length;n=i;for(var r=e-i,l=0;l<r;l++)a.push(!0)}else(a=Array(e))[0]=!1,a[1]=!1,a.fill(!0,2,e);for(var o=new Set([]),s=n;s<a.length;s++)if(a[s]){o.add(s);for(var c=s*s;c<e;c+=s)a[c]=!1}return{primes:o,prevData:a}}(e.limit,e.prevPrimes)})});this.notify("Calculating Primes..."),a.send({limit:e,prevPrimes:this.prevPrimes}).on("message",function(e){t.prevPrimes=e.ps.data,t.setState({primes:e.ps.primes},function(e){t.makeSpiral(!0)})})}},{key:"makeSpiral",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],a=this.state,n=a.start,r=a.primeSize,l=a.stageSize,o=a.shapeSize,s=a.shape,c=a.color,m=a.primes;if(!l||!r||!n||!o)return null;var p=Math.ceil(l/r);if(e){this.board=[];for(var u=0;u<r;u++){var h=Array(r);this.board.push(h)}}(e||t)&&function(e,t){for(var a=Math.pow(e.length,2),n=e.length,i=n/2,r=n%2===0?Math.ceil(i)-1:Math.floor(i),l=1;l<=a;l++){var o=$e(l);e[o.x+r][o.y+r]=t,t+=1}}(this.board,n);var d=[],f=null;switch(!0){case 2===s:f=Pe.RegularPolygon;break;case 1===s:f=Pe.Rect;break;default:f=Pe.Circle}for(var g=0;g<r;g++)for(var v=0;v<r;v++)if(m.has(this.board[g][v])){var b=g*p,w=v*p,S="".concat(g," ").concat(v),E=i.a.createElement(f,{key:S,x:b,y:w,sides:3,radius:o,width:o,height:o,fill:c,listening:!1,perfectDrawEnabled:!1});d.push(E)}this.setState({spiral:d})}},{key:"handleSlider",value:function(e){var t=this;return function(a){t.setState(Object(Me.a)({},e,a))}}},{key:"render",value:function(){var e=this,t=this.props.classes,a=this.state,n=a.stageSize,r=a.primeSize,l=a.shapeSize,o=a.start,s=a.notify,c=a.msg,m=a.spiral,p=a.color,u=a.bgColor,h=[r,l,o];return this.layer&&this.layer.batchDraw(),i.a.createElement("div",{className:t.title},i.a.createElement(N.a,{align:"center",variant:"h5"}," Ulam Spiral Generator"),i.a.createElement(le.a,{anchorOrigin:{vertical:"bottom",horizontal:"left"},open:s,autoHideDuration:2e3,onClose:function(){e.setState({notify:!1})},ContentProps:{"aria-describedby":"message-id"},message:i.a.createElement("span",{id:"message-id"},c)}),i.a.createElement("div",{className:t.root},i.a.createElement(Pe.Stage,{className:t.stage,width:n,height:n},i.a.createElement(Pe.FastLayer,{ref:function(t){return e.layer=t}},i.a.createElement(Pe.Rect,{x:0,y:0,width:n,height:n,fill:u,shadowBlur:5}),m))),i.a.createElement("div",{className:t.cardHolder},i.a.createElement(se.a,{className:t.card,elevation:4},i.a.createElement(ue.a,null,i.a.createElement(N.a,{className:t.controlsLabel,variant:"h6"},"Controls"),i.a.createElement("form",{className:t.controls,noValidate:!0,autoComplete:"off"},function(e,t,a,n){for(var r=[],l=0;l<e.length;l++){var o=e[l],s=t[l];r.push(i.a.createElement("div",{className:a.sliderField,key:o.name,id:o.name},i.a.createElement(N.a,{align:"left",className:a.slideLabel,color:"textSecondary"},"".concat(o.name,":\xa0").concat(s)),i.a.createElement(Ve,{handleStyle:{backgroundColor:"#ff80ab",borderColor:"#ff80ab"},trackStyle:{backgroundColor:"#ff80ab",borderColor:"#ff80ab"},className:a.slider,min:o.min,max:o.max,step:1,defaultValue:s,onAfterChange:n(o.id)})))}return r}(Qe,h,t,this.handleSlider),i.a.createElement("div",{className:t.cPickers},i.a.createElement("span",{className:t.colorPicker},i.a.createElement(N.a,{align:"left",color:"textSecondary"},"Background Color"),i.a.createElement(Ge.a,{className:t.colorPicker,name:"bgColor",defaultValue:u,onChange:function(t){t&&e.setState({bgColor:t})}})),i.a.createElement("span",{className:t.colorPicker},i.a.createElement(N.a,{align:"left",color:"textSecondary"},"Shape Color"),i.a.createElement(Ge.a,{name:"color",defaultValue:p,onChange:function(t){t&&e.setState({color:t},e.makeSpiral)}}))),i.a.createElement(Re.a,{className:t.shapePicker},i.a.createElement(Le.a,{htmlFor:"select"},"Shape"),i.a.createElement(We.a,{value:this.state.shape,onChange:function(t){e.setState(Object(Me.a)({},t.target.name,t.target.value),e.makeSpiral)},inputProps:{name:"shape",id:"select"}},i.a.createElement(Be.a,{value:0},"Circle"),i.a.createElement(Be.a,{value:1},"Square"),i.a.createElement(Be.a,{value:2},"Triangle"))))))),i.a.createElement("div",{className:t.endingText},i.a.createElement(N.a,{component:"p"},i.a.createElement("b",null,"Warning"),": higher grid sizes may cause some slow down.",i.a.createElement("br",null),"This project was inspired by"," ",i.a.createElement("a",{href:"https://www.youtube.com/watch?v=iFuR97YcSLM"},"this")," "," awesome numberphile video. You can read more about Prime Ulam Spirals"," ",i.a.createElement("a",{href:"https://en.wikipedia.org/wiki/Ulam_spiral"},"here."),i.a.createElement("br",null),"You can also check out the"," ",i.a.createElement("a",{href:"https://gitlab.com/danielloera/primeulam"},"python version")," ","I made.")))}}]),t}(n.Component),Ze=Object(d.withStyles)(function(e){return{title:{marginTop:"3vh",textAlign:"center",padding:2*e.spacing.unit},root:{display:"flex",alignItems:"center",justifyContent:"center",textAlign:"center"},stage:{marginTop:"3vh"},card:{marginTop:"2rem",padding:"1rem",minWidth:"30vw",maxWidth:"90vw"},cardHolder:{justifyContent:"center",display:"flex",flexWrap:"wrap"},controlsLabel:{},controls:{display:"flex",flexWrap:"wrap",justifyContent:"center",marginLeft:3*e.spacing.unit,marginRight:3*e.spacing.unit},sliderField:{width:"15ch",marginTop:3*e.spacing.unit,marginLeft:3*e.spacing.unit,marginRight:e.spacing.unit},colorPicker:{marginLeft:2*e.spacing.unit,marginRight:2*e.spacing.unit,maxWidth:"15rem"},cPickers:{display:"flex",marginTop:3*e.spacing.unit},slideLabel:{marginBottom:3*e.spacing.unit},shapePicker:{marginTop:4*e.spacing.unit},endingText:{marginTop:3*e.spacing.unit,marginBottom:"25vh",padding:2*e.spacing.unit}}})(Xe),et=a(65),tt=a.n(et),at=.85*window.innerWidth,nt=.8*window.innerHeight,it=function(e){function t(){return Object(s.a)(this,t),Object(m.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this.props.classes;return i.a.createElement("div",{className:e.root},i.a.createElement(tt.a,{className:e.botHolder,elevation:8},i.a.createElement("iframe",{title:"UT Tower",allow:"microphone;",width:at,height:nt,src:"https://console.dialogflow.com/api-client/demo/embedded/uttower"})),i.a.createElement("div",{className:e.endingText},i.a.createElement(N.a,{component:"p"},"This bot was created on "," ",i.a.createElement("a",{href:"https://dialogflow.com"},"Dialogflow")," ","to get lighting updates from the"," ",i.a.createElement("a",{href:"https://en.wikipedia.org/wiki/Main_Building_(University_of_Texas_at_Austin)"},"Tower in UT Austin."),i.a.createElement("br",null),"UT Tower bot is available on"," ",i.a.createElement("a",{href:"https://assistant.google.com/services/a/uid/0000001deeb5797c?hl=en"},"Google Assistant")," "," and"," ",i.a.createElement("a",{href:"https://www.facebook.com/utexastower"},"Facebook Messenger."))))}}]),t}(i.a.Component),rt=Object(d.withStyles)(function(e){return{root:{alignItems:"center",justifyContent:"center",textAlign:"center"},botHolder:{display:"inline-block",width:at,height:nt,marginTop:6*e.spacing.unit},endingText:{marginTop:5*e.spacing.unit,marginBottom:10*e.spacing.unit}}})(it),lt=(a(742),Object(d.createMuiTheme)({typography:{useNextVariants:!0,fontSize:16},palette:{type:"dark",primary:{main:"#43a047"},secondary:{main:"#ff80ab"}}})),ot=function(e){function t(){return Object(s.a)(this,t),Object(m.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this.props.classes;return i.a.createElement(i.a.Fragment,null,i.a.createElement(d.MuiThemeProvider,{theme:lt},i.a.createElement(g.a,null),i.a.createElement(X,null),i.a.createElement(h.c,{className:e.root},i.a.createElement(h.a,{exact:!0,path:"/",component:ze}),i.a.createElement(h.a,{exact:!0,path:"/primeulam",component:Ze}),i.a.createElement(h.a,{exact:!0,path:"/uttower",component:rt}))))}}]),t}(n.Component),st=Object(d.withStyles)(function(e){return{root:{flexGrow:1}}})(ot);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(i.a.createElement(r.a,null,i.a.createElement(st,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[303,1,2]]]);
//# sourceMappingURL=main.6ee3944c.chunk.js.map