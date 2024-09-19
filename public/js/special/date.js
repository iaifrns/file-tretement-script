const dateSelect = (date)=>{
    const dateDetail = date.split('-')
    const jour = dateDetail[0]
    const anner = dateDetail[1]
    const intJour = parseInt(jour)
    const intAnne = parseInt(anner)
    if(intJour == 9 || intJour == 11 || intJour == 6 || intJour == 4){
        console.log("30 jours");
        return
    }else if(intJour == 2){
        if(intAnne%4 == 0){
            console.log("29 jours")
            return
        }
        console.log("28 jours")
        return
    }else {
        console.log("31 jours")
        return
    }
}

dateSelect("01-2032")