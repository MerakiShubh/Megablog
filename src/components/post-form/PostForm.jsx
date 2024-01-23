import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "../index.js";
import service from "../../appwrite/config.js";
import { useNavigate } from "react-router-dom";
import { UseSelector, useSelector } from "react-redux";
export const PostForm = ({ post }) => {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((status) => state.user.userData);
  const submit = async (data) => {
    if (post) {
      const file = data.image[0] ? service.uploadFile(data.image) : null;
      if (file) {
        service.deleteFile(post.featuredImage);
      }
      const dbPost = await service.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });
      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      } else {
        const file = await service.uploadFile(data.image[0]);
        if (file) {
          const fileId = file.$id;
          (data.featuredImage = fileId), await service.createPost({ ...data });
        }
      }
    }
  };

  return <div>Hello</div>;
};
