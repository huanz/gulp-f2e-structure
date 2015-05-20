define("backbone/1.1.2/backbone-debug",["underscore/1.8.3/underscore-debug","jquery/jquery-cmd"],function(require,t){var e=this,i=t,s=require("underscore/1.8.3/underscore-debug"),n=require("jquery/jquery-cmd"),r=e.Backbone,a=[],h=a.slice;i.VERSION="1.1.2",i.$=n,i.noConflict=function(){return e.Backbone=r,this},i.emulateHTTP=!1,i.emulateJSON=!1;var o=i.Events={on:function(t,e,i){if(!c(this,"on",t,[e,i])||!e)return this;this._events||(this._events={});var s=this._events[t]||(this._events[t]=[]);return s.push({callback:e,context:i,ctx:i||this}),this},once:function(t,e,i){if(!c(this,"once",t,[e,i])||!e)return this;var n=this,r=s.once(function(){n.off(t,r),e.apply(this,arguments)});return r._callback=e,this.on(t,r,i)},off:function(t,e,i){if(!this._events||!c(this,"off",t,[e,i]))return this;if(!t&&!e&&!i)return this._events=void 0,this;for(var n=t?[t]:s.keys(this._events),r=0,a=n.length;a>r;r++){t=n[r];var h=this._events[t];if(h)if(e||i){for(var o=[],u=0,l=h.length;l>u;u++){var d=h[u];(e&&e!==d.callback&&e!==d.callback._callback||i&&i!==d.context)&&o.push(d)}o.length?this._events[t]=o:delete this._events[t]}else delete this._events[t]}return this},trigger:function(t){if(!this._events)return this;var e=h.call(arguments,1);if(!c(this,"trigger",t,e))return this;var i=this._events[t],s=this._events.all;return i&&l(i,e),s&&l(s,arguments),this},stopListening:function(t,e,i){var n=this._listeningTo;if(!n)return this;var r=!e&&!i;i||"object"!=typeof e||(i=this),t&&((n={})[t._listenId]=t);for(var a in n)t=n[a],t.off(e,i,this),(r||s.isEmpty(t._events))&&delete this._listeningTo[a];return this}},u=/\s+/,c=function(t,e,i,s){if(!i)return!0;if("object"==typeof i){for(var n in i)t[e].apply(t,[n,i[n]].concat(s));return!1}if(u.test(i)){for(var r=i.split(u),a=0,h=r.length;h>a;a++)t[e].apply(t,[r[a]].concat(s));return!1}return!0},l=function(t,e){var i,s=-1,n=t.length,r=e[0],a=e[1],h=e[2];switch(e.length){case 0:for(;++s<n;)(i=t[s]).callback.call(i.ctx);return;case 1:for(;++s<n;)(i=t[s]).callback.call(i.ctx,r);return;case 2:for(;++s<n;)(i=t[s]).callback.call(i.ctx,r,a);return;case 3:for(;++s<n;)(i=t[s]).callback.call(i.ctx,r,a,h);return;default:for(;++s<n;)(i=t[s]).callback.apply(i.ctx,e);return}},d={listenTo:"on",listenToOnce:"once"};s.each(d,function(t,e){o[e]=function(e,i,n){var r=this._listeningTo||(this._listeningTo={}),a=e._listenId||(e._listenId=s.uniqueId("l"));return r[a]=e,n||"object"!=typeof i||(n=this),e[t](i,n,this),this}}),o.bind=o.on,o.unbind=o.off,s.extend(i,o);var f=i.Model=function(t,e){var i=t||{};e||(e={}),this.cid=s.uniqueId("c"),this.attributes={},e.collection&&(this.collection=e.collection),e.parse&&(i=this.parse(i,e)||{}),i=s.defaults({},i,s.result(this,"defaults")),this.set(i,e),this.changed={},this.initialize.apply(this,arguments)};s.extend(f.prototype,o,{changed:null,validationError:null,idAttribute:"id",initialize:function(){},toJSON:function(){return s.clone(this.attributes)},sync:function(){return i.sync.apply(this,arguments)},get:function(t){return this.attributes[t]},escape:function(t){return s.escape(this.get(t))},has:function(t){return null!=this.get(t)},set:function(t,e,i){var n,r,a,h,o,u,c,l;if(null==t)return this;if("object"==typeof t?(r=t,i=e):(r={})[t]=e,i||(i={}),!this._validate(r,i))return!1;a=i.unset,o=i.silent,h=[],u=this._changing,this._changing=!0,u||(this._previousAttributes=s.clone(this.attributes),this.changed={}),l=this.attributes,c=this._previousAttributes,this.idAttribute in r&&(this.id=r[this.idAttribute]);for(n in r)e=r[n],s.isEqual(l[n],e)||h.push(n),s.isEqual(c[n],e)?delete this.changed[n]:this.changed[n]=e,a?delete l[n]:l[n]=e;if(!o){h.length&&(this._pending=i);for(var d=0,f=h.length;f>d;d++)this.trigger("change:"+h[d],this,l[h[d]],i)}if(u)return this;if(!o)for(;this._pending;)i=this._pending,this._pending=!1,this.trigger("change",this,i);return this._pending=!1,this._changing=!1,this},unset:function(t,e){return this.set(t,void 0,s.extend({},e,{unset:!0}))},clear:function(t){var e={};for(var i in this.attributes)e[i]=void 0;return this.set(e,s.extend({},t,{unset:!0}))},hasChanged:function(t){return null==t?!s.isEmpty(this.changed):s.has(this.changed,t)},changedAttributes:function(t){if(!t)return this.hasChanged()?s.clone(this.changed):!1;var e,i=!1,n=this._changing?this._previousAttributes:this.attributes;for(var r in t)s.isEqual(n[r],e=t[r])||((i||(i={}))[r]=e);return i},previous:function(t){return null!=t&&this._previousAttributes?this._previousAttributes[t]:null},previousAttributes:function(){return s.clone(this._previousAttributes)},fetch:function(t){t=t?s.clone(t):{},void 0===t.parse&&(t.parse=!0);var e=this,i=t.success;return t.success=function(s){return e.set(e.parse(s,t),t)?(i&&i(e,s,t),void e.trigger("sync",e,s,t)):!1},j(this,t),this.sync("read",this,t)},save:function(t,e,i){var n,r,a,h=this.attributes;if(null==t||"object"==typeof t?(n=t,i=e):(n={})[t]=e,i=s.extend({validate:!0},i),n&&!i.wait){if(!this.set(n,i))return!1}else if(!this._validate(n,i))return!1;n&&i.wait&&(this.attributes=s.extend({},h,n)),void 0===i.parse&&(i.parse=!0);var o=this,u=i.success;return i.success=function(t){o.attributes=h;var e=o.parse(t,i);return i.wait&&(e=s.extend(n||{},e)),s.isObject(e)&&!o.set(e,i)?!1:(u&&u(o,t,i),void o.trigger("sync",o,t,i))},j(this,i),r=this.isNew()?"create":i.patch?"patch":"update","patch"===r&&(i.attrs=n),a=this.sync(r,this,i),n&&i.wait&&(this.attributes=h),a},destroy:function(t){t=t?s.clone(t):{};var e=this,i=t.success,n=function(){e.trigger("destroy",e,e.collection,t)};if(t.success=function(s){(t.wait||e.isNew())&&n(),i&&i(e,s,t),e.isNew()||e.trigger("sync",e,s,t)},this.isNew())return t.success(),!1;j(this,t);var r=this.sync("delete",this,t);return t.wait||n(),r},url:function(){var t=s.result(this,"urlRoot")||s.result(this.collection,"url")||O();return this.isNew()?t:t.replace(/([^\/])$/,"$1/")+encodeURIComponent(this.id)},parse:function(t){return t},clone:function(){return new this.constructor(this.attributes)},isNew:function(){return!this.has(this.idAttribute)},isValid:function(t){return this._validate({},s.extend(t||{},{validate:!0}))},_validate:function(t,e){if(!e.validate||!this.validate)return!0;t=s.extend({},this.attributes,t);var i=this.validationError=this.validate(t,e)||null;return i?(this.trigger("invalid",this,i,s.extend(e,{validationError:i})),!1):!0}});var p=["keys","values","pairs","invert","pick","omit"];s.each(p,function(t){s[t]&&(f.prototype[t]=function(){var e=h.call(arguments);return e.unshift(this.attributes),s[t].apply(s,e)})});var g=i.Collection=function(t,e){e||(e={}),e.model&&(this.model=e.model),void 0!==e.comparator&&(this.comparator=e.comparator),this._reset(),this.initialize.apply(this,arguments),t&&this.reset(t,s.extend({silent:!0},e))},v={add:!0,remove:!0,merge:!0},m={add:!0,remove:!1};s.extend(g.prototype,o,{model:f,initialize:function(){},toJSON:function(t){return this.map(function(e){return e.toJSON(t)})},sync:function(){return i.sync.apply(this,arguments)},add:function(t,e){return this.set(t,s.extend({merge:!1},e,m))},remove:function(t,e){var i=!s.isArray(t);t=i?[t]:s.clone(t),e||(e={});for(var n=0,r=t.length;r>n;n++){var a=t[n]=this.get(t[n]);if(a){delete this._byId[a.id],delete this._byId[a.cid];var h=this.indexOf(a);this.models.splice(h,1),this.length--,e.silent||(e.index=h,a.trigger("remove",a,this,e)),this._removeReference(a,e)}}return i?t[0]:t},set:function(t,e){e=s.defaults({},e,v),e.parse&&(t=this.parse(t,e));var i=!s.isArray(t);t=i?t?[t]:[]:t.slice();for(var n,r,a,h,o,u=e.at,c=this.comparator&&null==u&&e.sort!==!1,l=s.isString(this.comparator)?this.comparator:null,d=[],f=[],p={},g=e.add,m=e.merge,_=e.remove,y=!c&&g&&_?[]:!1,b=0,w=t.length;w>b;b++){if(a=t[b]||{},n=this._isModel(a)?r=a:a[this.model.prototype.idAttribute||"id"],h=this.get(n))_&&(p[h.cid]=!0),m&&(a=a===r?r.attributes:a,e.parse&&(a=h.parse(a,e)),h.set(a,e),c&&!o&&h.hasChanged(l)&&(o=!0)),t[b]=h;else if(g){if(r=t[b]=this._prepareModel(a,e),!r)continue;d.push(r),this._addReference(r,e)}r=h||r,r&&(!y||!r.isNew()&&p[r.id]||y.push(r),p[r.id]=!0)}if(_){for(var b=0,w=this.length;w>b;b++)p[(r=this.models[b]).cid]||f.push(r);f.length&&this.remove(f,e)}if(d.length||y&&y.length)if(c&&(o=!0),this.length+=d.length,null!=u)for(var b=0,w=d.length;w>b;b++)this.models.splice(u+b,0,d[b]);else{y&&(this.models.length=0);for(var x=y||d,b=0,w=x.length;w>b;b++)this.models.push(x[b])}if(o&&this.sort({silent:!0}),!e.silent){for(var b=0,w=d.length;w>b;b++)(r=d[b]).trigger("add",r,this,e);(o||y&&y.length)&&this.trigger("sort",this,e)}return i?t[0]:t},reset:function(t,e){e||(e={});for(var i=0,n=this.models.length;n>i;i++)this._removeReference(this.models[i],e);return e.previousModels=this.models,this._reset(),t=this.add(t,s.extend({silent:!0},e)),e.silent||this.trigger("reset",this,e),t},push:function(t,e){return this.add(t,s.extend({at:this.length},e))},pop:function(t){var e=this.at(this.length-1);return this.remove(e,t),e},unshift:function(t,e){return this.add(t,s.extend({at:0},e))},shift:function(t){var e=this.at(0);return this.remove(e,t),e},slice:function(){return h.apply(this.models,arguments)},get:function(t){return null==t?void 0:this._byId[t]||this._byId[t.id]||this._byId[t.cid]},at:function(t){return this.models[t]},where:function(t,e){return s.isEmpty(t)?e?void 0:[]:this[e?"find":"filter"](function(e){for(var i in t)if(t[i]!==e.get(i))return!1;return!0})},findWhere:function(t){return this.where(t,!0)},sort:function(t){if(!this.comparator)throw new Error("Cannot sort a set without a comparator");return t||(t={}),s.isString(this.comparator)||1===this.comparator.length?this.models=this.sortBy(this.comparator,this):this.models.sort(s.bind(this.comparator,this)),t.silent||this.trigger("sort",this,t),this},pluck:function(t){return s.invoke(this.models,"get",t)},fetch:function(t){t=t?s.clone(t):{},void 0===t.parse&&(t.parse=!0);var e=t.success,i=this;return t.success=function(s){var n=t.reset?"reset":"set";i[n](s,t),e&&e(i,s,t),i.trigger("sync",i,s,t)},j(this,t),this.sync("read",this,t)},create:function(t,e){if(e=e?s.clone(e):{},!(t=this._prepareModel(t,e)))return!1;e.wait||this.add(t,e);var i=this,n=e.success;return e.success=function(t,s){e.wait&&i.add(t,e),n&&n(t,s,e)},t.save(null,e),t},parse:function(t){return t},clone:function(){return new this.constructor(this.models,{model:this.model,comparator:this.comparator})},_reset:function(){this.length=0,this.models=[],this._byId={}},_prepareModel:function(t,e){if(this._isModel(t))return t.collection||(t.collection=this),t;e=e?s.clone(e):{},e.collection=this;var i=new this.model(t,e);return i.validationError?(this.trigger("invalid",this,i.validationError,e),!1):i},_isModel:function(t){return t instanceof f},_addReference:function(t){this._byId[t.cid]=t,null!=t.id&&(this._byId[t.id]=t),t.on("all",this._onModelEvent,this)},_removeReference:function(t){this===t.collection&&delete t.collection,t.off("all",this._onModelEvent,this)},_onModelEvent:function(t,e,i,s){("add"!==t&&"remove"!==t||i===this)&&("destroy"===t&&this.remove(e,s),e&&t==="change:"+e.idAttribute&&(delete this._byId[e.previous(e.idAttribute)],null!=e.id&&(this._byId[e.id]=e)),this.trigger.apply(this,arguments))}});var _=["forEach","each","map","collect","reduce","foldl","inject","reduceRight","foldr","find","detect","filter","select","reject","every","all","some","any","include","contains","invoke","max","min","toArray","size","first","head","take","initial","rest","tail","drop","last","without","difference","indexOf","shuffle","lastIndexOf","isEmpty","chain","sample","partition"];s.each(_,function(t){s[t]&&(g.prototype[t]=function(){var e=h.call(arguments);return e.unshift(this.models),s[t].apply(s,e)})});var y=["groupBy","countBy","sortBy","indexBy"];s.each(y,function(t){s[t]&&(g.prototype[t]=function(e,i){var n=s.isFunction(e)?e:function(t){return t.get(e)};return s[t](this.models,n,i)})});var b=i.View=function(t){this.cid=s.uniqueId("view"),t||(t={}),s.extend(this,s.pick(t,x)),this._ensureElement(),this.initialize.apply(this,arguments)},w=/^(\S+)\s*(.*)$/,x=["model","collection","el","id","attributes","className","tagName","events"];s.extend(b.prototype,o,{tagName:"div",$:function(t){return this.$el.find(t)},initialize:function(){},render:function(){return this},remove:function(){return this._removeElement(),this.stopListening(),this},_removeElement:function(){this.$el.remove()},setElement:function(t){return this.undelegateEvents(),this._setElement(t),this.delegateEvents(),this},_setElement:function(t){this.$el=t instanceof i.$?t:i.$(t),this.el=this.$el[0]},delegateEvents:function(t){if(!t&&!(t=s.result(this,"events")))return this;this.undelegateEvents();for(var e in t){var i=t[e];if(s.isFunction(i)||(i=this[t[e]]),i){var n=e.match(w);this.delegate(n[1],n[2],s.bind(i,this))}}return this},delegate:function(t,e,i){this.$el.on(t+".delegateEvents"+this.cid,e,i)},undelegateEvents:function(){return this.$el&&this.$el.off(".delegateEvents"+this.cid),this},undelegate:function(t,e,i){this.$el.off(t+".delegateEvents"+this.cid,e,i)},_createElement:function(t){return document.createElement(t)},_ensureElement:function(){if(this.el)this.setElement(s.result(this,"el"));else{var t=s.extend({},s.result(this,"attributes"));this.id&&(t.id=s.result(this,"id")),this.className&&(t["class"]=s.result(this,"className")),this.setElement(this._createElement(s.result(this,"tagName"))),this._setAttributes(t)}},_setAttributes:function(t){this.$el.attr(t)}}),i.sync=function(t,e,n){var r=S[t];s.defaults(n||(n={}),{emulateHTTP:i.emulateHTTP,emulateJSON:i.emulateJSON});var a={type:r,dataType:"json"};if(n.url||(a.url=s.result(e,"url")||O()),null!=n.data||!e||"create"!==t&&"update"!==t&&"patch"!==t||(a.contentType="application/json",a.data=JSON.stringify(n.attrs||e.toJSON(n))),n.emulateJSON&&(a.contentType="application/x-www-form-urlencoded",a.data=a.data?{model:a.data}:{}),n.emulateHTTP&&("PUT"===r||"DELETE"===r||"PATCH"===r)){a.type="POST",n.emulateJSON&&(a.data._method=r);var h=n.beforeSend;n.beforeSend=function(t){return t.setRequestHeader("X-HTTP-Method-Override",r),h?h.apply(this,arguments):void 0}}"GET"===a.type||n.emulateJSON||(a.processData=!1),"PATCH"===a.type&&E&&(a.xhr=function(){return new ActiveXObject("Microsoft.XMLHTTP")});var o=n.error;n.error=function(t,e,i){n.textStatus=e,n.errorThrown=i,o&&o.apply(this,arguments)};var u=n.xhr=i.ajax(s.extend(a,n));return e.trigger("request",e,u,n),u};var E=!("undefined"==typeof window||!window.ActiveXObject||window.XMLHttpRequest&&(new XMLHttpRequest).dispatchEvent),S={create:"POST",update:"PUT",patch:"PATCH","delete":"DELETE",read:"GET"};i.ajax=function(){return i.$.ajax.apply(i.$,arguments)};var k=i.Router=function(t){t||(t={}),t.routes&&(this.routes=t.routes),this._bindRoutes(),this.initialize.apply(this,arguments)},T=/\((.*?)\)/g,H=/(\(\?)?:\w+/g,P=/\*\w+/g,$=/[\-{}\[\]+?.,\\\^$|#\s]/g;s.extend(k.prototype,o,{initialize:function(){},route:function(t,e,n){s.isRegExp(t)||(t=this._routeToRegExp(t)),s.isFunction(e)&&(n=e,e=""),n||(n=this[e]);var r=this;return i.history.route(t,function(s){var a=r._extractParameters(t,s);r.execute(n,a,e)!==!1&&(r.trigger.apply(r,["route:"+e].concat(a)),r.trigger("route",e,a),i.history.trigger("route",r,e,a))}),this},execute:function(t,e){t&&t.apply(this,e)},navigate:function(t,e){return i.history.navigate(t,e),this},_bindRoutes:function(){if(this.routes){this.routes=s.result(this,"routes");for(var t,e=s.keys(this.routes);null!=(t=e.pop());)this.route(t,this.routes[t])}},_routeToRegExp:function(t){return t=t.replace($,"\\$&").replace(T,"(?:$1)?").replace(H,function(t,e){return e?t:"([^/?]+)"}).replace(P,"([^?]*?)"),new RegExp("^"+t+"(?:\\?([\\s\\S]*))?$")},_extractParameters:function(t,e){var i=t.exec(e).slice(1);return s.map(i,function(t,e){return e===i.length-1?t||null:t?decodeURIComponent(t):null})}});var I=i.History=function(){this.handlers=[],s.bindAll(this,"checkUrl"),"undefined"!=typeof window&&(this.location=window.location,this.history=window.history)},A=/^[#\/]|\s+$/g,C=/^\/+|\/+$/g,N=/#.*$/;I.started=!1,s.extend(I.prototype,o,{interval:50,atRoot:function(){var t=this.location.pathname.replace(/[^\/]$/,"$&/");return t===this.root&&!this.location.search},getHash:function(t){var e=(t||this).location.href.match(/#(.*)$/);return e?e[1]:""},getPath:function(){var t=decodeURI(this.location.pathname+this.location.search),e=this.root.slice(0,-1);return t.indexOf(e)||(t=t.slice(e.length)),t.slice(1)},getFragment:function(t){return null==t&&(t=this._hasPushState||!this._wantsHashChange?this.getPath():this.getHash()),t.replace(A,"")},start:function(t){if(I.started)throw new Error("Backbone.history has already been started");I.started=!0,this.options=s.extend({root:"/"},this.options,t),this.root=this.options.root,this._wantsHashChange=this.options.hashChange!==!1,this._hasHashChange="onhashchange"in window,this._wantsPushState=!!this.options.pushState,this._hasPushState=!!(this.options.pushState&&this.history&&this.history.pushState),this.fragment=this.getFragment();var e=window.addEventListener||function(t,e){return attachEvent("on"+t,e)};if(this.root=("/"+this.root+"/").replace(C,"/"),!(this._hasHashChange||!this._wantsHashChange||this._wantsPushState&&this._hasPushState)){var i=document.createElement("iframe");i.src="javascript:0",i.style.display="none",i.tabIndex=-1;var n=document.body;this.iframe=n.insertBefore(i,n.firstChild).contentWindow,this.navigate(this.fragment)}if(this._hasPushState?e("popstate",this.checkUrl,!1):this._wantsHashChange&&this._hasHashChange&&!this.iframe?e("hashchange",this.checkUrl,!1):this._wantsHashChange&&(this._checkUrlInterval=setInterval(this.checkUrl,this.interval)),this._wantsHashChange&&this._wantsPushState){if(!this._hasPushState&&!this.atRoot())return this.location.replace(this.root+"#"+this.getPath()),!0;this._hasPushState&&this.atRoot()&&this.navigate(this.getHash(),{replace:!0})}return this.options.silent?void 0:this.loadUrl()},stop:function(){var t=window.removeEventListener||function(t,e){return detachEvent("on"+t,e)};this._hasPushState?t("popstate",this.checkUrl,!1):this._wantsHashChange&&this._hasHashChange&&!this.iframe&&t("hashchange",this.checkUrl,!1),this.iframe&&(document.body.removeChild(this.iframe.frameElement),this.iframe=null),this._checkUrlInterval&&clearInterval(this._checkUrlInterval),I.started=!1},route:function(t,e){this.handlers.unshift({route:t,callback:e})},checkUrl:function(){var t=this.getFragment();return t===this.fragment&&this.iframe&&(t=this.getHash(this.iframe)),t===this.fragment?!1:(this.iframe&&this.navigate(t),void this.loadUrl())},loadUrl:function(t){return t=this.fragment=this.getFragment(t),s.any(this.handlers,function(e){return e.route.test(t)?(e.callback(t),!0):void 0})},navigate:function(t,e){if(!I.started)return!1;e&&e!==!0||(e={trigger:!!e});var i=this.root+(t=this.getFragment(t||""));if(t=decodeURI(t.replace(N,"")),this.fragment!==t){if(this.fragment=t,""===t&&"/"!==i&&(i=i.slice(0,-1)),this._hasPushState)this.history[e.replace?"replaceState":"pushState"]({},document.title,i);else{if(!this._wantsHashChange)return this.location.assign(i);this._updateHash(this.location,t,e.replace),this.iframe&&t!==this.getHash(this.iframe)&&(e.replace||this.iframe.document.open().close(),this._updateHash(this.iframe.location,t,e.replace))}return e.trigger?this.loadUrl(t):void 0}},_updateHash:function(t,e,i){if(i){var s=t.href.replace(/(javascript:|#).*$/,"");t.replace(s+"#"+e)}else t.hash="#"+e}}),i.history=new I;var R=function(t,e){var i,n=this;i=t&&s.has(t,"constructor")?t.constructor:function(){return n.apply(this,arguments)},s.extend(i,n,e);var r=function(){this.constructor=i};return r.prototype=n.prototype,i.prototype=new r,t&&s.extend(i.prototype,t),i.__super__=n.prototype,i};f.extend=g.extend=k.extend=b.extend=I.extend=R;var O=function(){throw new Error('A "url" property or function must be specified')},j=function(t,e){var i=e.error;e.error=function(s){i&&i(t,s,e),t.trigger("error",t,s,e)}}});