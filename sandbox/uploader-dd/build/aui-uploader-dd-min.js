AUI.add("aui-uploader-dd",function(D){var G=D.Lang,C=G.isFunction,E=D.ClassNameManager.getClassName,J="uploaderdd",B="input[type=file]",H=E("helper","hidden"),F=E(J,"html");CSS_UPLOADER_IMAGE=E(J,"image"),TPL_UPLOADER_HTML='<{0} id="{1}" class="'+F+'"><form></form></{0}>',TPL_UPLOADER_IMAGE='<div id="{0}" class="'+CSS_UPLOADER_IMAGE+'"><a href="javascript://"><form></form></a></div>',TPL_SELECT_INPUT='<input type="file" />',TPL_SELECT_STYLESHEET="#{0} a [ width: {2}px; height: {3}px; background: url({1}) 0 0 no-repeat; ]"+"#{0} a:hover [ background-position: 0 -{3}px; ]"+"#{0} a:active [ background-position: 0 -{4}px; ]",TPL_XHR_FOOTER="--{0}--",TPL_XHR_FORM_DATA="--{0}\r\n"+'Content-Disposition: form-data; name="{1}"\r\n'+"\r\n{2}\r\n",TPL_XHR_FORM_UPLOAD="--{0}\r\n"+'Content-Disposition: form-data; name="{1}"; filename="{2}"\r\n'+"Content-Type: application/octet-stream\r\n"+"\r\n{3}\r\n";var I=D.Component.create({NAME:J,EXTENDS:D.Uploader,ATTRS:{container:{value:null},disableXHR:{value:false,writeOnce:"initOnly"},fileFilters:{value:[],setter:function(Q){var A=this;var P=Q;var K=[];if(P){for(var N=0;N<P.length;N++){var O=P[N].extensions;if(O){O=O.split(";");for(var M=0;M<O.length;M++){var L=G.trim(O[M]);if(L.length){L=L.replace(/\./g,"\\.");L=L.replace(/\*/g,"(.*?)");L="^"+L+"$";K.push(L);}}}}}A._fileFiltersRegExp=(K.length?K:null);I.superclass.setFileFilters.apply(A,arguments);return Q;}},fileList:{value:{}},filePostName:{value:null}},constructor:function(K){var A=this;if(K.boundingBox){A._content=D.one(K.boundingBox).cloneNode(true);}I.superclass.constructor.apply(A,arguments);},prototype:{initializer:function(){var A=this;A.set("container",D.one(A.get("boundingBox")));if(A.canSupportXHR()&&!A.get("disableXHR")){A._renderFileSelect();A._initializeUploader();}},cancel:function(K){var A=this;if(A._isSwfVisible()){I.superclass.cancel.apply(A,arguments);}else{if(A._xhr[K]){A._xhr[K].abort();A._removeXHR(K);}}},canSupportDD:function(){var A=this;return("draggable" in document.createElement(A.get("container").get("tagName")));},canSupportXHR:function(){var A=this;return(window.XMLHttpRequest&&window.FileReader);},clearFileList:function(){var A=this;if(A._isSwfVisible()){I.superclass.clearFileList.apply(A,arguments);}else{A.set("fileList",{});}},disable:function(){var A=this;var K=A._fileSelect;if(K){K.all(B).attr("disabled",true);}I.superclass.disable.apply(A,arguments);},enable:function(){var A=this;var K=A._fileSelect;if(K){K.all(B).attr("disabled",false);}I.superclass.enable.apply(A,arguments);},removeFile:function(K){var A=this;if(A._isSwfVisible()){I.superclass.removeFile.apply(A,arguments);}else{var L=A.get("fileList");delete L[K];}},toggleSwf:function(L){var A=this;var M=A._swf;var K=A._fileSelect;if(M){if(L==null){L=!A._isSwfVisible();}if(L){M.show();if(K){K.hide();}}else{if(K){M.hide();K.show();}}A.clearFileList();}},upload:function(M,L,A,P,V){var R=this;if(R._isSwfVisible()){return I.superclass.upload.apply(R,arguments);}else{var S=R.get("fileList");var N=S[M]||R._getQueuedById(M);if(R._xhr[M]){R._removeFile(N);return true;}if(N){var U=R.get("simLimit");var K=R._getXHRCount();delete S[M];if(K<U){var T=new XMLHttpRequest();T._uploaderDD={file:N,fileId:M,fileName:V,instance:R,postVars:P};R._xhr[M]=T;T.addEventListener("readystatechange",D.bind(R._doReadyStateChangeXHR,T),false);T.upload.addEventListener("progress",D.bind(R._doProgressXHR,T),false);T.upload.addEventListener("error",D.bind(R._doErrorXHR,T),false);T.upload.addEventListener("abort",D.bind(R._doAbortXHR,T),false);T.upload.addEventListener("load",D.bind(R._doLoadXHR,T),false);T.open((A?A:"POST"),L,true);var O=new FileReader();if(C(O.addEventListener)){O.addEventListener("loadend",D.bind(R._doLoadEndXHR,T),false);}else{O.onloadend=D.bind(R._doLoadEndXHR,T);}O.readAsBinaryString(N);R.fire("uploadstart",{id:M,type:"uploadstart"});R._removeFile(N);}else{if(R._getQueueIndex(M)==-1){var Q=R._queueList;Q.push({arguments:arguments,file:N,id:M});}}return true;}}return false;},uploadAll:function(N,P,L,O){var A=this;if(A._isSwfVisible()){return I.superclass.uploadAll.apply(A,arguments);}else{var M=A.get("fileList");for(var K in M){A.upload(K,N,P,L,O);}return true;}},uploadThese:function(M,L,P,K,O){var A=this;if(A._isSwfVisible()){return I.superclass.uploadThese.apply(A,arguments);}else{if(M){for(var N=0;N<M.length;N++){A.upload(M[N],L,P,K,O);}}return true;}return false;},_addFile:function(R){var P=this;if(R instanceof File){var Q=P.get("fileList");var K=P._getFileCount();if(P.get("multiFiles")||K==0){var A="file"+K;var S=false;var O=P._fileFiltersRegExp;if(O){var L=R.name;for(var M=0;M<O.length;M++){var N=new RegExp(O[M],"gi");if(N.test(L)){S=true;break;}}}else{S=true;}if(S){while(Q[A]||P._getQueueIndex(A)!=-1){K++;A="file"+K;}R.id=A;Q[A]=R;return true;}}}return false;},_doAbortXHR:function(N){var A=this;var O=A;var M=O._uploaderDD;var K=M.fileId;var L=M.file;A=M.instance;A._removeXHR(K);A.fire("uploadcancel",{id:K,file:L,type:"uploadcancel"});A._sendQueued();},_doErrorXHR:function(M){var A=this;var N=A;var L=N._uploaderDD;var K=L.fileId;A=L.instance;A._removeXHR(K);A.fire("uploaderror",{id:K,type:"uploaderror"});A._sendQueued();},_doLoadEndXHR:function(A){var T=this;var U=T;var L=U._uploaderDD;var Q=L.fileName;var O=L.postVars;var V=A.currentTarget.result;var K=C(U.sendAsBinary);var P=[];T=L.instance;var M="__"+new Date().getTime()+"__";if(O){for(var R in O){P.push(G.sub(TPL_XHR_FORM_DATA,[M,R,O[R]]));}}if(!K){V=btoa(V);}var N=T.get("filePostName");if(N==null||N==""){N=L.fileId;}P.push(G.sub(TPL_XHR_FORM_UPLOAD,[M,N,(Q!=null?Q:L.file.name),V]));P.push(G.sub(TPL_XHR_FOOTER,[M]));U.setRequestHeader("Content-Type","multipart/form-data; boundary="+M);var S=P.join("");if(K){U.sendAsBinary(S);}else{U.send(S);}},_doLoadXHR:function(M){var A=this;var N=A;var L=N._uploaderDD;var K=L.fileId;A=L.instance;A._removeXHR(K);A.fire("uploadcomplete",{id:K,type:"uploadcomplete"});A._sendQueued();},_doProgressXHR:function(M){var A=this;if(M.lengthComputable){var N=A;
var L=N._uploaderDD;var K=L.fileId;A=L.instance;A.fire("uploadprogress",{bytesLoaded:M.loaded,bytesTotal:M.total,id:K,type:"uploadprogress"});}},_doReadyStateChangeXHR:function(O){var A=this;var Q=A;var N=Q._uploaderDD;var L=N.fileId;var P=O.currentTarget;A=N.instance;if(P.readyState==4){var K=P.status;if(K>=200&&K<300||K===1223){var M=(P.responseXML!=null?P.responseXML:P.responseText);if(M!=null){A.fire("uploadcompletedata",{data:M,id:L,type:"uploadcompletedata"});}}}},_fireEvent:function(K){var A=this;A.fire(K.type,K);},_getFileCount:function(){var A=this;return A._getItemCount(A.get("fileList"));},_getItemCount:function(K){var A=this;var M=0;if(K){for(var L in K){M++;}}return M;},_getQueuedById:function(L){var K=this;var A=K._queueList;var M=K._getQueueIndex(L);return(M!=-1?A[M].file:null);},_getQueueIndex:function(L){var K=this;var A=K._queueList;for(var M=0;M<A.length;M++){if(A[M].id==L){return M;}}return -1;},_getXHRCount:function(){var A=this;return A._getItemCount(A._xhr);},_isSwfVisible:function(){var A=this;var K=A._swf;return(K?!K.hasClass(H):false);},_onDragEnter:function(K){var A=this;K.stopPropagation();K.preventDefault();A.fire("dragenter",K);},_onDragOver:function(K){var A=this;K.stopPropagation();K.preventDefault();A.fire("dragover",K);},_onDrop:function(P){var K=this;P.stopPropagation();P.preventDefault();var A=P._event;if(A.dataTransfer){var O=A.dataTransfer.files;var L={};if(O){for(var M=0;M<O.length;M++){var N=O[M];if(K._addFile(N)){L[N.id]=N;}}}K.fire("fileselect",{fileList:L});}K.fire("drop",P);},_removeFile:function(M){var A=this;var K=A.get("fileList");for(var L in K){if(K[L]==M){delete K[L];break;}}if(A._queueList.length){D.Array.removeItem(A._queueList,M);}},_removeXHR:function(K){var A=this;delete A._xhr[K];},_renderFileSelect:function(){var X=this;if(!X._fileSelect){var M=X.get("container");var O=X.uploaderswf._swfId||X.uploaderswf._id;X._swf=D.one("#"+O);var W=X.get("buttonSkin");var K=D.guid();var L;var S;var R;if(W){S=D.Node.create(G.sub(TPL_UPLOADER_IMAGE,[K]));M.append(S);var N=M.get("offsetHeight");var Q=G.sub(TPL_SELECT_STYLESHEET,[K,W,M.get("offsetWidth"),N,(N*2)]);Q=Q.replace(/\[/g,"{");Q=Q.replace(/\]/g,"}");var A=new D.StyleSheet(Q);L=M;R=L.get("offsetWidth");}else{var Z=(M.getComputedStyle("display")=="block"?"div":"span");S=D.Node.create(G.sub(TPL_UPLOADER_HTML,[Z,K]));var U=M.ancestor();U.insert(S,M);M.append(X._content.html());S.append(M);L=S;R=M.get("offsetWidth");}X._fileSelect=S;X.toggleSwf(false);var Y=X.get("multiFiles");var P=S.one("form");var N=L.get("offsetHeight");do{var T=D.Node.create(G.sub(TPL_SELECT_INPUT,[(Y?"true":"false")]));T.setStyle("width",R);P.append(T);}while(P.get("offsetHeight")<N);P.delegate("change",function(d){var a=this;var c=d.currentTarget.get("files");var b={};D.some(c._nodes,function(f,e,g){if(a._addFile(f)){b[f.id]=f;}else{return true;}});a.fire("fileselect",{fileList:b});},B,X);X._xhr={};X._queueList=[];X.publish("click");X.publish("mousedown");X.publish("mouseup");X.publish("mouseleave");X.publish("mouseenter");X.publish("dragenter");X.publish("dragover");X.publish("dragleave");X.publish("drop");X.publish("fileselect");X.publish("uploadprogress");X.publish("uploadcomplete");X.publish("uploadcompletedata");X.publish("uploaderror");X.publish("uploadcancel");X.publish("uploadstart");var V=D.bind(X._fireEvent,X);L.on("click",V);L.on("mousedown",V);L.on("mouseup",V);L.on("mouseleave",V);L.on("mouseenter",V);if(X.canSupportDD()){L.on("dragenter",X._onDragEnter,X);L.on("dragover",X._onDragOver,X);L.on("dragleave",V);L.on("drop",X._onDrop,X);}}},_sendQueued:function(){var K=this;var A=K._queueList;for(var L in A){K.upload.apply(K,A[L].arguments);}}}});D.UploaderDD=I;},"@VERSION@",{requires:["aui-base","stylesheet","uploader"],skinnable:true});