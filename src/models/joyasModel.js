import pool from '../../database/config.js'
import format from 'pg-format'

export const getAllJoyasModel = async ({ limits= 'ALL', order_by = 'id_ASC', page = 1}) => {

    const [campo, direccion] = order_by.split('_')
    const offset = limits === 'ALL' ? 0 : (page - 1) * limits
    const limitClause = limits === 'ALL' ? 'ALL' : limits

    const formattedQuery = format(
        'SELECT * FROM inventario ORDER BY %s %s LIMIT %s OFFSET %s',
        campo,
        direccion,
        limitClause,
        offset
    )

    const { rows: joyas } = await pool.query(formattedQuery)
    return joyas
}


export const getJoyasFilterModel = async ({ precio_min, precio_max, categoria, metal }) => {

    let filters = []
    const values = []

    const addFilter = (field, comparator, value) => {
        values.push(value)
        filters.push(`${field} ${comparator} $${filters.length + 1}`)
    }

    if (precio_min) addFilter('precio', '>=', precio_min)
    if (precio_max) addFilter('precio', '<=', precio_max)
    if (categoria) addFilter('categoria', '=', categoria)
    if (metal) addFilter('metal', '=', metal)

    let query = 'SELECT * FROM inventario'
    if (filters.length > 0) {
        filters = filters.join(' AND ')
        query += ` WHERE ${filters}`
    }

    const { rows: joyas } = await pool.query(query, values)

    console.log(joyas)
    return joyas
}

getJoyasFilterModel({ precio_min: 25000, precio_max: 30000, categoria: 'aros', metal: 'plata' })
