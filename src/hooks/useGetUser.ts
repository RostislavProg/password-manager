import { useSelector } from "react-redux";
import { RootState } from "../store/store.ts";

export const useGetUser = () => {
  const userId = useSelector((state: RootState) => state.auth.userId)

  const userContent = useSelector((state: RootState) => {
    const userContent = state.auth.accountsContent.find(account => account.id === userId);
    return userContent ? userContent.userContent : [];
  });
  
  const user = useSelector((state: RootState) => {
    const user = state.auth.accounts.find(account => account.id === userId);
    return user ? user : null;
  });
  
  return { user, userContent };
}





