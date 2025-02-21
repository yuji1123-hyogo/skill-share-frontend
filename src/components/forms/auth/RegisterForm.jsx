import React, { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerUserAPI } from "../../../api/clients/authApi";
import AuthFormLayout from "./AuthFormLayout";
import useCheckUserAvailability from "../../../hooks/user/useCheckUserAvailability";
import { registerSchema } from "../../../utils/validations/schemas/authValidation";
import FormErrorMessage from "../FormErrormessage";
import SuccessIcon from "../SuccessIcon";
import { toast } from "react-toastify";


const RegisterForm = ({ setAuthMode }) => {
  const [submitAPIError, setSubmitAPIError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { 
    register, 
    handleSubmit, 
    formState: { errors:clientErrors }, 
    control,
    reset 
  } = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  });

  const username = useWatch({ control, name: "username" });
  const email = useWatch({ control, name: "email" });

  //APIを使ったバリデーションエラー状態の管理
  //×useFormからseterrorを受け取って共通のバリデーションエラー状態を持つ
  //モジュール結合度が高くなってしまい再利用性が下がる
  //〇APIバリデーションエラーとフロントエンドバリデーションエラーを明確に分ける
  const { 
    error: usernameCheckAPIError, 
    success: usernameCheckAPISuccess 
  } = useCheckUserAvailability("username", username);

  const { 
    error: emailCheckAPIError, 
    success: emailCheckAPISuccess, 
  } = useCheckUserAvailability("email", email);


  const onSubmitRegister = async (data) => {
    try {
      setIsSubmitting(true);
      setSubmitAPIError(null);
      
      await registerUserAPI(data);
      reset();
      setAuthMode("login");
      
    } catch (error) {
      toast.error(error.message || "登録に失敗しました");
      setSubmitAPIError(error.message || "登録に失敗しました");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isSubmitDisabled = 
    !!usernameCheckAPIError || 
    !!emailCheckAPIError || 
    isSubmitting;

  return (
    <AuthFormLayout title="新規登録">
      <form onSubmit={handleSubmit(onSubmitRegister)} className="mt-8 space-y-6">
        <div className="space-y-6">
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-200 mb-1">
              ユーザー名
            </label>
            <div className="relative">
              <input
                {...register("username")}
                placeholder="ユーザー名を入力"
                className="w-full px-4 py-2 bg-dark-primary border border-dark-accent rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                disabled={isSubmitting}
                />
                {usernameCheckAPISuccess && (
                  <SuccessIcon/>
                )}
            </div>
            <FormErrorMessage error={usernameCheckAPIError ||clientErrors.username?.message } variant="box" />
            {usernameCheckAPISuccess && (
              <p className="mt-1 text-sm text-green-500">{usernameCheckAPISuccess}</p>
            )}
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium text-gray-200 mb-1">
              メールアドレス
            </label>
            <div className="relative">
              <input
                {...register("email")}
                type="email"
                placeholder="メールアドレスを入力"
                className="w-full px-4 py-2 bg-dark-primary border border-dark-accent rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                disabled={isSubmitting}
              />
              {emailCheckAPISuccess && (
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
            <FormErrorMessage 
              error={ emailCheckAPIError || clientErrors.email?.message }
              variant="box"
            />
            {emailCheckAPISuccess && (
              <p className="mt-1 text-sm text-green-500">{emailCheckAPISuccess}</p>
            )}
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium text-gray-200 mb-1">
              パスワード
            </label>
            <input
              {...register("password")}
              type="password"
              placeholder="パスワードを入力"
              className="w-full px-4 py-2 bg-dark-primary border border-dark-accent rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              disabled={isSubmitting}
            />
            <FormErrorMessage error={clientErrors.password?.message} variant="box" />
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium text-gray-200 mb-1">
              パスワード（確認）
            </label>
            <input
              {...register("confirmPassword")}
              type="password"
              placeholder="パスワードを再入力"
              className="w-full px-4 py-2 bg-dark-primary border border-dark-accent rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              disabled={isSubmitting}
            />
            <FormErrorMessage error={clientErrors.confirmPassword?.message} variant="box" />
          </div>
        </div>

        {submitAPIError && (
          <FormErrorMessage error={submitAPIError} variant="box" className="mt-4" />
        )}
        
        <button
          type="submit"
          disabled={isSubmitDisabled}
          className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              登録中...
            </div>
          ) : (
            "アカウントを作成"
          )}
        </button>
      </form>
    </AuthFormLayout>
  );
};

export default RegisterForm;
