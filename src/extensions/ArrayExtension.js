
export default class ArrayExtension extends Array {
    
    matrix = lineLength => {
        const matrix = new ArrayExtension()
        const copy = this.copy()

        while(copy.length > 0)
        {
            if(copy.length >= lineLength)
                matrix.push(copy.sliceRemove(0, lineLength))
            else
                matrix.push(copy.sliceRemove(0, copy.length))
        }
        
        return matrix
    }

    remove = (first, last) => {

        for(; first < last; first ++)
            this.shift()
        
        return this
    }

    copy = () => {
        const copy = new ArrayExtension()

        this.forEach(_ => copy.push(_))

        return copy
    }

    sliceRemove = (first, last) => {
        const result = this.slice(first, last)
        this.remove(first, last)
        
        return result
    }

}
