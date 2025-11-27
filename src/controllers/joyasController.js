import HATEOAS from '../helpers/hateoas.js'
import { getAllJoyasModel, getJoyasFilterModel } from '../models/joyasModel.js'

export const getAllJoyasController = async (req, res) => {
    try {
        const queryString = req.query
        const allJoyas = await getAllJoyasModel(queryString)
        const allJoyasHateoasFormat = HATEOAS('joyas', allJoyas)
        res.status(200).json(allJoyasHateoasFormat)
    } catch (error) {
        res.status(500).json({ message: 'Error del servidor' })
    }
}

export const getJoyasFilterController = async (req, res) => {
    try {
        const queryString = req.query
        const joyasFilter = await getJoyasFilterModel(queryString)
        res.status(200).json(joyasFilter)
    } catch (error) {
        res.status(500).json({ message: 'Error del servidor' })
    }
}