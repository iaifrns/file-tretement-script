const dateSelect = (date)=>{
    const dateDetail = date.split('-')
    const jour = dateDetail[0]
    const anner = dateDetail[1]

    console.log(jour, anner)
}

dateSelect("02-09")