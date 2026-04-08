export function num_to_points(num, max = 5, extra_num = false) {
    if (num > max)
        return num;

    let str = "";
    let i = 0;
    for (i = 0; i < num; i++)
        str += "●";

    for (let j = i; j < 5; j++)
        str += "○";

    if (extra_num)
        str += " " + num;

    return str;

}