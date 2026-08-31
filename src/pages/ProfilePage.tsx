import { LinkButton } from "../components/LinkButton";
import { Avatar } from "../components/Avatar";
import { getProfile } from "../profileStorage";

function ProfilePage() {
  const userData = getProfile();

  return (
    <div className="rounded-2xl bg-white p-8 text-center shadow-md">
      <div className="flex flex-col items-center">
        <Avatar src={userData.avatar} alt="profile" />
        <h1 className="p-3 text-2xl font-semibold text-gray-800">
          {userData.name}
        </h1>
      </div>

      <div className="text-left">
        <div className="flex flex-row justify-between items-center gap-3 py-3">
          <span className="font-semibold text-gray-600">Email</span>
          <span className="text-gray-800">
            {userData.email}
          </span>
        </div>

        <div className="flex flex-row justify-between items-center gap-3 border-b border-gray-100 py-3">
          <span className="font-semibold text-gray-600">Phone</span>
          <span className="text-gray-800">
            {userData.phone}
          </span>
        </div>

        <div className="flex flex-col items-center p-3">
          <LinkButton value="Edit Profile" path="/edit"/>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
