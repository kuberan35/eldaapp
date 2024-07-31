import SummaryApi from "../common"
import { toast } from 'react-toastify'

const addToCart = async(e,id) =>{
    e?.stopPropagation()
    e?.preventDefault()

    let token = localStorage.getItem('token');
  let gettoken = JSON.parse(token);

    const response = await fetch(SummaryApi.addToCartProduct.url,{
        method : SummaryApi.addToCartProduct.method,
        credentials : 'include',
        headers : {
            "content-type" : 'application/json',
            Authorization: gettoken,
        },
        body : JSON.stringify(
            { productId : id }
        )
    })

    const responseData = await response.json()

    if(responseData.success){
        toast.success(responseData.message)
    }

    if(responseData.error){
        toast.error(responseData.message)
    }


    return responseData

}

// let token = localStorage.getItem('token');
//   let gettoken = JSON.parse(token);
//   const requestOptions = {
//     method: 'GET',
//     mode: 'cors',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: gettoken,
//     },
//   };
//   const response = await fetch(`${BaseUrl}/api1/message/getallmessages?chatId=${chatId}&limit=${limit}&page=${page}&offset=${offset}`, requestOptions);

export default addToCart
