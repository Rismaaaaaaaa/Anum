function calculate() {
    const equation = prompt('Persamaan: ');
    const rangeStr = prompt('Rentang: ').split('-');
    const rangeStart = parseFloat(rangeStr[0]);
    const rangeEnd = parseFloat(rangeStr[1]);
    const segments = parseInt(prompt('Jumlah Segmen: '));
    const method = prompt('Metode (bisection / table): ');
    const tolerance = parseFloat(prompt('Toleransi: '));

    let result = [];

    if (method === 'bisection') {
        result = bisectionMethod(equation, rangeStart, rangeEnd, tolerance);
    } else if (method === 'table') {
        result = tableMethod(equation, rangeStart, rangeEnd, segments, tolerance);
    }

    result.forEach(line => console.log(line));
}

function reset() {
    console.log("Resetting...");
    // Lakukan reset variabel atau input yang sesuai
}

function bisectionMethod(equation, a, b, tolerance) {
    const results = [];

    function f(x) {
        return eval(equation.replace(/x/g, x));
    }

    let fa = f(a);
    let fb = f(b);

    if (fa * fb >= 0) {
        results.push('Tidak ada akar dalam rentang yang diberikan');
        return results;
    }

    while ((b - a) / 2 > tolerance) {
        let c = (a + b) / 2;
        let fc = f(c);
        results.push(`x = ${c}, f(x) = ${fc}`);

        if (fc === 0) {
            break;
        } else if (fa * fc < 0) {
            b = c;
        } else {
            a = c;
        }
    }

    return results;
}

function tableMethod(equation, a, b, segments, tolerance) {
    const results = [];

    function f(x) {
        return eval(equation.replace(/x/g, x));
    }

    let h = (b - a) / segments;

    for (let i = 0; i <= segments; i++) {
        let x = a + i * h;
        let fx = f(x);
        results.push(`x${i} = ${x}, f(x${i}) = ${fx}`);

        if (Math.abs(fx) < tolerance) {
            break;
        }
    }

    return results;
}

// Panggil fungsi utama untuk memulai kalkulator
calculate();