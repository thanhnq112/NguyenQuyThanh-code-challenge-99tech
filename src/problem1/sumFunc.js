const sum_to_n_way1 = function (n) {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
};

const sum_to_n_way2 = function (n) {
    return n * (n + 1) / 2;
};

const sum_to_n_way3 = function (n) {
    if (n === 0) {
        return 0;
    }
    return n + sum_to_n_way3(n - 1);
};

console.log(sum_to_n_way1(5));