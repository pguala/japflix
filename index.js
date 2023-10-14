// Accionar en evento DOMContentLoaded
document.addEventListener("DOMContentLoaded", function(){
    var obj;

var url = "https://japceibal.github.io/japflix_api/movies-data.json";
fetch(url)
  .then((res) => res.json())
  .then((data) => {
    obj = data;
  })
  .then(() => {
    console.log(obj);
  });

});
