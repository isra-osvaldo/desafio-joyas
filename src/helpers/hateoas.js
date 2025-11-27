const HATEOAS = (entity, data) => {
    const results = data.map(item => {
        return (
            {
                name: `${item.nombre}`,
                href: `/${entity}/joya/${item.id}`,
            }
        )
    })

    const totalJoyas = data.length
    let stockTotal = data.reduce((acc, item) => acc + item.stock, 0)
    
    const dataWithHateoas = {
        totalJoyas,
        stockTotal,
        results
    }

    return dataWithHateoas
}

export default HATEOAS