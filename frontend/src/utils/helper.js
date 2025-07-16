import { redirect } from "@tanstack/react-router";
import { getCurrentUser } from "../api/user.api";
import { login } from "../store/slice/authSlice";

export const checkAuth = async ({ context }) => {
  try {
    const { queryClient, store } = context;
    const user = await queryClient.ensureQueryData({
      queryKey: ["currentUser"],
      queryFn: getCurrentUser,
    });
    console.log(user);
    if (!user) return false;
    store.dispatch(login(user));
    const { isAuthenticated } = store.getState().auth;
    console.log(isAuthenticated);
    if (!isAuthenticated) return redirect({ to: "/auth" });
    return true;
  } catch (error) {
    console.log(error);
    return redirect({ to: "/auth" });
  }
};
