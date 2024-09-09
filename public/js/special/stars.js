const stars = (num) => {
  let c = -1 * num;
  let str = Array(num).fill("* ");
  let space = Array(num).fill(" ");
  for (let i = c; i < num; i++) {
    if (i < 0) console.log(space.slice(0, (i*(-1))).join("")+str.slice(0, i + num).join(''));
    else console.log(space.slice(0,i).join("")+str.slice(0, num - i).join(''));
  }
};

stars(5);
