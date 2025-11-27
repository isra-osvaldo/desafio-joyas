import pool from '../../database/config.js'
import format from 'pg-format'

export const getAllJoyasModel = async ({ limits = 3, order_by = 'id_ASC', page = 1}) => {

    const [campo, direccion] = order_by.split('_')
    const offset = (page - 1) * limits  

    const formattedQuery = format(
        'SELECT * FROM inventario ORDER BY %s %s LIMIT %s OFFSET %s',
        campo,
        direccion,
        limits,
        offset
    )

    const { rows: joyas } = await pool.query(formattedQuery)
    return joyas
}


export const getJoyasFilterModel = async ({ precio_min, precio_max, categoria, metal }) => {

    let filters = []

    if (precio_min) filters.push(`precio >= ${precio_min}`)
    if (precio_max) filters.push(`precio <= ${precio_max}`)
    if (categoria) filters.push(`categoria = '${categoria}'`)
    if (metal) filters.push(`metal = '${metal}'`)

    let query = 'SELECT * FROM inventario'
    if (filters.length > 0) {
        filters = filters.join(' AND ')
        query += ` WHERE ${filters}`
    }

    const { rows: joyas } = await pool.query(query)

    console.log(joyas)
    return joyas
}


getJoyasFilterModel({ precio_min: 25000, precio_max: 30000, categoria: 'aros', metal: 'plata' })