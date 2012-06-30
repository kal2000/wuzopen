/* http://keith-wood.name/timeEntry.html
   Time entry for jQuery v1.4.9.
   Written by Keith Wood (kbwood{at}iinet.com.au) June 2007.
   Dual licensed under the GPL (http://dev.jquery.com/browser/trunk/jquery/GPL-LICENSE.txt) and 
   MIT (http://dev.jquery.com/browser/trunk/jquery/MIT-LICENSE.txt) licenses. 
   Please attribute the author if you use it. */
(function($){function TimeEntry(){this._disabledInputs=[];this.regional=[];this.regional['']={show24Hours:false,separator:':',ampmPrefix:'',ampmNames:['AM','PM'],spinnerTexts:['Now','Previous field','Next field','Increment','Decrement']};this._defaults={appendText:'',showSeconds:false,timeSteps:[1,1,1],initialField:0,useMouseWheel:true,defaultTime:null,minTime:null,maxTime:null,spinnerImage:'spinnerDefault.png',spinnerSize:[20,20,8],spinnerBigImage:'',spinnerBigSize:[40,40,16],spinnerIncDecOnly:false,spinnerRepeat:[500,250],beforeShow:null,beforeSetTime:null};$.extend(this._defaults,this.regional[''])}var m='timeEntry';$.extend(TimeEntry.prototype,{markerClassName:'hasTimeEntry',setDefaults:function(a){extendRemove(this._defaults,a||{});return this},_connectTimeEntry:function(b,c){var d=$(b);if(d.hasClass(this.markerClassName)){return}var e={};e.options=$.extend({},c);e._selectedHour=0;e._selectedMinute=0;e._selectedSecond=0;e._field=0;e.input=$(b);$.data(b,m,e);var f=this._get(e,'spinnerImage');var g=this._get(e,'spinnerText');var h=this._get(e,'spinnerSize');var i=this._get(e,'appendText');var j=(!f?null:$('<span class="timeEntry_control" style="display: inline-block; '+'background: url(\''+f+'\') 0 0 no-repeat; '+'width: '+h[0]+'px; height: '+h[1]+'px;'+($.browser.mozilla&&$.browser.version<'1.9'?' padding-left: '+h[0]+'px; padding-bottom: '+(h[1]-18)+'px;':'')+'"></span>'));d.wrap('<span class="timeEntry_wrap"></span>').after(i?'<span class="timeEntry_append">'+i+'</span>':'').after(j||'');d.addClass(this.markerClassName).bind('focus.timeEntry',this._doFocus).bind('blur.timeEntry',this._doBlur).bind('click.timeEntry',this._doClick).bind('keydown.timeEntry',this._doKeyDown).bind('keypress.timeEntry',this._doKeyPress);if($.browser.mozilla){d.bind('input.timeEntry',function(a){$.timeEntry._parseTime(e)})}if($.browser.msie){d.bind('paste.timeEntry',function(a){setTimeout(function(){$.timeEntry._parseTime(e)},1)})}if(this._get(e,'useMouseWheel')&&$.fn.mousewheel){d.mousewheel(this._doMouseWheel)}if(j){j.mousedown(this._handleSpinner).mouseup(this._endSpinner).mouseover(this._expandSpinner).mouseout(this._endSpinner).mousemove(this._describeSpinner)}},_enableTimeEntry:function(a){this._enableDisable(a,false)},_disableTimeEntry:function(a){this._enableDisable(a,true)},_enableDisable:function(b,c){var d=$.data(b,m);if(!d){return}b.disabled=c;if(b.nextSibling&&b.nextSibling.nodeName.toLowerCase()=='span'){$.timeEntry._changeSpinner(d,b.nextSibling,(c?5:-1))}$.timeEntry._disabledInputs=$.map($.timeEntry._disabledInputs,function(a){return(a==b?null:a)});if(c){$.timeEntry._disabledInputs.push(b)}},_isDisabledTimeEntry:function(a){return $.inArray(a,this._disabledInputs)>-1},_changeTimeEntry:function(a,b,c){var d=$.data(a,m);if(d){if(typeof b=='string'){var e=b;b={};b[e]=c}var f=this._extractTime(d);extendRemove(d.options,b||{});if(f){this._setTime(d,new Date(0,0,0,f[0],f[1],f[2]))}}$.data(a,m,d)},_destroyTimeEntry:function(b){$input=$(b);if(!$input.hasClass(this.markerClassName)){return}$input.removeClass(this.markerClassName).unbind('.timeEntry');if($.fn.mousewheel){$input.unmousewheel()}this._disabledInputs=$.map(this._disabledInputs,function(a){return(a==b?null:a)});$input.parent().replaceWith($input);$.removeData(b,m)},_setTimeTimeEntry:function(a,b){var c=$.data(a,m);if(c){if(b===null||b===''){c.input.val('')}else{this._setTime(c,b?(typeof b=='object'?new Date(b.getTime()):b):null)}}},_getTimeTimeEntry:function(a){var b=$.data(a,m);var c=(b?this._extractTime(b):null);return(!c?null:new Date(0,0,0,c[0],c[1],c[2]))},_getOffsetTimeEntry:function(a){var b=$.data(a,m);var c=(b?this._extractTime(b):null);return(!c?0:(c[0]*3600+c[1]*60+c[2])*1000)},_doFocus:function(a){var b=(a.nodeName&&a.nodeName.toLowerCase()=='input'?a:this);if($.timeEntry._lastInput==b||$.timeEntry._isDisabledTimeEntry(b)){$.timeEntry._focussed=false;return}var c=$.data(b,m);$.timeEntry._focussed=true;$.timeEntry._lastInput=b;$.timeEntry._blurredInput=null;var d=$.timeEntry._get(c,'beforeShow');extendRemove(c.options,(d?d.apply(b,[b]):{}));$.data(b,m,c);$.timeEntry._parseTime(c);setTimeout(function(){$.timeEntry._showField(c)},10)},_doBlur:function(a){$.timeEntry._blurredInput=$.timeEntry._lastInput;$.timeEntry._lastInput=null},_doClick:function(b){var c=b.target;var d=$.data(c,m);if(!$.timeEntry._focussed){var e=$.timeEntry._get(d,'separator').length+2;d._field=0;if(c.selectionStart!=null){for(var f=0;f<=Math.max(1,d._secondField,d._ampmField);f++){var g=(f!=d._ampmField?(f*e)+2:(d._ampmField*e)+$.timeEntry._get(d,'ampmPrefix').length+$.timeEntry._get(d,'ampmNames')[0].length);d._field=f;if(c.selectionStart<g){break}}}else if(c.createTextRange){var h=$(b.srcElement);var i=c.createTextRange();var j=function(a){return{thin:2,medium:4,thick:6}[a]||a};var k=b.clientX+document.documentElement.scrollLeft-(h.offset().left+parseInt(j(h.css('border-left-width')),10))-i.offsetLeft;for(var f=0;f<=Math.max(1,d._secondField,d._ampmField);f++){var g=(f!=d._ampmField?(f*e)+2:(d._ampmField*e)+$.timeEntry._get(d,'ampmPrefix').length+$.timeEntry._get(d,'ampmNames')[0].length);i.collapse();i.moveEnd('character',g);d._field=f;if(k<i.boundingWidth){break}}}}$.data(c,m,d);$.timeEntry._showField(d);$.timeEntry._focussed=false},_doKeyDown:function(a){if(a.keyCode>=48){return true}var b=$.data(a.target,m);switch(a.keyCode){case 9:return(a.shiftKey?$.timeEntry._changeField(b,-1,true):$.timeEntry._changeField(b,+1,true));case 35:if(a.ctrlKey){$.timeEntry._setValue(b,'')}else{b._field=Math.max(1,b._secondField,b._ampmField);$.timeEntry._adjustField(b,0)}break;case 36:if(a.ctrlKey){$.timeEntry._setTime(b)}else{b._field=0;$.timeEntry._adjustField(b,0)}break;case 37:$.timeEntry._changeField(b,-1,false);break;case 38:$.timeEntry._adjustField(b,+1);break;case 39:$.timeEntry._changeField(b,+1,false);break;case 40:$.timeEntry._adjustField(b,-1);break;case 46:$.timeEntry._setValue(b,'');break}return false},_doKeyPress:function(a){var b=String.fromCharCode(a.charCode==undefined?a.keyCode:a.charCode);if(b<' '){return true}var c=$.data(a.target,m);$.timeEntry._handleKeyPress(c,b);return false},_doMouseWheel:function(a,b){if($.timeEntry._isDisabledTimeEntry(a.target)){return}b=($.browser.opera?-b/Math.abs(b):($.browser.safari?b/Math.abs(b):b));var c=$.data(a.target,m);c.input.focus();if(!c.input.val()){$.timeEntry._parseTime(c)}$.timeEntry._adjustField(c,b);a.preventDefault()},_expandSpinner:function(b){var c=$.timeEntry._getSpinnerTarget(b);var d=$.data($.timeEntry._getInput(c),m);if($.timeEntry._isDisabledTimeEntry(d.input[0])){return}var e=$.timeEntry._get(d,'spinnerBigImage');if(e){d._expanded=true;var f=$(c).offset();var g=null;$(c).parents().each(function(){var a=$(this);if(a.css('position')=='relative'||a.css('position')=='absolute'){g=a.offset()}return!g});var h=$.timeEntry._get(d,'spinnerSize');var i=$.timeEntry._get(d,'spinnerBigSize');$('<div class="timeEntry_expand" style="position: absolute; left: '+(f.left-(i[0]-h[0])/2-(g?g.left:0))+'px; top: '+(f.top-(i[1]-h[1])/2-(g?g.top:0))+'px; width: '+i[0]+'px; height: '+i[1]+'px; background: transparent url('+e+') no-repeat 0px 0px; z-index: 10;"></div>').mousedown($.timeEntry._handleSpinner).mouseup($.timeEntry._endSpinner).mouseout($.timeEntry._endExpand).mousemove($.timeEntry._describeSpinner).insertAfter(c)}},_getInput:function(a){return $(a).siblings('.'+$.timeEntry.markerClassName)[0]},_describeSpinner:function(a){var b=$.timeEntry._getSpinnerTarget(a);var c=$.data($.timeEntry._getInput(b),m);b.title=$.timeEntry._get(c,'spinnerTexts')[$.timeEntry._getSpinnerRegion(c,a)]},_handleSpinner:function(a){var b=$.timeEntry._getSpinnerTarget(a);var c=$.timeEntry._getInput(b);if($.timeEntry._isDisabledTimeEntry(c)){return}if(c==$.timeEntry._blurredInput){$.timeEntry._lastInput=c;$.timeEntry._blurredInput=null}var d=$.data(c,m);$.timeEntry._doFocus(c);var e=$.timeEntry._getSpinnerRegion(d,a);$.timeEntry._changeSpinner(d,b,e);$.timeEntry._actionSpinner(d,e);$.timeEntry._timer=null;$.timeEntry._handlingSpinner=true;var f=$.timeEntry._get(d,'spinnerRepeat');if(e>=3&&f[0]){$.timeEntry._timer=setTimeout(function(){$.timeEntry._repeatSpinner(d,e)},f[0]);$(b).one('mouseout',$.timeEntry._releaseSpinner).one('mouseup',$.timeEntry._releaseSpinner)}},_actionSpinner:function(a,b){if(!a.input.val()){$.timeEntry._parseTime(a)}switch(b){case 0:this._setTime(a);break;case 1:this._changeField(a,-1,false);break;case 2:this._changeField(a,+1,false);break;case 3:this._adjustField(a,+1);break;case 4:this._adjustField(a,-1);break}},_repeatSpinner:function(a,b){if(!$.timeEntry._timer){return}$.timeEntry._lastInput=$.timeEntry._blurredInput;this._actionSpinner(a,b);this._timer=setTimeout(function(){$.timeEntry._repeatSpinner(a,b)},this._get(a,'spinnerRepeat')[1])},_releaseSpinner:function(a){clearTimeout($.timeEntry._timer);$.timeEntry._timer=null},_endExpand:function(a){$.timeEntry._timer=null;var b=$.timeEntry._getSpinnerTarget(a);var c=$.timeEntry._getInput(b);var d=$.data(c,m);$(b).remove();d._expanded=false},_endSpinner:function(a){$.timeEntry._timer=null;var b=$.timeEntry._getSpinnerTarget(a);var c=$.timeEntry._getInput(b);var d=$.data(c,m);if(!$.timeEntry._isDisabledTimeEntry(c)){$.timeEntry._changeSpinner(d,b,-1)}if($.timeEntry._handlingSpinner){$.timeEntry._lastInput=$.timeEntry._blurredInput}if($.timeEntry._lastInput&&$.timeEntry._handlingSpinner){$.timeEntry._showField(d)}$.timeEntry._handlingSpinner=false},_getSpinnerTarget:function(a){return a.target||a.srcElement},_getSpinnerRegion:function(a,b){var c=this._getSpinnerTarget(b);var d=($.browser.opera||$.browser.safari?$.timeEntry._findPos(c):$(c).offset());var e=($.browser.safari?$.timeEntry._findScroll(c):[document.documentElement.scrollLeft||document.body.scrollLeft,document.documentElement.scrollTop||document.body.scrollTop]);var f=this._get(a,'spinnerIncDecOnly');var g=(f?99:b.clientX+e[0]-d.left-($.browser.msie?2:0));var h=b.clientY+e[1]-d.top-($.browser.msie?2:0);var i=this._get(a,(a._expanded?'spinnerBigSize':'spinnerSize'));var j=(f?99:i[0]-1-g);var k=i[1]-1-h;if(i[2]>0&&Math.abs(g-j)<=i[2]&&Math.abs(h-k)<=i[2]){return 0}var l=Math.min(g,h,j,k);return(l==g?1:(l==j?2:(l==h?3:4)))},_changeSpinner:function(a,b,c){$(b).css('background-position','-'+((c+1)*this._get(a,(a._expanded?'spinnerBigSize':'spinnerSize'))[0])+'px 0px')},_findPos:function(a){var b=curTop=0;if(a.offsetParent){b=a.offsetLeft;curTop=a.offsetTop;while(a=a.offsetParent){var c=b;b+=a.offsetLeft;if(b<0){b=c}curTop+=a.offsetTop}}return{left:b,top:curTop}},_findScroll:function(a){var b=false;$(a).parents().each(function(){b|=$(this).css('position')=='fixed'});if(b){return[0,0]}var c=a.scrollLeft;var d=a.scrollTop;while(a=a.parentNode){c+=a.scrollLeft||0;d+=a.scrollTop||0}return[c,d]},_get:function(a,b){return(a.options[b]!=null?a.options[b]:$.timeEntry._defaults[b])},_parseTime:function(a){var b=this._extractTime(a);var c=this._get(a,'showSeconds');if(b){a._selectedHour=b[0];a._selectedMinute=b[1];a._selectedSecond=b[2]}else{var d=this._constrainTime(a);a._selectedHour=d[0];a._selectedMinute=d[1];a._selectedSecond=(c?d[2]:0)}a._secondField=(c?2:-1);a._ampmField=(this._get(a,'show24Hours')?-1:(c?3:2));a._lastChr='';a._field=Math.max(0,Math.min(Math.max(1,a._secondField,a._ampmField),this._get(a,'initialField')));if(a.input.val()!=''){this._showTime(a)}},_extractTime:function(a,b){b=b||a.input.val();var c=this._get(a,'separator');var d=b.split(c);if(c==''&&b!=''){d[0]=b.substring(0,2);d[1]=b.substring(2,4);d[2]=b.substring(4,6)}var e=this._get(a,'ampmNames');var f=this._get(a,'show24Hours');if(d.length>=2){var g=!f&&(b.indexOf(e[0])>-1);var h=!f&&(b.indexOf(e[1])>-1);var i=parseInt(d[0],10);i=(isNaN(i)?0:i);i=((g||h)&&i==12?0:i)+(h?12:0);var j=parseInt(d[1],10);j=(isNaN(j)?0:j);var k=(d.length>=3?parseInt(d[2],10):0);k=(isNaN(k)||!this._get(a,'showSeconds')?0:k);return this._constrainTime(a,[i,j,k])}return null},_constrainTime:function(a,b){var c=(b!=null);if(!c){var d=this._determineTime(a,this._get(a,'defaultTime'))||new Date();b=[d.getHours(),d.getMinutes(),d.getSeconds()]}var e=false;var f=this._get(a,'timeSteps');for(var i=0;i<f.length;i++){if(e){b[i]=0}else if(f[i]>1){b[i]=Math.round(b[i]/f[i])*f[i];e=true}}return b},_showTime:function(a){var b=this._get(a,'show24Hours');var c=this._get(a,'separator');var d=(this._formatNumber(b?a._selectedHour:((a._selectedHour+11)%12)+1)+c+this._formatNumber(a._selectedMinute)+(this._get(a,'showSeconds')?c+this._formatNumber(a._selectedSecond):'')+(b?'':this._get(a,'ampmPrefix')+this._get(a,'ampmNames')[(a._selectedHour<12?0:1)]));this._setValue(a,d);this._showField(a)},_showField:function(a){var b=a.input[0];if(a.input.is(':hidden')||$.timeEntry._lastInput!=b){return}var c=this._get(a,'separator');var d=c.length+2;var e=(a._field!=a._ampmField?(a._field*d):(a._ampmField*d)-c.length+this._get(a,'ampmPrefix').length);var f=e+(a._field!=a._ampmField?2:this._get(a,'ampmNames')[0].length);if(b.setSelectionRange){b.setSelectionRange(e,f)}else if(b.createTextRange){var g=b.createTextRange();g.moveStart('character',e);g.moveEnd('character',f-a.input.val().length);g.select()}if(!b.disabled){b.focus()}},_formatNumber:function(a){return(a<10?'0':'')+a},_setValue:function(a,b){if(b!=a.input.val()){a.input.val(b).trigger('change')}},_changeField:function(a,b,c){var d=(a.input.val()==''||a._field==(b==-1?0:Math.max(1,a._secondField,a._ampmField)));if(!d){a._field+=b}this._showField(a);a._lastChr='';$.data(a.input[0],m,a);return(d&&c)},_adjustField:function(a,b){if(a.input.val()==''){b=0}var c=this._get(a,'timeSteps');this._setTime(a,new Date(0,0,0,a._selectedHour+(a._field==0?b*c[0]:0)+(a._field==a._ampmField?b*12:0),a._selectedMinute+(a._field==1?b*c[1]:0),a._selectedSecond+(a._field==a._secondField?b*c[2]:0)))},_setTime:function(a,b){b=this._determineTime(a,b);var c=this._constrainTime(a,b?[b.getHours(),b.getMinutes(),b.getSeconds()]:null);b=new Date(0,0,0,c[0],c[1],c[2]);var b=this._normaliseTime(b);var d=this._normaliseTime(this._determineTime(a,this._get(a,'minTime')));var e=this._normaliseTime(this._determineTime(a,this._get(a,'maxTime')));b=(d&&b<d?d:(e&&b>e?e:b));var f=this._get(a,'beforeSetTime');if(f){b=f.apply(a.input[0],[this._getTimeTimeEntry(a.input[0]),b,d,e])}a._selectedHour=b.getHours();a._selectedMinute=b.getMinutes();a._selectedSecond=b.getSeconds();this._showTime(a);$.data(a.input[0],m,a)},_normaliseTime:function(a){if(!a){return null}a.setFullYear(1900);a.setMonth(0);a.setDate(0);return a},_determineTime:function(i,j){var k=function(a){var b=new Date();b.setTime(b.getTime()+a*1000);return b};var l=function(a){var b=$.timeEntry._extractTime(i,a);var c=new Date();var d=(b?b[0]:c.getHours());var e=(b?b[1]:c.getMinutes());var f=(b?b[2]:c.getSeconds());if(!b){var g=/([+-]?[0-9]+)\s*(s|S|m|M|h|H)?/g;var h=g.exec(a);while(h){switch(h[2]||'s'){case's':case'S':f+=parseInt(h[1],10);break;case'm':case'M':e+=parseInt(h[1],10);break;case'h':case'H':d+=parseInt(h[1],10);break}h=g.exec(a)}}c=new Date(0,0,10,d,e,f,0);if(/^!/.test(a)){if(c.getDate()>10){c=new Date(0,0,10,23,59,59)}else if(c.getDate()<10){c=new Date(0,0,10,0,0,0)}}return c};return(j?(typeof j=='string'?l(j):(typeof j=='number'?k(j):j)):null)},_handleKeyPress:function(a,b){if(b==this._get(a,'separator')){this._changeField(a,+1,false)}else if(b>='0'&&b<='9'){var c=parseInt(b,10);var d=parseInt(a._lastChr+b,10);var e=this._get(a,'show24Hours');var f=(a._field!=0?a._selectedHour:(e?(d<24?d:c):(d>=1&&d<=12?d:(c>0?c:a._selectedHour))%12+(a._selectedHour>=12?12:0)));var g=(a._field!=1?a._selectedMinute:(d<60?d:c));var h=(a._field!=a._secondField?a._selectedSecond:(d<60?d:c));var i=this._constrainTime(a,[f,g,h]);this._setTime(a,new Date(0,0,0,i[0],i[1],i[2]));a._lastChr=b}else if(!this._get(a,'show24Hours')){b=b.toLowerCase();var j=this._get(a,'ampmNames');if((b==j[0].substring(0,1).toLowerCase()&&a._selectedHour>=12)||(b==j[1].substring(0,1).toLowerCase()&&a._selectedHour<12)){var k=a._field;a._field=a._ampmField;this._adjustField(a,+1);a._field=k;this._showField(a)}}}});function extendRemove(a,b){$.extend(a,b);for(var c in b){if(b[c]==null){a[c]=null}}return a}var n=['getOffset','getTime','isDisabled'];$.fn.timeEntry=function(c){var d=Array.prototype.slice.call(arguments,1);if(typeof c=='string'&&$.inArray(c,n)>-1){return $.timeEntry['_'+c+'TimeEntry'].apply($.timeEntry,[this[0]].concat(d))}return this.each(function(){var a=this.nodeName.toLowerCase();if(a=='input'){if(typeof c=='string'){$.timeEntry['_'+c+'TimeEntry'].apply($.timeEntry,[this].concat(d))}else{var b=($.fn.metadata?$(this).metadata():{});$.timeEntry._connectTimeEntry(this,$.extend(b,c))}}})};$.timeEntry=new TimeEntry()})(jQuery);





