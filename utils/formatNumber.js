function formatNumber(number){
    let result;
    if(number < 1000){
        result = `${number} +`
    }
    else if(number >=1000){
        result = `${(number/1000).toFixed(1).replace(/\.0/, '')}k +`
    }
    else if(number >= 1000000){
         result = `${(number/1000000).toFixed(1).replace(/\.0/, '')}m +`
    }
    else{
        result = `${(number/1000000000).toFixed(1).replace(/\.0/, '')}b +` 
    }

    return result;
}

export {formatNumber}