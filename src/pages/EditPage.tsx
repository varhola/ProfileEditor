import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { LinkButton } from "../components/LinkButton";
import { Avatar } from "../components/Avatar";
import { getProfile, saveProfile } from "../profileStorage";
import { Input } from "../components/Input";

interface FormValues {
  email: string;
  phone: string;
  password: string;
  password2: string;
}

function EditPage() {
  const navigate = useNavigate()
  const userData = getProfile()
  const [avatar, setAvatar] = useState(userData.avatar)

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => setAvatar(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      email: userData.email,
      phone: userData.phone,
      password: "",
      password2: "",
    },
  })

  const onSubmit = (data: FormValues) => {
    const password = data.password !== "" ? data.password : userData.password
    saveProfile({ name: userData.name, phone: data.phone, email: data.email, avatar, password })
    navigate("/profile")
  }

  const isPasswordProvided = watch("password") !== ""

  return (
    <div className="w-120 rounded-2xl bg-white p-8 text-center shadow-md">
      <div className="flex flex-col items-center">
        <Avatar src={avatar} alt="profile" />
        <label className="cursor-pointer rounded bg-blue-300 px-4 py-2 text-sm hover:bg-blue-500 hover:text-white">
          Change picture
          <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange}/>
        </label>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
            <h1 className="p-3 text-2xl font-semibold text-gray-800">
                {userData.name}
            </h1>

            <Input id="email" title="Email" register={register("email", {
              required: "Email is required",
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Email is not in a valid format" },
            })} error={errors.email?.message}/>

            <Input id="phone" title="Phone" register={register("phone", {
              required: "Phone is required",
              pattern: { value: /^\+?[0-9\s\-()]{7,20}$/, message: "Phone is not in a valid format" },
            })} error={errors.phone?.message}/>

            <Input id="password" title="New Password" register={register("password", {
              minLength: isPasswordProvided ? { value: 8, message: "Password must be at least 8 characters" } : undefined,
            })} error={errors.password?.message} isPassword={true}/>

            <Input id="password2" title="Confirm Password" register={register("password2", {
              validate: (value) =>
                !isPasswordProvided ||
                value === getValues("password") ||
                "Passwords do not match",
            })} error={errors.password2?.message} isPassword={true}/>

            <div className="flex flex-row justify-around p-3">
                <input type="submit" value="Save Changes" className="bg-green-300 px-4 py-2 rounded hover:bg-green-500"/>
                <LinkButton value="Cancel" path="/profile"/>
            </div>
        </div>
      </form>
    </div>
  );
}

export default EditPage;
