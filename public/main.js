LikedPhotos={};
LikedPhotos.id=[];
$(window).on('load',function(){
    $(".loader").fadeOut(1000);
    
    $(".content").fadeIn(1000);
    
    $("#popup").fadeOut(5000);
    if(localStorage.getItem("LikedPhotos")!=null){
        
        Liked=JSON.parse(localStorage.getItem("LikedPhotos"));
        LikedPhotos.id=Liked.id;
       console.log("array---",Liked.id);
       
        for(let i=0;i<Liked["id"].length;i++){
             const wait_until_element_appear = setInterval(() => {
                //  console.log(Liked["id"][i],"***********",$("#",Liked["id"][i])[0])
                 if(document.getElementById(Liked["id"][i])==null){
                     Liked.id.splice(Liked.id.indexOf(Liked.id[i]),1);
                 }
            else if(document.getElementById(Liked["id"][i]).length !== 0) {

                console.log(document.getElementById(Liked["id"][i]).classList);
                document.getElementById(Liked["id"][i]).classList.add("liked");

                clearInterval(wait_until_element_appear);
                }
            }, 1000);
            
            
        }
    }
})


function post_date() {
    console.log(document.querySelector('#dateSelector').value)
    var uri = "http://" + window.location.host+"/search";
    console.log("-----"+uri)
    var requestOptions = {
    method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ 'query':document.querySelector('#dateSelector').value })
    // redirect: 'follow'
    };
    fetch(uri, requestOptions).then(response => response.text())
        .then(result => {
            console.log(result);
          
        })
        .catch(error => console.log('error', error));
    
    window.open(window.location.href,"__self");
}

function liked(element) {
    console.log(element.id)
    let isLiked=document.getElementById(element.id).classList.contains("liked")
    if (isLiked==false) {
        console.log(element.classList);
        element.classList.add("liked");
        LikedPhotos.id.push(element.id);
    }
    else{
        element.classList.remove("liked");
        
        LikedPhotos.id.splice(LikedPhotos.id.indexOf(element.id),1);
    }
    
    localStorage.setItem("LikedPhotos",JSON.stringify(LikedPhotos));
}


