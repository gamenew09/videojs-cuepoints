/*! VideoJS Cuepoints plugin 2014-01-16 */
/*! Author: Carlos Galan Cladera <cgcladera@gmail.com>*/
function Cuepoint(a,b){this.player=a;var c=b||{};this.namespace=c.namespace||"",this.start=c.start||0,this.end=c.end||-1,this.startFn=c.onStart||function(){},this.endFn=c.onEnd||function(){},this.params=c.params||{},this.fired=!1}function vjsCuepoints(a){var b=this;b.cuepoints=b.cuepoints||{},b.cuepoints.init=function(){b.cuepoints.instances=[]},b.cuepoints.destroy=function(){for(var a=0,c=b.cuepoints.instances.length;c>a;a++)b.cuepoints.instances[a].destroy(),b.cuepoints.instances[a]=null;b.cuepoints.instances=null},b.cuepoints._addCuepoint=function(a){var c=new Cuepoint(b,a);return c.activate(),b.cuepoints.instances.push(c),c},b.cuepoints.init(a)}Cuepoint.prototype._process=function(){if(this.player.currentTime()>=this.start&&(this.end<0||this.player.currentTime()<this.end)){if(this.fired)return;this.fired=!0,this._start()}else{if(!this.fired)return;this.fired=!1,this._end()}},Cuepoint.prototype.start=0,Cuepoint.prototype.end=-1,Cuepoint.prototype._start=function(){this.startFn.call(this,this.params)},Cuepoint.prototype._end=function(){this.endFn.call(this,this.params)},Cuepoint.prototype.activate=function(){var a=this;this.processHandler=function(){a._process()},this.player.on("timeupdate",this.processHandler)},Cuepoint.prototype.suspend=function(){this.fired=!1;this.player.off("timeupdate",this.processHandler)},Cuepoint.prototype.destroy=function(){this.player.off("timeupdate",this.processHandler)},videojs.Player.prototype.addCuepoint=function(a){return this.cuepoints._addCuepoint(a)},videojs.Player.prototype.destroyCuepoints=function(){return this.cuepoints.destroy()},videojs.plugin("cuepoints",vjsCuepoints);