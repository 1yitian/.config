var __create=Object.create;var __defProp=Object.defineProperty;var __getOwnPropDesc=Object.getOwnPropertyDescriptor;var __getOwnPropNames=Object.getOwnPropertyNames;var __getProtoOf=Object.getPrototypeOf,__hasOwnProp=Object.prototype.hasOwnProperty;var __commonJS=(cb,mod)=>function(){return mod||(0,cb[__getOwnPropNames(cb)[0]])((mod={exports:{}}).exports,mod),mod.exports};var __copyProps=(to,from,except,desc)=>{if(from&&typeof from=="object"||typeof from=="function")for(let key of __getOwnPropNames(from))!__hasOwnProp.call(to,key)&&key!==except&&__defProp(to,key,{get:()=>from[key],enumerable:!(desc=__getOwnPropDesc(from,key))||desc.enumerable});return to};var __toESM=(mod,isNodeMode,target)=>(target=mod!=null?__create(__getProtoOf(mod)):{},__copyProps(isNodeMode||!mod||!mod.__esModule?__defProp(target,"default",{value:mod,enumerable:!0}):target,mod));var require_browser_polyfill=__commonJS({"node_modules/.pnpm/webextension-polyfill@0.12.0/node_modules/webextension-polyfill/dist/browser-polyfill.js"(exports,module){"use strict";(function(global,factory){if(typeof define=="function"&&define.amd)define("webextension-polyfill",["module"],factory);else if(typeof exports<"u")factory(module);else{var mod={exports:{}};factory(mod),global.browser=mod.exports}})(typeof globalThis<"u"?globalThis:typeof self<"u"?self:exports,function(module2){"use strict";if(!(globalThis.chrome&&globalThis.chrome.runtime&&globalThis.chrome.runtime.id))throw new Error("This script should only be loaded in a browser extension.");if(globalThis.browser&&globalThis.browser.runtime&&globalThis.browser.runtime.id)module2.exports=globalThis.browser;else{let CHROME_SEND_MESSAGE_CALLBACK_NO_RESPONSE_MESSAGE="The message port closed before a response was received.",wrapAPIs=extensionAPIs=>{let apiMetadata={alarms:{clear:{minArgs:0,maxArgs:1},clearAll:{minArgs:0,maxArgs:0},get:{minArgs:0,maxArgs:1},getAll:{minArgs:0,maxArgs:0}},bookmarks:{create:{minArgs:1,maxArgs:1},get:{minArgs:1,maxArgs:1},getChildren:{minArgs:1,maxArgs:1},getRecent:{minArgs:1,maxArgs:1},getSubTree:{minArgs:1,maxArgs:1},getTree:{minArgs:0,maxArgs:0},move:{minArgs:2,maxArgs:2},remove:{minArgs:1,maxArgs:1},removeTree:{minArgs:1,maxArgs:1},search:{minArgs:1,maxArgs:1},update:{minArgs:2,maxArgs:2}},browserAction:{disable:{minArgs:0,maxArgs:1,fallbackToNoCallback:!0},enable:{minArgs:0,maxArgs:1,fallbackToNoCallback:!0},getBadgeBackgroundColor:{minArgs:1,maxArgs:1},getBadgeText:{minArgs:1,maxArgs:1},getPopup:{minArgs:1,maxArgs:1},getTitle:{minArgs:1,maxArgs:1},openPopup:{minArgs:0,maxArgs:0},setBadgeBackgroundColor:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},setBadgeText:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},setIcon:{minArgs:1,maxArgs:1},setPopup:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},setTitle:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0}},browsingData:{remove:{minArgs:2,maxArgs:2},removeCache:{minArgs:1,maxArgs:1},removeCookies:{minArgs:1,maxArgs:1},removeDownloads:{minArgs:1,maxArgs:1},removeFormData:{minArgs:1,maxArgs:1},removeHistory:{minArgs:1,maxArgs:1},removeLocalStorage:{minArgs:1,maxArgs:1},removePasswords:{minArgs:1,maxArgs:1},removePluginData:{minArgs:1,maxArgs:1},settings:{minArgs:0,maxArgs:0}},commands:{getAll:{minArgs:0,maxArgs:0}},contextMenus:{remove:{minArgs:1,maxArgs:1},removeAll:{minArgs:0,maxArgs:0},update:{minArgs:2,maxArgs:2}},cookies:{get:{minArgs:1,maxArgs:1},getAll:{minArgs:1,maxArgs:1},getAllCookieStores:{minArgs:0,maxArgs:0},remove:{minArgs:1,maxArgs:1},set:{minArgs:1,maxArgs:1}},devtools:{inspectedWindow:{eval:{minArgs:1,maxArgs:2,singleCallbackArg:!1}},panels:{create:{minArgs:3,maxArgs:3,singleCallbackArg:!0},elements:{createSidebarPane:{minArgs:1,maxArgs:1}}}},downloads:{cancel:{minArgs:1,maxArgs:1},download:{minArgs:1,maxArgs:1},erase:{minArgs:1,maxArgs:1},getFileIcon:{minArgs:1,maxArgs:2},open:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},pause:{minArgs:1,maxArgs:1},removeFile:{minArgs:1,maxArgs:1},resume:{minArgs:1,maxArgs:1},search:{minArgs:1,maxArgs:1},show:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0}},extension:{isAllowedFileSchemeAccess:{minArgs:0,maxArgs:0},isAllowedIncognitoAccess:{minArgs:0,maxArgs:0}},history:{addUrl:{minArgs:1,maxArgs:1},deleteAll:{minArgs:0,maxArgs:0},deleteRange:{minArgs:1,maxArgs:1},deleteUrl:{minArgs:1,maxArgs:1},getVisits:{minArgs:1,maxArgs:1},search:{minArgs:1,maxArgs:1}},i18n:{detectLanguage:{minArgs:1,maxArgs:1},getAcceptLanguages:{minArgs:0,maxArgs:0}},identity:{launchWebAuthFlow:{minArgs:1,maxArgs:1}},idle:{queryState:{minArgs:1,maxArgs:1}},management:{get:{minArgs:1,maxArgs:1},getAll:{minArgs:0,maxArgs:0},getSelf:{minArgs:0,maxArgs:0},setEnabled:{minArgs:2,maxArgs:2},uninstallSelf:{minArgs:0,maxArgs:1}},notifications:{clear:{minArgs:1,maxArgs:1},create:{minArgs:1,maxArgs:2},getAll:{minArgs:0,maxArgs:0},getPermissionLevel:{minArgs:0,maxArgs:0},update:{minArgs:2,maxArgs:2}},pageAction:{getPopup:{minArgs:1,maxArgs:1},getTitle:{minArgs:1,maxArgs:1},hide:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},setIcon:{minArgs:1,maxArgs:1},setPopup:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},setTitle:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},show:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0}},permissions:{contains:{minArgs:1,maxArgs:1},getAll:{minArgs:0,maxArgs:0},remove:{minArgs:1,maxArgs:1},request:{minArgs:1,maxArgs:1}},runtime:{getBackgroundPage:{minArgs:0,maxArgs:0},getPlatformInfo:{minArgs:0,maxArgs:0},openOptionsPage:{minArgs:0,maxArgs:0},requestUpdateCheck:{minArgs:0,maxArgs:0},sendMessage:{minArgs:1,maxArgs:3},sendNativeMessage:{minArgs:2,maxArgs:2},setUninstallURL:{minArgs:1,maxArgs:1}},sessions:{getDevices:{minArgs:0,maxArgs:1},getRecentlyClosed:{minArgs:0,maxArgs:1},restore:{minArgs:0,maxArgs:1}},storage:{local:{clear:{minArgs:0,maxArgs:0},get:{minArgs:0,maxArgs:1},getBytesInUse:{minArgs:0,maxArgs:1},remove:{minArgs:1,maxArgs:1},set:{minArgs:1,maxArgs:1}},managed:{get:{minArgs:0,maxArgs:1},getBytesInUse:{minArgs:0,maxArgs:1}},sync:{clear:{minArgs:0,maxArgs:0},get:{minArgs:0,maxArgs:1},getBytesInUse:{minArgs:0,maxArgs:1},remove:{minArgs:1,maxArgs:1},set:{minArgs:1,maxArgs:1}}},tabs:{captureVisibleTab:{minArgs:0,maxArgs:2},create:{minArgs:1,maxArgs:1},detectLanguage:{minArgs:0,maxArgs:1},discard:{minArgs:0,maxArgs:1},duplicate:{minArgs:1,maxArgs:1},executeScript:{minArgs:1,maxArgs:2},get:{minArgs:1,maxArgs:1},getCurrent:{minArgs:0,maxArgs:0},getZoom:{minArgs:0,maxArgs:1},getZoomSettings:{minArgs:0,maxArgs:1},goBack:{minArgs:0,maxArgs:1},goForward:{minArgs:0,maxArgs:1},highlight:{minArgs:1,maxArgs:1},insertCSS:{minArgs:1,maxArgs:2},move:{minArgs:2,maxArgs:2},query:{minArgs:1,maxArgs:1},reload:{minArgs:0,maxArgs:2},remove:{minArgs:1,maxArgs:1},removeCSS:{minArgs:1,maxArgs:2},sendMessage:{minArgs:2,maxArgs:3},setZoom:{minArgs:1,maxArgs:2},setZoomSettings:{minArgs:1,maxArgs:2},update:{minArgs:1,maxArgs:2}},topSites:{get:{minArgs:0,maxArgs:0}},webNavigation:{getAllFrames:{minArgs:1,maxArgs:1},getFrame:{minArgs:1,maxArgs:1}},webRequest:{handlerBehaviorChanged:{minArgs:0,maxArgs:0}},windows:{create:{minArgs:0,maxArgs:1},get:{minArgs:1,maxArgs:2},getAll:{minArgs:0,maxArgs:1},getCurrent:{minArgs:0,maxArgs:1},getLastFocused:{minArgs:0,maxArgs:1},remove:{minArgs:1,maxArgs:1},update:{minArgs:2,maxArgs:2}}};if(Object.keys(apiMetadata).length===0)throw new Error("api-metadata.json has not been included in browser-polyfill");class DefaultWeakMap extends WeakMap{constructor(createItem,items=void 0){super(items),this.createItem=createItem}get(key){return this.has(key)||this.set(key,this.createItem(key)),super.get(key)}}let isThenable=value=>value&&typeof value=="object"&&typeof value.then=="function",makeCallback=(promise,metadata)=>(...callbackArgs)=>{extensionAPIs.runtime.lastError?promise.reject(new Error(extensionAPIs.runtime.lastError.message)):metadata.singleCallbackArg||callbackArgs.length<=1&&metadata.singleCallbackArg!==!1?promise.resolve(callbackArgs[0]):promise.resolve(callbackArgs)},pluralizeArguments=numArgs=>numArgs==1?"argument":"arguments",wrapAsyncFunction=(name,metadata)=>function(target,...args){if(args.length<metadata.minArgs)throw new Error(`Expected at least ${metadata.minArgs} ${pluralizeArguments(metadata.minArgs)} for ${name}(), got ${args.length}`);if(args.length>metadata.maxArgs)throw new Error(`Expected at most ${metadata.maxArgs} ${pluralizeArguments(metadata.maxArgs)} for ${name}(), got ${args.length}`);return new Promise((resolve,reject)=>{if(metadata.fallbackToNoCallback)try{target[name](...args,makeCallback({resolve,reject},metadata))}catch(cbError){console.warn(`${name} API method doesn't seem to support the callback parameter, falling back to call it without a callback: `,cbError),target[name](...args),metadata.fallbackToNoCallback=!1,metadata.noCallback=!0,resolve()}else metadata.noCallback?(target[name](...args),resolve()):target[name](...args,makeCallback({resolve,reject},metadata))})},wrapMethod=(target,method,wrapper)=>new Proxy(method,{apply(targetMethod,thisObj,args){return wrapper.call(thisObj,target,...args)}}),hasOwnProperty=Function.call.bind(Object.prototype.hasOwnProperty),wrapObject=(target,wrappers={},metadata={})=>{let cache=Object.create(null),handlers={has(proxyTarget2,prop){return prop in target||prop in cache},get(proxyTarget2,prop,receiver){if(prop in cache)return cache[prop];if(!(prop in target))return;let value=target[prop];if(typeof value=="function")if(typeof wrappers[prop]=="function")value=wrapMethod(target,target[prop],wrappers[prop]);else if(hasOwnProperty(metadata,prop)){let wrapper=wrapAsyncFunction(prop,metadata[prop]);value=wrapMethod(target,target[prop],wrapper)}else value=value.bind(target);else if(typeof value=="object"&&value!==null&&(hasOwnProperty(wrappers,prop)||hasOwnProperty(metadata,prop)))value=wrapObject(value,wrappers[prop],metadata[prop]);else if(hasOwnProperty(metadata,"*"))value=wrapObject(value,wrappers[prop],metadata["*"]);else return Object.defineProperty(cache,prop,{configurable:!0,enumerable:!0,get(){return target[prop]},set(value2){target[prop]=value2}}),value;return cache[prop]=value,value},set(proxyTarget2,prop,value,receiver){return prop in cache?cache[prop]=value:target[prop]=value,!0},defineProperty(proxyTarget2,prop,desc){return Reflect.defineProperty(cache,prop,desc)},deleteProperty(proxyTarget2,prop){return Reflect.deleteProperty(cache,prop)}},proxyTarget=Object.create(target);return new Proxy(proxyTarget,handlers)},wrapEvent=wrapperMap=>({addListener(target,listener,...args){target.addListener(wrapperMap.get(listener),...args)},hasListener(target,listener){return target.hasListener(wrapperMap.get(listener))},removeListener(target,listener){target.removeListener(wrapperMap.get(listener))}}),onRequestFinishedWrappers=new DefaultWeakMap(listener=>typeof listener!="function"?listener:function(req){let wrappedReq=wrapObject(req,{},{getContent:{minArgs:0,maxArgs:0}});listener(wrappedReq)}),onMessageWrappers=new DefaultWeakMap(listener=>typeof listener!="function"?listener:function(message,sender,sendResponse){let didCallSendResponse=!1,wrappedSendResponse,sendResponsePromise=new Promise(resolve=>{wrappedSendResponse=function(response){didCallSendResponse=!0,resolve(response)}}),result;try{result=listener(message,sender,wrappedSendResponse)}catch(err){result=Promise.reject(err)}let isResultThenable=result!==!0&&isThenable(result);if(result!==!0&&!isResultThenable&&!didCallSendResponse)return!1;let sendPromisedResult=promise=>{promise.then(msg=>{sendResponse(msg)},error=>{let message2;error&&(error instanceof Error||typeof error.message=="string")?message2=error.message:message2="An unexpected error occurred",sendResponse({__mozWebExtensionPolyfillReject__:!0,message:message2})}).catch(err=>{console.error("Failed to send onMessage rejected reply",err)})};return sendPromisedResult(isResultThenable?result:sendResponsePromise),!0}),wrappedSendMessageCallback=({reject,resolve},reply)=>{extensionAPIs.runtime.lastError?extensionAPIs.runtime.lastError.message===CHROME_SEND_MESSAGE_CALLBACK_NO_RESPONSE_MESSAGE?resolve():reject(new Error(extensionAPIs.runtime.lastError.message)):reply&&reply.__mozWebExtensionPolyfillReject__?reject(new Error(reply.message)):resolve(reply)},wrappedSendMessage=(name,metadata,apiNamespaceObj,...args)=>{if(args.length<metadata.minArgs)throw new Error(`Expected at least ${metadata.minArgs} ${pluralizeArguments(metadata.minArgs)} for ${name}(), got ${args.length}`);if(args.length>metadata.maxArgs)throw new Error(`Expected at most ${metadata.maxArgs} ${pluralizeArguments(metadata.maxArgs)} for ${name}(), got ${args.length}`);return new Promise((resolve,reject)=>{let wrappedCb=wrappedSendMessageCallback.bind(null,{resolve,reject});args.push(wrappedCb),apiNamespaceObj.sendMessage(...args)})},staticWrappers={devtools:{network:{onRequestFinished:wrapEvent(onRequestFinishedWrappers)}},runtime:{onMessage:wrapEvent(onMessageWrappers),onMessageExternal:wrapEvent(onMessageWrappers),sendMessage:wrappedSendMessage.bind(null,"sendMessage",{minArgs:1,maxArgs:3})},tabs:{sendMessage:wrappedSendMessage.bind(null,"sendMessage",{minArgs:2,maxArgs:3})}},settingMetadata={clear:{minArgs:1,maxArgs:1},get:{minArgs:1,maxArgs:1},set:{minArgs:1,maxArgs:1}};return apiMetadata.privacy={network:{"*":settingMetadata},services:{"*":settingMetadata},websites:{"*":settingMetadata}},wrapObject(extensionAPIs,staticWrappers,apiMetadata)};module2.exports=wrapAPIs(chrome)}})}});var import_webextension_polyfill3=__toESM(require_browser_polyfill(),1);var import_webextension_polyfill=__toESM(require_browser_polyfill(),1);function toJsonHandler(data){return data.json()}function toData(data){return data}function sendResponseHandler(sendResponse){return data=>sendResponse(data)}var AHS={J_D:[toJsonHandler,toData],J_S:[toJsonHandler,sendResponseHandler],S:[sendResponseHandler]};function apiListenerFactory(API_MAP){return async(message,sender,sendResponse)=>{let contentScriptQuery=message.contentScriptQuery;if(!contentScriptQuery||!API_MAP[contentScriptQuery])return console.error(`Cannot find this contentScriptQuery: ${contentScriptQuery}`);if(API_MAP[contentScriptQuery]instanceof Function)return API_MAP[contentScriptQuery](message,sender,sendResponse);let api=API_MAP[contentScriptQuery];return doRequest(message,api,sendResponse)}}function doRequest(message,api,sendResponse,cookies){try{let{contentScriptQuery,...rest}=message;rest=rest||{};let{_fetch,url,params={},afterHandle}=api,{method,headers={},body}=_fetch,isGET=method.toLocaleLowerCase()==="get",targetParams=Object.assign({},params),targetBody=Object.assign({},body);if(Object.keys(rest).forEach(key=>{body&&body[key]!==void 0?targetBody[key]=rest[key]:targetParams[key]=rest[key]}),Object.keys(targetParams).length){let urlParams=new URLSearchParams;for(let key in targetParams)targetParams[key]&&urlParams.append(key,targetParams[key]);url+=`?${urlParams.toString()}`}if(isGET||(targetBody=headers&&headers["Content-Type"]&&headers["Content-Type"].includes("application/x-www-form-urlencoded")?new URLSearchParams(targetBody):JSON.stringify(targetBody)),cookies){let cookieStr=cookies.map(cookie=>`${cookie.name}=${cookie.value}`).join("; ");headers["firefox-multi-account-cookie"]=cookieStr}let fetchOpt={method,headers};!isGET&&Object.assign(fetchOpt,{body:targetBody});let baseFunc=fetch(url,{...fetchOpt});return afterHandle.forEach(func=>{func.name===sendResponseHandler.name&&sendResponse?baseFunc=baseFunc.then(sendResponseHandler(sendResponse)):baseFunc=baseFunc.then(func)}),baseFunc.catch(console.error),baseFunc}catch(e){console.error(e)}}var API_ANIME={getPopularAnimeList:{url:"https://api.bilibili.com/pgc/web/rank/list",_fetch:{method:"get"},params:{season_type:1,day:3},afterHandle:AHS.J_D},getAnimeWatchList:{url:"https://api.bilibili.com/x/space/bangumi/follow/list",_fetch:{method:"get"},params:{pn:1,ps:15,type:1,follow_status:0,vmid:""},afterHandle:AHS.J_D},getRecommendAnimeList:{url:"https://api.bilibili.com/pgc/page/web/v3/feed",_fetch:{method:"get"},params:{coursor:0,name:"anime"},afterHandle:AHS.J_D},getAnimeTimeTable:{url:"https://api.bilibili.com/pgc/web/timeline",_fetch:{method:"get"},params:{types:1,before:6,after:6},afterHandle:AHS.J_D},getAnimeDetail:{url:"https://api.bilibili.com/pgc/view/web/season",_fetch:{method:"get"},params:{},afterHandle:AHS.J_D}},anime_default=API_ANIME;var API_AUTH={logout:{url:"https://passport.bilibili.com/login/exit/v2",_fetch:{method:"post",headers:{"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},body:{biliCSRF:""}},params:{biliCSRF:""},afterHandle:AHS.J_S},getLoginQRCode:{url:"https://passport.bilibili.com/x/passport-tv-login/qrcode/auth_code",_fetch:{method:"post",headers:{"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"}},params:{appkey:"4409e2ce8ffd12b8",local_id:"0",ts:"0",sign:"e134154ed6add881d28fbdf68653cd9c"},afterHandle:AHS.J_S},qrCodeLogin:{url:"https://passport.bilibili.com/x/passport-tv-login/qrcode/auth_code",_fetch:{method:"post",headers:{"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"}},params:{appkey:"4409e2ce8ffd12b8",auth_code:"",local_id:"0",ts:"0",sign:"e134154ed6add881d28fbdf68653cd9c"},afterHandle:AHS.J_S}},auth_default=API_AUTH;var API_FAVORITE={getFavoriteCategories:{url:"https://api.bilibili.com/x/v3/fav/folder/created/list-all",_fetch:{method:"get"},params:{up_mid:""},afterHandle:AHS.J_D},getFavoriteResources:{url:"https://api.bilibili.com/x/v3/fav/resource/list",_fetch:{method:"get"},params:{media_id:-1,pn:1,ps:20,keyword:"",order:"mtime",type:0,tid:0,platform:"web"},afterHandle:AHS.J_D},patchDelFavoriteResources:{url:"https://api.bilibili.com/x/v3/fav/resource/batch-del",_fetch:{method:"post"},params:{resources:"",media_id:0,csrf:""},afterHandle:AHS.J_D}},favorite_default=API_FAVORITE;var API_HISTORY={getHistoryList:{url:"https://api.bilibili.com/x/web-interface/history/cursor",_fetch:{method:"get"},params:{ps:20,type:"",view_at:0},afterHandle:AHS.J_D},searchHistoryList:{url:"https://api.bilibili.com/x/web-interface/history/search",_fetch:{method:"get"},params:{pn:1,keyword:"",business:"all"},afterHandle:AHS.J_D},deleteHistoryItem:{url:"https://api.bilibili.com/x/v2/history/delete",_fetch:{method:"post",headers:{"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},body:{kid:"",csrf:""}},afterHandle:AHS.J_D},clearAllHistory:{url:"https://api.bilibili.com/x/v2/history/clear",_fetch:{method:"post",headers:{"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},body:{csrf:""}},afterHandle:AHS.J_D},getHistoryPauseStatus:{url:"https://api.bilibili.com/x/v2/history/shadow",_fetch:{method:"get"},params:{},afterHandle:AHS.J_D},setHistoryPauseStatus:{url:"https://api.bilibili.com/x/v2/history/shadow/set",_fetch:{method:"post",headers:{"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},body:{switch:!1,csrf:""}},afterHandle:AHS.J_D}},history_default=API_HISTORY;var API_LIVE={getFollowingLiveList:{url:"https://api.live.bilibili.com/xlive/web-ucenter/user/following",_fetch:{method:"get"},params:{page:1,page_size:9,ignoreRecord:1,hit_ab:!0},afterHandle:AHS.J_D}},live_default=API_LIVE;var API_MOMENT={getTopBarNewMomentsCount:{url:"https://api.bilibili.com/x/web-interface/dynamic/entrance",_fetch:{method:"get"},params:{},afterHandle:AHS.J_D},getTopBarMoments:{url:"https://api.bilibili.com/x/polymer/web-dynamic/v1/feed/nav",_fetch:{method:"get"},params:{type:"video",update_baseline:"",offset:""},afterHandle:AHS.J_D},getTopBarLiveMoments:{url:"https://api.live.bilibili.com/xlive/web-ucenter/v1/xfetter/FeedList",_fetch:{method:"get"},params:{page:1,pagesize:10},afterHandle:AHS.J_D},getMoments:{url:"https://api.bilibili.com/x/polymer/web-dynamic/v1/feed/all",_fetch:{method:"get"},params:{type:"all",offset:0,update_baseline:""},afterHandle:AHS.J_D}},moment_default=API_MOMENT;var API_NOTIFICATION={getUnreadMsg:{url:"https://api.bilibili.com/x/msgfeed/unread",_fetch:{method:"get"},params:{build:0,mobi_app:"web"},afterHandle:AHS.J_D},getUnreadDm:{url:"https://api.vc.bilibili.com/session_svr/v1/session_svr/single_unread",_fetch:{method:"get"},params:{build:0,mobi_app:"web",unread_type:0},afterHandle:AHS.J_D}},notification_default=API_NOTIFICATION;var API_RANKING={getRankingVideos:{url:"https://api.bilibili.com/x/web-interface/ranking/v2",_fetch:{method:"get"},params:{rid:0,type:"all"},afterHandle:AHS.J_D},getRankingPgc:{url:"https://api.bilibili.com/pgc/season/rank/web/list",_fetch:{method:"get"},params:{season_type:1,day:3},afterHandle:AHS.J_D}},ranking_default=API_RANKING;var API_SEARCH={getSearchSuggestion:{url:"https://s.search.bilibili.com/main/suggest",_fetch:{method:"get"},params:{term:"",highlight:""},afterHandle:AHS.J_D}},search_default=API_SEARCH;var API_USER={getUserInfo:{url:"https://api.bilibili.com/x/web-interface/nav",_fetch:{method:"get"},afterHandle:AHS.J_D},getUserStat:{url:"https://api.bilibili.com/x/web-interface/nav/stat",_fetch:{method:"get"},afterHandle:AHS.J_D},relationModify:{url:"https://api.bilibili.com/x/relation/modify",_fetch:{method:"post"},params:{fid:"",act:1,re_src:11},afterHandle:AHS.J_D}},user_default=API_USER;var API_VIDEO={getRecommendVideos:{url:"https://api.bilibili.com/x/web-interface/index/top/feed/rcmd",_fetch:{method:"get"},params:{fresh_idx:0,feed_version:"V2",fresh_type:4,ps:30,plat:1},afterHandle:AHS.J_D},getAppRecommendVideos:{url:"https://app.bilibili.com/x/v2/feed/index",_fetch:{method:"get"},params:{build:74800100,device:"pad",mobi_app:"iphone",c_locate:"CN",s_locale:"zh-CN",idx:0,appkey:"27eb53fc9058f8c3",access_key:""},afterHandle:AHS.J_D},dislikeVideo:{url:"https://app.bilibili.com/x/feed/dislike",_fetch:{method:"get"},params:{access_key:"",goto:"",id:0,idx:"",reason_id:1,device:"",mobi_app:"",build:0,appkey:"",sign:""},afterHandle:AHS.J_D},undoDislikeVideo:{url:"https://app.bilibili.com/x/feed/dislike/cancel",_fetch:{method:"get"},params:{access_key:"",goto:"",id:0,idx:0,reason_id:1,device:"",mobi_app:"",build:0,sign:"",appkey:""},afterHandle:AHS.J_D},getVideoInfo:{url:"https://api.bilibili.com/x/web-interface/view",_fetch:{method:"get"},params:{aid:"",bvid:""},afterHandle:AHS.J_D},getVideoComments:{url:"https://api.bilibili.com/x/v2/reply",_fetch:{method:"get"},params:{csrf:"",type:1,oid:0,sort:0,nohot:0,pn:1,ps:20},afterHandle:AHS.J_D},getPopularVideos:{url:"https://api.bilibili.com/x/web-interface/popular",_fetch:{method:"get"},params:{pn:1,ps:20},afterHandle:AHS.J_D},getVideoPreview:{url:"https://api.bilibili.com/x/player/wbi/playurl",_fetch:{method:"get"},params:{qn:32,fnver:0,fnval:1,bvid:"",cid:0},afterHandle:AHS.J_D}},video_default=API_VIDEO;var API_WATCHLATER={saveToWatchLater:{url:"https://api.bilibili.com/x/v2/history/toview/add",_fetch:{method:"post",headers:{"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},body:{aid:0,csrf:""}},afterHandle:AHS.J_D},removeFromWatchLater:{url:"https://api.bilibili.com/x/v2/history/toview/del",_fetch:{method:"post",headers:{"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},body:{viewed:!1,csrf:""}},params:{aid:0},afterHandle:AHS.J_D},getAllWatchLaterList:{url:"https://api.bilibili.com/x/v2/history/toview",_fetch:{method:"get"},afterHandle:AHS.J_D},clearAllWatchLater:{url:"https://api.bilibili.com/x/v2/history/toview/clear",_fetch:{method:"post",headers:{"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},body:{csrf:""}},afterHandle:AHS.J_D}},watchLater_default=API_WATCHLATER;var API_COLLECTION={AUTH:auth_default,ANIME:anime_default,HISTORY:history_default,FAVORITE:favorite_default,MOMENT:moment_default,NOTIFICATION:notification_default,RANKING:ranking_default,SEARCH:search_default,USER:user_default,VIDEO:video_default,WATCHLATER:watchLater_default,LIVE:live_default,[Symbol.iterator](){return Object.values(this).values()}},FullAPI=Object.assign({},...API_COLLECTION),handleMessage=apiListenerFactory(FullAPI);function setupApiMsgLstnrs(){import_webextension_polyfill.default.runtime.onConnect.removeListener(handleConnect),import_webextension_polyfill.default.runtime.onConnect.addListener(handleConnect)}function handleConnect(){import_webextension_polyfill.default.runtime.onMessage.removeListener(handleMessage),import_webextension_polyfill.default.runtime.onMessage.addListener(handleMessage)}var import_webextension_polyfill2=__toESM(require_browser_polyfill(),1);function handleMessage2(message){if(message.contentScriptQuery==="openLinkInBackground")return import_webextension_polyfill2.default.tabs.create({url:message.url,active:!1})}function setupTabMsgLstnrs(){import_webextension_polyfill2.default.runtime.onMessage.removeListener(handleConnect2),import_webextension_polyfill2.default.runtime.onMessage.addListener(handleConnect2)}function handleConnect2(){import_webextension_polyfill2.default.runtime.onMessage.removeListener(handleMessage2),import_webextension_polyfill2.default.runtime.onMessage.addListener(handleMessage2)}import_webextension_polyfill3.default.runtime.onInstalled.addListener(async()=>{console.log("Extension installed")});setupApiMsgLstnrs();setupTabMsgLstnrs();
