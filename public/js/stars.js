function printStars(n){
    const stars = new Array(n).fill("*").join("")
    for (let i = 0; i<=n; i++){
        console.log(stars.slice(0,i).toString())
    }
}

printStars(5)