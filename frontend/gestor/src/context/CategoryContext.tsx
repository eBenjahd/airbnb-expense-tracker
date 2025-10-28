import { createContext, useContext } from "react";
import type { Category } from "../types/category";
import { useCategory } from "../hooks/useCategory";

interface CategoryContextType {
    categories: Category[] | undefined,
    isLoading: boolean,
    error: Error | null,
    refetch: () => void
}

const CategoryContext = createContext<CategoryContextType>({
    categories: undefined,
    isLoading: false,
    error: null,
    refetch: () => {}
})

export const CategoryProvider = ({ children }: {children: React.ReactNode}) => {
    const {data: categories, isLoading, error, refetch } = useCategory()

    return (
        <CategoryContext.Provider value={{ categories, isLoading, error, refetch}}>
            {children}
        </CategoryContext.Provider>
    )
}
export const useCategoryContext = () => useContext(CategoryContext)