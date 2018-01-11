export default function (canvas) {
    if (!canvas.getContext) return

    const
        ctx = canvas.getContext('2d'),
        width = canvas.width,
        height = canvas.height,
        imageData = ctx.createImageData(height, width),
        data = imageData.data


    for (let i = 0; i < height; i++) {

        for (let j = 0; j < width; j++) {

            let index = i * width * 4 + j * 4,
                light = jittered_sampling(j / width, i / height)

            data[index] = data[index + 1] = data[index + 2] =
                light < 1
                    ? light * 255
                    : 255

            data[index + 3] = 255

        }
    }

    ctx.putImageData(imageData, 0, 0);
}


// 抖动采样
const N3 = 64 //  采样系数
function jittered_sampling(x, y) {
    let sum = 0.0;

    for (let i = 0; i < N3; i++) {
        let a = Math.PI * 2 * (Math.random() + i) / N3;
        sum += trace(x, y, Math.cos(a), Math.sin(a), Scene1);
    }
    return sum / N3;
}


//光线步进
const
    MAX_STEP = 64, //最大步数
    MAX_DISTANCE = 2.0, //最大距离
    EPSILON = new Number('1E-5') //足够近的阈值
function trace(ox, oy, dx, dy, scene) {
    let t = 0.0;
    for (let i = 0; i < MAX_STEP && t < MAX_DISTANCE; i++) {
        let res = scene(ox + dx * t, oy + dy * t);
        if (res.sd < EPSILON)
            return res.enissive;
        t += res.sd;
    }
    return 0.0;
}


// 圆形发光体
function circleSDF(x, y, cx, cy, r) {
    const ux = x - cx, uy = y - cy;
    return Math.sqrt(ux * ux + uy * uy) - r;
}

// 平面/直线
function planeSDF(x, y, px, py, nx, ny) {
    return (x - px) * nx + (y - py) * ny;;
}

// 场景1
function Scene1(x, y) {
    return unionOP(
        {
            sd: circleSDF(x, y, 0.3, 0.3, 0.1), // 当前采样点与场景形状的带符号距离（signed distance）
            enissive: 2.0 // 该形状的自发光强度（emissive）
        },
        {
            sd: circleSDF(x, y, 0.3, 0.7, 0.05), // 当前采样点与场景形状的带符号距离（signed distance）
            enissive: 0.8 // 该形状的自发光强度（emissive）
        },
        {
            sd: circleSDF(x, y, 0.7, 0.5, 0.1), // 当前采样点与场景形状的带符号距离（signed distance）
            enissive: 0.0 // 该形状的自发光强度（emissive）
        }

    )
}
// 场景2
function Scene2(x, y) {
    return subtractOp(
        {
            sd: circleSDF(x, y, 0.4, 0.5, 0.20),
            enissive: 1.0
        },
        {
            sd: circleSDF(x, y, 0.6, 0.5, 0.20),
            enissive: 0.8
        }
    )
}
// 多个物体并集
function unionOP(...shapes) {
    let res = shapes[0]

    shapes.forEach(val => {
        res = res.sd >= val.sd ? val : res
    })

    return res
}


// 多个物体交集
function intersectOP(...shapes) {
    let res = shapes[0]

    shapes.forEach(val => {
        res = res.sd >= val.sd
            ? { sd: res.sd, enissive: val.enissive }
            : { sd: val.sd, enissive: res.enissive }
    })

    return res
}

// 两个物体求差
function subtractOp(a, b) {
    return (
        a.sd > -b.sd
            ?{sd:a.sd,enissive:a.enissive}
            :{sd:-b.sd,enissive:a.enissive}
    )
}
