import { useSelector } from "react-redux";

export const useGetUser = () => {
    const userId = useSelector((state) => state.auth.userId)

    const userContent = useSelector((state) => {
        const userContent = state.auth.accountsContent.find(account => account.id === userId);
        return userContent ? userContent.userContent : [];
    });
    
    const user = useSelector((state) => {
        const user = state.auth.accounts.find(account => account.id === userId);
        return user ? user : [];
    });
    return {user, userContent};
}