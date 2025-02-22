import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { loginAsync } from "../../../features/RTK/authSlice";
import AuthFormLayout from "./AuthFormLayout";
import FormErrorMessage from "../FormErrormessage";
import { useNavigate } from "react-router-dom";
import { loginSchema } from "../../../utils/validations/schemas/authValidation";
import { toast } from "react-toastify";




const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading:loginLoading, error:loginAPIError} = useSelector((state) => state.auth);
  
  
  const { register, handleSubmit, formState: { errors:clientErrors } } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmitLogin = async (data) => {
    try{
      const result = await dispatch(loginAsync(data)).unwrap();
      console.log("ログイン",result)
      toast.success(result.message || "ログインしました");
      navigate("/", { replace: true });
    } catch (error) {
      console.error("ログインに失敗しました", error);
      toast.error(error|| "ログインに失敗しました");
    }
  };



  return (
    <AuthFormLayout title="ログイン">
      <form onSubmit={handleSubmit(onSubmitLogin)} className="space-y-6">
        <div className="space-y-4">
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-200 mb-1">
              メールアドレス
            </label>
            <input
              {...register("email")}
              placeholder="メールアドレス"
            className="appearance-none relative block w-full px-3 py-2 border border-dark-accent placeholder-gray-500 text-gray-200 rounded-lg bg-dark-primary focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
            <FormErrorMessage error={clientErrors.email?.message} />
          </div>
          
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-200 mb-1">
              パスワード
            </label>
            <input
              {...register("password")}
              type="password"
              placeholder="パスワード"
            className="appearance-none relative block w-full px-3 py-2 border border-dark-accent placeholder-gray-500 text-gray-200 rounded-lg bg-dark-primary focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <FormErrorMessage error={clientErrors.password?.message} />
          </div>
        </div>

        <FormErrorMessage error={loginAPIError} />
        
        <button
          type="submit"
          disabled={loginLoading}
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {loginLoading ? "ログイン中..." : "ログイン"}
        </button>
      </form>
    </AuthFormLayout>
  );
};

export default LoginForm;
