!function(t,e){"use strict";var i=function(t,e,i){e&&Object.defineProperties(t,e),i&&Object.defineProperties(t.prototype,i)},n=function(){function t(t){var i,n=this,r=arguments[1]===e?{}:arguments[1],o=document.createElement("canvas"),a=o.getContext("2d"),s=document.createElement("canvas"),u=s.getContext("2d"),l=new Image,c=!1;this.options=this._mergeOptions(r),l.src=t.src,l.addEventListener("load",function(){i=h._getOutputDimensions(t,n.options.outputSize),s.width=o.width=i.width,s.height=o.height=i.height,u.drawImage(l,0,0,i.width,i.height),n.dimensions=i,n.imageArray=h._getImageArray(u),n.workingArray=h._getWorkingArray(u),c=!0}),this.loader=function(t){c?t():setTimeout(function(){return n.loader(t)},50)},this.imageArray=[],this.sourceImageElement=t,this.sourceContext=u,this.renderContext=a,this.isRunning=!1,this.iterationCount=0}return i(t,null,{start:{value:function(){var t=this;this.loader(function(){t.isRunning=!0,"undefined"==typeof t._tick?t._run():t._tick()})},writable:!0,enumerable:!0,configurable:!0},stop:{value:function(){return this.isRunning=!1,this.iterationCount},writable:!0,enumerable:!0,configurable:!0},toggle:{value:function(){return this.isRunning?this.stop():this.start()},writable:!0,enumerable:!0,configurable:!0},reset:{value:function(){this.isRunning=!1,this._tick=e,cancelAnimationFrame(this.raf),this.renderContext.clearRect(0,0,this.dimensions.width,this.dimensions.height),this.workingArray=h._getWorkingArray(this.sourceContext),this._removeRenderCanvas()},writable:!0,enumerable:!0,configurable:!0},_mergeOptions:{value:function(t){var e={colorMode:"color",compositeOperation:"lighten",iterationLimit:0,key:"low",lineWidth:2,lineMode:"smooth",origin:["bottom"],outputSize:"original",pathFinderCount:30,speed:7,turningAngle:Math.PI},i={};for(var n in e)e.hasOwnProperty(n)&&(i[n]=t[n]||e[n]);return i.origin=i.origin.constructor===Array?i.origin:e.origin,i.pathFinderCount=this._limitToRange(i.pathFinderCount,1,1e4),i.lineWidth=this._limitToRange(i.lineWidth,1,100),i.speed=this._limitToRange(i.speed,1,100),i.turningAngle=this._limitToRange(i.turningAngle,.1,10),i},writable:!0,enumerable:!0,configurable:!0},_limitToRange:{value:function(t,e,i){return Math.min(Math.max(t,e),i)},writable:!0,enumerable:!0,configurable:!0},_appendRenderCanvas:{value:function(){var t=this.sourceImageElement.parentNode;this.sourceImageElement.style.display="none",t.insertBefore(this.renderContext.canvas,this.sourceImageElement.nextSibling)},writable:!0,enumerable:!0,configurable:!0},_removeRenderCanvas:{value:function(){this.sourceImageElement.style.display="",this.renderContext.canvas.parentNode.removeChild(this.renderContext.canvas)},writable:!0,enumerable:!0,configurable:!0},_run:{value:function(){var t=this,e=[],i=this._initPathFinders(),n={colorMode:this.options.colorMode,lineWidth:this.options.lineWidth,lineMode:this.options.lineMode,speed:this.options.speed};this._appendRenderCanvas(),this.renderContext.globalCompositeOperation=this.options.compositeOperation,i.forEach(function(i){e.push(new s(t.renderContext,i,n))}),this._tick=function(){0<t.options.iterationLimit&&t.options.iterationLimit<=t.iterationCount&&(t.isRunning=!1,t.options.iterationLimit=0),e.forEach(function(t){return t.drawNextLine()}),t.iterationCount++,t.isRunning&&(t.raf=requestAnimationFrame(t._tick))},this._tick()},writable:!0,enumerable:!0,configurable:!0},_initPathFinders:{value:function(){var t=this,e=[],i=this.options.pathFinderCount,n=this.options.origin,r=i/n.length,o={speed:this.options.speed,turningAngle:this.options.turningAngle,key:this.options.key};return-1<n.indexOf("bottom")&&this._seedBottom(r,e,o),-1<n.indexOf("top")&&this._seedTop(r,e,o),-1<n.indexOf("left")&&this._seedLeft(r,e,o),-1<n.indexOf("right")&&this._seedRight(r,e,o),n.forEach(function(i){var n=i.match(/(\d{1,3})% (\d{1,3})%/);n&&t._seedPoint(r,e,o,n[1],n[2])}),e},writable:!0,enumerable:!0,configurable:!0},_seedTop:{value:function(t,e,i){var n=this,r=this.dimensions.width,o=r/t,a=function(t){return o*t-o/2},s=function(){return n.options.speed};i.startingVelocity=[0,this.options.speed],this._seedCreateLoop(t,e,a,s,i)},writable:!0,enumerable:!0,configurable:!0},_seedBottom:{value:function(t,e,i){var n=this,r=this.dimensions.width,o=this.dimensions.height,a=r/t,s=function(t){return a*t-a/2},h=function(){return o-n.options.speed};i.startingVelocity=[0,-this.options.speed],this._seedCreateLoop(t,e,s,h,i)},writable:!0,enumerable:!0,configurable:!0},_seedLeft:{value:function(t,e,i){var n=this,r=this.dimensions.height,o=r/t,a=function(){return n.options.speed},s=function(t){return o*t-o/2};i.startingVelocity=[this.options.speed,0],this._seedCreateLoop(t,e,a,s,i)},writable:!0,enumerable:!0,configurable:!0},_seedRight:{value:function(t,e,i){var n=this,r=this.dimensions.width,o=this.dimensions.height,a=o/t,s=function(){return r-n.options.speed},h=function(t){return a*t-a/2};i.startingVelocity=[-this.options.speed,0],this._seedCreateLoop(t,e,s,h,i)},writable:!0,enumerable:!0,configurable:!0},_seedPoint:{value:function(t,e,i,n,r){for(var a=Math.floor(this.dimensions.width*n/100),s=Math.floor(this.dimensions.height*r/100),u=1;t+1>u;u++){var l=h._indexToRgbString(u),c=u%4;switch(c){case 0:i.startingVelocity=[-this.options.speed,0];break;case 1:i.startingVelocity=[0,this.options.speed];break;case 2:i.startingVelocity=[this.options.speed,0];break;case 3:i.startingVelocity=[0,-this.options.speed]}e.push(new o(this.imageArray,this.workingArray,l,a,s,i))}},writable:!0,enumerable:!0,configurable:!0},_seedCreateLoop:{value:function(t,e,i,n,r){for(var a=1;t+1>a;a++){var s=h._indexToRgbString(a),u=i(a),l=n(a);e.push(new o(this.imageArray,this.workingArray,s,u,l,r))}},writable:!0,enumerable:!0,configurable:!0}}),t}();t.Chromata=n;var r=255,o=function(){function t(t,i,n){var o=arguments[3]===e?0:arguments[3],s=arguments[4]===e?0:arguments[4],h=arguments[5]===e?{}:arguments[5];this.pixelArray=t,this.workingArray=i,this.arrayWidth=t[0].length,this.arrayHeight=t.length,this.x=Math.round(o),this.y=Math.round(s),this.options=h,this.pathQueue=new a(10),this.velocity=h.startingVelocity,this.targetColor="string"==typeof n?this._hexToRgb(n):n,this.rgbIndex=this._getRgbIndex(this.targetColor),this.comparatorFn="low"===this.options.key?function(t,e){return t>0&&e>t}:function(t,e){return t>e&&r>t}}return i(t,null,{getNextPoint:{value:function(){var t,e=0,i=5;do t=this._getNextPixel(),e++;while(i>=e&&t.isPristine===!1);return t.nextPixel},writable:!0,enumerable:!0,configurable:!0},_getNextPixel:{value:function(){for(var t,e,i,n=this._getVelocityAngle(),o="low"===this.options.key?1e5:0,a=this.options.turningAngle,s=Math.round(Math.sqrt(Math.pow(this.velocity[0],2)+Math.pow(this.velocity[1],2))),h=4,u=n-a/2,l=-h/2;n+a/2>=u;u+=a/h,l++){var c=this.x+Math.round(s*Math.cos(u)),g=this.y+Math.round(s*Math.sin(u)),d=r;if(this._isInRange(c,g)){var f=this.workingArray[g][c][this.rgbIndex],p=this.pixelArray[g][c],b=p[3];d=this._getColorDistance(p),this.comparatorFn(d,o)&&!f&&b===r&&(e=[c,g,r-d],o=d)}if(0===l){var m=this.pixelArray;i=m[g]&&m[g][c]&&m[g][c][3]===r?[c,g,r-d]:this.pathQueue.get(-2)}}return t="undefined"!=typeof e,e=e||i,e&&(this.velocity=[e[0]-this.x,e[1]-this.y],this.y=e[1],this.x=e[0],this._updateWorkingArray(e[1],e[0]),this.pathQueue.put(e)),{nextPixel:e,isPristine:t}},writable:!0,enumerable:!0,configurable:!0},getColor:{value:function(){return{r:this.targetColor[0],g:this.targetColor[1],b:this.targetColor[2]}},writable:!0,enumerable:!0,configurable:!0},_getVelocityAngle:{value:function(){var t,e=this.x+this.velocity[0],i=this.y+this.velocity[1],n=this.options.speed,r=this.y+this.velocity[1]-this.y,o=this.x+this.velocity[0]-this.x;return(n>=e||this.arrayWidth-n<=e)&&(o*=-1),(n>=i||this.arrayHeight-n<=i)&&(r*=-1),t=Math.atan2(r,o)},writable:!0,enumerable:!0,configurable:!0},_hexToRgb:{value:function(t){var e=/^#?([a-f\d])([a-f\d])([a-f\d])$/i;t=t.replace(e,function(t,e,i,n){return e+e+i+i+n+n});var i=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);return i?[parseInt(i[1],16),parseInt(i[2],16),parseInt(i[3],16)]:null},writable:!0,enumerable:!0,configurable:!0},_getColorDistance:{value:function(t){return r-t[this.rgbIndex]},writable:!0,enumerable:!0,configurable:!0},_isInRange:{value:function(t,e){return t>0&&t<this.arrayWidth&&e>0&&e<this.arrayHeight},writable:!0,enumerable:!0,configurable:!0},_updateWorkingArray:{value:function(t,e){this.workingArray[t][e][this.rgbIndex]=!0},writable:!0,enumerable:!0,configurable:!0},_getRgbIndex:{value:function(t){var e;for(e=0;2>e&&0===t[e];e++);return e},writable:!0,enumerable:!0,configurable:!0}}),t}(),a=function(){function t(t){this.queue=[],this.size=t}return i(t,null,{put:{value:function(t){this.queue.push(t),this.size<this.queue.length&&this.queue.shift()},writable:!0,enumerable:!0,configurable:!0},get:{value:function(){var t=arguments[0]===e?0:arguments[0],i=this.queue.length;return t>=0&&i>=t?this.queue[t]:0>t&&Math.abs(t)<=i?this.queue[i+t]:e},writable:!0,enumerable:!0,configurable:!0},contains:{value:function(t){var e=this.queue.filter(function(e){return e[0]===t[0]&&e[1]===t[1]});return 0<e.length},writable:!0,enumerable:!0,configurable:!0}}),t}(),s=function(){function t(t,e,i){this.context=t,this.pathFinder=e,this.options=i,this.color=e.getColor()}return i(t,null,{drawNextLine:{value:function(){"smooth"===this.options.lineMode?this._drawLineSmooth():"square"===this.options.lineMode?this._drawLineSquare():this._drawPoint()},writable:!0,enumerable:!0,configurable:!0},_drawLineSmooth:{value:function(){var t,i,n,r,o=this.pathFinder.getNextPoint(this.context);if(o){if("undefined"==typeof this.currentPoint&&(this.currentPoint=o),"undefined"==typeof this.controlPoint&&(this.controlPoint=o),t=Math.round((this.controlPoint[0]+o[0])/2),i=Math.round((this.controlPoint[1]+o[1])/2),n=Math.floor((this.currentPoint[2]+o[2])/2),r=this._getLineLength(this.currentPoint,o),r<=3*this.options.speed){var a=e,s=this.currentPoint[2],h=o[2];a=this._createGradient(this.currentPoint,o,s,h),this.context.strokeStyle=a,this.context.lineWidth=this.options.lineWidth,this.context.lineCap="round",this.context.beginPath(),this.context.moveTo(this.currentPoint[0],this.currentPoint[1]),this.context.quadraticCurveTo(this.controlPoint[0],this.controlPoint[1],t,i),this.context.stroke()}this.currentPoint=[t,i,n],this.controlPoint=o}},writable:!0,enumerable:!0,configurable:!0},_drawLineSquare:{value:function(){var t,i=this.pathFinder.getNextPoint(this.context);if(i){if("undefined"==typeof this.currentPoint&&(this.currentPoint=i),t=this._getLineLength(this.currentPoint,i),t<=this.options.speed+1){var n=e,r=this.currentPoint[2],o=i[2];n=this._createGradient(this.currentPoint,i,r,o),this.context.strokeStyle=n,this.context.lineWidth=this.options.lineWidth,this.context.lineCap="round",this.context.beginPath(),this.context.moveTo(this.currentPoint[0],this.currentPoint[1]),this.context.lineTo(i[0],i[1]),this.context.stroke()}this.currentPoint=i}},writable:!0,enumerable:!0,configurable:!0},_drawPoint:{value:function(){var t,e=this.pathFinder.getNextPoint(this.context);e&&("undefined"==typeof this.currentPoint&&(this.currentPoint=e),t=this._getLineLength(this.currentPoint,e),t>=2*this.options.speed&&(this.context.beginPath(),this.context.arc(e[0],e[1],this.options.lineWidth,0,2*Math.PI,!1),this.context.fillStyle=this._getStrokeColor(e[2]),this.context.fill(),this.currentPoint=e))},writable:!0,enumerable:!0,configurable:!0},_getLineLength:{value:function(t,e){var i=e[0]-t[0],n=e[1]-t[1];return Math.round(Math.sqrt(i*i+n*n))},writable:!0,enumerable:!0,configurable:!0},_createGradient:{value:function(t,e,i,n){var r=this.context.createLinearGradient(t[0],t[1],e[0],e[1]);return r.addColorStop(0,this._getStrokeColor(i)),r.addColorStop(1,this._getStrokeColor(n)),r},writable:!0,enumerable:!0,configurable:!0},_getStrokeColor:{value:function(t){var e;return e="color"===this.options.colorMode?"rgba("+(0!==this.color.r?t:0)+", "+(0!==this.color.g?t:0)+", "+(0!==this.color.b?t:0)+", 1)":"rgba("+t+", "+t+", "+t+", 1)"},writable:!0,enumerable:!0,configurable:!0}}),t}(),h=function(){function t(){}return i(t,{_indexToRgbString:{value:function(t){var e;return e=t%3===0?"#0000ff":t%2===0?"#00ff00":"#ff0000"},writable:!0,enumerable:!0,configurable:!0},_getImageArray:{value:function(t){for(var e=t.canvas.width,i=t.canvas.height,n=t.getImageData(0,0,e,i),r=[],o=0;i>o;o++){r.push([]);for(var a=0;e>a;a++){for(var s=[],h=o*e*4+4*a,u=0;4>u;u++)s[u]=n.data[h+u];r[o].push(s)}}return r},writable:!0,enumerable:!0,configurable:!0},_getWorkingArray:{value:function(t){for(var e=t.canvas.width,i=t.canvas.height,n=[],r=0;i>r;r++){n.push([]);for(var o=0;e>o;o++)n[r].push([!1,!1,!1])}return n},writable:!0,enumerable:!0,configurable:!0},_getOutputDimensions:{value:function(t,e){var i,n;if("original"===e)i=t.width,n=t.height;else{var r=t.parentNode,o=r.clientWidth/t.width,a=r.clientHeight/t.height,s=o>=a?a:o;i=t.width*s,n=t.height*s}return{width:i,height:n}},writable:!0,enumerable:!0,configurable:!0}}),t}()}(window);
