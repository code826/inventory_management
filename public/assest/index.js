console.log("hello everyone");

// document.addEventListener('DOMContentLoaded',function (){
//     var deleteProductBtn = document.getElementsByClassName("delete-product-btn");


// })

async function handleDeleteBtn(id){
   if(!window.confirm(`Are you sure you want to delete the product Id ${id}`)){
     return;
   }
  try {
    let resp =  await fetch(`/delete-product/${id}`,{
        method:'DELETE'
    });
    console.log('resp',resp);
    let data = await resp.json();
    console.log('data',data);
    if(!data.success){
        console.log('error',data.errorMssg);
        window.alert(`Error : ${data.errorMssg}`);
        return;
    }
    window.location.reload();
   
  } catch (error) {
    console.log('error',error);
    window.alert('Error Ocuur');
  }
   
  
}

