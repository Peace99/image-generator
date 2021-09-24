const input = document.getElementById("input")
const grid = document.querySelector(".grid")
const creator = document.querySelector(".creator")

window.addEventListener('load', randomImage)

input.addEventListener('keydown', function(event){
  if(event.key === 'Enter')
  loadImg()
})

function randomImage(){
    let client_id = 'M38Av8f5_FeX-4j62y4Zh2uDCW1cU9NAblOyZXeGbiY'
    let endpoint = `https://api.unsplash.com/photos/random/?client_id=${client_id}`

    let images = document.querySelector(".slide-img")

    fetch(endpoint).then(img =>{
        return img.json()
    }).then(imagedata => {
        images.setAttribute("src", imagedata.urls.regular)
        creator.innerText = imagedata.user.name
        creator.setAttribute("href", imagedata.user.portfolio_url)
    })

    
}

function loadImg(){
  removeImg()
  const url = 'https://api.unsplash.com/search/photos/?query='+input.value+'&per_page=16&client_id=M38Av8f5_FeX-4j62y4Zh2uDCW1cU9NAblOyZXeGbiY'

  fetch(url).then(res =>{
      if(res.ok)
      return res.json()
      else{
        alert(res.status)
      }
  }).then(data => {
      const imageArray = []
      for (let i = 0; i < data.results.length; i++) {
        //const container = document.createElement('div')
        imageArray [i] = document.createElement('div');
        const spanElement = document.createElement('span')
        const anchorElement = document.createElement('a')
        imageArray[i].className = 'img'
        imageArray[i].style.backgroundImage = 'url('+data.results[i].urls.regular+')'
        imageArray[i].addEventListener('dblclick', function(){
            window.open(data.results[i].links.download,'_blank')
          })
        spanElement.innerText = "Photo by "
        anchorElement.innerText = data.results[i].user.name
        anchorElement.setAttribute("href", data.results[i].user.portfolio_url)
        spanElement.appendChild(anchorElement)
        //imageArray[i].appendChild(container)
        imageArray[i].appendChild(spanElement)
       
        grid.appendChild(imageArray[i])
      }
  })
}

function removeImg(){
    grid.innerHTML = ''
}