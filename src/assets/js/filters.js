// Vue.filter('filterHtml',{
//   read:function(val){//val就是以获取的msg的值
//     return val.replace(/<[^>]*>/g);//去除文字的<...></...>标签
//   },
//   write:function(){
//     return val;
//   }
// });
const filters= {
  filterHtml:function (val) {
    return val.replace(/<[^>]*>/g);//去除文字的<...></...>标签
  }
}
export default { filters }
