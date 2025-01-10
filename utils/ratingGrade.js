function ratingGrade(rating){
  let gradeMsg = ""
    if(rating >= 4.5 && rating <= 5){
        gradeMsg = "very good"
    }
    else if(rating >= 3.8 && rating <= 4.4){
        gradeMsg = "good"
    }
    else if(rating >=3.0 && rating <= 3.7){
        gradeMsg = "average"
    }
    else{
        gradeMsg = "poor"
    }

    return gradeMsg
}

export {ratingGrade}
