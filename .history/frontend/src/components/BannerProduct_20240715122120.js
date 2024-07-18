// import React, { useEffect, useState } from 'react'
// import image1 from '../assest/banner/ban1.webp'
// import image2 from '../assest/banner/ban2.webp'
// import image4 from '../assest/banner/ban4.webp'
// import image3 from '../assest/banner/ban3.webp'
// import image5 from '../assest/banner/ban5.webp'


// import image1Mobile from '../assest/banner/banimg1.jpg'
// import image2Mobile from '../assest/banner/banimg2.jpg'
// import image3Mobile from '../assest/banner/banimg3.jpg'
// import image4Mobile from '../assest/banner/banimg4.jpg'
// import image5Mobile from '../assest/banner/banimg5.jpg'

// import { FaAngleRight } from "react-icons/fa6";
// import { FaAngleLeft } from "react-icons/fa6";


// const BannerProduct = () => {
//     const [currentImage,setCurrentImage] = useState(0)

//     const desktopImages = [
//         image1,
//         image2,
//         image3,
//         image4,
//         image5
//     ]

//     const mobileImages = [
//         image1Mobile,
//         image2Mobile,
//         image3Mobile,
//         image4Mobile,
//         image5Mobile
//     ]

//     const nextImage = () =>{
//         if(desktopImages.length - 1 > currentImage){
//             setCurrentImage(preve => preve + 1)
//         }
//     }

//     const preveImage = () =>{
//         if(currentImage != 0){
//             setCurrentImage(preve => preve - 1)
//         }
//     }


//     useEffect(()=>{
//         const interval = setInterval(()=>{
//             if(desktopImages.length - 1 > currentImage){
//                 nextImage()
//             }else{
//                 setCurrentImage(0)
//             }
//         },5000)

//         return ()=> clearInterval(interval)
//     },[currentImage])

//   return (
//     <div className='container mx-auto px-4 rounded '>
//         <div className='h-56 md:h-72 w-full bg-slate-200 relative'>

//                 <div className='absolute z-10 h-full w-full md:flex items-center hidden '>
//                     <div className=' flex justify-between w-full text-2xl'>
//                         <button onClick={preveImage} className='bg-white shadow-md rounded-full p-1'><FaAngleLeft/></button>
//                         <button onClick={nextImage} className='bg-white shadow-md rounded-full p-1'><FaAngleRight/></button> 
//                     </div>
//                 </div>

//                 {/**desktop and tablet version */}
//               <div className='hidden md:flex h-full w-full overflow-hidden'>
//                 {
//                         desktopImages.map((imageURl,index)=>{
//                             return(
//                             <div className='w-full h-full min-w-full min-h-full transition-all' key={imageURl} style={{transform : `translateX(-${currentImage * 100}%)`}}>
//                                 <img src={imageURl} className='w-full h-full'/>
//                             </div>
//                             )
//                         })
//                 }
//               </div>


//                 {/**mobile version */}
//                 <div className='flex h-full w-full overflow-hidden md:hidden'>
//                 {
//                         mobileImages.map((imageURl,index)=>{
//                             return(
//                             <div className='w-full h-full min-w-full min-h-full transition-all' key={imageURl} style={{transform : `translateX(-${currentImage * 100}%)`}}>
//                                 <img src={imageURl} className='w-full h-full object-cover'/>
//                             </div>
//                             )
//                         })
//                 }
//               </div>


//         </div>
//     </div>
//   )
// }

// export default BannerProduct


// import React, { useEffect, useState } from 'react';
// import { FaAngleRight, FaAngleLeft } from 'react-icons/fa6';

// const BannerProduct = () => {
//     const [currentImage, setCurrentImage] = useState(0);
//     const [desktopImages, setDesktopImages] = useState([]);
//     const [mobileImages, setMobileImages] = useState([]);

//     const fetchImages = async () => {
//         try {
//             const response = await fetch('/api/images');
//             const data = await response.json();
//             setDesktopImages(data.desktopImages);
//             setMobileImages(data.mobileImages);
//         } catch (error) {
//             console.error('Error fetching images:', error);
//         }
//     };

//     useEffect(() => {
//         fetchImages();
//     }, []);

//     const nextImage = () => {
//         if (desktopImages.length - 1 > currentImage) {
//             setCurrentImage((prev) => prev + 1);
//         }
//     };

//     const prevImage = () => {
//         if (currentImage !== 0) {
//             setCurrentImage((prev) => prev - 1);
//         }
//     };

//     useEffect(() => {
//         const interval = setInterval(() => {
//             if (desktopImages.length - 1 > currentImage) {
//                 nextImage();
//             } else {
//                 setCurrentImage(0);
//             }
//         }, 5000);

//         return () => clearInterval(interval);
//     }, [currentImage]);

//     return (
//         <div className="container mx-auto px-4 rounded">
//             <div className="h-56 md:h-72 w-full bg-slate-200 relative">
//                 <div className="absolute z-10 h-full w-full md:flex items-center hidden">
//                     <div className="flex justify-between w-full text-2xl">
//                         <button onClick={prevImage} className="bg-white shadow-md rounded-full p-1"><FaAngleLeft /></button>
//                         <button onClick={nextImage} className="bg-white shadow-md rounded-full p-1"><FaAngleRight /></button>
//                     </div>
//                 </div>

//                 <div className="hidden md:flex h-full w-full overflow-hidden">
//                     {desktopImages.map((imageURL, index) => (
//                         <div className="w-full h-full min-w-full min-h-full transition-all" key={index} style={{ transform: `translateX(-${currentImage * 100}%)` }}>
//                             <img src={imageURL} className="w-full h-full" alt={`Banner ${index + 1}`} />
//                         </div>
//                     ))}
//                 </div>

//                 <div className="flex h-full w-full overflow-hidden md:hidden">
//                     {mobileImages.map((imageURL, index) => (
//                         <div className="w-full h-full min-w-full min-h-full transition-all" key={index} style={{ transform: `translateX(-${currentImage * 100}%)` }}>
//                             <img src={imageURL} className="w-full h-full object-cover" alt={`Banner ${index + 1}`} />
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default BannerProduct;
