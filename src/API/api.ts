import axios from "axios";

export const fetchUserData = async () => {
    try {
      const fetchedUsers = await axios.get(`https://randomuser.me/api/?results=10`);
      return fetchedUsers?.data?.results?.map((user: any) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.picture.thumbnail
      }));
    } catch (error) {
      console.log("Error occurred", error);
      return null;
    }
  };