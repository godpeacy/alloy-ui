AUI.add("aui-io-request",function(O){var G=O.Lang,d=G.isBoolean,Q=G.isFunction,H=G.isString,f=AUI.defaults.io,h=function(A){return function(){return f[A];};},W="active",C="arguments",X="autoLoad",T="cache",g="cfg",S="complete",m="content-type",Y="context",N="data",F="dataType",J="",l="end",b="failure",B="form",U="get",K="headers",k="IORequest",E="json",Z="method",V="responseData",a="start",M="success",c="sync",R="timeout",P="transaction",e="uri",j="xdr",n="xml",i="Parser error: IO dataType is not correctly parsing",D={all:"*/*",html:"text/html",json:"application/json, text/javascript",text:"text/plain",xml:"application/xml, text/xml"};function I(){I.superclass.constructor.apply(this,arguments);}O.mix(I,{NAME:k,ATTRS:{autoLoad:{value:true,validator:d},cache:{value:true,validator:d},dataType:{setter:function(A){return(A||J).toLowerCase();},value:null,validator:H},responseData:{setter:function(A){return this._setResponseData(A);},value:null},uri:{setter:function(A){return this._parseURL(A);},value:null,validator:H},active:{value:false,validator:d},cfg:{getter:function(){var A=this;return{arguments:A.get(C),context:A.get(Y),data:A.get(N),form:A.get(B),headers:A.get(K),method:A.get(Z),on:{complete:O.bind(A.fire,A,S),end:O.bind(A._end,A),failure:O.bind(A.fire,A,b),start:O.bind(A.fire,A,a),success:O.bind(A._success,A)},sync:A.get(c),timeout:A.get(R),xdr:A.get(j)};},readOnly:true},transaction:{value:null},arguments:{valueFn:h(C)},context:{valueFn:h(Y)},data:{valueFn:h(N)},form:{valueFn:h(B)},headers:{getter:function(o){var p=[];var A=this;var L=A.get(F);if(L){p.push(D[L]);}p.push(D.all);return O.merge(o,{Accept:p.join(", ")});},valueFn:h(K)},method:{valueFn:h(Z)},sync:{valueFn:h(c)},timeout:{valueFn:h(R)},xdr:{valueFn:h(j)}}});O.extend(I,O.Plugin.Base,{initializer:function(L){var A=this;A.after("init",A._afterInit);},_afterInit:function(L){var A=this;if(A.get(X)){A.start();}},destructor:function(){var A=this;A.stop();A.set(P,null);},start:function(){var A=this;A.destructor();A.set(W,true);var L=O.io(A.get(e),A.get(g));A.set(P,L);},stop:function(){var A=this;var L=A.get(P);if(L){L.abort();}},_parseURL:function(p){var A=this;var L=A.get(T);var s=A.get(Z);if((L===false)&&(s==U)){var r=+new Date;var o=p.replace(/(\?|&)_=.*?(&|$)/,"$1_="+r+"$2");p=o+((o==p)?(p.match(/\?/)?"&":"?")+"_="+r:"");}var q=f.uriFormatter;if(Q(q)){p=q.apply(A,[p]);}return p;},_end:function(L){var A=this;A.set(W,false);A.set(P,null);A.fire(l,L);},_success:function(o,L){var A=this;A.set(V,L);A.fire(M,o,L);},_setResponseData:function(q){var o=null;var A=this;if(q){var L=A.get(F);var r=q.getResponseHeader(m);if((L==n)||(!L&&r.indexOf(n)>=0)){o=q.responseXML;if(o.documentElement.tagName=="parsererror"){throw i;}}else{o=q.responseText;}if(o===J){o=null;}if(L==E){try{o=O.JSON.parse(o);}catch(p){}}}return o;}});O.IORequest=I;O.io.request=function(L,A){return new O.IORequest(O.merge(A,{uri:L}));};},"@VERSION@",{requires:["aui-base","io","json","plugin"]});AUI.add("aui-io-plugin",function(S){var O=S.Lang,P=O.isBoolean,Q=O.isString,T=function(A){return(A instanceof S.Node);},U=S.WidgetStdMod,C="Node",M="Widget",d="",D="failure",G="failureMessage",W="host",H="icon",I="io",E="IOPlugin",V="loading",F="loadingMask",c="node",Z="parseContent",K="queue",N="section",b="showLoading",Y="success",R="type",B="where",X=S.ClassNameManager.getClassName,J=X(H,V);function a(A){a.superclass.constructor.apply(this,arguments);}S.mix(a,{NAME:E,NS:I,ATTRS:{node:{value:null,setter:function(f){var A=this;if(!f){var e=A.get(W);var L=A.get(R);if(L==C){f=e;}else{if(L==M){var g=A.get(N);if(!e.getStdModNode(g)){e.setStdModContent(g,d);}f=e.getStdModNode(g);}}}return S.one(f);},validator:T},failureMessage:{value:"Failed to retrieve content",validator:Q},loadingMask:{value:{}},parseContent:{value:true,validator:P},showLoading:{value:true,validator:P},section:{value:U.BODY,validator:function(A){return(!A||A==U.BODY||A==U.HEADER||A==U.FOOTER);}},type:{readOnly:true,valueFn:function(){var A=this;var L=C;if(A.get(W) instanceof S.Widget){L=M;}return L;},validator:Q},where:{value:U.REPLACE,validator:function(A){return(!A||A==U.AFTER||A==U.BEFORE||A==U.REPLACE);}}}});S.extend(a,S.IORequest,{initializer:function(){var A=this;A.bindUI();},bindUI:function(){var A=this;A.on("activeChange",A._onActiveChange);A.on(Y,A._successHandler);A.on(D,A._failureHandler);if((A.get(R)==M)&&A.get(b)){var L=A.get(W);L.after("heightChange",A._syncLoadingMaskUI,A);L.after("widthChange",A._syncLoadingMaskUI,A);}},_afterInit:function(){var A=this;A._bindPlugins();a.superclass._afterInit.apply(this,arguments);},_bindPlugins:function(){var L=this;var f=L.get(c);if(f&&L.get(Z)){f.plug(S.Plugin.ParseContent);if(L.get(R)==M){var e=L.get(W);var A=f.ParseContent.get(K);if(A){e.on("close",function(g){if(A.isRunning()){g.halt();}});e.after("close",function(g){A.stop();});}}}},hideLoading:function(){var A=this;var L=A.get(c);if(L.loadingmask){L.loadingmask.hide();}},setContent:function(e){var A=this;var L=A.get(c);if(A.overlayMaskBoundingBox){A.overlayMaskBoundingBox.remove();}A._getContentSetterByType().apply(A,[e]);},showLoading:function(){var A=this;var L=A.get(c);if(L.loadingmask){if(A.overlayMaskBoundingBox){L.append(A.overlayMaskBoundingBox);}}else{L.plug(S.LoadingMask,A.get(F));A.overlayMaskBoundingBox=L.loadingmask.overlayMask.get("boundingBox");}L.loadingmask.show();},_getContentSetterByType:function(){var A=this;var L={Node:function(g){var e=this;var f=e.get(c);f.setContent.apply(f,[g]);},Widget:function(g){var e=this;var f=e.get(W);f.setStdModContent.apply(f,[e.get(N),g,e.get(B)]);}};return L[this.get(R)];},_syncLoadingMaskUI:function(){var A=this;A.get(c).loadingmask.refreshMask();},_successHandler:function(L,f,e){var A=this;A.setContent(e.responseText);},_failureHandler:function(L,f,e){var A=this;A.setContent(A.get(G));},_onActiveChange:function(e){var A=this;var L=A.get(b);if(e.newVal){if(L){A.showLoading();}}else{if(L){A.hideLoading();}}}});S.namespace("Plugin").IO=a;},"@VERSION@",{requires:["aui-component-overlay","aui-parse-content","aui-io-request","aui-loading-mask"]});
AUI.add("aui-io",function(B){},"@VERSION@",{skinnable:false,use:["aui-io-request","aui-plugin"]});