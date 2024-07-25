window.addEventListener("load",function(event){
  'use strict';
  let lastmod = new Date(document.lastModified);
  let year = lastmod.getYear();
  if(year < 2000) year += 1900;
  let month = lastmod.getMonth() + 1;
  let day = lastmod.getDate();
  let week = ['日','月','火','水','木','金','土'][ lastmod.getDay() ];
  let hour = lastmod.getHours();
  let min = lastmod.getMinutes();
  let sec = lastmod.getSeconds();

  let footers = document.getElementsByTagName('footer');
  footers[footers.length-1].innerHTML = `最終更新日：${year}年${month}月${day}日(${week}) ${hour}時${min}分${sec}秒`;
},false);
