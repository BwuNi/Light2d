export default class Vec3 {
    constructor(e0 = 0, e1 = 0, e2 = 0) {
        this.e = [e0, e1, e2]
    }

    // 向量长度
    squaredLength() {
        return this.e[0] ** 2 + this.e[1] ** 2 + this.e[2] ** 2
    }
    length() {
        return Math.sqrt(this.squaredLength())
    }

    // 向量加减乘除
    add(v) {
        // this.e[0] += v.e[0]
        // this.e[1] += v.e[1]
        // this.e[2] += v.e[2]
        // return this

        return Vec3.add(this,v)
    }

    sub(v) {
        // this.e[0] -= v.e[0]
        // this.e[1] -= v.e[1]
        // this.e[2] -= v.e[2]
        // return this
        
        return Vec3.sub(this,v)
    }

    mul(n) {
        // this.e[0] *= n
        // this.e[1] *= n
        // this.e[2] *= n
        // return this
        
        return Vec3.mul(this,n)
    }

    div(n) {
        // this.e[0] /= n
        // this.e[1] /= n
        // this.e[2] /= n
        // return this
        
        return Vec3.div(this,n)
    }

    //单位向量(向量方向)
    unitVec() {
        return this.div(this.length())
    }

    static add(v1, v2) {
        return new Vec3(v1.e[0] + v2.e[0], v1.e[1] + v2.e[1], v1.e[2] + v2.e[2])
    }

    static sub(v1, v2) {
        return new Vec3(v1.e[0] - v2.e[0], v1.e[1] - v2.e[1], v1.e[2] - v2.e[2])
    }

    static mul(v, n) {
        return (
            typeof v === 'number' ?
            Vec3.mul(new Vec3(v, v, v), n) :
            typeof n === 'number' ?
            Vec3.mul(v, new Vec3(n, n, n)) :
            n.e && v.e ?
            new Vec3(n.e[0] * v.e[0], n.e[1] * v.e[1], n.e[2] * v.e[2]) : null
        )
    }

    static div(v, n) {
        return (
            typeof v === 'number' ?
            Vec3.div(new Vec3(v, v, v), n) :
            typeof n === 'number' ?
            Vec3.div(v, new Vec3(n, n, n)) :
            n.e && v.e ?
            new Vec3(v.e[0] / n.e[0], v.e[1] / n.e[1], v.e[2] / n.e[2]) : null
        )
    }

    static dot(v1, v2) {
        return v1.e[0] * v1.e[0] + v1.e[1] * v1.e[1] + v1.e[2] * v1.e[2]
    }

    static cross(v1, v2) {
        return new Vec(
            (v1.e[1] * v2.e[2] - v1.e[2] * v2.e[1]),
            (v1.e[0] * v2.e[2] - v1.e[2] * v2.e[0]) * (-1),
            (v1.e[0] * v2.e[1] - v1.e[1] * v2.e[0])
        )
    }

}