export const useHistory = () => {
  const router = useRouter();

  function goBack() {
    if (window.history.state?.back) {
      router.back();
    } else {
      navigateTo("/");
    }
  }

  return {
    goBack,
  };
};
