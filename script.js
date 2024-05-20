function calculate() {
    const equation = document.getElementById('equation').value;
    const rangeStr = document.getElementById('range').value.split('-');
    const rangeStart = parseFloat(rangeStr[0]);
    const rangeEnd = parseFloat(rangeStr[1]);
    const segments = parseInt(document.getElementById('segments').value) || 0; // Default to 0 if not provided
    const method = document.getElementById('method').value;
    const tolerance = parseFloat(document.getElementById('tolerance').value);

    let result = [];
    let rootFound = false;

    if (method === 'bisection') {
        ({ result, rootFound } = bisectionMethod(equation, rangeStart, rangeEnd, tolerance));
    } else if (method === 'table') {
        ({ result, rootFound } = tableMethod(equation, rangeStart, rangeEnd, segments, tolerance));
    } else if (method === 'regula_falsi') {
        ({ result, rootFound } = regulaFalsiMethod(equation, rangeStart, rangeEnd, tolerance));
    }

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = result.join('<br>') + `<br><br>Akar : ${rootFound ? 'Ditemukan' : 'Tidak ditemukan'}`;
}

function resetForm() {
    document.getElementById('calcForm').reset();
    document.getElementById('results').innerHTML = '';
}

function bisectionMethod(equation, a, b, tolerance) {
    const results = [];
    let rootFound = false;

    function f(x) {
        return eval(equation.replace(/x/g, x));
    }

    let fa = f(a);
    let fb = f(b);

    if (fa * fb >= 0) {
        results.push('Tidak ada akar dalam rentang yang diberikan');
        return { result: results, rootFound: false };
    }

    while ((b - a) / 2 > tolerance) {
        let c = (a + b) / 2;
        let fc = f(c);
        results.push(`x = ${c}, f(x) = ${fc}`);

        if (fc === 0 || (b - a) / 2 < tolerance) {
            rootFound = true;
            break;
        } else if (fa * fc < 0) {
            b = c;
        } else {
            a = c;
        }
    }

    return { result: results, rootFound };
}

function tableMethod(equation, a, b, segments, tolerance) {
    const results = [];
    let rootFound = false;

    function f(x) {
        return eval(equation.replace(/x/g, x));
    }

    let h = (b - a) / segments;

    for (let i = 0; i <= segments; i++) {
        let x = a + i * h;
        let fx = f(x);
        results.push(`x${i} = ${x}, f(x${i}) = ${fx}`);

        if (Math.abs(fx) < tolerance) {
            rootFound = true;
            break;
        }
    }

    return { result: results, rootFound };
}

function regulaFalsiMethod(equation, a, b, tolerance) {
    const results = [];
    let rootFound = false;

    function f(x) {
        return eval(equation.replace(/x/g, x));
    }

    let fa = f(a);
    let fb = f(b);

    if (fa * fb >= 0) {
        results.push('Tidak ada akar dalam rentang yang diberikan');
        return { result: results, rootFound: false };
    }

    while (Math.abs(b - a) > tolerance) {
        let c = a - (fa * (b - a)) / (fb - fa);
        let fc = f(c);
        results.push(`x = ${c}, f(x) = ${fc}`);

        if (fc === 0 || Math.abs(fc) < tolerance) {
            rootFound = true;
            break;
        } else if (fa * fc < 0) {
            b = c;
            fb = fc;
        } else {
            a = c;
            fa = fc;
        }
    }

    return { result: results, rootFound };
}