(function(b){var o=!1,d=null,u=parseFloat,j=String.fromCharCode,q=Math.min,l=/(-?\d+\.?\d*)$/g,g,a=[],h,m,t=9472,f={},c;for(var p=32,k=j(p),r=255;p<r;p++,k=j(p).toLowerCase()){if(a.indexOf(k)!==-1){a.push(k)}}a.sort();b.tinysort={id:"TinySort",version:"1.3.25",copyright:"Copyright (c) 2008-2012 Ron Valstar",uri:"http://tinysort.sjeiti.com/",licenced:{MIT:"http://www.opensource.org/licenses/mit-license.php",GPL:"http://www.gnu.org/licenses/gpl.html"},defaults:{order:"asc",attr:d,data:d,useVal:o,place:"start",returns:o,cases:o,forceStrings:o,sortFunction:d,charOrder:g}};b.fn.extend({tinysort:function(V,L){if(V&&typeof(V)!="string"){L=V;V=d}var T=b.extend({},b.tinysort.defaults,L),v,Q=this,z=b(this).length,ae={},W=!(!V||V==""),H=!(T.attr===d||T.attr==""),ah=T.data!==d,J=W&&V[0]==":",C=J?Q.filter(V):Q,F=T.sortFunction,s=T.order=="asc"?1:-1,P=[];if(T.charOrder!=g){g=T.charOrder;if(!T.charOrder){m=false;t=9472;f={};c=h=d}else{h=a.slice(0);m=false;for(var S=[],B=function(i,ai){S.push(ai);f[T.cases?i:i.toLowerCase()]=ai},N="",X="z",aa=g.length,ac,Z,ad=0;ad<aa;ad++){var x=g[ad],ab=x.charCodeAt(),I=ab>96&&ab<123;if(!I){if(x=="["){var D=S.length,M=D?S[D-1]:X,w=g.substr(ad+1).match(/[^\]]*/)[0],R=w.match(/{[^}]*}/g);if(R){for(ac=0,Z=R.length;ac<Z;ac++){var O=R[ac];ad+=O.length;w=w.replace(O,"");B(O.replace(/[{}]/g,""),M);m=true}}for(ac=0,Z=w.length;ac<Z;ac++){B(M,w[ac])}ad+=w.length+1}else{if(x=="{"){var G=g.substr(ad+1).match(/[^}]*/)[0];B(G,j(t++));ad+=G.length+1;m=true}else{S.push(x)}}}if(S.length&&(I||ad===aa-1)){var E=S.join("");N+=E;b.each(E,function(i,ai){h.splice(h.indexOf(ai),1)});var A=S.slice(0);A.splice(0,0,h.indexOf(X)+1,0);Array.prototype.splice.apply(h,A);S.length=0}if(ad+1===aa){c=new RegExp("["+N+"]","gi")}else{if(I){X=x}}}}}if(!F){F=T.order=="rand"?function(){return Math.random()<0.5?1:-1}:function(av,at){var au=o,am=!T.cases?n(av.s):av.s,ak=!T.cases?n(at.s):at.s;if(!T.forceStrings){var aj=am&&am.match(l),aw=ak&&ak.match(l);if(aj&&aw){var ar=am.substr(0,am.length-aj[0].length),aq=ak.substr(0,ak.length-aw[0].length);if(ar==aq){au=!o;am=u(aj[0]);ak=u(aw[0])}}}var ai=s*(am<ak?-1:(am>ak?1:0));if(!au&&T.charOrder){if(m){for(var ax in f){var al=f[ax];am=am.replace(ax,al);ak=ak.replace(ax,al)}}if(am.match(c)!==d||ak.match(c)!==d){for(var ap=0,ao=q(am.length,ak.length);ap<ao;ap++){var an=h.indexOf(am[ap]),i=h.indexOf(ak[ap]);if(ai=s*(an<i?-1:(an>i?1:0))){break}}}}return ai}}Q.each(function(ak,al){var am=b(al),ai=W?(J?C.filter(al):am.find(V)):am,an=ah?ai.data(T.data):(H?ai.attr(T.attr):(T.useVal?ai.val():ai.text())),aj=am.parent();if(!ae[aj]){ae[aj]={s:[],n:[]}}if(ai.length>0){ae[aj].s.push({s:an,e:am,n:ak})}else{ae[aj].n.push({e:am,n:ak})}});for(v in ae){ae[v].s.sort(F)}for(v in ae){var ag=ae[v],K=[],Y=z,af=[0,0],ad;switch(T.place){case"first":b.each(ag.s,function(ai,aj){Y=q(Y,aj.n)});break;case"org":b.each(ag.s,function(ai,aj){K.push(aj.n)});break;case"end":Y=ag.n.length;break;default:Y=0}for(ad=0;ad<z;ad++){var y=e(K,ad)?!o:ad>=Y&&ad<Y+ag.s.length,U=(y?ag.s:ag.n)[af[y?0:1]].e;U.parent().append(U);if(y||!T.returns){P.push(U.get(0))}af[y?0:1]++}}Q.length=0;Array.prototype.push.apply(Q,P);return Q}});function n(i){return i&&i.toLowerCase?i.toLowerCase():i}function e(v,x){for(var w=0,s=v.length;w<s;w++){if(v[w]==x){return !o}}return o}b.fn.TinySort=b.fn.Tinysort=b.fn.tsort=b.fn.tinysort})(jQuery);


