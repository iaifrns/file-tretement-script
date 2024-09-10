function printStars(n){
    const stars = new Array(n).fill(" *").join("")
    const space = new Array(n).fill(" ")
    console.log(stars)

    for (let i = 0; i<=n; i++){
        console.log(space.join("") + stars.slice(0,(i*2)).toString())
        space.pop()
    }
}

printStars(5)