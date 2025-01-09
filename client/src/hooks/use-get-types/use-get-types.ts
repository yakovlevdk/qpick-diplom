import { getProductTypes } from "../../api/get-product-types"

export const useGetTypes = () => { 
    const handleGetTypes = async () => { 
        const types = await getProductTypes()
        return types
    }
    return { handleGetTypes}
}