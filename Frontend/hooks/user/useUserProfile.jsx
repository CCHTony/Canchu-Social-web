import useSWRFetch from "../useSWRFetch";

const useUserProfile = (userId) => {
  const {data} = useSWRFetch(userId && `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}/profile`);
  return { user: data?.user };
};

export default useUserProfile;
