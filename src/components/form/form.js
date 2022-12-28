import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { EditContext } from "./../../context/contextProvider";

const SaveForm = () => {
  const [checked, setChecked] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { editName, setEditName, sectorName } = useContext(EditContext);

  useEffect(() => {
    reset({ name: editName, sector: sectorName });
  }, [editName, sectorName]);

  const { data: sectorCollection = [] } = useQuery({
    queryKey: ["sector"],
    queryFn: async () => {
      const res = await fetch(
        "https://coding-challenge-server-khaki.vercel.app/allsectors"
      );
      const data = await res.json();
      return data;
    },
  });

  const { data: profileCollection = [] } = useQuery(["profile"], async () => {
    const res = await fetch(
      "https://coding-challenge-server-khaki.vercel.app/allprofiles"
    );
    const data = await res.json();
    return data;
  });

  const handleSave = (data) => {
    console.log(data);
    const { checkbox, name, sector } = data;
    let id;
    const profile = {
      name,
      sector,
      checkbox,
    };

    if (editName) {
      const profile = profileCollection.find((item) => item.name == name);
      id = profile._id;
      console.log(id);
    }

    editName
      ? fetch(
          `https://coding-challenge-server-khaki.vercel.app/profileupdate/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(profile),
          }
        )
          .then((res) => res.json())
          .then((data) => {})
          .catch((err) => {
            console.error("Error: ", err);
          })
      : fetch("https://coding-challenge-server-khaki.vercel.app/profile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(profile),
        })
          .then((res) => res.json())
          .then((data) => {})
          .catch((err) => {
            console.error("Error: ", err);
          });
    setEditName(null);
    reset();
  };
  return (
    <div className="h-[600px] flex justify-center items-center w-[330px] mx-auto lg:w-fit lg:ml-5 border lg:mr-12 md:mx-auto md:mb-5 md:w-full">
      <div className="lg:w-96 p-7 md:w-3/4">
        <h1 className="text-center mb-12 text-2xl">
          Please enter your name and pick the Sectors you are currently involved
          in.
        </h1>
        <form onSubmit={handleSubmit(handleSave)}>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-2xl">Name</span>
            </label>
            <input
              {...register("name", { required: "Name is required" })}
              type="text"
              placeholder="username"
              defaultValue={editName}
              className="input input-bordered w-full"
            />
            {errors.name?.type === "required" && (
              <p className="text-red-600">{errors.name?.message}</p>
            )}
          </div>

          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text text-2xl">Sectors</span>
            </label>
            <select
              className="select select-bordered w-full"
              {...register("sector", { required: "Sector option is required" })}
            >
              {sectorCollection.map((item, index) => (
                <optgroup key={index} label={`${item.sector}`}>
                  {item.division?.map((sItem, index) => (
                    <option key={index}>{sItem.division_name}</option>
                  ))}
                </optgroup>
              ))}
            </select>
            {errors.sector?.type === "required" && (
              <p className="text-red-600">{errors.sector?.message}</p>
            )}
          </div>
          <div className="form-control mt-5">
            <label className="label cursor-pointer">
              <input
                type="checkbox"
                checked={editName ? true : checked}
                {...register("checkbox", {
                  required: "Checkbox should be marked",
                })}
                onChange={(e) => setChecked(!checked)}
                className="checkbox"
              />
            </label>
            <span className="label-text">Agree to terms</span>
            {errors.checkbox?.type === "required" && (
              <p className="text-red-600">{errors.checkbox?.message}</p>
            )}
          </div>

          <input
            type="submit"
            value="Save"
            className="btn btn-accent w-full mt-5"
          />
        </form>
      </div>
    </div>
  );
};

export default SaveForm;