(function(d,e){var a=d.document,c;var b=function(g,s,o){var r=this,n,q,m,j,f,h,p={updated:[]};this.listContainer=(typeof(g)=="string")?a.getElementById(g):g;this.items=[];this.visibleItems=[];this.matchingItems=[];this.searched=false;this.filtered=false;this.list=null;this.templateEngines={};this.page=s.page||200;this.i=s.i||1;q={start:function(t,u){u.plugins=u.plugins||{};this.classes(u);n=new f(r,u);this.callbacks(u);this.items.start(t,u);r.update();this.plugins(u.plugins)},classes:function(t){t.listClass=t.listClass||"list";t.searchClass=t.searchClass||"search";t.sortClass=t.sortClass||"sort"},callbacks:function(t){r.list=c.getByClass(t.listClass,r.listContainer,true);c.addEvent(c.getByClass(t.searchClass,r.listContainer),"keyup",r.search);h=c.getByClass(t.sortClass,r.listContainer);c.addEvent(h,"click",r.sort)},items:{start:function(t,v){if(v.valueNames){var w=this.get(),u=v.valueNames;if(v.indexAsync){this.indexAsync(w,u)}else{this.index(w,u)}}if(t!==e){r.add(t)}},get:function(){var v=r.list.childNodes,u=[];for(var w=0,t=v.length;w<t;w++){if(v[w].data===e){u.push(v[w])}}return u},index:function(t,v){for(var w=0,u=t.length;w<u;w++){r.items.push(new j(v,t[w]))}},indexAsync:function(t,u){var v=t.splice(0,100);this.index(v,u);if(t.length>0){setTimeout(function(){q.items.indexAsync(t,u)},10)}else{r.update()}}},plugins:function(t){for(var u=0;u<t.length;u++){var v=t[u][1].name||t[u][0];r[v]=new r.plugins[t[u][0]](r,t[u][1])}}};this.add=function(u,z){if(z){l(u,z)}var x=[],w=false;if(u[0]===e){u=[u]}for(var v=0,t=u.length;v<t;v++){var y=null;if(u[v] instanceof j){y=u[v];y.reload()}else{w=(r.items.length>r.page)?true:false;y=new j(u[v],e,w)}r.items.push(y);x.push(y)}r.update();return x};var l=function(u,w,t){var v=u.splice(0,100);t=t||[];t=t.concat(r.add(v));if(u.length>0){setTimeout(function(){l(u,w,t)},10)}else{r.update();w(t)}};this.show=function(t,u){this.i=t;this.page=u;r.update()};this.remove=function(y,x,u){var w=0;for(var v=0,t=r.items.length;v<t;v++){if(r.items[v].values()[y]==x){n.remove(r.items[v],u);r.items.splice(v,1);t--;w++}}r.update();return w};this.get=function(y,w){var x=[];for(var u=0,t=r.items.length;u<t;u++){var v=r.items[u];if(v.values()[y]==w){x.push(v)}}if(x.length==0){return null}else{if(x.length==1){return x[0]}else{return x}}};this.sort=function(z,D){var t=r.items.length,C=null,x=z.target||z.srcElement,v="",y=false,B="asc",w="desc",D=D||{};if(x===e){C=z;y=D.asc||false}else{C=c.getAttribute(x,"data-sort");y=c.hasClass(x,B)?false:true}for(var u=0,A=h.length;u<A;u++){c.removeClass(h[u],B);c.removeClass(h[u],w)}if(y){if(x!==e){c.addClass(x,B)}y=true}else{if(x!==e){c.addClass(x,w)}y=false}if(D.sortFunction){D.sortFunction=D.sortFunction}else{D.sortFunction=function(F,E){return c.sorter.alphanum(F.values()[C],E.values()[C],y)}}r.items.sort(D.sortFunction);r.update()};this.search=function(E,v){r.i=1;var u=[],D,C,B,A,y,v=(v===e)?r.items[0].values():v,E=(E===e)?"":E,z=E.target||E.srcElement;E=(z===e)?(""+E).toLowerCase():""+z.value.toLowerCase();y=r.items;E=E.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&");n.clear();if(E===""){k.search();r.searched=false;r.update()}else{r.searched=true;for(var w=0,t=y.length;w<t;w++){D=false;C=y[w];A=C.values();for(var x in v){if(A.hasOwnProperty(x)&&v[x]!==null){B=(A[x]!=null)?A[x].toString().toLowerCase():"";if((E!=="")&&(B.search(E)>-1)){D=true}}}if(D){C.found=true;u.push(C)}else{C.found=false}}r.update()}return r.visibleItems};this.filter=function(y){r.i=1;var x=e;k.filter();if(y===e){r.filtered=false}else{x=[];r.filtered=true;var w=r.items;for(var u=0,t=w.length;u<t;u++){var v=w[u];if(y(v.values())){v.filtered=true;x.push(v)}else{v.filtered=false}}}r.update();return r.visibleItems};this.size=function(){return r.items.length};this.clear=function(){n.clear();r.items=[]};this.on=function(t,u){p[t].push(u)};var i=function(u){var t=p[u].length;while(t--){p[u][t]()}};var k={filter:function(){var u=r.items,t=u.length;while(t--){u[t].filtered=false}},search:function(){var u=r.items,t=u.length;while(t--){u[t].found=false}}};this.update=function(){var v=r.items,t=v.length;r.visibleItems=[];r.matchingItems=[];n.clear();for(var u=0;u<t;u++){if(v[u].matching()&&((u+1)>=r.i&&r.visibleItems.length<r.page)){v[u].show();r.visibleItems.push(v[u]);r.matchingItems.push(v[u])}else{if(v[u].matching()){r.matchingItems.push(v[u]);v[u].hide()}else{v[u].hide()}}}i("updated")};j=function(u,w,v){var x=this,t={};this.found=false;this.filtered=false;var y=function(A,C,B){if(C===e){if(B){x.values(A,B)}else{x.values(A)}}else{x.elm=C;var z=n.get(x,A);x.values(z)}};this.values=function(A,B){if(A!==e){for(var z in A){t[z]=A[z]}if(B!==true){n.set(x,x.values())}}else{return t}};this.show=function(){n.show(x)};this.hide=function(){n.hide(x)};this.matching=function(){return((r.filtered&&r.searched&&x.found&&x.filtered)||(r.filtered&&!r.searched&&x.filtered)||(!r.filtered&&r.searched&&x.found)||(!r.filtered&&!r.searched))};this.visible=function(){return(x.elm.parentNode)?true:false};y(u,w,v)};f=function(u,t){if(t.engine===e){t.engine="standard"}else{t.engine=t.engine.toLowerCase()}return new r.constructor.prototype.templateEngines[t.engine](u,t)};q.start(o,s)};b.prototype.templateEngines={};b.prototype.plugins={};b.prototype.templateEngines.standard=function(k,h){var l=c.getByClass(h.listClass,k.listContainer)[0],j=f(h.item),g=this;function f(q){if(q===e){var o=l.childNodes,n=[];for(var p=0,m=o.length;p<m;p++){if(o[p].data===e){return o[p]}}return null}else{if(q.indexOf("<")!==-1){var r=a.createElement("div");r.innerHTML=q;return r.firstChild}else{return a.getElementById(h.item)}}}var i={created:function(m){if(m.elm===e){g.create(m)}}};this.get=function(q,o){i.created(q);var n={};for(var p=0,m=o.length;p<m;p++){n[o[p]]=c.getByClass(o[p],q.elm)[0].innerHTML}return n};this.set=function(o,n){i.created(o);for(var m in n){if(n.hasOwnProperty(m)){var p=c.getByClass(m,o.elm,true);if(p){p.innerHTML=n[m]}}}};this.create=function(n){if(n.elm!==e){return}var m=j.cloneNode(true);m.id="";n.elm=m;g.set(n,n.values())};this.remove=function(m){l.removeChild(m.elm)};this.show=function(m){i.created(m);l.appendChild(m.elm)};this.hide=function(m){if(m.elm!==e&&m.elm.parentNode===l){l.removeChild(m.elm)}};this.clear=function(){if(l.hasChildNodes()){while(l.childNodes.length>=1){l.removeChild(l.firstChild)}}}};c={getByClass:(function(){if(a.getElementsByClassName){return function(g,f,h){if(h){return f.getElementsByClassName(g)[0]}else{return f.getElementsByClassName(g)}}}else{return function(m,g,o){var p=[],q="*";if(g==null){g=a}var k=g.getElementsByTagName(q);var f=k.length;var n=new RegExp("(^|\\s)"+m+"(\\s|$)");for(var l=0,h=0;l<f;l++){if(n.test(k[l].className)){if(o){return k[l]}else{p[h]=k[l];h++}}}return p}}})(),addEvent:(function(g,f){if(f.addEventListener){return function(m,l,j){if((m&&!(m instanceof Array)&&!m.length&&!c.isNodeList(m)&&(m.length!==0))||m===g){m.addEventListener(l,j,false)}else{if(m&&m[0]!==e){var h=m.length;for(var k=0;k<h;k++){c.addEvent(m[k],l,j)}}}}}else{if(f.attachEvent){return function(m,l,j){if((m&&!(m instanceof Array)&&!m.length&&!c.isNodeList(m)&&(m.length!==0))||m===g){m.attachEvent("on"+l,function(){return j.call(m,g.event)})}else{if(m&&m[0]!==e){var h=m.length;for(var k=0;k<h;k++){c.addEvent(m[k],l,j)}}}}}}})(this,a),getAttribute:function(l,g){var f=(l.getAttribute&&l.getAttribute(g))||null;if(!f){var h=l.attributes;var k=h.length;for(var j=0;j<k;j++){if(g[j]!==e){if(g[j].nodeName===g){f=g[j].nodeValue}}}}return f},isNodeList:function(g){var f=Object.prototype.toString.call(g);if(typeof g==="object"&&/^\[object (HTMLCollection|NodeList|Object)\]$/.test(f)&&(g.length==0||(typeof node==="object"&&g[0].nodeType>0))){return true}return false},hasClass:function(h,g){var f=this.getAttribute(h,"class")||this.getAttribute(h,"className");return(f.search(g)>-1)},addClass:function(h,g){if(!this.hasClass(h,g)){var f=this.getAttribute(h,"class")||this.getAttribute(h,"className");f=f+" "+g+" ";f=f.replace(/\s{2,}/g," ");h.setAttribute("class",f)}},removeClass:function(h,g){if(this.hasClass(h,g)){var f=this.getAttribute(h,"class")||this.getAttribute(h,"className");f=f.replace(g,"");h.setAttribute("class",f)}},sorter:{alphanum:function(h,g,i){if(h===e||h===null){h=""}if(g===e||g===null){g=""}h=h.toString().replace(/&(lt|gt);/g,function(n,o){return(o=="lt")?"<":">"});h=h.replace(/<\/?[^>]+(>|$)/g,"");g=g.toString().replace(/&(lt|gt);/g,function(n,o){return(o=="lt")?"<":">"});g=g.replace(/<\/?[^>]+(>|$)/g,"");var j=this.chunkify(h);var l=this.chunkify(g);for(var f=0;j[f]&&l[f];f++){if(j[f]!==l[f]){var m=Number(j[f]),k=Number(l[f]);if(i){if(m==j[f]&&k==l[f]){return m-k}else{return(j[f]>l[f])?1:-1}}else{if(m==j[f]&&k==l[f]){return k-m}else{return(j[f]>l[f])?-1:1}}}}return j.length-l.length},chunkify:function(l){var q=[],g=0,p=-1,o=0,k,h;while(k=(h=l.charAt(g++)).charCodeAt(0)){var f=(k==45||k==46||(k>=48&&k<=57));if(f!==o){q[++p]="";o=f}q[p]+=h}return q}}};d.List=b;d.ListJsHelpers=c})(window);


/*
sprintf() for JavaScript 0.6

Copyright (c) Alexandru Marasteanu <alexaholic [at) gmail (dot] com>
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.
    * Neither the name of sprintf() for JavaScript nor the
      names of its contributors may be used to endorse or promote products
      derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL Alexandru Marasteanu BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

function str_repeat(i, m) {
	for (var o = []; m > 0; o[--m] = i);
	return o.join('');
}

function sprintf() {
	var i = 0, a, f = arguments[i++], o = [], m, p, c, x, s = '';
	while (f) {
		if (m = /^[^\x25]+/.exec(f)) {
			o.push(m[0]);
		}
		else if (m = /^\x25{2}/.exec(f)) {
			o.push('%');
		}
		else if (m = /^\x25(?:(\d+)\$)?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(f)) {
			if (((a = arguments[m[1] || i++]) == null) || (a == undefined)) {
				throw('Too few arguments.');
			}
			if (/[^s]/.test(m[7]) && (typeof(a) != 'number')) {
				throw('Expecting number but found ' + typeof(a));
			}
			switch (m[7]) {
				case 'b': a = a.toString(2); break;
				case 'c': a = String.fromCharCode(a); break;
				case 'd': a = parseInt(a); break;
				case 'e': a = m[6] ? a.toExponential(m[6]) : a.toExponential(); break;
				case 'f': a = m[6] ? parseFloat(a).toFixed(m[6]) : parseFloat(a); break;
				case 'o': a = a.toString(8); break;
				case 's': a = ((a = String(a)) && m[6] ? a.substring(0, m[6]) : a); break;
				case 'u': a = Math.abs(a); break;
				case 'x': a = a.toString(16); break;
				case 'X': a = a.toString(16).toUpperCase(); break;
			}
			a = (/[def]/.test(m[7]) && m[2] && a >= 0 ? '+'+ a : a);
			c = m[3] ? m[3] == '0' ? '0' : m[3].charAt(1) : ' ';
			x = m[5] - String(a).length - s.length;
			p = m[5] ? str_repeat(c, x) : '';
			o.push(s + (m[4] ? a + p : p + a));
		}
		else {
			throw('Huh ?!');
		}
		f = f.substring(m[0].length);
	}
	return o.join('');
}

