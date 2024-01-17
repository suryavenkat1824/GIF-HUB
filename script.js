let submitBtn=document.getElementById("submit-btn");

let generateGIF=()=>{
  let loader=document.querySelector(".loader");
  loader.style.display="block";
  document.querySelector(".wrapper").style.display="none";
//geenrate gifs when user loads or when clicks on submit
  let q =document.getElementById("search-box").value;
  let gifCount=15;
  let finalURL=`https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${q}&limit=${gifCount}&offset=0&rating=g&lang=en`;
  document.querySelector(".wrapper").innerHTML="";
//make api call
  fetch(finalURL)
  .then((resp)=>resp.json())
  .then((info)=> {
    console.log(info.data);
    //all gifs
    let gifsData=info.data;
    gifsData.forEach((gif) => {
        //generating card for every gif
        let container=document.createElement("div");
        container.classList.add("container");
        let iframe =document.createElement("img");
        console.log(gif);
        iframe.setAttribute("src",gif.images.downsized_medium.url);
        iframe.onload=()=> {
            //if iframes loaded correctly
            gifCount--;
            //if all are loaded hide loader 
            if(gifCount==0)
            {
                loader.style.display="none";
                document.querySelector(".wrapper").style.display="grid";
            }
        };
        container.append(iframe);
        //copy link button
        let copyBtn=document.createElement("button");
        copyBtn.innerText="Copy Link";
        copyBtn.onclick=()=>{
           let copyLink=`https://media4.giphy.com/media/${gif.id}/giphy.mp4`;
           //copy tedxt inside copy field
           navigator.clipboard
           .writeText(copyLink)
           .then(()=>{
               alert("GIF copied to clipboard");
           })
           .catch(()=>{
            alert("GIF copied to clipboard");
            let hiddenInput=document.createElement("input");
            hiddenInput.setAttribute("type","text");
            document.body.appendChild(hiddenInput);
            hiddenInput.value=copyLink;
            //select input
            hiddenInput.select();
            document.execCommand("copy");
            //remove the input
            document.body.removeChild(hiddenInput);
           });
        };
        container.append(copyBtn);
        document.querySelector(".wrapper").append(container);

    });
  });
};

submitBtn.addEventListener("click",generateGIF);
window.addEventListener("load",generateGIF);