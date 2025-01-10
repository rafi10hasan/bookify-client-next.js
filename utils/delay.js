export default async function delay(time){
   return await new Promise((resolve)=>setTimeout(()=>{resolve()},time))
}