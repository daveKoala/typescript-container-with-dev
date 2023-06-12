import axios from "axios";

/**
 * Just a bit of fun calling between services.
 * If you spin up the docker-compose file (make up) the second container will call the first `/pingz` route.
 */
export default async (id: string): Promise<string> => {
  try {
    if (id === "dev-container") return "no way jose";

    const { data } = await axios.get("http://core-app:8080/pingz");

    return `${JSON.stringify(data)}`;
  } catch (error) {
    if (error instanceof Error) {
      return error?.message || "Ooops";
    }

    return "Well that didn't go according to plan";
  }
};
