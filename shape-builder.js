/* const points = [ [4, 5], [8, 2], [8, 10], [10, 2], [12, 6] ] */

const distFn = (x, y, x2, y2) => {
    return Math.sqrt(Math.pow(x2-x, 2) + Math.pow(y2-y, 2))
}

const buildFace = (points) => {
    const nPoints = [0]
    let curPoint = points[0]
    while (nPoints.length < points.length) {
        let minDist = undefined
        let lookOutPoint = 1
        for (let index = 0; index < points.length; index++) {
            if (nPoints.includes(index))
                continue

            const dist = distFn(curPoint[0], curPoint[1], points[index][0], points[index][1])
            if (!minDist || dist < minDist) {
                minDist = dist
                lookOutPoint = index
            }
        }
        nPoints.push(lookOutPoint)
        curPoint = points[lookOutPoint]
    }

    return nPoints.map(index => points[index])
}

const buildObj = (points) => {
    let obj = points.reduce((acc, point) => acc+`v ${point[0]}.000000 ${point[1]}.000000 0.000000\n`, '')
    obj += points.reduce((acc, point) => acc+`v ${point[0]}.000000 ${point[1]}.000000 20.000000\n`, '')
    obj += 'f'
    for (let index = 0; index < points.length; index++) {
        obj += ` ${index+1}`
    }

    obj += '\n'
    obj += 'f'
    for (let index = 0; index < points.length; index++) {
        obj += ` ${index+1+points.length}`
    }

    for (let index = 0; index < points.length; index++) {
        obj += '\n'
        obj += 'f'

        if (index+1 == points.length) {
            obj += ` ${index+1} ${index+1+points.length} ${1+points.length} ${1}`
            return obj
        }
        
        obj += ` ${index+1} ${index+1+points.length} ${index+2+points.length} ${index+2}`
    }
   

    return obj
}

/* console.log(buildObj(buildFace(points))) */

