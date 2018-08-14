import Vec3 from './vec3'
import Ray from './ray'

export default function(canvas) {
    if (!canvas.getContext) return

    const
        ctx = canvas.getContext('2d'),
        width = canvas.width,
        height = canvas.height,
        imageData = ctx.createImageData(width, height)


    draw(ctx, width, height, imageData)
}

function draw(ctx, width, height, imageData) {
    const data = imageData.data

    for (let y = 0; y < height; y++) {

        for (let x = 0; x < width; x++) {

            let index = y * width * 4 + x * 4,
                [r, g, b, a] = sampling(x / width, y / height)

            data[index] = r * 255
            data[index + 1] = g * 255
            data[index + 2] = b * 255
            data[index + 3] = a * 255
        }
    }

    ctx.putImageData(imageData, 0, 0);
}


// input   x [0..1] y [1..0]
// output  x [-2,2] y [-1,1]
// function transform(x, y) {
//     return [(x - 0.5) * 4, (0.5 - y) * 2]
// }


// input   x [0..1] y [1..0]
// output  x [0..1] y [0..1]
function transform(x, y) {
    return [x, 1-y]
}

function color(r) {
    const
        unitDirection = r.direction.unitVec(),
        t = (unitDirection.e[1] + 1.0) * 0.5



    return Vec3.add(new Vec3(1, 1, 1).mul((1 - t)), new Vec3(0.5, 0.7, 1).mul(t))
}

function sampling(x, y) {
    const [_x, _y] = transform(x, y)

    const origin = new Vec3(0,0,0)
    const vertical = new Vec3(0, 2, 0)
    const horizontal = new Vec3(4, 0, 0)
    const leftBottom = new Vec3(-2, -1, -1)

    

    const ray = new Ray(origin,leftBottom.add(horizontal.mul(_x)).add(vertical.mul(_y)))

    const vec = color(ray)

    if(x==0&&y==0){
        console.log(leftBottom.add(horizontal.mul(0.5)).add(vertical.mul(0.5)))
        
        console.log(new Ray(origin,leftBottom.add(horizontal.mul(0.5)).add(vertical.mul(0.5))))

        console.log(color(
            new Ray(origin,leftBottom.add(horizontal.mul(0.5)).add(vertical.mul(0.5)))
        ))
    }

    let a = 1

    return [...vec.e, a]
}



