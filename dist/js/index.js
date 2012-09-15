var hljs=new function(){function a(a){return a.replace(/&/gm,"&amp;").replace(/</gm,"&lt;")}function b(a){for(var b=0;b<a.childNodes.length;b++){var c=a.childNodes[b];if(c.nodeName=="CODE")return c;if(c.nodeType!=3||!c.nodeValue.match(/\s+/))break}}function d(a,b){var e="";for(var f=0;f<a.childNodes.length;f++)if(a.childNodes[f].nodeType==3){var g=a.childNodes[f].nodeValue;b&&(g=g.replace(/\n/g,"")),e+=g}else a.childNodes[f].nodeName=="BR"?e+="\n":e+=d(a.childNodes[f]);return c&&(e=e.replace(/\r/g,"\n")),e}function e(a){var b=a.className.split(/\s+/);b=b.concat(a.parentNode.className.split(/\s+/));for(var c=0;c<b.length;c++){var d=b[c].replace(/^language-/,"");if(o[d]||d=="no-highlight")return d}}function f(a){var b=[];return function c(a,d){for(var e=0;e<a.childNodes.length;e++)a.childNodes[e].nodeType==3?d+=a.childNodes[e].nodeValue.length:a.childNodes[e].nodeName=="BR"?d+=1:a.childNodes[e].nodeType==1&&(b.push({event:"start",offset:d,node:a.childNodes[e]}),d=c(a.childNodes[e],d),b.push({event:"stop",offset:d,node:a.childNodes[e]}));return d}(a,0),b}function g(b,c,d){function h(){return b.length&&c.length?b[0].offset!=c[0].offset?b[0].offset<c[0].offset?b:c:c[0].event=="start"?b:c:b.length?b:c}function i(b){var c="<"+b.nodeName.toLowerCase();for(var d=0;d<b.attributes.length;d++){var e=b.attributes[d];c+=" "+e.nodeName.toLowerCase(),e.value!==undefined&&e.value!==!1&&e.value!==null&&(c+='="'+a(e.value)+'"')}return c+">"}var e=0,f="",g=[];while(b.length||c.length){var j=h().splice(0,1)[0];f+=a(d.substr(e,j.offset-e)),e=j.offset;if(j.event=="start")f+=i(j.node),g.push(j.node);else if(j.event=="stop"){var k,l=g.length;do l--,k=g[l],f+="</"+k.nodeName.toLowerCase()+">";while(k!=j.node);g.splice(l,1);while(l<g.length)f+=i(g[l]),l++}}return f+a(d.substr(e))}function h(a){function b(b,c){return RegExp(b,"m"+(a.cI?"i":"")+(c?"g":""))}function c(a,d){if(a.compiled)return;a.compiled=!0;var e=[];if(a.k){var f={};function g(a,b){var c=b.split(" ");for(var d=0;d<c.length;d++){var g=c[d].split("|");f[g[0]]=[a,g[1]?Number(g[1]):1],e.push(g[0])}}a.lR=b(a.l||hljs.IR,!0);if(typeof a.k=="string")g("keyword",a.k);else for(var h in a.k){if(!a.k.hasOwnProperty(h))continue;g(h,a.k[h])}a.k=f}d&&(a.bWK&&(a.b="\\b("+e.join("|")+")\\s"),a.bR=b(a.b?a.b:"\\B|\\b"),!a.e&&!a.eW&&(a.e="\\B|\\b"),a.e&&(a.eR=b(a.e)),a.tE=a.e||"",a.eW&&d.tE&&(a.tE+=(a.e?"|":"")+d.tE)),a.i&&(a.iR=b(a.i)),a.r===undefined&&(a.r=1),a.c||(a.c=[]);for(var i=0;i<a.c.length;i++)a.c[i]=="self"&&(a.c[i]=a),c(a.c[i],a);a.starts&&c(a.starts,d);var j=[];for(var i=0;i<a.c.length;i++)j.push(a.c[i].b);a.tE&&j.push(a.tE),a.i&&j.push(a.i),a.t=j.length?b(j.join("|"),!0):null}c(a)}function i(b,c){function d(a,b){for(var c=0;c<b.c.length;c++){var d=b.c[c].bR.exec(a);if(d&&d.index==0)return b.c[c]}}function e(a,b){if(s[a].e&&s[a].eR.test(b))return 1;if(s[a].eW){var c=e(a-1,b);return c?c+1:0}return 0}function f(a,b){return b.i&&b.iR.test(a)}function g(a,b){var c=s[s.length-1];if(c.t)return c.t.lastIndex=b,c.t.exec(a)}function k(a,b){var c=r.cI?b[0].toLowerCase():b[0],d=a.k[c];return d&&d instanceof Array?d:!1}function l(b,c){b=a(b);if(!c.k)return b;var d="",e=0;c.lR.lastIndex=0;var f=c.lR.exec(b);while(f){d+=b.substr(e,f.index-e);var g=k(c,f);g?(u+=g[1],d+='<span class="'+g[0]+'">'+f[0]+"</span>"):d+=f[0],e=c.lR.lastIndex,f=c.lR.exec(b)}return d+b.substr(e)}function m(a,b){var c;return b.sL==""?c=j(a):c=i(b.sL,a),b.r>0&&(u+=c.keyword_count,t+=c.r),'<span class="'+c.language+'">'+c.value+"</span>"}function n(a,b){return b.sL&&o[b.sL]||b.sL==""?m(a,b):l(a,b)}function p(b,c){var d=b.cN?'<span class="'+b.cN+'">':"";b.rB?(v+=d,b.buffer=""):b.eB?(v+=a(c)+d,b.buffer=""):(v+=d,b.buffer=c),s.push(b),t+=b.r}function q(b,c){var g=s[s.length-1];if(c===undefined){v+=n(g.buffer+b,g);return}var h=d(c,g);if(h)return v+=n(g.buffer+b,g),p(h,c),h.rB;var i=e(s.length-1,c);if(i){var j=g.cN?"</span>":"";g.rE?v+=n(g.buffer+b,g)+j:g.eE?v+=n(g.buffer+b,g)+j+a(c):v+=n(g.buffer+b+c,g)+j;while(i>1)j=s[s.length-2].cN?"</span>":"",v+=j,i--,s.length--;var k=s[s.length-1];return s.length--,s[s.length-1].buffer="",k.starts&&p(k.starts,""),g.rE}if(f(c,g))throw"Illegal"}var r=o[b];h(r);var s=[r];r.buffer="";var t=0,u=0,v="";try{var w,x=0;for(;;){w=g(c,x);if(!w)break;var y=q(c.substr(x,w.index-x),w[0]);x=w.index+(y?0:w[0].length)}return q(c.substr(x),undefined),{r:t,keyword_count:u,value:v,language:b}}catch(z){if(z=="Illegal")return{r:0,keyword_count:0,value:a(c)};throw z}}function j(b){var c={keyword_count:0,r:0,value:a(b)},d=c;for(var e in o){if(!o.hasOwnProperty(e))continue;var f=i(e,b);f.language=e,f.keyword_count+f.r>d.keyword_count+d.r&&(d=f),f.keyword_count+f.r>c.keyword_count+c.r&&(d=c,c=f)}return d.language&&(c.second_best=d),c}function k(a,b,c){return b&&(a=a.replace(/^((<[^>]+>|\t)+)/gm,function(a,c,d,e){return c.replace(/\t/g,b)})),c&&(a=a.replace(/\n/g,"<br>")),a}function l(a,b,h){var l=d(a,h),m=e(a),n,o;if(m=="no-highlight")return;m?n=i(m,l):(n=j(l),m=n.language);var p=f(a);p.length&&(o=document.createElement("pre"),o.innerHTML=n.value,n.value=g(p,f(o),l)),n.value=k(n.value,b,h);var q=a.className;q.match("(\\s|^)(language-)?"+m+"(\\s|$)")||(q=q?q+" "+m:m);if(c&&a.tagName=="CODE"&&a.parentNode.tagName=="PRE"){o=a.parentNode;var r=document.createElement("div");r.innerHTML="<pre><code>"+n.value+"</code></pre>",a=r.firstChild.firstChild,r.firstChild.cN=o.cN,o.parentNode.replaceChild(r.firstChild,o)}else a.innerHTML=n.value;a.className=q,a.result={language:m,kw:n.keyword_count,re:n.r},n.second_best&&(a.second_best={language:n.second_best.language,kw:n.second_best.keyword_count,re:n.second_best.r})}function m(){if(m.called)return;m.called=!0;var a=document.getElementsByTagName("pre");for(var c=0;c<a.length;c++){var d=b(a[c]);d&&l(d,hljs.tabReplace)}}function n(){window.addEventListener?(window.addEventListener("DOMContentLoaded",m,!1),window.addEventListener("load",m,!1)):window.attachEvent?window.attachEvent("onload",m):window.onload=m}var c=typeof navigator!="undefined"&&/MSIE [678]/.test(navigator.userAgent),o={};this.LANGUAGES=o,this.highlight=i,this.highlightAuto=j,this.fixMarkup=k,this.highlightBlock=l,this.initHighlighting=m,this.initHighlightingOnLoad=n,this.IR="[a-zA-Z][a-zA-Z0-9_]*",this.UIR="[a-zA-Z_][a-zA-Z0-9_]*",this.NR="\\b\\d+(\\.\\d+)?",this.CNR="(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",this.BNR="\\b(0b[01]+)",this.RSR="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|\\.|-|-=|/|/=|:|;|<|<<|<<=|<=|=|==|===|>|>=|>>|>>=|>>>|>>>=|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",this.BE={b:"\\\\[\\s\\S]",r:0},this.ASM={cN:"string",b:"'",e:"'",i:"\\n",c:[this.BE],r:0},this.QSM={cN:"string",b:'"',e:'"',i:"\\n",c:[this.BE],r:0},this.CLCM={cN:"comment",b:"//",e:"$"},this.CBLCLM={cN:"comment",b:"/\\*",e:"\\*/"},this.HCM={cN:"comment",b:"#",e:"$"},this.NM={cN:"number",b:this.NR,r:0},this.CNM={cN:"number",b:this.CNR,r:0},this.BNM={cN:"number",b:this.BNR,r:0},this.inherit=function(a,b){var c={};for(var d in a)c[d]=a[d];if(b)for(var d in b)c[d]=b[d];return c}};hljs.LANGUAGES.bash=function(a){var b="true false",c={cN:"variable",b:"\\$[a-zA-Z0-9_]+\\b"},d={cN:"variable",b:"\\${([^}]|\\\\})+}"},e={cN:"string",b:'"',e:'"',i:"\\n",c:[a.BE,c,d],r:0},f={cN:"string",b:"'",e:"'",c:[{b:"''"}],r:0},g={cN:"test_condition",b:"",e:"",c:[e,f,c,d],k:{literal:b},r:0};return{k:{keyword:"if then else fi for break continue while in do done echo exit return set declare",literal:b},c:[{cN:"shebang",b:"(#!\\/bin\\/bash)|(#!\\/bin\\/sh)",r:10},c,d,a.HCM,e,f,a.inherit(g,{b:"\\[ ",e:" \\]",r:0}),a.inherit(g,{b:"\\[\\[ ",e:" \\]\\]"})]}}(hljs),hljs.LANGUAGES.diff=function(a){return{cI:!0,c:[{cN:"chunk",b:"^\\@\\@ +\\-\\d+,\\d+ +\\+\\d+,\\d+ +\\@\\@$",r:10},{cN:"chunk",b:"^\\*\\*\\* +\\d+,\\d+ +\\*\\*\\*\\*$",r:10},{cN:"chunk",b:"^\\-\\-\\- +\\d+,\\d+ +\\-\\-\\-\\-$",r:10},{cN:"header",b:"Index: ",e:"$"},{cN:"header",b:"=====",e:"=====$"},{cN:"header",b:"^\\-\\-\\-",e:"$"},{cN:"header",b:"^\\*{3} ",e:"$"},{cN:"header",b:"^\\+\\+\\+",e:"$"},{cN:"header",b:"\\*{5}",e:"\\*{5}$"},{cN:"addition",b:"^\\+",e:"$"},{cN:"deletion",b:"^\\-",e:"$"},{cN:"change",b:"^\\!",e:"$"}]}}(hljs),hljs.LANGUAGES.javascript=function(a){return{k:{keyword:"in if for while finally var new function do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield const",literal:"true false null undefined NaN Infinity"},c:[a.ASM,a.QSM,a.CLCM,a.CBLCLM,a.CNM,{b:"("+a.RSR+"|\\b(case|return|throw)\\b)\\s*",k:"return throw case",c:[a.CLCM,a.CBLCLM,{cN:"regexp",b:"/",e:"/[gim]*",c:[{b:"\\\\/"}]}],r:0},{cN:"function",bWK:!0,e:"{",k:"function",c:[{cN:"title",b:"[A-Za-z$_][0-9A-Za-z$_]*"},{cN:"params",b:"\\(",e:"\\)",c:[a.CLCM,a.CBLCLM],i:"[\"'\\(]"}],i:"\\[|%"}]}}(hljs),hljs.LANGUAGES.css=function(a){var b={cN:"function",b:a.IR+"\\(",e:"\\)",c:[a.NM,a.ASM,a.QSM]};return{cI:!0,i:"[=/|']",c:[a.CBLCLM,{cN:"id",b:"\\#[A-Za-z0-9_-]+"},{cN:"class",b:"\\.[A-Za-z0-9_-]+",r:0},{cN:"attr_selector",b:"\\[",e:"\\]",i:"$"},{cN:"pseudo",b:":(:)?[a-zA-Z0-9\\_\\-\\+\\(\\)\\\"\\']+"},{cN:"at_rule",b:"@(font-face|page)",l:"[a-z-]+",k:"font-face page"},{cN:"at_rule",b:"@",e:"[{;]",eE:!0,k:"import page media charset",c:[b,a.ASM,a.QSM,a.NM]},{cN:"tag",b:a.IR,r:0},{cN:"rules",b:"{",e:"}",i:"[^\\s]",r:0,c:[a.CBLCLM,{cN:"rule",b:"[^\\s]",rB:!0,e:";",eW:!0,c:[{cN:"attribute",b:"[A-Z\\_\\.\\-]+",e:":",eE:!0,i:"[^\\s]",starts:{cN:"value",eW:!0,eE:!0,c:[b,a.NM,a.QSM,a.ASM,a.CBLCLM,{cN:"hexcolor",b:"\\#[0-9A-F]+"},{cN:"important",b:"!important"}]}}]}]}]}}(hljs),hljs.LANGUAGES.xml=function(a){var b="[A-Za-z0-9\\._:-]+",c={eW:!0,c:[{cN:"attribute",b:b,r:0},{b:'="',rB:!0,e:'"',c:[{cN:"value",b:'"',eW:!0}]},{b:"='",rB:!0,e:"'",c:[{cN:"value",b:"'",eW:!0}]},{b:"=",c:[{cN:"value",b:"[^\\s/>]+"}]}]};return{cI:!0,c:[{cN:"pi",b:"<\\?",e:"\\?>",r:10},{cN:"doctype",b:"<!DOCTYPE",e:">",r:10,c:[{b:"\\[",e:"\\]"}]},{cN:"comment",b:"<!--",e:"-->",r:10},{cN:"cdata",b:"<\\!\\[CDATA\\[",e:"\\]\\]>",r:10},{cN:"tag",b:"<style(?=\\s|>|$)",e:">",k:{title:"style"},c:[c],starts:{e:"</style>",rE:!0,sL:"css"}},{cN:"tag",b:"<script(?=\\s|>|$)",e:">",k:{title:"script"},c:[c],starts:{e:"</script>",rE:!0,sL:"javascript"}},{b:"<%",e:"%>",sL:"vbscript"},{cN:"tag",b:"</?",e:"/?>",c:[{cN:"title",b:"[^ />]+"},c]}]}}(hljs),hljs.LANGUAGES.http=function(a){return{i:"\\S",c:[{cN:"status",b:"^HTTP/[0-9\\.]+",e:"$",c:[{cN:"number",b:"\\b\\d{3}\\b"}]},{cN:"request",b:"^[A-Z]+ (.*?) HTTP/[0-9\\.]+$",rB:!0,e:"$",c:[{cN:"string",b:" ",e:" ",eB:!0,eE:!0}]},{cN:"attribute",b:"^\\w",e:": ",eE:!0,i:"\\n|\\s|=",starts:{cN:"string",e:"$"}},{b:"\\n\\n",starts:{sL:"",eW:!0}}]}}(hljs),hljs.LANGUAGES.sql=function(a){return{cI:!0,i:"[^\\s]",c:[{cN:"operator",b:"(begin|start|commit|rollback|savepoint|lock|alter|create|drop|rename|call|delete|do|handler|insert|load|replace|select|truncate|update|set|show|pragma|grant)\\b",e:";",eW:!0,k:{keyword:"all partial global month current_timestamp using go revoke smallint indicator end-exec disconnect zone with character assertion to add current_user usage input local alter match collate real then rollback get read timestamp session_user not integer bit unique day minute desc insert execute like ilike|2 level decimal drop continue isolation found where constraints domain right national some module transaction relative second connect escape close system_user for deferred section cast current sqlstate allocate intersect deallocate numeric public preserve full goto initially asc no key output collation group by union session both last language constraint column of space foreign deferrable prior connection unknown action commit view or first into float year primary cascaded except restrict set references names table outer open select size are rows from prepare distinct leading create only next inner authorization schema corresponding option declare precision immediate else timezone_minute external varying translation true case exception join hour default double scroll value cursor descriptor values dec fetch procedure delete and false int is describe char as at in varchar null trailing any absolute current_time end grant privileges when cross check write current_date pad begin temporary exec time update catalog user sql date on identity timezone_hour natural whenever interval work order cascade diagnostics nchar having left call do handler load replace truncate start lock show pragma",aggregate:"count sum min max avg"},c:[{cN:"string",b:"'",e:"'",c:[a.BE,{b:"''"}],r:0},{cN:"string",b:'"',e:'"',c:[a.BE,{b:'""'}],r:0},{cN:"string",b:"`",e:"`",c:[a.BE]},a.CNM]},a.CBLCLM,{cN:"comment",b:"--",e:"$"}]}}(hljs),hljs.LANGUAGES.ini=function(a){return{cI:!0,i:"[^\\s]",c:[{cN:"comment",b:";",e:"$"},{cN:"title",b:"^\\[",e:"\\]"},{cN:"setting",b:"^[a-z0-9\\[\\]_-]+[ \\t]*=[ \\t]*",e:"$",c:[{cN:"value",eW:!0,k:"on off true false yes no",c:[a.QSM,a.NM]}]}]}}(hljs),hljs.LANGUAGES.json=function(a){var b={literal:"true false null"},c=[a.QSM,a.CNM],d={cN:"value",e:",",eW:!0,eE:!0,c:c,k:b},e={b:"{",e:"}",c:[{cN:"attribute",b:'\\s*"',e:'"\\s*:\\s*',eB:!0,eE:!0,c:[a.BE],i:"\\n",starts:d}],i:"\\S"},f={b:"\\[",e:"\\]",c:[a.inherit(d,{cN:null})],i:"\\S"};return c.splice(c.length,0,e,f),{c:c,k:b,i:"\\S"}}(hljs),hljs.LANGUAGES.cpp=function(a){var b={keyword:"false int float while private char catch export virtual operator sizeof dynamic_cast|10 typedef const_cast|10 const struct for static_cast|10 union namespace unsigned long throw volatile static protected bool template mutable if public friend do return goto auto void enum else break new extern using true class asm case typeid short reinterpret_cast|10 default double register explicit signed typename try this switch continue wchar_t inline delete alignof char16_t char32_t constexpr decltype noexcept nullptr static_assert thread_local restrict _Bool complex",built_in:"std string cin cout cerr clog stringstream istringstream ostringstream auto_ptr deque list queue stack vector map set bitset multiset multimap unordered_set unordered_map unordered_multiset unordered_multimap array shared_ptr"};return{k:b,i:"</",c:[a.CLCM,a.CBLCLM,a.QSM,{cN:"string",b:"'\\\\?.",e:"'",i:"."},{cN:"number",b:"\\b(\\d+(\\.\\d*)?|\\.\\d+)(u|U|l|L|ul|UL|f|F)"},a.CNM,{cN:"preprocessor",b:"#",e:"$"},{cN:"stl_container",b:"\\b(deque|list|queue|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array)\\s*<",e:">",k:b,r:10,c:["self"]}]}}(hljs);var $preArr=document.getElementsByTagName("pre")||[],$pre,i=$preArr.length;while(i--)$pre=$preArr[i],hljs.highlightBlock($pre);