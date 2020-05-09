const checkImg = (imgLink)=>{
    if(imgLink === null){
      return 'https://bitsofco.de/content/images/2018/12/broken-1.png';
    }else{
      return BACKDROP_BASE_URL + imgLink;
    }
  }

  const toggle = (e)=>{
    let list=e.target.nextElementSibling;
    list.classList.toggle('displayList')
  }