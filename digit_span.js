window.addEventListener("load",function(event){
  'use strict';
  let style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = `
select{
  width: 125px !important;
  font-size: 28px;
  line-height: 34px;
  margin: 2px 0px;
}
.btn {
  background: #fff;
  border: 1px solid #000;
  border-radius: 5px;
  color: #000;
  width: 70px;
  font-size: 28px;
  line-height: 34px;
  margin: 2px 0px;
}
.btn:hover {
  background: #000;
  border: 1px solid #666;
  color: #fff;
}
.btn:active {
  background: #000;
  border: 1px solid #666;
  color: #fff;
}
.line_title {
  font-size:28px;
  line-height:34px;
  margin: 0.5em 0px;
}
.line_box {
  font-size: 30px;
  line-height: 45px;
  min-height: 45px;
  width: 98%;
  max-width: 980px;
  text-align: left;
  word-wrap: break-word;
  border: 2px solid #000;
  border-radius: 10pt;
  padding: 4px;
  margin: 0.5em 0px;
}
  `;
  document.getElementsByTagName('head')[0].appendChild(style);
  let maxn=0, flag=false;
  let str = '', rts='';
  let nums = new Array(30);
  let audio = new Array(30);
  let wait_time = 200;
  let mt = new MersenneTwister();
  let path = "./nums/"
  let type = (function(){
    let a = new Audio();
    if(a.canPlayType("audio/mp3") == 'maybe'){
      return ".mp3";
    }else if(a.canPlayType("audio/wav") == 'maybe'){
      return ".wav";
    }else if(a.canPlayType("audio/ogg") == 'maybe'){
      return ".ogg";
    }
    return ".mp3";
  })();

  function show(){
    document.getElementById('NUM').innerHTML = str;
    document.getElementById('MUN').innerHTML = rts;
  }

  function hide(){
    str = rts = '';
    show();
  }

  function stop(){
    flag = false;
  }

  function gen(){
    hide(); stop();
    maxn = dgt.options[dgt.selectedIndex].value;
    if(maxn < 1) return;
    for( let i=0; i<maxn; i++ ){
      nums[i] = mt.nextInt(0, 10-(i!=0));
      if(i!=0) nums[i] += ( nums[i] >= nums[i-1] );
      audio[i] = new Audio( path+nums[i]+type );
      audio[i].load();
      str += nums[i];
    }
    for( let i=0; i<maxn; i++ ) rts += str[maxn-i-1];
  }

  function say(n){
    if(maxn<1||n<0||maxn<=n){ flag = false; return; }
    if(n==0){ if(flag) return; else flag = true; }
    if(!flag) return;
    audio[n].addEventListener(
      'ended',
      function() {
        window.setTimeout(function(){say(n+1);},wait_time);
      }
    );
    audio[n].play();
  }

  document.getElementById("gen").onclick = gen;
  document.getElementById("say").onclick = function(){say(0);}
  document.getElementById("stop").onclick = stop;
  document.getElementById("show").onclick = show;

},false);
